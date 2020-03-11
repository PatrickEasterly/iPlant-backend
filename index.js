require('dotenv').config();
const saltRounds = process.env.saltRounds;
const SECRET = process.env.secret;
const http = require('http');
const express = require('express');
const helmet = require('helmet');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;

const apiRouter = require('./routes/api');
const appRouter = require('./routes/app');

app.use(cors());
app.use(helmet());
app.use(logger('dev'));
app.use('/api', apiRouter);
app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/app', appRouter);

app.get('/*', (req, res) =>{
    res.json({whatisthis:"its a server for an unfinished webapp obviously"})
});

server.listen(PORT, () =>{
    console.log(`server listening at ${PORT}`);
});