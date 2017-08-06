var mongoose = require('mongoose');
var mongoAddress = require('./config').mongondbAddress;
mongoose.connect(mongoAddress);
module.exports=mongoose;