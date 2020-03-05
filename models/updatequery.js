const db = require("../connection");


//updateUser takes in an object with a ID and all fields needing updating.
// builds a postgres call as a string, only including the fields passed in the object.
async function updateUser(userObj){
    try{
        if(userObj.id){
            let updateString = 'update users set';
            if (userObj.username){
                updateString += ` username='${userObj.username}',`;
            }
            if (userObj.firstname){
                updateString += ` firstname='${userObj.firstname}',`;
            }
            if (userObj.lastname){
                updateString += ` lastname='${userObj.lastname}',`;
            }
            if (userObj.email){
                updateString += ` email='${userObj.email}',`;
            }
            if (userObj.hash){
                updateString += ` hash='${userObj.hash}',`;
            }
            updateString = updateString.slice(0, -1);
            updateString += ` where id = ${userObj.id} RETURNING *`;
            console.log(updateString);
            let updated = await db.oneOrNone(updateString);
            return updated;
        }
        return {error : "invalid id"};
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

async function updateRoom(roomObj){
    try{
        if(roomObj.id){
            let updateString = 'update rooms set';
            if (roomObj.userid){
                updateString += ` userid='${roomObj.userid}',`;
            }
            if (roomObj.roomname){
                updateString += ` roomname='${roomObj.roomname}',`;
            }
            if (roomObj.hightemp){
                updateString += ` hightemp=${roomObj.hightemp},`;
            }
            if (roomObj.lowtemp){
                updateString += ` lowtemp=${roomObj.lowtemp},`;
            }
            if (roomObj.lightamount){
                updateString += ` lightamount='${roomObj.lightamount}',`;
            }
            updateString = updateString.slice(0, -1);
            updateString += ` where id=${roomObj.id} RETURNING *`;
            let updated = await db.one(updateString);
            return updated;
        }
        return {error : "invalid id"};
    } catch(e){
        console.log(e);
        if (e.detail.includes("present")){
            if (e.detail.includes("users")){
                return ({error:"new assigned user doesn't exist."});
            }
        }
        return ({error:"something went wrong"});
    }
}

async function updatePlantinfo(plantinfoObj){
    try{
        if(plantinfoObj.id){
            let updateString = 'update plantinfo set';
            if (plantinfoObj.latinname){
                updateString += ` latinname='${plantinfoObj.latinname}',`;
            }
            if (plantinfoObj.commonname){
                updateString += ` commonname='${plantinfoObj.commonname}',`;
            }
            if (plantinfoObj.waterneeds){
                updateString += ` waterneeds='${plantinfoObj.waterneeds}',`;
            }
            if (plantinfoObj.sunlight){
                updateString += ` sunlight='${plantinfoObj.sunlight}',`;
            }
            if (plantinfoObj.lowtemp){
                updateString += ` lowtemp=${plantinfoObj.lowtemp},`;
            }
            if (plantinfoObj.soiltype){
                updateString += ` soiltype='${plantinfoObj.soiltype}',`;
            }
            if (plantinfoObj.soilph){
                updateString += ` soilph='${plantinfoObj.soilph}',`;
            }
            if (plantinfoObj.about){
                updateString += ` about='${plantinfoObj.about}',`;
            }
            if (plantinfoObj.planttype){
                updateString += ` planttype='${plantinfoObj.planttype}',`;
            }
            if (plantinfoObj.photo){
                updateString += ` photo='${plantinfoObj.photo}',`;
            }
            updateString = updateString.slice(0, -1);
            updateString += ` where id = ${plantinfoObj.id} RETURNING *`;
            let updated = await db.oneOrNone(updateString);
            return updated;
        }
        return {error : "invalid id"};
    } catch(e){
        console.log(e);
        return ({error:"something went wrong"});
    }
}

async function updatePlant(plantObj){
    try{
        if(plantObj.id){
            let updateString = 'update plants set';
            if (plantObj.userid){
                updateString += ` userid=${plantObj.userid},`;
            }
            if (plantObj.roomid){
                updateString += ` roomid=${plantObj.roomid},`;
            }
            if (plantObj.plantinfoid){
                updateString += ` plantinfoid=${plantObj.plantinfoid},`;
            }
            if (plantObj.plantname){
                updateString += ` plantname='${plantObj.plantname}',`;
            }
            updateString = updateString.slice(0, -1);
            updateString += ` where id = ${plantObj.id} RETURNING *`;
            let updated = await db.oneOrNone(updateString);
            return updated;
        }
        return {error : "invalid id"};
    } catch(e){
        console.log(e);
        if (e.detail.includes("present")){
            if (e.detail.includes("user")){
                return ({error:"new assigned user doesn't exist."});
            }
            if (e.detail.includes("room")){
                return ({error:"new assigned room doesn't exist."});
            }
            if (e.detail.includes("plantinfo")){
                return ({error:"new assigned plantinfo doesn't exist."});
            }
        }
        return ({error:"something went wrong"});    
    }
}

async function updatePost(postObj){
    try{
        if(postObj.id){
            let updateString = 'update posts set';
            if (postObj.userid){
                updateString += ` userid=${postObj.userid},`;
            }
            if (postObj.plantid){
                updateString += ` plantid=${postObj.plantid},`;
            }
            if (postObj.postdate){
                updateString += ` postdate='${postObj.postdate}',`;
            }
            if (postObj.photo){
                updateString += ` photo='${postObj.photo}',`;
            }
            if (postObj.caption){
                updateString += ` caption='${postObj.caption}',`;
            }
            updateString = updateString.slice(0, -1);
            updateString += ` where id = ${postObj.id} RETURNING *`;
            let updated = await db.oneOrNone(updateString);
            return updated;
        }
        return {error : "invalid id"};
    } catch(e){
        console.log(e);
        if (e.detail.includes("present")){
            if (e.detail.includes("users")){
                return ({error:"new assigned user doesn't exist."});
            }
            if (e.detail.includes("plant")){
                return ({error:"new assigned plant doesn't exist."});
            }
        }
        return ({error:"something went wrong"});
    }
}

async function updateComment(commentObj){
    try{
        if(commentObj.id){
            let updateString = 'update comments set';
            if (commentObj.userid){
                updateString += ` userid=${commentObj.userid},`;
            }
            if (commentObj.postid){
                updateString += ` postid=${commentObj.postid},`;
            }
            if (commentObj.commentdate){
                updateString += ` commentdate='${commentObj.commentdate}',`;
            }
            if (commentObj.comment){
                updateString += ` comment='${commentObj.comment}',`;
            }
            updateString = updateString.slice(0, -1);
            updateString += ` where id = ${commentObj.id} RETURNING *`;
            let updated = await db.oneOrNone(updateString);
            return updated;
        }
        return {error : "invalid id"};
    }catch(e){
        console.log(e);
        if (e.detail.includes("present")){
            if (e.detail.includes("users")){
                return ({error:"new assigned user doesn't exist."});
            }
            if (e.detail.includes("post")){
                return ({error:"new assigned post doesn't exist."});
            }
        }
        return ({error:"something went wrong"});
    }
}

module.exports = {
    updateUser,
    updateRoom,
    updatePlantinfo,
    updatePlant,
    updatePost,
    updateComment
}