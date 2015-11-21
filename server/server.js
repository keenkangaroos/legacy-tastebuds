var express = require('express');
var db = require('./config/schema');
var http = require('http');
var Promise = require('bluebird');
var bodyParser = require('body-parser');
// var session = require('express-session'); // may remove
// var _ = require('underscore'); // may remove
var app = express();
var postController = require('./routes/postController');
var userController = require('./routes/userController');
var wantToTryController = require('./routes/wantToTryController');
var bluebird = require('bluebird');

require('./models/followerModel');
require('./models/followerUserModel');
require('./models/hashtagModel');
require('./models/postModel');
require('./models/restaurantModel');
require('./models/userModel');
require('./models/wantToTryModel');
require('./collections/posts');
require('./collections/users');
require('./collections/wantToTrys');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
}); // fix

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(bodyParser.json());

app.use(express.static(__dirname + '/../public'));

// fetch all Posts
app.get('/posts', postController.listPosts);
// create post
app.post('/posts', postController.createPost);
// get single post
app.get('/posts/:id', postController.showPost);
//get all posts by single user
app.get('/posts/user/:id', postController.showPostsByUser);
// delete post
app.delete('/posts/:id', postController.deletePost);
// create user
app.post('/users', userController.createUser);
// get user
app.get('/users/:id', userController.getUser);
// delete user
app.delete('/users/:id', userController.deleteUser);
// create want to try
app.post('/want_to_trys', wantToTryController.createWantToTry);
// delete want to try
app.delete('want_to_trys', wantToTryController.deleteWantToTry);
// fetch want to trys by user
app.get('/want_to_trys/user/:id', wantToTryController.getWantToTryByUser);
// fetch want to trys by post
app.get('/want_to_trys/post/:id', wantToTryController.getWantToTryByUser);



app.listen(process.env.PORT || 3000);
console.log('Listening...');
