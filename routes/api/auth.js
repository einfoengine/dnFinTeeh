const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const userModel = require('../../models/Users_');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

router.get('/', auth, async (req, res)=>{
    try{
        const user = await userModel.findById(req.user.id).select('-pass');
        res.json({user})
    }catch(err){
        res.json(err.message);
        res.status(500).send('Server error!')
    }
});


// Post api/auth
// Authenticate an user & get token
router.post('/', [
    check('email', 'Please include a valid email').isEmail(),
    check('pass', 'Password is required').exists(),
    // Know, .not(), .isEmpty()
],async (req, res)=>{
    // Check error for the body
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors:errors.array()
        });
    }

    // Body data
    const {email, pass} = req.body;
    try{
        // See if the user exist
        let user = await userModel.findOne({email});
        if(!user){
            res.status(400).json({error: [{msg:'Invalid credentials'}]});
        }else{

            const   isMatch = await bcrypt.compare(pass, user.pass);
            if (!isMatch) res.status(400).json({error: [{msg:'Invalid credentials'}]});

            const payload = {
                user: {
                    id: user.id,
                    // pass: user.pass
                }
            }
            // jwt.verify();
            jwt.sign(payload, config.get('jwtSecret'), {expiresIn: 20}, (err, token)=>{
                if(err){
                    // throw err;
                    res.json("token expired");
                }else{
                    res.json({token}).send({token});
                }
            });
        }
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// Post api/auth
// AUthenticate user & get token

module.exports = router;