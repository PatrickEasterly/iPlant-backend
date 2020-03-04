require('dotenv').config();
const http = require('http');
const express = require('express');
const helmet = require('helmet');
const logger = require('morgan');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const PORT = 5000;

const apiRouter = require('./routes/api');
const userRouter = require('./routes/user');
const appRouter = require('./routes/app');



router.use(cors());
app.use(helmet());
app.use(logger('dev'));
app.use('/api', apiRouter);


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/app', appRouter);
app.use('/user', userRouter);

app.get('/*', (req, res) =>{
    res.json({whatisthis:"its a server for an unfinished webapp obviously"})
})

server.listen(PORT, () =>{
    console.log(`server listening at ${PORT}`);
});