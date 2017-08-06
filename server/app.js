var express = require('express');
var app = express();
var anyLizeDatas = require("./waitAnylizeModal");
var multiparty = require('multiparty');
var fs = require('fs');
app.use('/', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    next();
})

var Excel = require('exceljs');
app.get('/', function (req, res) {
    anyLizeDatas.find({}).select("fileName").exec(function (err, data) {
        // res.header('Access-Control-Allow-Origin',"*")
        res.send(data);
    })
});
app.get("/:fileName", function (req, res) {
    console.log(req.params["fileName"]);
    anyLizeDatas.findOne({fileName: req.params["fileName"]}).exec(
        function (err, data) {
            res.send(data.content);
        }
    )
    ;
});
app.post("/upload", function (req, res) {
    var form = new multiparty.Form();
    form.parse(req, function (err, fields, files) {
        var file = files.file[0];
        console.log(file.originalFilename);
        var is = fs.createReadStream(file.path)
        var localFileName = new Date().getTime()
            + "-" + file.originalFilename;
        var os = fs.createWriteStream('data/' + localFileName);
        is.pipe(os);
        fs.unlinkSync(file.path);
        var workbook = new Excel.Workbook();
        workbook.xlsx.readFile("data/" + localFileName)
            .then(function (workbook) {
                var worksheet = workbook.getWorksheet(1);
                var rows = [];
                worksheet.eachRow(function (a, b) {
                    var row = {};
                    row.no = a.getCell(1).value;
                    row.text = a.getCell(2).value;
                    rows.push(row);
                });
                var modal = anyLizeDatas.create({fileName: localFileName, content: rows}, function (err) {
                    res.send("ok");
                });


            });

    });


})
app.get("/delete/:fileName", function (req, res) {
    fs.unlinkSync("data/"+req.params["fileName"]);
    anyLizeDatas.remove({fileName: req.params["fileName"]}).exec(function (err, data) {
        res.send("ok");
    });
})

var server = app.listen(3085, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});