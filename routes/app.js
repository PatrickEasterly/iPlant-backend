const express = require('express');
const router = express.Router();

const post = require('../models/addquery');
const put = require('../models/updatequery');
const del = require('../models/deletequery');
const get = require('../models/apiquery');

router.post('/user', async (req, res)=>{
    try{
        let newUser = req.headers;
        let newRec = await post.addUser(newUser);
        if (!newRec.error){
            res.json(newRec);
        } else {
            res.status(404).json(newRec);
        }
    }catch(e){
        res.status(404).json({horse:"shit"})
    }
});

router.get('/user', async (req, res)=>{
    try{
        let user = req.headers;
        let newRec = await get.oneUser(user.id);
        res.json(newRec);
    }catch(e){
        console.log(e);
        res.json({horse:"shit"})
    }
});

router.put('/user', async (req, res)=>{
    try{
        let updateUser = req.headers;
        let updateRec = await put.updateUser(updateUser);    
        if (!updateRec.error){
            res.json(updateRec);
        } else {
            res.status(404).json(updateRec);
        }
    }catch(e){
        console.log(e);
        res.json({horse:"shit"})
    }
});

router.delete('/user', async (req, res)=>{
    try{
        let delUser = req.headers;
        let delRec = await del.deleteUser(delUser.id);
        if (!delRec.error){
            res.json(delRec);
        } else {
            res.status(404).json(updateRec);
        }
    }catch(e){
        console.log(e);
        res.json({horse:"shit"})
    }
});

router.post('/room', async (req, res)=>{
    try{
    let newRoom = req.headers;
    console.log(newRoom);
    //function call to decode JWT into payload object goes here
    let newRec = await post.addRoom(newRoom);
    if (!newRec.error){
        res.json(newRec);
    } else{
        res.status(404).json(newRec);
    }
    }catch(e){
        console.log(e);
        res.json({horse:"shit"})
    }
});

router.get('/room', async (req, res)=>{
    try{
    let room = req.headers;
    //function call to decode JWT into payload object goes here
    let newRec = await get.oneRoom(room.id);
    res.json(newRec);
    }catch(e){
        console.log(e);
        res.json({horse:"shit"})
    }
});

router.put('/room', async (req, res)=>{
    try{
    let updateRoom = req.headers;
    //function call to decode JWT into payload object goes here
    l 
    if !updateRec.error){
            res.json(updateRec);
    }catch(e){
        console.log(e);
        res.json({horse:"shit"})
    }
});

router.delete('/room', async (req, res)=>{
    try{
    let delRoom = req.headers;
    //function call to decode JWT into payload object goes here
    let delRec = await del.deleteRoom(delRoom.id);
    if (!delRec.error){
            res.json(delRec);
        } else {
            res.status(404).json(updateRec);
        }
    }catch(e){
        console.log(e);
        res.json({horse:"shit"})
    }
});

router.post('/plantinfo', async (req, res)=>{
    try{
    let newPlantinfo = req.headers;
    let newRec = await post.addPlantinfo(newPlantinfo);
    if (!newRec.error){
        res.json(newRec);
    } else{
        res.status(404).json(newRec);
    }
    }catch(e){
        console.log(e);
        res.json({horse:"shit"})
    }
});

router.get('/plantinfo', async (req, res)=>{
    try{
    let plantinfo = req.headers;
    let newRec = await get.onePlantinfo(plantinfo.id);
    res.json(newRec);
    }catch(e){
        console.log(e);
        res.json({horse:"shit"})
    }
});

router.put('/plantinfo', async (req, res)=>{
    try{
    let updatePlantinfo = req.headers;
    l 
    if !updateRec.error){
            res.json(updateRec);
    }catch(e){
        console.log(e);
        res.json({horse:"shit"})
    }
});

router.delete('/plantinfo', async (req, res)=>{
    res.status(404).json({error:"JK you can't delete plant info records. thats just not OK"});
    // try{
    //     let delPlantinfo = req.headers;
    //     let delRec = await del.deletePlantinfo(delPlantinfo.id);
    //     if (!delRec.error){
            res.json(delRec);
        } else {
            res.status(404).json(updateRec);
        }
    // }catch(e){
    //     console.log(e);
    //     res.json({horse:"shit"})
    // }
});

router.post('/plant', async (req, res)=>{
    try{
    let newPlant = req.headers;
    let newRec = await post.addPlant(newPlant);
    if (!newRec.error){
        res.json(newRec);
    } else{
        res.status(404).json(newRec);
    }
    }catch(e){
        console.log(e);
        res.json({horse:"shit"})
    }
});

router.get('/plant', async (req, res)=>{
    try{
    let plant = req.headers;
    let newRec = await get.onePlant(plant.id);
    res.json(newRec);
    }catch(e){
        console.log(e);
        res.json({horse:"shit"})
    }
});

router.put('/plant', async (req, res)=>{
    try{
    let updatePlant = req.headers;
    l 
    if !updateRec.error){
            res.json(updateRec);
    }catch(e){
        console.log(e);
        res.json({horse:"shit"})
    }
});

router.delete('/plant', async (req, res)=>{
    try{
    let delPlant = req.headers;
    let delRec = await del.deletePlant(delPlant.id);
    if (!delRec.error){
            res.json(delRec);
        } else {
            res.status(404).json(updateRec);
        }
    }catch(e){
        console.log(e);
        res.json({horse:"shit"})
    }
});

router.post('/post', async (req, res)=>{
    try{
    let newPost = req.headers;
    let newRec = await post.addPost(newPost);
    if (!newRec.error){
        res.json(newRec);
    } else{
        res.status(404).json(newRec);
    }
    }catch(e){
        console.log(e);
        res.json({horse:"shit"})
    }
});

router.get('/post', async (req, res)=>{
    try{
    let post = req.headers;
    let newRec = await get.onePost(post.id);
    res.json(newRec);
    }catch(e){
        console.log(e);
        res.json({horse:"shit"})
    }
});

router.put('/post', async (req, res)=>{
    try{
    let updatePost = req.headers;
    l 
    if !updateRec.error){
            res.json(updateRec);
    }catch(e){
        console.log(e);
        res.json({horse:"shit"})
    }
});

router.delete('/post', async (req, res)=>{
    try{
    let delPost = req.headers;
    let delRec = await del.deletePost(delPost.id);
    if (!delRec.error){
            res.json(delRec);
        } else {
            res.status(404).json(updateRec);
        }
    }catch(e){
        console.log(e);
        res.json({horse:"shit"})
    }
});

router.post('/comment', async (req, res)=>{
    try{
    let newComment = req.headers;
    let newRec = await post.addComment(newComment);
    if (!newRec.error){
        res.json(newRec);
    } else{
        res.status(404).json(newRec);
    }
    }catch(e){
        console.log(e);
        res.json({horse:"shit"})
    }
});

router.get('/comment', async (req, res)=>{
    try{
    let comment = req.headers;
    let newRec = await get.oneComment(comment.id);
    res.json(newRec);
    }catch(e){
        console.log(e);
        res.json({horse:"shit"})
    }
});

router.put('/comment', async (req, res)=>{
    try{
    let updateComment = req.headers;
    l 
    if !updateRec.error){
            res.json(updateRec);
    }catch(e){
        console.log(e);
        res.json({horse:"shit"})
    }
});

router.delete('/comment', async (req, res)=>{
    try{
    let delComment = req.headers;
    let delRec = await del.deleteComment(delComment.id);
    if (!delRec.error){
            res.json(delRec);
        } else {
            res.status(404).json(updateRec);
        }
    }catch(e){
        console.log(e);
        res.json({horse:"shit"})
    }
});

router.post('/water', async (req, res)=>{
    try{
    let newWater = req.headers;
    let newRec = await post.addWater(newWater);
    if (!newRec.error){
        res.json(newRec);
    } else{
        res.status(404).json(newRec);
    }
    }catch(e){
        console.log(e);
        res.json({horse:"shit"})
    }
});

router.get('/water', async (req, res)=>{
    try{
        let Water = req.headers;
        let newRec = await get.oneWater(Water.plantid);
        res.json(newRec);
    }catch(e){
        console.log(e);
        res.json({horse:"shit"})
    }
});

router.delete('/water', async (req, res)=>{
    try{
        let delWater = req.headers;
        let delRec = await del.deleteWater(delWater.id);
        if (!delRec.error){
            res.json(delRec);
        } else {
            res.status(404).json(updateRec);
        }
    }catch(e){
        console.log(e);
        res.json({horse:"shit"})
    }
});

router.post('/follow', async (req, res)=>{
    try{
    let newFollow = req.headers;
    let newRec = await post.addFollow(newFollow);
    if (!newRec.error){
        res.json(newRec);
    } else{
        res.status(404).json(newRec);
    }
    }catch(e){
        console.log(e);
        res.json({horse:"shit"})
    }
});

router.get('/follow', async (req, res)=>{
    try{
    let follow = req.headers;
    let newRec = await get.oneFollow(follow.userid);
    res.json(newRec);
    }catch(e){
        console.log(e);
        res.json({horse:"shit"})
    }
});

router.delete('/follow', async (req, res)=>{
    try{
    let delFollow = req.headers;
    let delRec = await del.deleteFollow(delFollow);
    if (!delRec.error){
            res.json(delRec);
        } else {
            res.status(404).json(updateRec);
        }
    }catch(e){
        console.log(e);
        res.json({horse:"shit"})
    }
});

router.post('/likes', async (req, res)=>{
    try{
    let newLikes = req.headers;
    let newRec = await post.addLikes(newLikes);
    if (!newRec.error){
        res.json(newRec);
    } else{
        res.status(404).json(newRec);
    }
    }catch(e){
        console.log(e);
        res.json({horse:"shit"})
    }
});

router.get('/likes', async (req, res)=>{
    try{
    let likes = req.headers;
    let newRec = await get.oneLikes(likes.postid);
    res.json(newRec);
    }catch(e){
        console.log(e);
        res.json({horse:"shit"})
    }
});

router.delete('/likes', async (req, res)=>{
    try{
    let delLikes = req.headers;
    let delRec = await del.deleteLikes(delLikes);
    if (!delRec.error){
        res.json(delRec);
    } else {
       res.status(404).json(updateRec);
    }
    }catch(e){
        console.log(e);
        res.json({horse:"shit"})
    }
});

module.exports = router;