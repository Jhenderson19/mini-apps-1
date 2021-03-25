const Promise = require('bluebird');
const db = Promise.promisifyAll(require('./connection'));

class DataManager {
  constructor() {}

  insertUser(user) {
    return db.queryAsync(`INSERT INTO 'users' ('name','email','password')
    VALUES ('${user.name}','${user.email}','${user.password}');`)
    .then((queryResults) => {
      console.log(queryResults);
      return queryResults;
    })
  }
  insertAddress(address) {
    return db.queryAsync(`INSERT INTO 'addresses' ('line1','line2','city','state','zipCode','phoneNum')
    VALUES ('${address.line1}','${address.line2 !== undefined ? address.line2 : 'null'}','${address.city}','${address.state}','${address.zipCode}','${address.phoneNum}');`)
    .then((queryResults) => {
      console.log(queryResults);
      return queryResults;
    })
  }
  insertPayment(payment) {
    return db.queryAsync(`INSERT INTO 'payment' ('cardNum','exp','sercurityCode','zipCode')
    VALUES ('${payment.cardNum}','${payment.exp}','${payment.securityCode}','${payment.zipCode}');`)
    .then((queryResults) => {
      console.log(queryResults);
      return queryResults;
    })
  }
}

module.exports = new DataManager();