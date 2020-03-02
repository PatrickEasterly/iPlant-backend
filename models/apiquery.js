const db = require('../connection');

async function onePlantinfo(id){
    let onePlant = await db.oneOrNone(`SELECT * FROM plantinfo WHERE id=${id}`);
    return onePlant;
}

async function allPlantinfo(id){
    let allPlants = await db.any(`SELECT id, latinname, commonname FROM plantinfo`);
    return allPlants;

}

module.exports = {
    onePlantinfo,
    allPlantinfo
}