var db = require('../config/schema');
var Promise = require('bluebird');

require('./userModel');

var FollowerUser = db.Model.extend({
  tableName: 'users'
});

module.exports = db.model('FollowerUser', FollowerUser);
