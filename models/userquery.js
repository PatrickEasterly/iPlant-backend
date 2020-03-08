const jwt = require('jsonwebtoken');
require('dotenv').config();
const SECRET = process.env.ACCESS_TOKEN_SECRET || "notsosecret";

function JWTCheck (req, res, next){
    try{
        let authHeader = req.headers.authorization; // in the headers, token should be placed in{ authorization : 'BEARER ${token}'}
        if (!authHeader){
            return res.status(403).json({error: "no authorization header"});
        }
        let token = authHeader.split(' ')[1];
        jwt.verify(token, SECRET, (err, token)=>{
            if(err){
                return res.status(403).json({error:"invalid token"});
            }
            req.body.token = token;
            next();
        });
    } catch (e){
        console.log(e);
        return res.status(404).json({horse:"shit"});
    }
}

module.exports = {JWTCheck};