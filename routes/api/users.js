const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');


router.get('/', (req, res)=>{
    res.send('I am called at users');
});

router.post('/post', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'please enter the right password with 6 or more char').isLength({min:6}),
    // Know, .not(), .isEmpty()
],(req, res)=>{
    // console.log(req.body);
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors:errors.array()
        });
    }
    res.send('User route');
});

module.exports = router;