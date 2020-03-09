const db = require('../connection');

// query functions to create records in postgres.

async function addUser({username, firstname="John", lastname="Doe", email, hash}){
    try{
        let newRec = await db.one(`insert into users (username, firstname, lastname, email, hash)
        VALUES
        ('${username}','${firstname}','${lastname}','${email}','${hash}') RETURNING *;`);
        console.log(newRec);
        return newRec;
    } catch(e){
        console.log(e);
        if (e.detail.includes("exists")){
            if (e.detail.includes("username")){
                return ({error:"Username already exists."});
            }
            if (e.detail.includes("email")){
                return ({error:"email address already exists."});
            }
        }
    }
}

async function addRoom({userid, roomname = "default name", hightemp=77, lowtemp=66, lightamount="full"}){
    try{
        let newRec = await db.one(`insert into rooms (userid, roomname, hightemp, lowtemp, lightamount)
        VALUES
        ('${userid}','${roomname}',${parseInt(hightemp)},${parseInt(lowtemp)},'${lightamount}') RETURNING *;`);
        return newRec;
    } catch(e){
        console.log(e);
        if(e.detail){
            if (e.detail.includes("present")){
                if (e.detail.includes("users")){
                    return ({error:"assigned user doesn't exist."});
                }
            }
        }
        return ({error:"something went wrong"});
    }
}

async function addPlantinfo({latinname, commonname, waterneeds, sunlight, lowtemp, soiltype, soilph, about, planttype, photo}){
    try{
        let newRec = await db.one(`INSERT INTO plantinfo (latinname, commonname, waterneeds, sunlight, lowtemp, soiltype, soilph, about, planttype, photo) 
        VALUES 
        ('${latinname}', '${commonname}', '${waterneeds}', '${sunlight}', ${parseInt(lowtemp)}, '${soiltype}', '${soilph}', '${about}', '${planttype}', '${photo}') RETURNING *;`);
        return newRec;
    } catch(e){
        console.log(e);
        return ({error:"something went wrong"});
    }        
}

async function addPlant({userid, roomid, plantinfoid, plantname}){
    try{
        let room = await db.one(`SELECT userid FROM rooms WHERE id=${roomid}`);
        if(userid == room.userid){
            let newRec = await db.one(`insert into plants (userid, roomid, plantinfoid, plantname)
            VALUES
            (${parseInt(userid)},${parseInt(roomid)},${parseInt(plantinfoid)},'${plantname}') RETURNING *;`);
            return newRec;
        }
        return ({'error': "room does not belong to user."});
    } catch(e){
        console.log(e);
        if(e.detail){
            if (e.detail.includes("present")){
                if (e.detail.includes("users")){
                    return ({error:"assigned user doesn't exist."});
                }
                if (e.detail.includes("room")){
                    return ({error:"assigned room doesn't exist."});
                }
                if (e.detail.includes("plantinfo")){
                    return ({error:"assigned plantinfo doesn't exist."});
                }
            }
        }
        return ({error:"something went wrong"});
    }
}

async function addWater({plantid, userid}){
    try{
        watertime = new Date;
        console.log(water);
        let newRec = await db.one(`insert into water (plantid, userid, watertime)
        VALUES
        ('${plantid}', ${userid} ,'${watertime}') RETURNING *;`);
        return newRec;
    } catch(e){
        console.log(e);
        if (e.detail.includes("present")){
            if (e.detail.includes("plant")){
                return ({error:"assigned plant doesn't exist."});
            }
        }
        return ({error:"something went wrong"});
    }
}

async function addFollow({userid, follows}){
    try{
        let newRec = await db.one(`insert into follow (userid, follows)
        VALUES
        ('${userid}','${follows}');`);
        return newRec;
    } catch(e){
        console.log(e);
        if (e.detail.includes("present")){
            if (e.detail.includes("users")){
                return ({error:"assigned user doesn't exist."});
            }
        }
        return ({error:"something went wrong"});
    }
}

async function addPost({userid, plantid, postdate, photo, caption}){
    try{
        let newRec = await db.one(`insert into posts (userid, plantid, postdate, photo, caption)
        VALUES
        ('${userid}','${plantid}','${postdate}','${photo}', '${caption}) RETURNING *;`);
        return newRec;
    } catch(e){
        console.log(e);
        if (e.detail.includes("present")){
            if (e.detail.includes("users")){
                return ({error:"assigned user doesn't exist."});
            }
            if (e.detail.includes("plant")){
                return ({error:"assigned plant doesn't exist."});
            }
        }
        return ({error:"something went wrong"});
    }
}

async function addComment({userid, postid, commentdate, comment}){
    try{
        let newRec = await db.one(`insert into comments (userid, postid, commentdate, comment)
        VALUES
        ('${userid}','${postid}','${commentdate}','${comment}') RETURNING *;`);
        return newRec;
    } catch(e){
        console.log(e);
        if (e.detail.includes("present")){
            if (e.detail.includes("users")){
                return ({error:"assigned user doesn't exist."});
            }
            if (e.detail.includes("post")){
                return ({error:"assigned post doesn't exist."});
            }
        }
        return ({error:"something went wrong"});
    }
}

async function addLike({postid, userid}){
    try{
        let newRec = await db.one(`insert into likes (postid, userid)
        VALUES
        ('${postid}','${userid}') RETURNING *;`);
        return newRec;
    } catch(e){
        console.log(e);
        if (e.detail.includes("present")){
            if (e.detail.includes("post")){
                return ({error:"assigned post doesn't exist."});
            }
            if (e.detail.includes("users")){
                return ({error:"assigned user doesn't exist."});
            }
        }
        return ({error:"something went wrong"});
    }
}

module.exports = {
    addUser,
    addRoom,
    addPlantinfo,
    addPlant,
    addWater,
    addFollow,
    addPost,
    addComment,
    addLike
}