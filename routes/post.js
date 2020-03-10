const express = require('express');
const router = express.Router();
const post = require('../models/addquery');
const put = require('../models/updatequery');
const del = require('../models/deletequery');
const get = require('../models/getquery');

router.post('/', async (req, res)=>{
    try{
        let newPost = {...req.body};
        newPost.userid = req.body.token.userid;
        let newRec = await post.addPost(newPost);
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
        let postid = req.body.id;
        let newRec = await get.onePost(postid);
        res.json(newRec);
    }catch(e){
        console.log(e);
        res.json({horse:"shit"})
    }
});

router.put('/', async (req, res)=>{
    try{
        let updatePost = {...req.body};
        updatePost.userid = req.body.token.userid;
        let post = await get.onePost(updatePost.id);
        if (updatePost.userid == post.userid){
            let updateRec = await put.updatePost(updatePost);    
            if (!updateRec.error){
                return res.json(updateRec);
            }
            res.status(404).json(updateRec);
        }
        return res.status(403).json({"error":"post doesn't belong to user"});
    }catch(e){
        console.log(e);
        res.json({horse:"shit"})
    }
});

router.delete('/', async (req, res)=>{
    try{
        let delPost = {...req.body};
        let post = await get.onePost(updatePost.id);
        if (req.body.token.userid == post.userid){
            let delRec = await del.deletePost(delPost.id);
            if (!delRec.error){
                return res.json(delRec);
            }
            return res.status(404).json(updateRec);
        }
        return res.status(403).json({"error":"post doesn't belong to user"});
    }catch(e){
        console.log(e);
        res.json({horse:"shit"})
    }
});

module.exports = router;