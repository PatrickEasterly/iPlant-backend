const db = require('../connection');

async function deleteUser(id){
    db.none(`DELETE FROM users WHERE id=${id}`);
}

async function deleteRoom(id){
    db.none(`DELETE FROM Rooms WHERE id=${id}`);
}

async function deletePlantinfo(id){
    db.none(`DELETE FROM Plantinfo WHERE id=${id}`);
}

async function deletePlant(id){
    db.none(`DELETE FROM plants WHERE id=${id}`);
}

async function deleteWater(plantid, watertime){
db.none(`DELETE FROM water WHERE userid=${plantid} AND watertime='${watertime}'`);
}

async function deleteFollow(userid, follows){
    db.none(`DELETE FROM follow WHERE userid=${userid} AND follows='${follows}'`);
}

async function deletePost(id){
    db.none(`DELETE FROM posts WHERE id=${id}`);
}

async function deleteComment(id){
    db.none(`DELETE FROM comments WHERE id=${id}`);
}

async function deleteLike(postid, userid){
    db.none(`DELETE FROM likes WHERE postid=${postid} AND userid='${userid}'`);
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