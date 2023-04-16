/* Initialise and define our endpoints.
The following will create an aexpress server, listen on port 3000 by
default, and run in development mode with the environment variable 
NODE_ENV.*/
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const path = require(path);
const app = express();

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

app.set('port', PORT);
app.set('env', NODE_ENV);

app.use(logger('tiny'))
app.use(bodyParserjson())

app.use('/', require(path.join(__dirname, 'routes')));

app.use((req, res, next) => {
    const err = new Error(`${req.method} ${req.url} Not Found`);
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message,
        },
    });
});

app.listen(PORT, () => {
    console.log(
        `Express Server started on Port ${app.get(
            'port'
        )} | Environment : ${app.get('env')}`
    );
});