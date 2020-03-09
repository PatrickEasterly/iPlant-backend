const express = require('express');
const router = express.Router();
const post = require('../models/addquery');
const put = require('../models/updatequery');
const del = require('../models/deletequery');
const get = require('../models/getquery');

router.post('/', async (req, res)=>{
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