const db = require('../connection');

async function deleteUser(id){
    let delRec = db.one(`DELETE FROM users WHERE id=${id} RETURNING *;`);
    return delRec;
}

async function deleteRoom(id){
    let delRec = db.one(`DELETE FROM Rooms WHERE id=${id} RETURNING *;`);
    return delRec;
}

async function deletePlantinfo(id){
    let delRec = db.one(`DELETE FROM Plantinfo WHERE id=${id} RETURNING *;`);
    return delRec;
}

async function deletePlant(id){
    let delRec = db.one(`DELETE FROM plants WHERE id=${id} RETURNING *;`);
    return delRec;
}

async function deleteWater(waterObj){
let delRec = db.one(`DELETE FROM water WHERE userid=${waterObj.plantid} AND watertime='${waterObj.watertime}' RETURNING *;`);
    return delRec;
}

async function deleteFollow(followObj){
    let delRec = db.one(`DELETE FROM follow WHERE userid=${followObj.userid} AND follows='${followObj.follows}' RETURNING *;`);
    return delRec;
}

async function deletePost(id){
    let delRec = db.one(`DELETE FROM posts WHERE id=${id} RETURNING *;`);
    return delRec;
}

async function deleteComment(id){
    let delRec = db.one(`DELETE FROM comments WHERE id=${id} RETURNING *;`);
    return delRec;
}

async function deleteLike(likeObj){
    let delRec = db.one(`DELETE FROM likes WHERE postid=${likeObj.postid} AND userid='${likeObj.userid} RETURNING *;`);
    return delRec;
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