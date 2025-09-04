const jwt = require('jsonwebtoken');
const Session = require('../models/sessionModal');


function authenticate(req ,res , next){
    const authHeader = req.headers["authorization"];
    if(!authHeader){return res.status(401).json({message : 'No token provided'});}

    const token = authHeader.split(" ")[1];
    
    jwt.verify(token, process.env.secret_key , (err,user) => {
        if(err){return res.status(403).json({message : 'Invalid token'});}
        req.user =user;
        next();
    })
};

async function verify(req , res , next ) {
    try{
         const authHeader = req.headers["authorization"];
         const token = authHeader && authHeader.split(" ")[1];
         const sessionId = req.cookies.sessionId;

         if(!token || !sessionId){
           return res.status(401).json({message : "Missing token/session"});
         }

         const decoded =  jwt.verify(token , process.env.secret_key);
         const session = await Session.getSession(decoded.id);
         if(!session || session.session_id != sessionId || session.token != token){
            return res.status(401).json({messsage : " Invalid or Expired session"});
         }

         req.user = decoded;
        next();        
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message : "Internal server error"});
    }

};

module.exports = {authenticate , verify};