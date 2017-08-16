const mongoose    = require('mongoose');

let Schema = mongoose.Schema;

// Schemas
let Images = new Schema({
    kind: {
        type: String,
        enum: ['thumbnail', 'detail'],
        required: true
    },
    url: { type: String, required: true }
});

let Post = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String, required: true },
    images: [Images],
    modified: { type: Date, default: Date.now }
});

// validation
Post.path('title').validate(function (v) {
    return v.length > 5 && v.length < 70;
});

let PostModel = mongoose.model('Post', Post);

module.exports.PostModel = PostModel;