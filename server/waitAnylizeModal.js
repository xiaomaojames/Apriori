var mongoose = require('./mongoose');
var schema = new mongoose.Schema({
    no: String,
    text: String
});
var anlizeSchama = new mongoose.Schema({
    fileName: String,
    content: [schema]
});
module.exports = mongoose.model("dataSource", anlizeSchama);

