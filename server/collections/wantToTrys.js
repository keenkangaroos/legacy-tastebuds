var db = require('../config/schema');
var Promise = require('bluebird');

require('../models/wantToTryModel');

var WantToTrys = db.Collection.extend({
  model: db.model('WantToTry')
});

module.exports = db.collection('WantToTrys', WantToTrys);
