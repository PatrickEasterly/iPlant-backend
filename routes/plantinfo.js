const express = require('express');
const router = express.Router();
const {JWTCheck} = require('../models/userquery');
const post = require('../models/addquery');
const put = require('../models/updatequery');
//const del = require('../models/deletequery');
const get = require('../models/getquery');

//GET '/app/plantinfo'
// no login required. takes in body {id:(num)}.
// returns record for that plantinfo.
router.get('/', async (req, res)=>{
    try{
        let newRec = await get.onePlantinfo(req.body.id);
        if(newRec){
            return res.json(newRec);
        }
            return res.status(404).json({error:"plantinfo doesn't exist"});
    }catch(e){
        console.log(e);
        return res.status(404).json({error:"something went wrong"});
    }
});

//DELETE '/app/plantinfo'
// Doesn't do anything. You can't delete plant records via HTTP request.
router.delete('/', async (req, res)=>{
    return res.status(403).json({error:"JK you can't delete plant info records. thats just not OK"});
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

//PUT '/app/plantinfo'
// Doesn't do anything. You can't modify plant records via HTTP request.
router.put('/', async (req, res)=>{
    return res.status(403).json({error:"JK you can't delete plant info records. thats just not OK"});   
    // try{
    //     let updatePlantinfo = req.body;
    //     let updateRec = await put.updatePlantinfo(updatePlantinfo);    
    //         if (!updateRec.error){
    //             return res.json(updateRec);
    //         }
    //         return res.status(404).json(updateRec);
    // }catch(e){
    //     console.log(e);
    //     return res.status(404).json({error:"something went wrong"});
    // }
});

// This is the JWT validation check. Check if token is valid, attach token payload to req.body and call next. if not, return JSON login error.
router.use(JWTCheck);

//POST '/app/plantinfo'
//Must be logged in, but specific user doesn't matter.
// if all required fields are present, writes plant to DB and returns it as JSON object.
// if any fields are missing, error is returned.
router.post('/', async (req, res)=>{
    try{
        let newRec = await post.addPlantinfo(req.body);
        if (!newRec.error){
            return res.json(newRec);
        }
        return res.status(404).json(newRec);
    }catch(e){
        console.log(e);
        return res.status(404).json({error:"something went wrong"});
    }
});

module.exports = router;