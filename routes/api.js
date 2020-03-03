const express = require('express');
const router = express.Router();
const db = require('../connection');
const api = require('../models/apiquery');
const cors = require('cors');

router.use(cors());

router.get('/users', async (req, res)=>{
    let allUsers = await api.allUsers();
    res.json(allUsers);
});

router.get('/users/:id', async (req, res)=>{
    let {id} = req.params;
    let oneUser = await api.oneUser(id);
    res.json(oneUser);
});

router.get('/rooms', async (req, res)=>{
    let allRooms = await api.allRooms();
    res.json(allRooms);
});

router.get('/rooms/:id', async (req, res)=>{
    let {id} = req.params;
    let oneRoom = await api.oneRoom(id);
    res.json(oneRoom);
});

router.get('/plantinfo', async (req, res)=>{
    let allPlants = await api.allPlantinfo();
    res.json(allPlants);
});

router.get('/plantinfo/:id', async (req, res)=>{
    let {id} = req.params;
    let onePlant = await api.onePlantinfo(id);
    res.json(onePlant);
});

router.get('/plants', async (req, res)=>{
    let allPlants = await api.allPlants();
    res.json(allPlants);
});

router.get('/plants/:id', async (req, res)=>{
    let {id} = req.params;
    let onePlant = await api.onePlant(id);
    res.json(onePlant);
});

router.get('/water', async (req, res)=>{
    let allWater = await api.allWaters();
    res.json(allWater);
});

router.get('/water/:id', async (req, res)=>{
    let {id} = req.params;
    let oneWater = await api.oneWater(id);
    res.json(oneWater);
});

router.get('/follow', async (req, res)=>{
    let allFollows = await api.allFollows();
    res.json(allFollows);
});

router.get('/follow/:id', async (req, res)=>{
    let {id} = req.params;
    let oneFollows = await api.oneFollow(id);
    res.json(oneFollows);
});

router.get('/posts', async (req, res)=>{
    let allPosts = await api.allPosts();
    res.json(allPosts);
});

router.get('/posts/:id', async (req, res)=>{
    let {id} = req.params;
    let onePost = await api.onePost(id);
    res.json(onePost);
});

router.get('/comments', async (req, res)=>{
    let allPlants = await api.allComments();
    res.json(allPlants);
});

router.get('/comments/:id', async (req, res)=>{
    let {id} = req.params;
    let onePlants = await api.oneComment(id);
    res.json(onePlants);
});

router.get('/likes', async (req, res)=>{
    let allLikes = await api.allLikes();
    res.json(allLikes);
});

router.get('/likes/:id', async (req, res)=>{
    let {id} = req.params;
    let oneLike = await api.oneLike(id);
    res.json(oneLike);
});

router.get('/*',(req, res) =>{
    res.json({"api":"SUCCESS!!!"})
})
module.exports = router;