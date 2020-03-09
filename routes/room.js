const express = require('express');
const router = express.Router();
const post = require('../models/addquery');
const put = require('../models/updatequery');
const del = require('../models/deletequery');
const get = require('../models/getquery');

// GET '/app/room' 
// Gets ALL rooms for logged in user.
router.get('/', async (req, res)=>{
    try{
        console.log(req.body.token);
        let allRooms = await get.allRoomsByUser(req.body.token.userid);
        return res.json(allRooms);
    } catch(e){
        console.log(e);
        return res.status(404).json({error:"something went wrong"});
    }
});

//POST '/app/room' 
// Adds new room assigned to logged in user. needs {roomname, hightemp, lowtemp, lightamount}.
// uses default values if not all are passed in.
router.post('/', async (req, res)=>{
    try{
        let newRoom = req.body;
        newRoom.userid = req.body.token.userid;
        console.log(newRoom);
        let newRec = await post.addRoom(newRoom);
        if (!newRec.error){
            return res.json(newRec);
        } 
        res.status(404).json(newRec);
    }catch(e){
        console.log(e);
        return res.status(404).json({error:"something went wrong"});
    }
});

// OLD GET '/app/room' that would get 1 room based on req.body.room.id
// router.get('/', async (req, res)=>{
//     try{
//         let room = req.body;
//         let { userid } = req.body.token;
        
//         let newRec = await get.oneRoom(room.id);
//         res.json(newRec);
//     }catch(e){
//         console.log(e);
//         res.json({horse:"shit"})
//     }
// });

//PUT '/app/room'
// modifies existing room (only fields passed as body keys)and sends back modified room object as JSON, if room belongs to logged in user.
// Sends back error JSON if user does not own room, or if integer fields can't be parsed for integers.
router.put('/', async (req, res)=>{
    try{
        let updateRoom = req.body;
        let oldRoom = await get.oneRoom(updateRoom.id);
        if(oldRoom.userid == req.body.token.userid){
            let updateRec = await put.updateRoom(updateRoom);
            console.log(updateRec);    
            if (!updateRec.error){
                return res.json(updateRec);
            } 
            return res.status(404).json(updateRec);
        }
        return res.status(403).json({error:"user not authorized"});
    }catch(e){
        console.log(e);
        return res.status(404).json({error:"something went wrong"});
    }
});

//DELETE '/app/room'
// Deletes room (req.body.id) IF room belongs to logged in user.
// otherwise sends back error JSON.
router.delete('/', async (req, res)=>{
    try{
        let delRoom = req.body.id;
        let oldRoom = await get.oneRoom(delRoom);
        if(oldRoom.userid == req.body.token.userid){
            let delRec = await del.deleteRoom(delRoom);
            if (!delRec.error){
                    return res.json(delRec);
                }
            return res.status(404).json(updateRec);
        }
        return res.status(403).json({'error':"User not authorized to delete room"});
    }catch(e){
        console.log(e);
        return res.status(404).json({error:"something went wrong"});
    }
});

module.exports = router;