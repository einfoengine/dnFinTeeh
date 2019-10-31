const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const UserModel = require('../../models/Users');


router.get('/test', (req, res)=>{
    res.send('I am called at users');
});

router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('pass', 'please enter the right password with 6 or more char').isLength({min:6}),
    // Know, .not(), .isEmpty()
],async (req, res)=>{
    // console.log(req.body);
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors:errors.array()
        });
    }

    // Body data
    const {name, email, pass} = req.body;
    try{
        // See if the user exist
        let user = await UserModel.findOne({email});
        if(user){
            res.status(500).json({error: [{msg:'User already exist'}]});
        }else{

            // Get users gravatar
            let avatar = gravatar.url(email, {
                s: '200',
                r: 'pg',
                d: 'mm'
            });
            
            // Encrypt password
            user = new UserModel({name, email, pass, avatar});
            const salt = await bcrypt.genSalt(10);
            user.pass = await bcrypt.hash(pass, salt);
            await user.save();
            // Return JSON web token
            const payload = {user: {id: user.id}}

            // Instead of res.send()
            // I understood how to use it up to this limit yet not understood the details of it
            // jwt.sign(), payload, gonfig.get,
            jwt.sign(payload, config.get('jwtSecret'), {expiresIn: 20}, (err, token)=>{
                if(err){
                    throw err;
                }else{
                    res.json({token})
                }
            });
            // res.send('Registration successful');
        }
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.put('/', async (req, res)=>{
    const {name, email, pass} = req.body;

    let user = {};
    user = await UserModel.findOne({email:email});
    console.log("found user",user);
    let p = {msg:"I am empty"};
    console.log("user.hasOwnProperty('email')",user.hasOwnProperty("email"),' user.email ',user.email)
    if("email" in user){
        user.email = email;
        user.name = name;
        user.pass = pass;
        p = await user.save();
        console.log('===========p========',p);
    }else{
        console.log("userrrrrr",user)
    }

    res.send(p);
    

    // // console.log(email)
    // try{
    //     UserModel.findOneAndUpdate({email}, req.body, {upsert:true}, function(err, doc){
    //         if (err) return res.send(500, { error: err });
    //         return res.send("succesfully saved");
    //     });
    // }catch(err){

    // }
});
router.delete('/', async (req, res)=>{

});

module.exports = router;