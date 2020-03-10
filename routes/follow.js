const express = require('express');
const router = express.Router();
const post = require('../models/addquery');
const put = require('../models/updatequery');
const del = require('../models/deletequery');
const get = require('../models/getquery');

router.post('/', async (req, res)=>{
    try{
        let newFollow = {userid:req.body.token.userid,follows:req.body.follows};
        let newRec = await post.addFollow(newFollow);
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
        let newRec = await get.oneFollow(req.body.token.userid);
        res.json(newRec);
    }catch(e){
        console.log(e);
        res.json({horse:"shit"})
    }
});

router.delete('/', async (req, res)=>{
    try{
        let delFollow = {userid:req.body.token.userid,follows:req.body.follows};
        let delRec = await del.deleteFollow(delFollow);
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