const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
  host: 'sql5.freemysqlhosting.net',
  user: 'sql5447071',
  port: 3306,
  password: 'ffy4vKxsjC',
  database: 'sql5447071',
});

mysqlConnection.connect(function (err) {
  if (err) {
    console.error(err);
    return;
  } else {
    console.log('db is connected');
  }
});

module.exports = mysqlConnection;
