require('dotenv').config();
const saltRounds = process.env.SALTROUNDS;
const SECRET = process.env.ACCESS_TOKEN_SECRET;
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const post = require('../models/addquery');
const put = require('../models/updatequery');
const del = require('../models/deletequery');
const get = require('../models/apiquery');
const user = require('../models/userquery');

//send a username and plaintext password.
router.post('/login', async (req, res) =>{
    try{
        let login = req.body;
        let userInfo = await get.userByUsername(login.username);
        console.log(userInfo);
        if(!userInfo){
            return res.status(404).json({error:"invalid username"});
        }
        let comp = bcrypt.compareSync(login.password, userInfo.hash);
        if (comp){
            let payload = userInfo.id;
            let token = jwt.sign(payload, SECRET);
            console.log(token);
            return res.json({login:"SUCCESS!!!!!", token});
        }
        return res.json({login:"FAILURE!!!!!"});
    } catch(e){
        return res.status(404).json({horse:"shit"})
    }
});

router.post('/user', async (req, res)=>{
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

router.get('/rooms/user/', async (req, res)=>{
    let {userId} = req.body;
    let allRooms = await get.allRoomsByUser(userId);
    res.json(allRooms);
});

router.get('/plants/room/', async (req, res)=>{
    let {plantId} = req.body;
    let allPlants = await get.allPlantsByRoom(plantId);
    res.json(allPlants);
});

router.post('/room', async (req, res)=>{
    try{
        let newRoom = req.body;
        console.log(newRoom);
        //function call to decode JWT into payload object goes here
        let newRec = await post.addRoom(newRoom);
        if (!newRec.error){
            return res.json(newRec);
        } 
        res.status(404).json(newRec);
    }catch(e){
        console.log(e);
        res.json({horse:"shit"})
    }
});

router.get('/room', async (req, res)=>{
    try{
        let room = req.body;
        
        let newRec = await get.oneRoom(room.id);
        res.json(newRec);
    }catch(e){
        console.log(e);
        res.json({horse:"shit"})
    }
});

router.put('/room', async (req, res)=>{
    try{
        let updateRoom = req.body;
        
        let updateRec = await put.updateRoom(updateRoom);
        console.log(updateRec);    
        if (!updateRec.error){
            return res.json(updateRec);
        } 
        res.status(404).json(updateRec);
    }catch(e){
        console.log(e);
        res.json({horse:"shit"})
    }
});

router.delete('/room', async (req, res)=>{
    try{
        let delRoom = req.body;
        //function call to decode JWT into payload object goes here
        let delRec = await del.deleteRoom(delRoom.id);
        if (!delRec.error){
                return res.json(delRec);
            }
        res.status(404).json(updateRec);
    }catch(e){
        console.log(e);
        res.json({horse:"shit"})
    }
});

router.post('/plantinfo', async (req, res)=>{
    try{
    let newPlantinfo = req.body;
    let newRec = await post.addPlantinfo(newPlantinfo);
    if (!newRec.error){
        return res.json(newRec);
    }
    res.status(404).json(newRec);
    }catch(e){
        console.log(e);
        res.json({horse:"shit"})
    }
});

router.get('/plantinfo', async (req, res)=>{
    try{
    let plantinfo = req.body;
    let newRec = await get.onePlantinfo(plantinfo.id);
    res.json(newRec);
    }catch(e){
        console.log(e);
        res.json({horse:"shit"})
    }
});

router.put('/plantinfo', async (req, res)=>{
    try{
    let updatePlantinfo = req.body;
    let updateRec = await put.updatePlantinfo(updatePlantinfo);    
        if (!updateRec.error){
            return res.json(updateRec);
        }
        res.status(404).json(updateRec);
    }catch(e){
        console.log(e);
        res.json({horse:"shit"})
    }
});

router.delete('/plantinfo', async (req, res)=>{
    res.status(404).json({error:"JK you can't delete plant info records. thats just not OK"});
    // try{
    //     let delPlantinfo = req.body;
    //     let delRec = await del.deletePlantinfo(delPlantinfo.id);
    //     if (!delRec.error){
        //     return res.json(delRec);
        // }
        // res.status(404).json(updateRec);
    // }catch(e){
    //     console.log(e);
    //     res.json({horse:"shit"})
    // }
});

router.post('/plant', async (req, res)=>{
    try{
    let newPlant = req.body;
    let newRec = await post.addPlant(newPlant);
    if (!newRec.error){
        return res.json(newRec);
    }
    res.status(404).json(newRec);
    }catch(e){
        console.log(e);
        res.json({horse:"shit"})
    }
});

router.get('/plant', async (req, res)=>{
    try{
    let plant = req.body;
    let newRec = await get.onePlant(plant.id);
    res.json(newRec);
    }catch(e){
        console.log(e);
        res.json({horse:"shit"})
    }
});

router.put('/plant', async (req, res)=>{
    try{
        let updateRec = await put.updatePlant(updatePlant);    
        if (!updateRec.error){
            return res.json(updateRec);
        }
        res.status(404).json(updateRec);
    }catch(e){
        console.log(e);
        res.json({horse:"shit"})
    }
});

router.delete('/plant', async (req, res)=>{
    try{
    let delPlant = req.body;
    let delRec = await del.deletePlant(delPlant.id);
    if (!delRec.error){
            return res.json(delRec);
        }
        res.status(404).json(updateRec);
    }catch(e){
        console.log(e);
        res.json({horse:"shit"})
    }
});

router.post('/post', async (req, res)=>{
    try{
    let newPost = req.body;
    let newRec = await post.addPost(newPost);
    if (!newRec.error){
        return res.json(newRec);
    }
    res.status(404).json(newRec);
    }catch(e){
        console.log(e);
        res.json({horse:"shit"})
    }
});

router.get('/post', async (req, res)=>{
    try{
    let post = req.body;
    let newRec = await get.onePost(post.id);
    res.json(newRec);
    }catch(e){
        console.log(e);
        res.json({horse:"shit"})
    }
});

router.put('/post', async (req, res)=>{
    try{
        let updatePost = req.body;
        let updateRec = await put.updatePost(updatePost);    
        if (!updateRec.error){
            return res.json(updateRec);
        }
        res.status(404).json(updateRec);
    }catch(e){
        console.log(e);
        res.json({horse:"shit"})
    }
});

router.delete('/post', async (req, res)=>{
    try{
        let delPost = req.body;
        let delRec = await del.deletePost(delPost.id);
        if (!delRec.error){
            return res.json(delRec);
        }
        res.status(404).json(updateRec);
    }catch(e){
        console.log(e);
        res.json({horse:"shit"})
    }
});

router.post('/comment', async (req, res)=>{
    try{
        let newComment = req.body;
        let newRec = await post.addComment(newComment);
        if (!newRec.error){
            return res.json(newRec);
        }
        res.status(404).json(newRec);
    }catch(e){
        console.log(e);
        res.json({horse:"shit"})
    }
});

router.get('/comment', async (req, res)=>{
    try{
        let comment = req.body;
        let newRec = await get.oneComment(comment.id);
        res.json(newRec);
    }catch(e){
        console.log(e);
        res.json({horse:"shit"})
    }
});

router.put('/comment', async (req, res)=>{
    try{
        let updateComment = req.body;
        let updateRec = await put.updateComment(updateComment);    
        if (!updateRec.error){
            return res.json(updateRec);    
        }
        res.status(404).json(updateRec);
    }catch(e){
        console.log(e);
        res.json({horse:"shit"})
    }
});

router.delete('/comment', async (req, res)=>{
    try{
        let delComment = req.body;
        let delRec = await del.deleteComment(delComment.id);
        if (!delRec.error){
            return res.json(delRec);
        }
        res.status(404).json(updateRec);
    }catch(e){
        console.log(e);
        res.json({horse:"shit"})
    }
});

router.post('/water', async (req, res)=>{
    try{
        let newWater = req.body;
        let newRec = await post.addWater(newWater);
        if (!newRec.error){
            return res.json(newRec);
        }
        res.status(404).json(newRec);
    }catch(e){
        console.log(e);
        res.json({horse:"shit"})
    }
});

router.get('/water', async (req, res)=>{
    try{
        let Water = req.body;
        let newRec = await get.oneWater(Water.plantid);
        res.json(newRec);
    }catch(e){
        console.log(e);
        res.json({horse:"shit"})
    }
});

router.delete('/water', async (req, res)=>{
    try{
        let delWater = req.body;
        let delRec = await del.deleteWater(delWater.id);
        if (!delRec.error){
            return res.json(delRec);
        }
        res.status(404).json(updateRec);
    }catch(e){
        console.log(e);
        res.json({horse:"shit"})
    }
});

router.post('/follow', async (req, res)=>{
    try{
    let newFollow = req.body;
    let newRec = await post.addFollow(newFollow);
    if (!newRec.error){
        return res.json(newRec);
    }
    res.status(404).json(newRec);
    }catch(e){
        console.log(e);
        res.json({horse:"shit"})
    }
});

router.get('/follow', async (req, res)=>{
    try{
        let follow = req.body;
        let newRec = await get.oneFollow(follow.userid);
        res.json(newRec);
    }catch(e){
        console.log(e);
        res.json({horse:"shit"})
    }
});

router.delete('/follow', async (req, res)=>{
    try{
        let delFollow = req.body;
        let delRec = await del.deleteFollow(delFollow);
        if (!delRec.error){
            return res.json(delRec);
        }
        res.status(404).json(updateRec);
    }catch(e){
        console.log(e);
        res.json({horse:"shit"})
    }
});

router.post('/likes', async (req, res)=>{
    try{
        let newLikes = req.body;
        let newRec = await post.addLikes(newLikes);
        if (!newRec.error){
            return res.json(newRec);
        }
        res.status(404).json(newRec);
    }catch(e){
        console.log(e);
        res.json({horse:"shit"})
    }
});

router.get('/likes', async (req, res)=>{
    try{
        let likes = req.body;
        let newRec = await get.oneLikes(likes.postid);
        res.json(newRec);
    }catch(e){
        console.log(e);
        res.json({horse:"shit"})
    }
});

router.delete('/likes', async (req, res)=>{
    try{
        let delLikes = req.body;
        let delRec = await del.deleteLikes(delLikes);
        if (!delRec.error){
            return res.json(delRec);
        }
        res.status(404).json(updateRec);
    }catch(e){
        console.log(e);
        res.json({horse:"shit"})
    }
});

module.exports = router;