require('dotenv').config();
const saltRounds = process.env.saltRounds;
const SECRET = process.env.secret;
const bcrypt = require('bcrypt');

function hashPassword(pass){
    const salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(pass, salt);
}

function authenticateToken(req, res, next){

}

module.exports = {
    hashPassword
}