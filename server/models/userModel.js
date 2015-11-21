var db = require('../config/schema');
var Promise = require('bluebird');

require('./wantToTryModel');
require('./followerUserModel');
require('./postModel');

var User = db.Model.extend({
  tableName: 'users',
  posts: function() {
    return this.hasMany('Post');
  },
  wantToTrys: function() {
    return this.hasMany('WantToTry');
  },
  followers: function() {
    return this.belongsToMany(FollowerUser, 'followers', 'being_followed_id', 'follower_id');
  },
  following: function() {
    return this.belongsToMany(FollowerUser, 'followers', 'follower_id', 'being_followed_id');
  }
});

module.exports = db.model('User', User);
