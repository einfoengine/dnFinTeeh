const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next)=>{
    // Get token from the header
    // Header is not clear
    const token = req.header('x-auth-token');

    // Check if no token
    if(!token){
        return res.status(401).json({msg: 'No token authorization denied!'});
    }
    // Verify token
    try{
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        req.user = decoded.user;
        next();
    }catch(err){
        res.status(400).json({
            msg: 'token is not valid!'
        });
    }
};