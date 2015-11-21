var db = require('../config/schema');
var Promise = require('bluebird');

require('./postModel');

var Hashtag = db.Model.extend({
  tableName: 'hashtags',
  posts: function() {
    return this.belongsToMany('Post');
  }
});

module.exports = db.model('Hashtag', Hashtag);
