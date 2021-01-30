//SETTINGS
var settings = {
  server: {
    url: 'http://localhost:42069'
  },
  xhr: new XMLHttpRequest()
};

//INIT
function onload() {
  //ADD SUBMIT EVENT HANDLE
  document.querySelector('#inputForm').addEventListener('submit', e => {
    e.preventDefault();
    requestCSV();
  });

  //ADD RECIEVED RESPONSE DATA
  settings.xhr.onreadystatechange = (e) => {
    if(settings.xhr.readyState === 4) {
      document.querySelector('#results').innerHTML = settings.xhr.responseText;
    }
  }

  //Create Link
  document.querySelector('#download').setAttribute('href', settings.server.url + '/latest.csv');
}

//MAKE REQUEST
function requestCSV() {
  settings.xhr.open("POST", `${settings.server.url}/convert`, true);
  settings.xhr.setRequestHeader('Content-type', 'multipart/form-data');

  var data = new FormData();
  data.append('fileToUpload', document.querySelector('#uploaded').files[0]);

  settings.xhr.send(data);
}