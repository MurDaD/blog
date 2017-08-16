const PostModel = require('../models/Post').PostModel;

// Set environment and config object
process.env.NODE_ENV = process.env.NODE_ENV || 'local';
const config = require(`./env/${process.env.NODE_ENV}`);

MongoClient.connect(config.db.url, (err, db) => {
    if (err) return log(err)


});