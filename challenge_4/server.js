const express = require('express');
const app = express();
const port = 4000;
const path = require('path');

app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Connect 4 App listening on port ${port}...`)
});