var db = require('../config/schema');
var Promise = require('bluebird');

require('../models/userModel');

var Users = db.Collection.extend({
  model: db.model('User')
});

module.exports = db.collection('Users', Users);
