var mysql = require('mysql');

var dbLogin = require('dbConfig.js');
dbLogin.host = 'localhost';
dbLogin.database = 'miniapps1_challenge3_transactions';

var connection = mysql.createConnection(dbLogin);

connection.connect();

module.exports = connection;