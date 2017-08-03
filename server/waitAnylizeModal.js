var mongoose = require('./mongoose');
mongoose.connect('mongodb://192.168.31.222/anlize');
var schema= new mongoose.Schema({
    no: String,
    text: String
});
var anlizeSchama=new mongoose.Schema({
    fileName: String,
    content: [schema]
});
 module.exports=mongoose.model("dataSource",anlizeSchama);

