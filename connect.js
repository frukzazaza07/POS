//เชื่อมต่อ Mysql
const mysql = require("mysql");
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'pos'
});
con.connect(function(err) {
    if (err) {
        throw err;
        console.log(err);
    }
    console.log("Connect Success" + con.database);
    var sql = "select * from orders";
    con.query(sql, function(err, result) {
        if (err) {
            throw err;
            console.log(err);
        }
        console.log(result);
    });
});