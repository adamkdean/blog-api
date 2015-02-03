var _ = require('lodash'),
    restify = require('restify'),
    posts = require('./posts');

var server = restify.createServer({
    name: 'blog-api',
    version: '1.0.0'
});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.get('/', function (req, res, next) {
    res.send([]);
    return next();
});

server.get('/posts', function (req, res, next) {
    res.send(posts);
    return next();
});

server.get('/posts/:slug', function(req, res, next) {
    if (req.params.slug && _.contains(posts, req.params.slug)) {
        res.send(posts[req.params.slug]);
    } else {
        res.send({
            status: 404,
            error: "blog post not found"
        });
    }
});

server.listen(process.env.PORT, function () {
    console.log('%s listening at %s', server.name, server.url);
});
