const express = require('express');
const router = express.Router();
const post = require('../models/addquery');
const put = require('../models/updatequery');
const del = require('../models/deletequery');
const get = require('../models/getquery');
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

router.use('/user', userRouter);

// This is the JWT validation check. Check if token is valid, attach token payload to req.body and call next. if not, return JSON login error.
router.use(JWTCheck);

router.use('/room', roomRouter);
router.use('/plantinfo', plantinfoRouter);
router.use('/plant', plantRouter);
router.use('/water', waterRouter);
router.use('/post', postRouter);
router.use('/comment', commentRouter);
router.use('/follow', followRouter);
router.use('/likes', likesRouter);

module.exports = router;