const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
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
            // Return JSON web tocken
    
            res.send('Registration successful');
        }
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;