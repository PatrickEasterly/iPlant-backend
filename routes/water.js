const express = require('express');
const router = express.Router();
const post = require('../models/addquery');
const del = require('../models/deletequery');
const get = require('../models/getquery');

//POST '/app/water'
router.post('/', async (req, res)=>{
    try{
        let newWater = {};
        newWater.plantid = req.body.plantid;
        newWater.userid = req.body.token.userid;
        let plant = await get.onePlant();
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

//GET '/app/water'
router.get('/', async (req, res)=>{
    try{
        let Water = req.body;
        let newRec = await get.oneWater(Water.plantid);
        res.json(newRec);
    }catch(e){
        console.log(e);
        res.json({horse:"shit"})
    }
});

//DEL '/app/water'
router.delete('/', async (req, res)=>{
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

module.exports = router;