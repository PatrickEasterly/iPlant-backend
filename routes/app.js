const express = require('express');
const router = express.Router();

const post = require('../models/addquery');
const put = require('../models/updatequery');
const del = require('../models/deletequery');
const get = require('../models/apiquery');

router.post('/user', async (req, res)=>{
    let newUser = req.headers;
    let newRec = await post.addUser(newUser);
    res.json(newRec);
});

router.get('/user', async (req, res)=>{
    let user = req.headers;
    let newRec = await get.oneUser(user.id);
    res.json(newRec);
});

router.put('/user', async (req, res)=>{
    let updateUser = req.headers;
    let updateRec = await put.updateUser(updateUser);
    res.json(updateRec);
});

router.delete('/user', async (req, res)=>{
    let delUser = req.headers;
    let delRec = await del.deleteUser(delUser.id);
    res.json(updateRec);
});

router.post('/room', async (req, res)=>{
    let newRoom = req.headers;
    //function call to decode JWT into payload object goes here
    let newRec = await post.addRoom(newRoom);
    res.json(newRec);
});

router.get('/room', async (req, res)=>{
    let room = req.headers;
    //function call to decode JWT into payload object goes here
    let newRec = await get.oneRoom(room.id);
    res.json(newRec);
});

router.put('/room', async (req, res)=>{
    let updateRoom = req.headers;
    //function call to decode JWT into payload object goes here
    let updateRec = await put.updateRoom(updateRoom);
    res.json(updateRec);
});

router.delete('/room', async (req, res)=>{
    let delRoom = req.headers;
    //function call to decode JWT into payload object goes here
    let delRec = await del.deleteRoom(delRoom.id);
    res.json(delRec);
});

router.post('/plantinfo', async (req, res)=>{
    let newPlantinfo = req.headers;
    let newRec = await post.addPlantinfo(newPlantinfo);
    res.json(newRec);
});

router.get('/plantinfo', async (req, res)=>{
    let plantinfo = req.headers;
    let newRec = await get.onePlantinfo(plantinfo.id);
    res.json(newRec);
});

router.put('/plantinfo', async (req, res)=>{
    let updatePlantinfo = req.headers;
    let updateRec = await put.updatePlantinfo(updatePlantinfo);
    res.json(updateRec);
});

router.delete('/plantinfo', async (req, res)=>{
    let delPlantinfo = req.headers;
    let delRec = await del.deletePlantinfo(delPlantinfo.id);
    res.json(delRec);
});

router.post('/plant', async (req, res)=>{
    let newPlant = req.headers;
    let newRec = await post.addPlant(newPlant);
    res.json(newRec);
});

router.get('/plant', async (req, res)=>{
    let plant = req.headers;
    let newRec = await get.onePlant(plant.id);
    res.json(newRec);
});

router.put('/plant', async (req, res)=>{
    let updatePlant = req.headers;
    let updateRec = await put.updatePlant(updatePlant);
    res.json(updateRec);
});

router.delete('/plant', async (req, res)=>{
    let delPlant = req.headers;
    let delRec = await del.deletePlant(delPlant.id);
    res.json(delRec);
});

router.post('/post', async (req, res)=>{
    let newPost = req.headers;
    let newRec = await post.addPost(newPost);
    res.json(newRec);
});

router.get('/post', async (req, res)=>{
    let post = req.headers;
    let newRec = await get.onePost(post.id);
    res.json(newRec);
});

router.put('/post', async (req, res)=>{
    let updatePost = req.headers;
    let updateRec = await put.updatePost(updatePost);
    res.json(updateRec);
});

router.delete('/post', async (req, res)=>{
    let delPost = req.headers;
    let delRec = await del.deletePost(delPost.id);
    res.json(delRec);
});

router.post('/comment', async (req, res)=>{
    let newComment = req.headers;
    let newRec = await post.addComment(newComment);
    res.json(newRec);
});

router.get('/comment', async (req, res)=>{
    let comment = req.headers;
    let newRec = await get.oneComment(comment.id);
    res.json(newRec);
});

router.put('/comment', async (req, res)=>{
    let updateComment = req.headers;
    let updateRec = await put.updateComment(updateComment);
    res.json(updateRec);
});

router.delete('/comment', async (req, res)=>{
    let delComment = req.headers;
    let delRec = await del.deleteComment(delComment.id);
    res.json(delRec);
});

router.post('/water', async (req, res)=>{
    let newWater = req.headers;
    let newRec = await post.addWater(newWater);
    res.json(newRec);
});

router.get('/water', async (req, res)=>{
    let Water = req.headers;
    let newRec = await get.oneWater(Water.plantid);
    res.json(newRec);
});

router.delete('/water', async (req, res)=>{
    let delWater = req.headers;
    let delRec = await del.deleteWater(delWater);
    res.json(delRec);
});

router.post('/follow', async (req, res)=>{
    let newFollow = req.headers;
    let newRec = await post.addFollow(newFollow);
    res.json(newRec);
});

router.get('/follow', async (req, res)=>{
    let follow = req.headers;
    let newRec = await get.oneFollow(follow.userid);
    res.json(newRec);
});

router.delete('/follow', async (req, res)=>{
    let delFollow = req.headers;
    let delRec = await del.deleteFollow(delFollow);
    res.json(delRec);
});

router.post('/likes', async (req, res)=>{
    let newLikes = req.headers;
    let newRec = await post.addLikes(newLikes);
    res.json(newRec);
});

router.get('/likes', async (req, res)=>{
    let likes = req.headers;
    let newRec = await get.oneLikes(likes.postid);
    res.json(newRec);
});

router.delete('/likes', async (req, res)=>{
    let delLikes = req.headers;
    let delRec = await del.deleteLikes(delLikes);
    res.json(delRec);
});

module.exports = router;