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
        let project = await ProjectModel.findOne({name : name});
        // res.send(project);
        if(project){
            res.send("Project is already there!");
            // res.status(500).send("Project is already there!");
        }else{
            project = new ProjectModel({name, client, amount, paid});
            // res.send(project);
            project.save(function (err) {
                if (err) res.send(err);
                res.send("New project saved");
            });
        }
    // }catch(err){
    //     console.error(err.message);
    //     res.status(500).send(err.message);
    // }
});
router.put('/', async (req, res)=>{
    const {name, client, amount, paid} = req.body;
    project = await UserModel.findOne({email:presentEmail});
    if("name" in project){
        project.name = name;
        project.client = client;
        project.amount = amount;
        project.paid = paid;
        p = await project.save();
    }
    res.send(project);
});
router.delete('/', async (req, res)=>{
    console.log('Body data', req.body.name)
    await UserModel.deleteOne({ name: req.body.name}, function (err) {
        if (err) return handleError(err);
    });
    res.send("Successfully Deleted!");
});




module.exports = router;