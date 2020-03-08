require('dotenv').config();
const saltRounds = process.env.SALTROUNDS;
const SECRET = process.env.ACCESS_TOKEN_SECRET || "notsosecret";
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const post = require('../models/addquery');
const put = require('../models/updatequery');
const del = require('../models/deletequery');
const get = require('../models/getquery');
const user = require('../models/userquery');

//POST 'app/user/login'
// This route takes JSON object as body of request. requires 'username' and 'password' keys.
// returns JSON object. If username is not in database, ends back status 404 and {'error' : "invalid username"}
// If username is valid, check to see if password matches users hash. If no, returns status 403 and {'login':'FAILURE', 'error':'Invalid Password'}
// IF username and password are correct, returns status 200 and {'login':"SUCCESS", 'token':${JWT token containing {'userID':(id for username)}}
router.post('/login', async (req, res) =>{
    try{
        let login = req.body;
        let userInfo = await get.userByUsername(login.username);
        if(!userInfo){
            return res.status(404).json({error:"invalid username"});
        }
        let comp = bcrypt.compareSync(login.password, userInfo.hash);
        if (comp){
            let payload = {'userid':userInfo.id};
            let token = jwt.sign(payload, SECRET);
            return res.json({login:"SUCCESS", token});
        }
        return res.status(403).json({login:"FAILURE", error:"invalid username"});
    } catch(e){
        return res.status(404).json({horse:"shit"})
    }
});

router.post('/register', async (req, res)=>{
    try{
        let newUser = req.body;
        newUser.hash = user.hashPassword((newUser.password || newUser.hash), SALTROUNDS);
        let newRec = await post.addUser(newUser);
        if (!newRec.error){
            let userID = newRec.id;
            let token = jwt.sign(userID, SECRET);
            console.log(token);
            res.json(token);
            //res.redirect(POST './login', body={...newUser});
        } else {
            return res.status(404).json(newRec);
        }
    }catch(e){
        return res.status(404).json({horse:"shit"})
    }
});

// This is the JWT validation check. check if token is valid, and call next. if not, return JSON login error.
router.use(async (req, res, next)=>{
    console.log("at the top of the verify middleware");
    let authHeader = req.headers.authorization; // in the headers, token should be placed in{ authorization : 'BEARER (actual token)'}
    if (!authHeader){
        return res.status(403).json({error: "no authorization header"})
    }
    console.log("after !authHeader, before jwt.verify");
    let token = authHeader.split(' ')[1];
    jwt.verify(token, SECRET, (err, userId)=>{
        if(err){
            console.log("inside the error on verify");
            return res.status(403).json({error:"invalid token"});
        }
        console.log(userId);
        req.body.userId = userId;
        console.log("===================================");
        console.log(req.body);
        next();
    });
});

router.post('/logout', async (req, res)=>{
    return res.status(404).json({horse:"shit"})
});

router.get('/user', async (req, res)=>{
    try{
        let user = req.body;
        let newRec = await get.oneUser(user.id);
        return res.json(newRec);
    }catch(e){
        console.log(e);
        return res.json({horse:"shit"})
    }
});

router.put('/user', async (req, res)=>{
    try{
        let updateUser = req.body;
        let updateRec = await put.updateUser(updateUser);
        console.log(updateRec);    
        if (!updateRec.error){
            return res.json(updateRec);
        }
        return res.status(404).json(updateRec);
    }catch(e){
        console.log(e);
        res.json({horse:"shit"})
    }
});

router.delete('/user', async (req, res)=>{
    try{
        let delUser = req.body;
        let delRec = await del.deleteUser(delUser.id);
        if (!delRec.error){
            return res.json(delRec);
        }
        return res.status(404).json(updateRec);
    }catch(e){
        console.log(e);
        res.json({horse:"shit"})
    }
});

module.exports = router;