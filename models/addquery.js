const db = require('../connection');

// query functions to create records in postgres.

async function addUser(username, firstname, lastname, email, hash){
    let newRec = await db.one(`insert into users (username, firstname, lastname, email, hash)
    VALUES
    ('${username}','${firstname}','${lastname}','${email}','${hash}') RETURNING *;`);
    return newRec;
}

async function addRoom(userid, roomname, hightemp, lowtemp, lightamount){
    let newRec = await db.one(`insert into rooms (userid, roomname, hightemp, lowtemp, lightamount)
    VALUES
    ('${userid}','${roomname}','${hightemp}','${lowtemp}','${lightamount}') RETURNING *;`);
    return newRec;
}

async function addPlantinfo(latinname, commonname, waterneeds, sunlight, lowtemp, soiltype, soilph, about, planttype, photo){
    let newRec = await db.one(`INSERT INTO plantinfo (latinname, commonname, waterneeds, sunlight, lowtemp, soiltype, soilph, about, planttype, photo) 
    VALUES 
    ('${latinname}', '${commonname}', '${waterneeds}', '${sunlight}', ${lowtemp}, '${soiltype}', '${soilph}', '${about}', '${planttype}', '${photo}') RETURNING *;`);
    return newRec;
}

async function addPlants(userid, roomid, plantinfoid, plantname){
    let newRec = await db.one(`insert into plants (userid, roomid, plantinfoid, plantname)
    VALUES
    ('${userid}','${roomid}','${plantinfoid}','${plantname}') RETURNING *;`);
    return newRec;
}

async function addWater(plantid, watertime){
    let newRec = await db.one(`insert into water (plantid, watertime)
    VALUES
    ('${plantid}','${watertime}') RETURNING *;`);
    return newRec;
}

async function addFollow(userid, follows){
    let newRec = await db.one(`insert into follow (userid, follows)
    VALUES
    ('${userid}','${follows}');`);
}

async function addPosts(userid, plantid, postdate, photo, caption){
    let newRec = await db.one(`insert into posts (userid, plantid, postdate, photo, caption)
    VALUES
    ('${userid}','${plantid}','${postdate}','${photo}', '${caption}) RETURNING *;`);
    return newRec;
}

async function addComments(userid, postid, commentdate, comment){
    let newRec = await db.one(`insert into comments (userid, postid, commentdate, comment)
    VALUES
    ('${userid}','${postid}','${commentdate}','${comment}') RETURNING *;`);
    return newRec;
}

async function addLikes(postid, userid){
    let newRec = await db.one(`insert into likes (postid, userid)
    VALUES
    ('${postid}','${userid}') RETURNING *;`);
    return newRec;
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