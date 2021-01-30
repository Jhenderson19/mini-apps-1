//define server
var express = require('express');
var cors = require('cors');
var app = express();
var port = 42069;

var corsOptions = {
  "origin": '*',
  "allowedHeaders": 'Content-Type,Content-type',
}

app.use(cors(corsOptions));
app.use(express.json());


//define routes
app.post('/convert', (req, res) => {

  try {
    var data = req.body.data;
    if (data[data.length - 1] === ';') {
      data = data.slice(0, -1);
    }
    var parsedData = JSON.parse(data);

    res.status(200).send(toCSV(parsedData));

  } catch (error) {

    res.status(400).send('ERROR: INVALID JSON SYNTAX');

  }
});

//init server
app.listen(port, () => {
  console.log(`CSV Generator listening on at http://localhost:${port}`);
})


//CONVERSION LOGIC
function toCSV(jsonObj) {
  var keys = [];
  var values = [];

  dfEach(jsonObj, (currentObj) => {
    for (var key in currentObj) {
      if(key !== 'children') {
        if (keys.indexOf(key) === -1) {
          keys.push(key);
        }
      }
    }
  });
  dfEach(jsonObj, (currentObj) => {
    values.push(valuesToStr(keys, currentObj));
  });

  var output = keys.join(',');
  for(var i = 0; i < values.length; i++) {
    output += '\n' + values[i];
  }
  console.log('OUTPUT OF CSV CONVERT: ');
  console.log(output);
  return output;

}

function valuesToStr(keyArr, jsonObj) {
  var str = '';
  for (var i = 0; i < keyArr.length; i++) {
    if( i !== 0) {
      str += ',';
    }
    str+=jsonObj[keyArr[i]];
  }
  return str;
}

function dfEach(obj, cb) {
  cb(obj);
  obj.children.forEach((child) => {
    dfEach(child, cb);
  })
}