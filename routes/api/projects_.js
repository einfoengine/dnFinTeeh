const express = require('express');
const router = express.Router();
// const config = require('config');
// const Client = require('../../models/Clients_');
const db = require('../../config/sequelize');
const Client = require('../../models/Clients');
// db.sync();
// Client.drop();
Client.sync();

// Routes
// =========
router.get('/test', (req, res)=>{
    res.send('I am called at clients test');
});

router.get('/', async (req, res)=>{
    try{
        const clients = await Client.findAll();
        res.send({clients})
    }catch(err){
        res.status(500).json(err);
    }
})

router.post('/', async (req, res)=>{
    const {name, phone, email, address, company} = req.body;
    try{
        let client = await Client.findOne({where: {name: name}});
        if(client){
            res.send({
                request: name,
                status: 'Client already exist! try with another name'
            })
        }else{
            const client = await Client.build({
                "name": name,
                "phone": phone,
                "email": email,
                "address": address,
                "company": company
            });
            client.save();
            res.send({
                request: name,
                status: 'Client create requested...'
            })
        }
    }catch(err){
        res.status(500).json(err);
    }
});

router.put('/', async (req, res)=>{
    const {id, name, phone, email, address, company} = req.body;
    let client = await Client.findOne({where: {id:id}});
    try{
        if(client){
            client.update({
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
    console.log(client);
    res.send(client);
    console.log('*****************');
});

router.delete('/', async (req, res)=>{
    const {name} = req.body;
    let client = await Client.findOne({where: {name: name}});
    client.destroy();
    res.send('Client destroy request exicuted');
});
// router.get('/', async (req, res)=>{
//     try{
//         const clients = await Client.find();
//         res.json({clients})
//     }catch(err){
//         res.json('User list error',err.message);
//         res.status(500).send('Server error! Project list not fiund!')
//     }
// })

// router.post('/', async (req, res)=>{
//     const {name, phone, email, address, company} = req.body;
//     let client = await Client.findOne({name : name});
//     if(client){
//         res.send("Client is already there!");
//     }else{
//         client = new Client({name, phone, email, address, company});
//         client.save((err) => {
//             err ? res.send(err) : "New client saved"
//             if (err) {res.send(err)}else{
//                 res.send("New client saved");
//             };
//         });
//     }
// });

// router.put('/', async (req, res)=>{
//     const {id, name, phone, email, address, company} = req.body;
//     let client = await Client.findOne({_id:id});
//     if("name" in client){
//         client.name = name;
//         client.phone = phone;
//         client.email = email;
//         client.address = address;
//         client.company = company;
//         p = await client.save();
//     }
//     res.send(client);
// });

// router.delete('/', async (req, res)=>{
//     await Client.deleteOne({ name: req.body.name}, function (err) {
//         if (err) return res.send(err);
//         return res.send("Successfully Deleted!");
//     });
// });



module.exports = router;
// // `~`~`~`~
// // Old code of mongoose

// const express = require('express');
// const router = express.Router();


// // const Client = require('../../models/Clients_');
// // const Project = require('../../models/Projects_');
// // require("../../models/Projects");

// router.get('/test', (req, res)=>{
//     res.send('I am called at users');
// });
// router.get('/', async(req, res)=>{
//     // console.log("-=-=-=-=-=-=-=-=-=-=-=-=-req.params",req.params)
//     try{
//         const project = await Project.find({}).populate("client");
//         // const project = await Projects.find({}).populate("client");
//         // console.log("project===================",project);
//         res.json({project})
//     }catch(err){
//         console.log("err.message",err.message);
//         res.json(err.message);
//     }
// });

// // router.get('/projects', async (req, res)=>{
// //     let projects = await ProjectModel.findAll();
// //     res.send(projects);
// // });

// router.post('/', async (req, res)=>{
//     // res.send('Success');
//     // try{
//         // const {name, client, amount, paid} = req.body;
        
//         let project = await Project.findOne({name : req.body.name});
//         if(project){
//             res.send("Project is already there!");
//         }else{
//             project = new ProjectModel(req.body);
//             // project = new ProjectModel({name, client, amount, paid});
//             // res.send(project);
//             project.save(function (err,data) {
//                 if (err) {res.send(err)}else{
//                     console.log("data",data);
//                     res.send("New project saved");
//                 };
//             });
//         }
//     // }catch(err){
//     //     console.error(err.message);
//     //     res.status(500).send(err.message);
//     // }
// });
// router.put('/', async (req, res)=>{
//     // res.send('I am already exicuted');
//     const {id, name, client, amount, paid} = req.body;
//     console.log('Project edit request', id);
//     project = await Project.findOne({_id:id});
//     // console.log('Project edit request', project);
//     if("name" in project){
//         project.name = name;
//         project.client = client;
//         project.amount = amount;
//         project.paid = paid;
//         p = await project.save();
//     }
//     res.send(project);
//     // res.send(req.body);
// });

// router.delete('/', async (req, res)=>{
//     await Project.deleteOne({ name: req.body.name}, function (err) {
//         if (err) return res.send(err);
//         return res.send("Successfully Deleted!");
//     });
    
// });




// module.exports = router;