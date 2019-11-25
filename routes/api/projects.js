const express = require('express');
const router = express.Router();
const db = require('../../config/sequelize');
const Projects = require('../../models/Projects');
Projects.sync();

// Routes
// =========
router.get('/test', (req, res)=>{
    res.send('I am called at projects test');
});
router.get('/', async (req, res)=>{
    try{
        const projects = await Projects.findAll();
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
                "client": client,
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
    const {id, name, phone, email, address, company} = req.body;
    let project = await Projects.findOne({where: {id:id}});
    try{
        if(project){
            project.update({
                name : name,
                phone : phone,
                email : email,
                address : address,
                company : company,
            });
        }
    }catch(err){
        res.json({err});
    }
    console.log('*****************');
    console.log('I am put request');
    console.log(projects);
    res.send(projects);
    console.log('*****************');
});

router.delete('/', async (req, res)=>{
    const {name} = req.body;
    let projects = await Projects.findOne({where: {name: name}});
    projects.destroy();
    res.send('Projects destroy request exicuted');
});


module.exports = router;