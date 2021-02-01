const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const path = require('path');

app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function (req, res){
    console.log("enter app.get");
    res.sendFile(path.join(__dirname + '/src/index.html'));
    // res.send('<h1> Hello World</h1>');
});

app.post('/Items', function (req, res){

const sql = require("mssql");

const config = {
    user: "",
    password: "",
    server: "", // You can use 'localhost\\instance' to connect to named instance
    database: "",
    port: 
};

sql.connect(config, function (err) {

    if (err) console.log(err);

    let sqlRequest = new sql.Request();

    let rating=req.body.warranty;
    console.log(rating);

    let sqlQuery = 'Select item1, item2, item3 from Items where item1=' + parseInt(rating);

    sqlRequest.query(sqlQuery, function (err, data) {
        if (err) console.log(err)

            // console.table(data.recordset);
            // console.log(data);
            // console.log(data.recordset);
            // console.log(data.rowsAffected);
            // console.log(data.recordset[0]);
            
            let h='<h1 style="background:red;color:whitesmoke;margin:20px; border:20px solid red;">Employee Rating Board<h1>'
            let str='<table style="margin-left:20px;">';
            let row='';
            for (let j=0;j<data.recordset.length;j++){
                row= row + '<tr>' + '<td style="width:150px;">' + data.recordset[j].item1 + '</td>' + '<td style="width:150px;">'
            }    
            str=str + row + '</table>';
            res.send(h+str);
    sql.close();

    });
});
});

const webserver = app.listen(5000, function (){
    console.log('Node Web Server is running..');
});