var db = require('../config/schema');
var Promise = require('bluebird');

require('./postModel');

var Restaurant = db.Model.extend({
  tableName: 'restaurants',
  posts: function() {
    return this.belongsTo('Post');
  }
});

module.exports = db.model('Restaurant', Restaurant);
