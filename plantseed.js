let plants = require('./plant_info');

function entrybuilder(num){
    let recordNum = num.toString();
    let newRecord = {};
    newRecord.latinname = plants[recordNum]["Scientific_Name"];
    newRecord.commonname = plants[recordNum]["Common_Name"];
    newRecord.waterneeds = plants[recordNum]["Water_Use"];
    newRecord.sunlight = plants[recordNum]["Exposure"];
    newRecord.lowtemp = plants[recordNum]["Hardiness_Rating"];
    newRecord.soiltype = plants[recordNum]["Soil/Growing_Medium"];
    newRecord.soilph = newRecord.soiltype.split(',')[0];
    newRecord.soiltype = newRecord.soiltype.split(',')[1].split(' or ');
    newRecord.about = plants[recordNum]["Scientific_Name"];
    newRecord.planttype = plants[recordNum]["Plant_Type"];
    newRecord.photo = plants[recordNum]["images_list"][0];
    return newRecord;

}
function dbInsert(record){
    console.log(record);
}
// console.log(entrybuilder(1));

function main(){
    for(let x=1; x<=2;x++){
        let newRec = entrybuilder(x);
        dbInsert(newRec);
    }
}

main();