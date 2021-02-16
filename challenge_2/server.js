//define server
var express = require('express');
const path = require('path');
const fs = require('fs');
var app = express();
var port = 42069;


//Middleware
var cors = require('cors');
var multipart = require('parse-multipart');
var corsOptions = {
  "origin": '*',
  "allowedHeaders": 'Content-Type,Content-type',
}
app.use(cors(corsOptions));
app.use(express.json());


//define routes
app.post('/convert', (req, res) => {
  try {
    var file = Buffer.alloc(0);

    req.on('data', (chunk) => {
      file = Buffer.concat([file, chunk]);
    }).on('end', () => {
      var csvStr = toCSV(JSON.parse(trimBufferToString(file)))
      res.status(200).send(csvStr);

      fs.writeFile('parsed.csv', csvStr, (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log('wrote to file csv');
        }
      });
    });

  } catch (error) {
    console.log(error);
    res.status(400).send('ERROR: INVALID JSON SYNTAX');

  }
});

app.get('/latest.csv', (req, res) => {
  res.sendFile(path.join(__dirname,'parsed.csv'), (err) => {
    console.log(err);
  });
})

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

//TRIM BUFFER
function trimBufferToString(buffer) {
  var str = buffer.toString('utf-8');

  str = str.slice(str.indexOf('\n\r\n') + 2 );
  str = str.slice(0, str.indexOf('------WebK') - 2);

  if (str[str.length - 1] === ';') {
    str = str.slice(0, str.length - 1);
  }
  return str;
}