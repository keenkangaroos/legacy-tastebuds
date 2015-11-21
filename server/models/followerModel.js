var db = require('../config/schema');
var Promise = require('bluebird');

var Follower = db.Model.extend({
  tableName: 'followers'
});

module.exports = db.model('Follower', Follower);
