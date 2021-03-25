var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'miniapps1_challenge3_transactions'
});

connection.connect();

module.exports = connection;