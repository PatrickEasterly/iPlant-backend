const express = require('express');
const router = express.Router();
const post = require('../models/addquery');
const put = require('../models/updatequery');
const del = require('../models/deletequery');
const get = require('../models/getquery');

router.post('/', async (req, res)=>{
    try{
        let newComment = {...req.body};
        newComment.userid = req.body.token.userid;
        let newRec = await post.addComment(newComment);
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
        let comment = req.body.id;
        let newRec = await get.oneComment(comment);
        res.json(newRec);
    }catch(e){
        console.log(e);
        res.json({horse:"shit"})
    }
});

router.put('/', async (req, res)=>{
    try{
        let updateComment = {...req.body};
        updateComment.userid = req.body.token.userid;
        let comment = get.oneComment(updateComment.id);
        if(comment.userid == updateComment.userid){
            let updateRec = await put.updateComment(updateComment);    
            if (!updateRec.error){
                return res.json(updateRec);    
            }
            return res.status(404).json(updateRec);
        }
        return res.status(403).json({"error":"comment doesn't belong to user"});
    }catch(e){
        console.log(e);
        res.json({horse:"shit"})
    }
});

router.delete('/', async (req, res)=>{
    try{
        let delComment = req.body.id;
        let comment = get.oneComment(delComment);
        if(comment.userid == req.body.token.userid){
            let delRec = await del.deleteComment(delComment);
            if (!delRec.error){
                return res.json(delRec);
            }
            return res.status(404).json(updateRec);
        }
        return res.status(403).json({"error":"comment doesn't belong to user"});
    }catch(e){
        console.log(e);
        res.json({horse:"shit"})
    }
});

module.exports = router;