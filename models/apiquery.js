const db = require('../connection');

async function allUsers(){
    let allUsers = await db.any(`SELECT id, username FROM users`);
    return allUsers;
}

async function oneUser(id){
    let oneUser = await db.oneOrNone(`SELECT * FROM users WHERE id=${id}`);
    return oneUser;
}

async function allRooms(){
    let allRooms = await db.any(`SELECT id, roomname FROM rooms`);
    return allRooms;
}

async function oneRoom(id){
    let oneRoom = await db.oneOrNone(`SELECT * FROM rooms WHERE id=${id}`);
    return oneRoom;
}

async function allPlantinfo(){
    let allPlants = await db.any(`SELECT id, latinname, commonname FROM plantinfo`);
    return allPlants;
}

async function onePlantinfo(id){
    let onePlant = await db.oneOrNone(`SELECT * FROM plantinfo WHERE id=${id}`);
    return onePlant;
}

async function allPlants(){
    let allPlants = await db.any(`SELECT id, plantname FROM Plants`);
    return allPlants;
}

async function onePlant(id){
    let onePlant = await db.oneOrNone(`SELECT * FROM Plants WHERE id=${id}`);
    return onePlant;
}

async function allWaters(){
    let allWaters = await db.any(`SELECT * FROM Water`);
    return allWaters;
}

async function oneWater(plantid){
    let oneWater = await db.any(`SELECT * FROM Water WHERE plantid=${plantid}`);
    return oneWater;
}

async function allFollows(){
    let allFollows = await db.any(`SELECT * FROM follow`);
    return allFollows;
}

async function oneFollow(userid){
    let oneFollow = await db.any(`SELECT * FROM follow WHERE userid=${userid}`);
    return oneFollow;
}

async function allPosts(){
    let allPosts = await db.any(`SELECT * FROM posts`);
    return allPosts;
}

async function onePost(id){
    let onePost = await db.oneOrNone(`SELECT * FROM posts WHERE id=${id}`);
    return onePost;
}

async function allComments(){
    let allComments = await db.any(`SELECT * FROM comments`);
    return allComments;
}

async function oneComment(id){
    let oneComment = await db.oneOrNone(`SELECT * FROM comments WHERE id=${id}`);
    return oneComment;
}

async function allLikes(){
    let allLikes = await db.any(`SELECT * FROM likes`);
    return allLikes;
}

async function oneLike(postid){
    let oneLike = await db.any(`SELECT * FROM likes WHERE postid=${postid}`);
    return oneLike;
}

module.exports = {
    allUsers,
    oneUser,
    allRooms,
    oneRoom,
    allPlantinfo,
    onePlantinfo,
    allPlants,
    onePlant,
    allWaters,
    oneWater,
    allFollows,
    oneFollow,
    allPosts,
    onePost,
    allComments,
    oneComment,
    allLikes,
    oneLike
}