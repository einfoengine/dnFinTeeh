const express = require('express');
const router = express.Router();

const ProjectModel = require('../../models/Projects');

router.get('/test', (req, res)=>{
    res.send('I am called at users');
});
router.get('/', async(req, res)=>{
    // res.send('Hello...');
    try{
        const project = await ProjectModel.find();
        res.json({project})
    }catch(err){
        res.json('User list error',err.message);
        res.status(500).send('Server error! Project list not fiund!')
    }
});

// router.get('/projects', async (req, res)=>{
//     let projects = await ProjectModel.findAll();
//     res.send(projects);
// });

router.post('/', async (req, res)=>{
    // res.send('Success');
    // try{
        const {name, client, amount, paid} = req.body;
        // if(amount == undefined || paid == undefined){
        //     amount = 0;
        //     paid = 0;
        // }
        let project = await ProjectModel.findOne({name : name});
        // res.send(project);
        if(project){
            res.send("Project is already there!");
            // res.status(500).send("Project is already there!");
        }else{
            project = new ProjectModel({name, client, amount, paid});
            // res.send(project);
            project.save(function (err) {
                if (err) {res.send(err)}else{
                    res.send("New project saved");
                };
            });
        }
    // }catch(err){
    //     console.error(err.message);
    //     res.status(500).send(err.message);
    // }
});
router.put('/', async (req, res)=>{
    // res.send('I am already exicuted');
    const {id, name, client, amount, paid} = req.body;
    console.log('Project edit request', id);
    project = await ProjectModel.findOne({_id:id});
    // console.log('Project edit request', project);
    if("name" in project){
        project.name = name;
        project.client = client;
        project.amount = amount;
        project.paid = paid;
        p = await project.save();
    }
    res.send(project);
    // res.send(req.body);
});

router.delete('/', async (req, res)=>{
    await ProjectModel.deleteOne({ name: req.body.name}, function (err) {
        if (err) return res.send(err);
        return res.send("Successfully Deleted!");
    });
    
});




module.exports = router;