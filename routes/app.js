const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const post = require('../models/addquery');
const put = require('../models/updatequery');
const del = require('../models/deletequery');
const get = require('../models/getquery');
const {JWTCheck} = require('../models/userquery');
const userRouter = require('./user');


router.use('/user', userRouter);
router.use(JWTCheck);

router.get('/rooms/user/', async (req, res)=>{
    console.log(req.body);
    let {userId} = req.body.token;
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