require('dotenv').config();
const SALTROUNDS = parseInt(process.env.SALTROUNDS || 10);
const SECRET = process.env.ACCESS_TOKEN_SECRET || "notsosecret";
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const post = require('../models/addquery');
const put = require('../models/updatequery');
const del = require('../models/deletequery');
const get = require('../models/getquery');
const {JWTCheck} = require('../models/userquery');

//POST 'app/user/login'
// Takes JSON object as body of request. requires ('username' OR 'email') and 'password' keys.
// Returns JSON object. If username is not in database, ends back status 404 and {'error' : "invalid username"}
// If username is valid, check to see if password matches users hash. If no, returns status 403 and {'login':'FAILURE', 'error':'Invalid Password'}
// IF username and password are correct, returns status 200 and {'login':"SUCCESS", 'token':${JWT token containing {'userid':(id for username)}}
router.post('/login', async (req, res) =>{
    try{
        let login = {...req.body};
        if(!login.password){return res.status(403).json({login:"FAILURE", error:"no password sent!!"});}
        if(login.username || login.email){
            let userInfo;
            if(login.username){
                userInfo = await get.userByUsername(login.username);
            } else {
                userInfo = await get.userByEmail(login.email);
            }
            if(!userInfo){
                return res.status(404).json({error:"invalid username or email"});
            }
            let comp = bcrypt.compareSync(login.password, userInfo.hash);
            if (comp){
                let payload = {'userid':userInfo.id};
                let token = jwt.sign(payload, SECRET);
                return res.json({login:"SUCCESS", token});
            }
            return res.status(403).json({login:"FAILURE", error:"invalid username or email or password"});
        }
        return res.status(404).json({error:"email or username required"});
    } catch(e){
        console.log(e);
        return res.status(404).json({error:"something went wrong"});
    }
});

//POST 'app/user/register'
// Takes JSON object as body of request. requires username, password, email. Can also take firstname, lastname.
// if username or email already exist in DB, OR if either is not passed in, will send satus 404 and JSON {'register':"FAILURE", 'error': "(username or email) already exists"}
// if new user is created, will send JSON {'register':"SUCCESS", 'token':${JWT token containing {'userid':(id for username)}}
router.post('/register', async (req, res)=>{
    try{
        let newUser = {...req.body};
        let newHash = await bcrypt.hash(newUser.password || newUser.hash, SALTROUNDS);
        newUser.hash = newHash;
        let newRec = await post.addUser(newUser);

        if (!newRec.error){
            let payload = {'userid':newRec.id};
            let token = jwt.sign(payload, SECRET);
            return res.json({register:"SUCCESS", token});
        }
        return res.status(403).json({login:"FAILURE", error:newRec.error});
    }catch(e){
        console.log(e);
        return res.status(404).json({error:"something went wrong"});
    }
});

// This is the JWT validation check. Check if token is valid, attach token payload to req.body and call next. if not, return JSON login error.
router.use(JWTCheck);
//All endpoints after this require authenticated JWT with userid to access.

// NEEDS TO get WRITTEN AFTER JWT REFRESH TOKENS AND TIMEOUTS ARE IMPLEMENTED!!
router.post('/logout', async (req, res)=>{
    
    return res.status(404).json({advice:"just forget your token, buddy!"});
});

// GET '/app/user' 
// returns full info card, including plants, rooms, etc. for logged in user.
router.get('/', async (req, res)=>{
    try{
        let {userid} = req.body.token;
        let newRec = await get.oneUser(userid);
        return res.json(newRec);
    }catch(e){
        console.log(e);
        return res.status(404).json({error:"something went wrong"});
    }
});

// PUT '/app/user' 
// modifies logged in users(by JWT TOKEN) account. returns new record as JSON.
// if either email or username are attempted to be modified to email or username that already exists, 
// does not modify record, and returns status (403) and {error : '(username or email) already exists'}
router.put('/', async (req, res)=>{
    try{
        let updateUser = {...req.body};
        updateUser.id = req.body.token.userid;
        let updateRec = await put.updateUser(updateUser);

        if (!updateRec.error){
            return res.json(updateRec);
        }
        return res.status(403).json(updateRec);
    }catch(e){
        console.log(e);
        return res.status(404).json({error:"something went wrong"});
    }
});

//DELETE '/app/user'
// Removes logged in user. Deletes all records in all tables associated with their userid.
// logs user out by default, as the userid in JWT token is for a non-existent user.
// if no errors, returns deleted user record as JSON.
router.delete('/', async (req, res)=>{
    try{
        let {userid} = req.body.token;
        let delRec = await del.deleteUser(userid);
        
        if (!delRec.error){
            return res.json(delRec);
        }
        return res.status(404).json(updateRec);
    }catch(e){
        console.log(e);
        return res.status(404).json({error:"something went wrong"});
    }
});

module.exports = router;