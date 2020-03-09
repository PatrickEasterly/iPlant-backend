const express = require('express');
const router = express.Router();
const post = require('../models/addquery');
const put = require('../models/updatequery');
const del = require('../models/deletequery');
const get = require('../models/getquery');

router.get('/room/user/', async (req, res)=>{
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

module.exports = router;