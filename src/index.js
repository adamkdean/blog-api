var _ = require('lodash'),
    restify = require('restify'),
    posts = require('./posts'),
    port = process.env.PORT || 8000;

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
    console.log(req.params.slug);
    if (req.params.slug && _.contains(Object.keys(posts), req.params.slug)) {
        res.send(posts[req.params.slug]);
    } else {
        res.send({
            status: 404,
            error: "blog post not found"
        });
    }
});

server.listen(port, function () {
    console.log('%s listening on port %s', server.name, port);
});
