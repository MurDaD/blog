module.exports = function(app, db) {
    exports.posts = require('./posts')(app, db);
};