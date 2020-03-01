const express = require('express');
const router = express.Router();
const db = require('../connection');

router.get('/plantinfo', async (req, res)=>{
    let allPlants = await db.any(`SELECT id, latinname, commonname FROM plantinfo`);
    res.json(allPlants);
});

router.get('/plantinfo/:id', async (req, res)=>{
    let {id} = req.params;
    let allPlants = await db.any(`SELECT * FROM plantinfo WHERE id=${id}`);
    res.json(allPlants);
})


router.get('/*',(req, res) =>{
    res.json({"api":"SUCCESS!!!"})
})
module.exports = router;