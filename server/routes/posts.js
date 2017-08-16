module.exports = function(app) {
    app.get('/api/posts', (req, res) => {
        return app.models.PostModel.find(function (err, posts) {
            if (!err) {
                return res.send(posts);
            } else {
                res.statusCode = 500;
                console.error('Internal error(%d): %s',res.statusCode,err.message);
                return res.send({ error: 'Server error' });
            }
        });
    });
    app.get('/api/posts/:id', (req, res) => {
        return app.models.PostModel.findById(req.params.id, function (err, post) {
            if(!post) {
                res.statusCode = 404;
                return res.send({ error: 'Not found' });
            }
            if (!err) {
                return res.send({ status: 'OK', post:post });
            } else {
                res.statusCode = 500;
                console.log('Internal error(%d): %s',res.statusCode,err.message);
                return res.send({ error: 'Server error' });
            }
        });
    });
    app.post('/api/posts', (req, res) => {
        let post = new app.models.PostModel({
            title: req.body.title,
            author: req.body.author,
            description: req.body.description,
            images: req.body.images
        });

        post.save(function (err) {
            if (!err) {
                console.log("post created");
                return res.send({ status: 'OK', post:post });
            } else {
                console.log(err);
                if(err.name === 'ValidationError') {
                    res.statusCode = 400;
                    res.send({ error: 'Validation error' });
                } else {
                    res.statusCode = 500;
                    res.send({ error: 'Server error' });
                }
                console.log('Internal error(%d): %s',res.statusCode,err.message);
            }
        });
    });
    app.delete('/api/posts/:id', (req, res) => {
        return app.models.PostModel.findById(req.params.id, function (err, post) {
            if(!post) {
                res.statusCode = 404;
                return res.send({ error: 'Not found' });
            }
            return post.remove(function (err) {
                if (!err) {
                    console.log("post removed");
                    return res.send({ status: 'OK' });
                } else {
                    res.statusCode = 500;
                    console.log('Internal error(%d): %s',res.statusCode,err.message);
                    return res.send({ error: 'Server error' });
                }
            });
        });
    });
    app.put ('/api/posts/:id', (req, res) => {
        return app.models.PostModel.findById(req.params.id, function (err, post) {
            if(!post) {
                res.statusCode = 404;
                return res.send({ error: 'Not found' });
            }

            post.title = req.body.title;
            post.description = req.body.description;
            post.author = req.body.author;
            post.images = req.body.images;
            return post.save(function (err) {
                if (!err) {
                    console.log("post updated");
                    return res.send({ status: 'OK', post:post });
                } else {
                    if(err.name == 'ValidationError') {
                        res.statusCode = 400;
                        res.send({ error: 'Validation error' });
                    } else {
                        res.statusCode = 500;
                        res.send({ error: 'Server error' });
                    }
                    console.log('Internal error(%d): %s',res.statusCode,err.message);
                }
            });
        });
    });
};