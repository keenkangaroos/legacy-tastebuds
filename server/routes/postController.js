/* We start by bringing in our Posts collection and our individual Post model
 */

var Posts = require('../collections/posts');
var Post = require('../models/postModel');
// We require these in order to select posts by user
var Users = require('../collections/users');
var User = require('../models/userModel');

/* In list(), we just want to show all posts along with the user who posted the
 * post. We pass the {withRelated: ['user']} argument in fetch().
 * Note that 'user' corresponds to the user() function we wrote in the Post
 * model.
 */

exports.listPosts = function(req, res) {
  Posts.forge()
    .fetch({
      withRelated: ['user']
    }).then(function(collection) {
      res.send(collection.toJSON());
    });
};

/* In create(), we are making a new post.
 */

exports.createPost = function(req, res) {
  var newPost = req.body;
  Post.forge({
    image: newPost.post_image,
    user_id: newPost.user_id,
    restaurant_id: newPost.restaurant_id,
    eat: newPost.eat,
    comment: newPost.comment,
    location: newPost.location
  }).save().then(function(postedModel) {
    res.status(200).json(postedModel);
  });
};

/* In show(), we are displaying a single post.
 *
 * We pass the query paramers (in this case, the id value), into the Tweet()
 * object.
 *
 * Per Bookshelf's documentation, if no rows are found, an undefined object is
 * returned. So we check the result as part of our error handling.
 */

exports.showPost = function(req, res) {
  var postId = req.params.id;

  Post.forge({
    id: postId
  }).fetch({
    withRelated: ['user']
  }).then(function(resultingPost) {
    if (resultingPost === undefined) {
      // no such result
      res.status(404).json({
        error: "Post not found."
      });
    } else {
      // res.json(200, resultingPost);
      res.status(200).json(resultingPost);
    }
  });
};

exports.showPostsByUser = function(req, res) {
  User.forge({
    id: req.params.id
  })
    .fetch({
      withRelated: ['posts']
    })
    .then(function(user) {
      var posts = user.related('posts');
      res.status(200).json({
        data: posts
      });
    })
    .catch(function(error) {
      res.status(404).json({
        error: "An error occurred."
      })
    })
};

exports.deletePost = function(req, res) {
  var postId = req.params.id;

  Post.forge({
    id: postId
  }).fetch({
    require: true
  }).then(function(post) {
    post.destroy()
      .then(function() {
        res.status(200).json({
          message: "Post deleted"
        });
      })
      .catch(function(error) {
        console.log(error);
        res.send('An error occurred');
      });
  });
};