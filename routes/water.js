const express = require('express');
const router = express.Router();
const post = require('../models/addquery');
const del = require('../models/deletequery');
const get = require('../models/getquery');

//POST '/app/water'
// must be logged in via JWT. takes in body {plantid:(num)}. userid from JWT.
// checks that plant belongs to user, then creates new water event in water table.
// returns water event as JSON Object. watertime is a date object. 
router.post('/', async (req, res)=>{
    try{
        console.log("beginning of POST water");
        let newWater = {};
        newWater.plantid = req.body.plantid;
        newWater.userid = req.body.token.userid;
        console.table(newWater);
        let plant = await get.onePlantSimple(newWater.plantid);
        if(plant){
            if (plant.userid == newWater.userid){
                let newRec = await post.addWater(newWater);
                if (!newRec.error){
                    return res.json(newRec);
                }
                return res.status(404).json(newRec);
            }
            return res.status(403).json({error:"plant does not belong to user."});
        }
        return res.status(403).json({error:"plant does not exist."});
    }catch(e){
        console.log(e);
        return res.status(404).json({error:"something went wrong"});
    }
});

//GET '/app/water'
// must be logged in via JWT. takes in body {plantid:(num)}. userid from JWT.
// checks that plant belongs to user, then selects all water events for that plant.
// returns an array of water event objects.
router.get('/', async (req, res)=>{
    try{
        let {plantid} = req.body;
        let plant = await get.onePlantSimple(plantid);
        if(plant){
            if (plant.userid == req.body.token.userid){
                let newRec = await get.oneWater(plantid);
                return res.json(newRec);
            }
            return res.status(403).json({error:"plant does not belong to user."});
    }
    return res.status(403).json({error:"plant does not exist."});
    }catch(e){
        console.log(e);
        return res.status(404).json({error:"something went wrong"});
    }
});

//DEL '/app/water'
// must be logged in via JWT. takes in body {id:(num)}. userid from JWT.
// checks that water event exists, and that it belongs to user.
// Deletes water event, and returns it as JSON object.
router.delete('/', async (req, res)=>{
    try{
        let water = await get.oneWaterSimple(req.body.id);
        
        if(water){
            if (water.userid == req.body.token.userid){
                let delRec = await del.deleteWater(req.body.id);    
                if (!delRec.error){
                    return res.json(delRec);
                }
                return res.status(404).json(delRec);
            }
            return res.status(403).json({error:"plant does not belong to user."});
        }
        return res.status(403).json({error:"Water event doesn't exist"});
    }catch(e){
        console.log(e);
        return res.status(404).json({error:"something went wrong"});
    }
});

module.exports = router;