const express = require('express');
const router = express.Router();
const post = require('../models/addquery');
const put = require('../models/updatequery');
const del = require('../models/deletequery');
const get = require('../models/getquery');

//GET '/app/plant/room'
// Must be logged in via JWT. Must pass {roomid:(num)} in body.
// Checks if room belongs to logged in user, selects all plants in that room.
// returns object with error key if something isn't right.
// Returns object with 2 keys. {room:(room object), "plants:(array of all plants in room)"}
router.get('/room/', async (req, res)=>{
    try{
        let {userid} = req.body.token;
        let {roomid} = req.body;
        let room = await get.oneRoom(roomid);
        if(room.userid == userid){
            let allPlants = await get.allPlantsByRoom(roomid);
            return res.json({room,'plants':allPlants});
        }
        return res.status(403).json({'error':"logged in user does not have access to this room"});
    } catch(e){
        console.log(e);
        return res.status(404).json({error:"something went wrong"});
    }
});

//POST '/app/plant/addsensor'
// Must be logged in via JWT. Must pass {id:(num)} in body.
// Removes sensor from previous plant and adds sensor to plant sent as ID.
router.post('/addsensor', async (req, res) =>{
    try{
        if(req.body.id){
            plantid = req.body.id;
        } else if(req.body.plantid){
            plantid = req.body.plantid;
        } else {
            return res.status(404).json({error:"invalid ID"});
        }
        console.log("before the plant call");
        let plant = await post.addSensor(plantid);
        console.log("after the plant call");
        if(!plant.error){
            return res.json(plant);
        }
        return res.status(403).json(plant);
    } catch(e){
        console.log(e);
        return res.status(404).json({error:"something went wrong"});
    }
});

//POST '/app/plant' 
// Must be logged in via JWT. takes in body {roomid:(int), plantinfoid:(int), plantname:(string)} userid from JWT.
// checks to see if room for plant belongs to logged in user.
// if userid != room.userid returns JSON error object.
// if not all required fields are passed, returns JSON error object.
// returns object for newly created plant.
router.post('/', async (req, res)=>{
    try{
    let newPlant = {...req.body};
    newPlant.userid = req.body.token.userid;
    console.table(newPlant);
    let newRec = await post.addPlant(newPlant);
    if (!newRec.error){
        return res.json(newRec);
    }
    return res.status(403).json(newRec);
    }catch(e){
        console.log(e);
        return res.status(404).json({error:"something went wrong"});
    }
});

//GET '/app/plant'
// Must be logged in via JWT. takes in body {id:(num)}. userid from JWT.
// if logged in user does not own plant, returns JSON error object.
// returns verbose plant info, including room and plantinfo, and all watering events.
router.get('/', async (req, res)=>{
    try{
    let plant = {...req.body};
    let newRec = await get.onePlant(plant.id);
    if(req.body.token.userid == newRec.userid){
        return res.json(newRec);
    }
    return res.status(403).json({error:"user does not have access to this plant"});
    }catch(e){
        console.log(e);
        return res.status(404).json({error:"something went wrong"});
    }
});

//PUT '/app/plant'
// must be logged in via JWT. takes in at least 1 key in body {userid:(num), roomid:(num), plantinfoid:(num), plantname:(string)}
// if user does not own new room, returns JSON error object.
// if update is success, returns whole object of modified plant.
router.put('/', async (req, res)=>{
    try{
        let updatePlant = {...req.body};
        let {userid} = req.body.token;
        let plant = await get.onePlantSimple(updatePlant.id);
        if(plant){
            if(plant.userid == userid){
                let updateRec = await put.updatePlant(updatePlant);    
                if (!updateRec.error){
                    return res.json(updateRec);
                }
                return res.status(404).json(updateRec);
            }
            return res.status(403).json({error:'Plant does not belong to user'});
        }
        return res.status(403).json({error:"plant does not exist."});
    }catch(e){
        console.log(e);
        return res.status(404).json({error:"something went wrong"});
    }
});

//DELETE '/app/plant'
// must be logged in via JWT. takes in body {id:(num)}. userid from JWT.
// if logged in user does not own plant, returns JSON error object.
// deletes plant, returns deleted plant as JSON object.
router.delete('/', async (req, res)=>{
    try{
        let delPlant = req.body.id;
        let plant = await get.onePlantSimple(delPlant);
        if(plant){
            if(plant.userid == req.body.token.userid){
                let delRec = await del.deletePlant(delPlant);
                if (!delRec.error){
                        return res.json(delRec);
                    }
                return res.status(404).json(updateRec);
            }
            return res.status(403).json({error:'Plant does not belong to user'});
        }
        return res.status(403).json({error:"plant does not exist."});
    }catch(e){
        console.log(e);
        return res.status(404).json({error:"something went wrong"});
    }
});

module.exports = router;