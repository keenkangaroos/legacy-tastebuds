/* We start by bringing in our Want-To-Trys collection and our
 individual Want-To-Try model
 */

var WantToTrys = require('../collections/wantToTrys');
var WantToTry = require('../models/wantToTryModel');

// We bring in these in order to get want to trys by user/post
var Posts = require('../collections/posts');
var Post = require('../models/postModel');

var Users = require('../collections/users');
var User = require('../models/userModel');

/* In create(), we are making a new user.
 */

exports.createWantToTry = function(req, res) {
  var newWantToTry = req.body;
  WantToTry.forge({
    username: WantToTry.user_id,
    password: WantToTry.post_id
  }).save()
    .then(function(postedModel) {
      res.status(200).json(postedModel);
    })
    .catch(function(error) {
      console.log(error);
      res.send('An error occurred');
    });
};

/* In get(), we are displaying a single user.
 */

exports.getWantToTryByUser = function(req, res) {
  User.forge({
    id: req.params.id
  })
    .fetch({
      withRelated: ['wantToTrys']
    })
    .then(function(user) {
      var wantToTrys = user.related('wantToTrys');
      res.status(200).json({
        data: wantToTrys
      });
    })
    .catch(function(error) {
      res.status(404).json({
        error: "An error occurred."
      })
    })
};

exports.getWantToTryByPost = function(req, res) {
  Post.forge({
    id: req.params.id
  })
    .fetch({
      withRelated: ['wantToTrys']
    })
    .then(function(post) {
      var wantToTrys = post.related('wantToTrys');
      res.status(200).json({
        data: wantToTrys
      });
    })
    .catch(function(error) {
      res.status(404).json({
        error: "An error occurred."
      })
    })
};

/* In delete(), we are deleting a single user.
 */

exports.deleteWantToTry = function(req, res) {
  var wantToTryId = req.params.id;

  WantToTry.forge({
    id: wantToTryId
  }).fetch({
    require: true
  }).then(function(want_to_try) {
    want_to_try.destroy()
      .then(function() {
        res.status(200).json({
          message: "want_to_try deleted"
        })
      })
      .catch(function(error) {
        console.log(error);
        res.send('An error occurred');
      });
  });
};