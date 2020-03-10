const jwt = require('jsonwebtoken');
require('dotenv').config();
const SECRET = process.env.ACCESS_TOKEN_SECRET || "notsosecret";

// JWTCheck is middleware to validate JWT Tokens. 
// If no authorization key in headers, returns status (403) and JSON {'error': "no authorization header"}.
// If Token is not valid for any reason, returns status (403) and JSON {'error': "no authorization header"}
// IF Token is valid, sets req.body.token to contents of token payload for use in future routes.
function JWTCheck (req, res, next){
    try{
        delete req.body.token;
        let authHeader = req.headers.authorization; // in the headers, token should be placed in{ authorization : 'BEARER ${token}'}
        if (!authHeader){
            return res.status(403).json({error: "no authorization header"});
        }
        let token = authHeader.split(' ')[1];
        jwt.verify(token, SECRET, (err, token)=>{
            if(err){
                return res.status(403).json({error:"invalid token"});
            }
            req.body.token = {...token};
            next();
        });
    } catch (e){
        console.log(e);
        return res.status(404).json({error:"something went wrong"});
    }
}

module.exports = {JWTCheck};