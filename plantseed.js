let plants = require('./plant_info');
const db = require('./connection');

// Series of functions to rip data from JSON object and format it for our DB. 
// Should be pretty easily customizable to fit other DBs into our format, 
// especially fields that need to be translated into mathematically objective data further down the line.

function lowTemp(hardiness){
    if (hardiness.toLowerCase().includes("zone 1 ")){
        return (Math.ceil(-46 * (9/5) + 32));
    }
    if (hardiness.toLowerCase().includes("zone 2")){
        return (Math.ceil(-40 * (9/5) + 32));
    }
    if (hardiness.toLowerCase().includes("zone 3")){
        return (Math.ceil(-34 * (9/5) + 32));
    }
    if (hardiness.toLowerCase().includes("zone 4")){
        return (Math.ceil(-29 * (9/5) + 32));
    }
    if (hardiness.toLowerCase().includes("zone 5")){
        return (Math.ceil(-23 * (9/5) + 32));
    }
    if (hardiness.toLowerCase().includes("zone 6")){
        return (Math.ceil(-18 * (9/5) + 32));
    }
    if (hardiness.toLowerCase().includes("zone 7")){
        return (Math.ceil(-12 * (9/5) + 32));
    }
    if (hardiness.toLowerCase().includes("zone 8")){
        return (Math.ceil(-7 * (9/5) + 32));
    }
    if (hardiness.toLowerCase().includes("zone 9")){
        return (Math.ceil(-1 * (9/5) + 32));
    }
    if (hardiness.toLowerCase().includes("zone 10")){
        return (Math.ceil(4 * (9/5) + 32));
    }
    if (hardiness.toLowerCase().includes("zone 11")){
        return (Math.ceil(5 * (9/5) + 32));
    }
}

function water(waterString){
//Summer Dry, Winter Dry, Low, Moderate, High, Wetlands, Aquatic
    let newArr = [];
    if (waterString.toLowerCase().includes("summer")){
        newArr.push("summer dry");
    }
    if (waterString.toLowerCase().includes("winter")){
        newArr.push("winter dry");
    }
    if (waterString.toLowerCase().includes("low")){
        newArr.push("low");
    }
    if (waterString.toLowerCase().includes("moderate")){
        newArr.push("moderate");
    }
    if (waterString.toLowerCase().includes("high")){
        newArr.push("high");
    }
    if (waterString.toLowerCase().includes("wetlands")){
        newArr.push("wetlands");
    }
    if (waterString.toLowerCase().includes("aquatic")){
        newArr.push("aquatic");
    }    
    return newArr.join(', ');
}

function sun(sunstring){
    //Deep shade, Filtered Shade, Part Sun/Part Shade, Full Sun, Sheltered
    let newArr = [];
    if (sunstring.toLowerCase().includes("full")){
        newArr.push("full");
    }
    if (sunstring.toLowerCase().includes("part")){
            newArr.push("part");
    }
    if (sunstring.toLowerCase().includes("filter")){
        newArr.push("some");
    }
    if (sunstring.toLowerCase().includes("deep")){
        newArr.push("shade");
    }
    return newArr.join(', ');
}

function soiltype(soilstring){
    // "rocky", "gravely" "dry", "bog", "well drained", "humus"
    let typeArr = [];
    let phArr = [];
    if (soilstring.toLowerCase().includes("rocky")){
        typeArr.push("coarse");
    }
    if (soilstring.toLowerCase().includes("humus")){
        typeArr.push("humus");
    }
    if (soilstring.toLowerCase().includes("bog")){
        typeArr.push("bog");
    }
    if (soilstring.toLowerCase().includes("drained")){
        typeArr.push("drained");
    }
    if (soilstring.toLowerCase().includes("acidic")){
        phArr.push("acidic");
    }
    if (soilstring.toLowerCase().includes("alkaline")){
            phArr.push("alkaline");
    }
    if (!phArr[0]){
        phArr.push("neutral");
    }
    let phString = phArr.join(', ');
    let typeString =typeArr.join(',' );
    return [typeString, phString];
}

// Placeholder, will crawl wikipedia with scientific name to pull about paragraphs.
function findabout(sciname){
    return sciname;
}

function entrybuilder(num){
    let recordNum = num.toString();
    let newRecord = {};

    if(plants[recordNum]["Scientific_Name"]){

        newRecord.latinname = plants[recordNum]["Scientific_Name"];
        newRecord.about = findabout(plants[recordNum]["Scientific_Name"]);
    } else {
        return false;
    }
    if(plants[recordNum]["Common_Name"]){
        newRecord.commonname = plants[recordNum]["Common_Name"];
    }else{
        newRecord.commonname = plants[recordNum]["Scientific_Name"];
    }
    if (plants[recordNum]["Water_Use"]){
        newRecord.waterneeds = water(plants[recordNum]["Water_Use"]);
    } else {
        newRecord.waterneeds = "moderate";
    }
    if(plants[recordNum]["Exposure"]){
        newRecord.sunlight = sun(plants[recordNum]["Exposure"]);
    } else {
        newRecord.sunlight = "part";
    }
    if(plants[recordNum]["Hardiness_Rating"]){
        newRecord.lowtemp = lowTemp(plants[recordNum]["Hardiness_Rating"]);
    } else {
        newRecord.lowtemp = (Math.ceil(5 * (9/5) + 32));
    }
    if (plants[recordNum]["Soil/Growing_Medium"]){
        [newRecord.soiltype, newRecord.soilph] = soiltype(plants[recordNum]["Soil/Growing_Medium"]);
    } else {
        newRecord.soiltype = "coarse";
        newRecord.soilph = "neutral";
    }
    if(plants[recordNum]["Plant_Type"]){
        newRecord.planttype = plants[recordNum]["Plant_Type"];
    } else {
        newRecord.planttype = "plant";
    }
    if (plants[recordNum]["images_list"]){
        newRecord.photo = plants[recordNum]["images_list"][0];
        let bigphoto = newRecord.photo.split('/t').join('/');
        newRecord.bigphoto = bigphoto;
    }
    return newRecord;
}

async function dbInsert(record){
    console.log(record);
    await db.none(`INSERT INTO plantinfo (latinname, commonname, waterneeds, sunlight, lowtemp, soiltype, soilph, about, planttype, photo, bigphoto) VALUES ('${record.latinname}', '${record.commonname}', '${record.waterneeds}', '${record.sunlight}', ${record.lowtemp}, '${record.soiltype}', '${record.soilph}', '${record.about}', '${record.planttype}', '${record.photo}','${record.bigphoto}')`)
    .then()
    .catch(error => {
        console.log(record.latinname);
        console.log('ERROR:', error); // print error;
    });
}


// runs main loop for each entry in JSON object. set objLen low while testing, change to highest ID number to run fully.
function main(){
    let objLen = 1793;
    for(let x=1; x<=objLen;x++){
        let newRec = entrybuilder(x);
        if (newRec){
            dbInsert(newRec);
        }
    }
}

// fire ze missiles.
main();