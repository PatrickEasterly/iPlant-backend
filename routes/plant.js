const express = require('express');
const router = express.Router();
const post = require('../models/addquery');
const put = require('../models/updatequery');
const del = require('../models/deletequery');
const get = require('../models/getquery');

router.get('/room/', async (req, res)=>{
    let {plantId} = req.body;
    let allPlants = await get.allPlantsByRoom(plantId);
    res.json(allPlants);
});

router.post('/', async (req, res)=>{
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

router.get('/', async (req, res)=>{
    try{
    let plant = req.body;
    let newRec = await get.onePlant(plant.id);
    res.json(newRec);
    }catch(e){
        console.log(e);
        res.json({horse:"shit"})
    }
});

router.put('/', async (req, res)=>{
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

router.delete('/', async (req, res)=>{
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

module.exports = router;