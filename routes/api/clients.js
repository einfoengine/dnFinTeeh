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
    console.log('I am test route being called!');
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
    res.send({message: `Client updated ${id}`,data:client});
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