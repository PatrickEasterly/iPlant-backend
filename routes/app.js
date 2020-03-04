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
        res.json(newRec);
    }catch(e){
        console.log(e);
        if (e.detail.includes("exists")){
            if (e.detail.includes("username")){
                res.json({error:"Username already exists."});
            }
            if (e.detail.includes("email")){
                res.json({error:"email address already exists."});
            }
        }
        res.json({horse:"shit"})
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
    res.json(updateRec);
    }catch(e){
        console.log(e);
        if (e.detail.includes("exists")){
            res.json({error:"Username already exists."});
        }
        res.json({horse:"shit"})
    }
});

router.delete('/user', async (req, res)=>{
    try{
    let delUser = req.headers;
    let delRec = await del.deleteUser(delUser.id);
    res.json(updateRec);
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
    res.json(newRec);
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
    let updateRec = await put.updateRoom(updateRoom);
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
    res.json(delRec);
    }catch(e){
        console.log(e);
        res.json({horse:"shit"})
    }
});

router.post('/plantinfo', async (req, res)=>{
    try{
    let newPlantinfo = req.headers;
    let newRec = await post.addPlantinfo(newPlantinfo);
    res.json(newRec);
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
    let updateRec = await put.updatePlantinfo(updatePlantinfo);
    res.json(updateRec);
    }catch(e){
        console.log(e);
        res.json({horse:"shit"})
    }
});

router.delete('/plantinfo', async (req, res)=>{
    try{
    let delPlantinfo = req.headers;
    let delRec = await del.deletePlantinfo(delPlantinfo.id);
    res.json(delRec);
    }catch(e){
        console.log(e);
        res.json({horse:"shit"})
    }
});

router.post('/plant', async (req, res)=>{
    try{
    let newPlant = req.headers;
    let newRec = await post.addPlant(newPlant);
    res.json(newRec);
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
    let updateRec = await put.updatePlant(updatePlant);
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
    res.json(delRec);
    }catch(e){
        console.log(e);
        res.json({horse:"shit"})
    }
});

router.post('/post', async (req, res)=>{
    try{
    let newPost = req.headers;
    let newRec = await post.addPost(newPost);
    res.json(newRec);
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
    let updateRec = await put.updatePost(updatePost);
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
    res.json(delRec);
    }catch(e){
        console.log(e);
        res.json({horse:"shit"})
    }
});

router.post('/comment', async (req, res)=>{
    try{
    let newComment = req.headers;
    let newRec = await post.addComment(newComment);
    res.json(newRec);
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
    let updateRec = await put.updateComment(updateComment);
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
    res.json(delRec);
    }catch(e){
        console.log(e);
        res.json({horse:"shit"})
    }
});

router.post('/water', async (req, res)=>{
    try{
    let newWater = req.headers;
    let newRec = await post.addWater(newWater);
    res.json(newRec);
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
    let delRec = await del.deleteWater(delWater);
    res.json(delRec);
    }catch(e){
        console.log(e);
        res.json({horse:"shit"})
    }
});

router.post('/follow', async (req, res)=>{
    try{
    let newFollow = req.headers;
    let newRec = await post.addFollow(newFollow);
    res.json(newRec);
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
    res.json(delRec);
    }catch(e){
        console.log(e);
        res.json({horse:"shit"})
    }
});

router.post('/likes', async (req, res)=>{
    try{
    let newLikes = req.headers;
    let newRec = await post.addLikes(newLikes);
    res.json(newRec);
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
    res.json(delRec);
    }catch(e){
        console.log(e);
        res.json({horse:"shit"})
    }
});

module.exports = router;