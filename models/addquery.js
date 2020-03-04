const db = require('../connection');

// query functions to create records in postgres.

async function addUser(username, firstname, lastname, email, hash){
    await db.none(`insert into users (username, firstname, lastname, email, hash)
    VALUES
    ('${username}','${firstname}','${lastname}','${email}','${hash}');`);
}

async function addRoom(userid, roomname, hightemp, lowtemp, lightamount){
    db.none(`insert into rooms (userid, roomname, hightemp, lowtemp, lightamount)
    VALUES
    ('${userid}','${roomname}','${hightemp}','${lowtemp}','${lightamount}');`);
}

async function addPlantinfo(latinname, commonname, waterneeds, sunlight, lowtemp, soiltype, soilph, about, planttype, photo){
    await db.none(`INSERT INTO plantinfo (latinname, commonname, waterneeds, sunlight, lowtemp, soiltype, soilph, about, planttype, photo) 
    VALUES 
    ('${latinname}', '${commonname}', '${waterneeds}', '${sunlight}', ${lowtemp}, '${soiltype}', '${soilph}', '${about}', '${planttype}', '${photo}')`)
}

async function addPlants(userid, roomid, plantinfoid, plantname){
    db.none(`insert into plants (userid, roomid, plantinfoid, plantname)
    VALUES
    ('${userid}','${roomid}','${plantinfoid}','${plantname}');`);
}

async function addWater(plantid, watertime){
    db.none(`insert into water (plantid, watertime)
    VALUES
    ('${plantid}','${watertime}');`);
}

async function addFollow(userid, follows){
    db.none(`insert into follow (userid, follows)
    VALUES
    ('${userid}','${follows}');`);
}

async function addPosts(userid, plantid, postdate, photo, caption){
    db.none(`insert into posts (userid, plantid, postdate, photo, caption)
    VALUES
    ('${userid}','${plantid}','${postdate}','${photo}', '${caption});`);
}

async function addComments(userid, postid, commentdate, comment){
    db.none(`insert into comments (userid, postid, commentdate, comment)
    VALUES
    ('${userid}','${postid}','${commentdate}','${comment}');`);
}

async function addLikes(postid, userid){
    db.none(`insert into likes (postid, userid)
    VALUES
    ('${postid}','${userid}');`);
}

module.exports = {
    addUser,
    addRoom,
    addPlantinfo,
    addPlants,
    addWater,
    addFollow,
    addPosts,
    addComments,
    addLikes
}