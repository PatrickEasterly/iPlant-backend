const express = require('express');
const router = express.Router();
const post = require('../models/addquery');
const put = require('../models/updatequery');
const del = require('../models/deletequery');
const get = require('../models/getquery');
const {JWTCheck} = require('../models/userquery');
const userRouter = require('./user');
const roomRouter = require('./room');
const plantinfoRouter = require('./plantinfo');

router.use('/user', userRouter);

// This is the JWT validation check. Check if token is valid, attach token payload to req.body and call next. if not, return JSON login error.
router.use(JWTCheck);

router.use('/room', roomRouter);
router.use('/plantinfo', plantinfoRouter);

router.get('/plant/room/', async (req, res)=>{
    let {plantId} = req.body;
    let allPlants = await get.allPlantsByRoom(plantId);
    res.json(allPlants);
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