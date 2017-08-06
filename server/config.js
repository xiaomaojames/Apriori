var env = require('./env');
console.log(env);
var config = {};
if (env == 'pro') {
    config.mongondbAddress='mongodb://localhost/anlize';
} else if(env=='dev') {
    config.mongondbAddress='mongodb://192.168.31.222/anlize';
}
module.exports = config;