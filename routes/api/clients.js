const express = require('express');
const router = express.Router();
const config = require('config');

const ClientModel = require('../../models/Clients');

router.get('/test', (req, res)=>{
    res.send('I am called at clients test');
});

router.get('/', async (req, res)=>{
    try{
        const clients = await ClientModel.find();
        res.json({clients})
    }catch(err){
        res.json('User list error',err.message);
        res.status(500).send('Server error! Project list not fiund!')
    }
})

router.post('/', async (req, res)=>{
    const {name, phone, email, address, company} = req.body;
    let client = await ClientModel.findOne({name : name});
    if(client){
        res.send("Client is already there!");
    }else{
        client = new ClientModel({name, phone, email, address, company});
        client.save((err) => {
            err ? res.send(err) : "New client saved"
            if (err) {res.send(err)}else{
                res.send("New client saved");
            };
        });
    }
});

router.put('/', async (req, res)=>{
    const {id, name, phone, email, address, company} = req.body;
    let client = await ClientModel.findOne({_id:id});
    if("name" in client){
        client.name = name;
        client.phone = phone;
        client.email = email;
        client.address = address;
        client.company = company;
        p = await client.save();
    }
    res.send(client);
});

router.delete('/', async (req, res)=>{
    await ClientModel.deleteOne({ name: req.body.name}, function (err) {
        if (err) return res.send(err);
        return res.send("Successfully Deleted!");
    });
});



module.exports = router;