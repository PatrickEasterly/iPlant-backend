const express = require('express');
const router = express.Router();
const db = require('../connection');
const api = require('../models/apiquery');

router.get('/plantinfo', async (req, res)=>{
    let allPlants = await api.allPlantinfo();
    res.json(allPlants);
});

router.get('/plantinfo/:id', async (req, res)=>{
    let {id} = req.params;
    let onePlants = await api.onePlantinfo(id);
    res.json(onePlants);
})


router.get('/*',(req, res) =>{
    res.json({"api":"SUCCESS!!!"})
})
module.exports = router;