require('dotenv').config();
const http = require('http');
const express = require('express');
const helmet = require('helmet');
const logger = require('morgan');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const app = express();
const server = http.createServer(app);
const PORT = 5000;
const apiRouter = require('./routes/api');
const userRouter = require('./routes/user');

app.use(helmet());
app.use(logger('dev'));
app.use('/api', apiRouter);




app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/user', userRouter);

app.get('/*', (req, res) =>{
    res.json([])
})

server.listen(PORT, () =>{
    console.log(`server listening at ${PORT}`);
});