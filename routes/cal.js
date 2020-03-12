const express = require('express');
const moment = require('moment');
const router = express.Router();
const post = require('../models/addquery');
const put = require('../models/updatequery');
const del = require('../models/deletequery');
const get = require('../models/getquery');

//GET '/app/cal'
// returns the next water date for EVERY plant of logged in user.
// {
//     date1(next water date):[plantid,plantid,plantid],
//     date2:[plantid, plantid2],
//     date3:[plantid]
// }

router.get('/', async (req,res)=>{
    try{
        console.log(req.body);
        let user = await get.oneUser(req.body.token.userid);
        let calArr = get.getWaterCal(user);
        return res.json(calArr);
    }catch(e){
        console.log(e);
        return res.status(404).json({error:"something went wrong"});
    }
});

module.exports = router;