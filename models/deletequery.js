const db = require('../connection');

// in reverse order, deletes all rows owned by user in all tables, and then deletes the user
// returns the record deleted
async function deleteUser(id){
    try{
        let likes = await db.any(`DELETE FROM likes WHERE userid=${id};`);
        let comments = await db.any(`DELETE FROM comments WHERE userid=${id};`);
        let posts = await db.any(`DELETE FROM posts WHERE userid=${id};`);
        let follow = await db.any(`DELETE FROM follow WHERE userid=${id};`);
        let water = await db.any(`DELETE FROM water WHERE userid=${id};`);
        let plants = await db.any(`DELETE FROM plants WHERE userid=${id};`);
        let rooms = await db.any(`DELETE FROM rooms WHERE userid=${id};`);
        let delRec = await db.any(`DELETE FROM users WHERE id=${id} RETURNING *;`);
        console.log(delRec);
        return delRec;
    }catch(e){
        return {error:"couldn't delete something"};
    }
}

async function deleteRoom(id){
    try{
        let plants = await db.any(`DELETE FROM plants WHERE roomid=${id};`);
        let delRec = await db.any(`DELETE FROM Rooms WHERE id=${id} RETURNING *;`);
        return delRec;
    } catch(e){
        console.log(e);
        return ({error:"couldn't delete something"});
    }
}

async function deletePlantinfo(id){
    try{
        let delRec = await db.any(`DELETE FROM Plantinfo WHERE id=${id} RETURNING *;`);
        return delRec;
    } catch(e){
        console.log(e);
        return ({error:"couldn't delete something"});
    }
}

async function deletePlant(id){
    try{
        let modPosts = await db.any(`UPDATE posts SET plantid=NULL WHERE plantid=${id};`);
        let water = await db.any(`DELETE FROM water WHERE plantid=${id};`);
        let delRec = await db.any(`DELETE FROM plants WHERE id=${id} RETURNING *;`);
    return delRec;
    } catch(e){
        console.log(e);
        return ({error:"couldn't delete something"});
    }
}

async function deleteWater(id){
    try{
        let delRec = await db.any(`DELETE FROM water WHERE id=${id} RETURNING *;`);
    return delRec;
    } catch(e){
        console.log(e);
        return ({error:"couldn't delete something"});
    }
}

async function deletePost(id){
    try{
        let likes = await db.any(`DELETE FROM likes WHERE postid=${id};`);
        let comments = await db.any(`DELETE FROM comments WHERE postid=${id};`);
        let delRec = await db.any(`DELETE FROM posts WHERE id=${id} RETURNING *;`);
        return delRec;
    } catch(e){
        console.log(e);
        return ({error:"couldn't delete something"});
    }
}

async function deleteComment(id){
    try{
        let delRec = await db.any(`DELETE FROM comments WHERE id=${id} RETURNING *;`);
        return delRec;
    } catch(e){
        console.log(e);
        return ({error:"couldn't delete something"});
    }
}

async function deleteFollow(followObj){
    try{
        let delRec = await db.any(`DELETE FROM follow WHERE userid=${followObj.userid} AND follows='${followObj.follows}' RETURNING *;`);
        return delRec;
    } catch(e){
        console.log(e);
        return ({error:"couldn't delete something"});
    }
}

async function deleteLike(likeObj){
    try{
        let delRec = await db.any(`DELETE FROM likes WHERE postid=${likeObj.postid} AND userid='${likeObj.userid} RETURNING *;`);
        return delRec;
    } catch(e){
        console.log(e);
        return ({error:"couldn't delete something"});
    }
}

module.exports = {
    deleteUser,
    deleteRoom,
    deletePlantinfo,
    deletePlant,
    deleteWater,
    deleteFollow,
    deletePost,
    deleteComment,
    deleteLike
}