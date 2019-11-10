const express = require('express');
const router = express.Router();


const Client = require('../../models/Clients');
const Project = require('../../models/Projects');
// require("../../models/Projects");

router.get('/test', (req, res)=>{
    res.send('I am called at users');
});
router.get('/', async(req, res)=>{
    // console.log("-=-=-=-=-=-=-=-=-=-=-=-=-req.params",req.params)
    try{
        const project = await Project.find({}).populate("client");
        // const project = await Projects.find({}).populate("client");
        console.log("project===================",project);
        res.json({project})
    }catch(err){
        console.log("err.message",err.message);
        res.json(err.message);
    }
});

// router.get('/projects', async (req, res)=>{
//     let projects = await ProjectModel.findAll();
//     res.send(projects);
// });

router.post('/', async (req, res)=>{
    // res.send('Success');
    // try{
        // const {name, client, amount, paid} = req.body;
        
        let project = await Project.findOne({name : req.body.name});
        if(project){
            res.send("Project is already there!");
        }else{
            project = new ProjectModel(req.body);
            // project = new ProjectModel({name, client, amount, paid});
            // res.send(project);
            project.save(function (err,data) {
                if (err) {res.send(err)}else{
                    console.log("data",data);
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
    project = await Project.findOne({_id:id});
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
    await Project.deleteOne({ name: req.body.name}, function (err) {
        if (err) return res.send(err);
        return res.send("Successfully Deleted!");
    });
    
});




module.exports = router;