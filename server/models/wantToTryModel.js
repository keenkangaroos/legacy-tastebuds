var db = require('../config/schema');
var Promise = require('bluebird');

require('./userModel');
require('./postModel');

var WantToTry = db.Model.extend({
  tableName: 'want_to_trys',
  user: function() {
    return this.belongsTo('User');
  },
  post: function() {
    return this.belongsTo('Post');
  }
});

module.exports = db.model('WantToTry', WantToTry);
