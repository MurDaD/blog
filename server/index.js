const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const cors = require('cors');
const winston = require('winston');
const expressWinston = require('express-winston');
const log = require('./libs/log')(module);
const app = express();

// Set environment and config object
process.env.NODE_ENV = process.env.NODE_ENV || 'local';
const config = require(`./env/${process.env.NODE_ENV}`);

require('./auth/auth');
const oauth2 = require('./auth/oauth2');

app
    // parse application/x-www-form-urlencoded
    .use(bodyParser.urlencoded({extended: false}))
    // parse application/json
    .use(bodyParser.json())
    // Winston logger
    .use(expressWinston.logger({
        transports: [
            new winston.transports.Console({
                json: true,
                colorize: true
            })
        ],
        meta: true, // optional: control whether you want to log the meta data about the request (default to true)
        msg: "HTTP {{req.method}} {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
        expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
        colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
        ignoreRoute: function (req, res) { return false; } // optional: allows to skip some log messages based on request and/or response
    }))
    // Cors for external access
    .use(cors((req, callback) => {
            callback(null, {
                origin: true,
                credentials:true,
                maxAge : 24 * 60 * 60, //24h
                optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
            });
        })
    )
    .use('/api/oauth/token', oauth2.token);

app.get('/api', function (req, res) {
    res.send('API is running');
});

app.get('/api/_health', function (req, res) {
    res.send({healthy: true});
});

MongoClient.connect(config.db.url, (err, database) => {
    if (err) return log(err);

    // TODO: crate /models/index.js and import everything recursively
    app.models = {
        // Require is a Singleton so we can do this strange things
        PostModel: require('./models/Post').PostModel,
        UserModel: require('./models/User').UserModel,
        ClientModel: require('./models/User').ClientModel,
        AccessTokenModel: require('./models/User').AccessTokenModel,
        RefreshTokenModel: require('./models/User').RefreshTokenModel,
    };

    require('./routes')(app, database);
    app.listen(config.port, () => {
        console.log('We are live on ' + config.port);
    });
});