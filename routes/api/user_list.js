const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const userModel = require('../../models/Users');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

router.get('/', async (req, res)=>{
    try{
        const user = await userModel.find();
        console.log('User data log\n',{user});
        res.json({user})
    }catch(err){
        res.json('User list error',err.message);
        res.status(500).send('Server error! User list not fiund!')
    }
});

router.post('/', async (req, res)=>{
    const {name, email, pass} = req.body;
    console.log('name:', name,'\n','name:', email,'\n','name:', pass,'\n');
});

// Post api/auth
// AUthenticate user & get token

module.exports = router;