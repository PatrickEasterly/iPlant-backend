require('dotenv').config();
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
const User = require('../user/user');

let hashedPass = bcrypt.hashSync(req.body.pass, saltRounds);