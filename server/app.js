var express = require('express');
var app = express();
var anyLizeDatas = require("./waitAnylizeModal");
app.use('/', function (req, res,next) {
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
    anyLizeDatas.find({fileName: req.params["fileName"]}).exec(
        function (err, data) {
            res.send(data);
        }
    )
    ;
});
app.get("/upload", function (req, res) {
    var workbook = new Excel.Workbook();
    workbook.xlsx.readFile("data/data.xlsx")
        .then(function (workbook) {
            var worksheet = workbook.getWorksheet(3);
            var rows = [];


            worksheet.eachRow(function (a, b) {
                var row = {};
                console.log();
                row.no = a.getCell(1).value;
                row.text = a.getCell(2).value;
                rows.push(row);
                console.log(rows);
            });
            var modal = anyLizeDatas.create({fileName: "11.txt", content: rows}, function (err) {

            });

            console.log(rows);

        });
    res.send("haha");
})

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});