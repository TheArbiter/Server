const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const path = require('path');

app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function (req, res){
    res.sendFile(path.join(__dirname + '/index.html'));
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

    let sqlQuery = 'Select Item1, Item2, Item3 from Items where Item4=' + parseInt(rating);

    sqlRequest.query(sqlQuery, function (err, data) {
        if (err) console.log(err)

            console.table(data.recordset);
            console.log(data);
            console.log(data.recordset);
            console.log(data.rowsAffected);
            console.log(data.recordset[0]);
                    
            res.send(data);
    sql.close();

    });
});
});

const webserver = app.listen(5000, function (){
    console.log('Node Web Server is running..');
});