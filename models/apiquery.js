const db = require('../connection');

// query functions to pull from Postgres for API

// get all users
async function allUsers(){
    let allUsers = await db.any(`SELECT id, username FROM users`);
    return allUsers;
}

// get one user, by userid
async function oneUser(id){
    let oneUser = await db.oneOrNone(`SELECT * FROM users WHERE id=${id}`);
    return oneUser;
}

// get all rooms
async function allRooms(){
    let allRooms = await db.any(`SELECT id, roomname FROM rooms`);
    return allRooms;
}

// get one room, by roomid
async function oneRoom(id){
    let oneRoom = await db.oneOrNone(`SELECT * FROM rooms WHERE id=${id}`);
    return oneRoom;
}

// get all plantinfo
async function allPlantinfo(){
    let allPlants = await db.any(`SELECT id, latinname, commonname FROM plantinfo`);
    return allPlants;
}

// get one plantinfo, by id
async function onePlantinfo(id){
    let onePlant = await db.oneOrNone(`SELECT * FROM plantinfo WHERE id=${id}`);
    return onePlant;
}

// get all specific plants
async function allPlants(){
    let allPlants = await db.any(`SELECT id, plantname FROM Plants`);
    return allPlants;
}

// get one specific plant, by id
async function onePlant(id){
    let onePlant = await db.oneOrNone(`SELECT * FROM Plants WHERE id=${id}`);
    return onePlant;
}

// get all watering events
async function allWaters(){
    let allWaters = await db.any(`SELECT * FROM Water`);
    return allWaters;
}

// get all watering events associated with one plant, by plantid
async function oneWater(plantid){
    let oneWater = await db.any(`SELECT * FROM Water WHERE plantid=${plantid}`);
    return oneWater;
}

// get all data about users following each other
async function allFollows(){
    let allFollows = await db.any(`SELECT * FROM follow`);
    return allFollows;
}

// get data about all users one user follows, by userid
async function oneFollow(userid){
    let oneFollow = await db.any(`SELECT * FROM follow WHERE userid=${userid}`);
    return oneFollow;
}

// get all post info
async function allPosts(){
    let allPosts = await db.any(`SELECT * FROM posts`);
    return allPosts;
}

// get info about one specific post
async function onePost(id){
    let onePost = await db.oneOrNone(`SELECT * FROM posts WHERE id=${id}`);
    return onePost;
}

// get all comments for all posts
async function allComments(){
    let allComments = await db.any(`SELECT * FROM comments`);
    return allComments;
}

// get one specific comment by ID
async function oneComment(id){
    let oneComment = await db.oneOrNone(`SELECT * FROM comments WHERE id=${id}`);
    return oneComment;
}

// get all like information
async function allLikes(){
    let allLikes = await db.any(`SELECT * FROM likes`);
    return allLikes;
}

// get all likes for a specific post, by ID.
async function oneLike(postid){
    let oneLike = await db.any(`SELECT * FROM likes WHERE postid=${postid}`);
    return oneLike;
}

// get all plants from one user 
async function allPlantsUser(userid) {
    let allPlants = await db.any(`SELECT * from plants WHERE userid=${userid}`);
    return allPlants;
}

module.exports = {
    allPlantsUser,
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