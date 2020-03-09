const express = require('express');
const router = express.Router();
const post = require('../models/addquery');
const put = require('../models/updatequery');
const del = require('../models/deletequery');
const get = require('../models/getquery');

router.post('/', async (req, res)=>{
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

router.get('/', async (req, res)=>{
    try{
    let plantinfo = req.body;
    let newRec = await get.onePlantinfo(plantinfo.id);
    res.json(newRec);
    }catch(e){
        console.log(e);
        res.json({horse:"shit"})
    }
});

router.put('/', async (req, res)=>{   
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

router.delete('/', async (req, res)=>{
    return res.status(404).json({error:"JK you can't delete plant info records. thats just not OK"});
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

module.exports = router;