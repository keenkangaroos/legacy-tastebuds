var db = require('../config/schema');
var Promise = require('bluebird');

require('../models/postModel');

var Posts = db.Collection.extend({
  model: db.model('Post')
});

module.exports = db.collection('Posts', Posts);
