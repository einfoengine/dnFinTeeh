const express = require('express');
const router = express.Router();
const db = require('../../config/sequelize');
const Projects = require('../../models/Projects');
const Clients = require('../../models/Clients');

Clients.hasMany(Projects);
Projects.belongsTo(Clients);
Clients.sync();
Projects.sync();

// Routes 
// =========
router.get('/test', (req, res)=>{
    res.send('I am called at projects test');
});
router.get('/', async (req, res)=>{
    try{
        const projects = await Projects.findAll({ include: [ Clients ]});
        if(projects){
            console.log(process);
            res.send({projects});
        }else{
            console.log('No projects found');
        }
    }catch(err){
        res.status(500).json({message: 'Error:',err:err});
    }
})

router.post('/', async (req, res)=>{
    const {name, client, amount, paid} = req.body;
    try{
        let project = await Projects.findOne({where: {name: name}});
        if(project){
            res.send({
                request: name,
                status: 'Project already exist!',
                project: project
            })
        }else{
            const project = await Projects.build({
                "name": name,
                "ClientId": client,
                "amount": amount,
                "paid": paid,
            });
            const save = await project.save();
            if(save){
                res.send({
                    request: name,
                    status: 'Project create requested successfully'
                })
            }else{
                res.send('Something went wrong');
            }
        }
    }catch(err){
        res.status(500).json(err);
    }
    console.log('*********** Project api ********')
    console.log(req.body);
    // res.send(req.body);
    console.log('*********** Project api ********')
});

router.put('/', async (req, res)=>{
    const {id, name, client, amount, paid} = req.body;
    let project = await Projects.findOne({where: {id:id}});
    try{
        if(project){
            project.update({
                name : name,
                client : client,
                amount : amount,
                paid : paid
            });
        }
    }catch(err){
        res.json({err});
    }
    res.send({message: 'Project found', project : project});
    console.log('Project found', project);
});

router.delete('/', async (req, res)=>{
    const {name} = req.body; 
    let projects = await Projects.findOne({where: {name: name}});
    projects.destroy();
    res.send('Projects destroy request exicuted');
});


module.exports = router;