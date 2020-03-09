const express = require('express');
const router = express.Router();

const {JWTCheck} = require('../models/userquery');
const userRouter = require('./user');
const roomRouter = require('./room');
const plantinfoRouter = require('./plantinfo');
const plantRouter = require('./plant');
const waterRouter = require('./water');
const postRouter = require('./post');
const commentRouter = require('./comment');
const followRouter = require('./follow');
const likesRouter = require('./likes');

router.use('/user', userRouter); //DEBUGGED AND COMMENTED
router.use('/plantinfo', plantinfoRouter);

// This is the JWT validation check. Check if token is valid, attach token payload to req.body and call next. if not, return JSON login error.
router.use(JWTCheck);

//ALL routes past this point require a valid JWT with userid info to work.
router.use('/room', roomRouter);  //DEBUGGED AND COMMENTED
router.use('/plant', plantRouter); //DEBUGGED AND COMMENTED
router.use('/water', waterRouter); //DEBUGGED AND COMMENTED
router.use('/post', postRouter);
router.use('/comment', commentRouter);
router.use('/follow', followRouter);
router.use('/likes', likesRouter);

module.exports = router;