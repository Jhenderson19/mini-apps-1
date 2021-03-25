const express = require('express');
const app = express();
const port = 4000;
const bodyParser = require('body-parser');
const db = require('./db/connection');

//MIDDLEWARE
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//API
app.get('/api/transactionNumber', (req, res) => {
  res.status(200).send(JSON.stringify(0));
});

app.post('/api/userData', (req, res) => {
  console.log(req.body);
  res.status(200).send('ey!');
});
app.post('/api/addressData', (req, res) => {
  console.log(req.body);
  res.status(200).send('ey!');
})
app.post('/api/billingData', (req, res) => {
  console.log(req.body);
  res.status(200).send('ey!');
})

//STATIC FILES
app.use('', express.static('public'));

//START SERVER
app.listen(port, () => {
  console.log(`Checkout Server listening at http://localhost:${port}`);
})