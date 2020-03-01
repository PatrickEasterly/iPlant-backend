const http = require('http');
const express = require('express');
const app = express();
const server = http.createServer(app);
const PORT = 5000;
const helmet = require('helmet');
const apiRouter = require('./routes/api');

app.use('/api', apiRouter);

app.get('/*', (req, res) =>{
    res.json([
        {
            id:1,
            user:"Stevie!"
        },
        {id:2,
        user:"other dude!!!!"}
    ])
})

server.listen(PORT, () =>{
    console.log(`server listening at ${PORT}`)
});