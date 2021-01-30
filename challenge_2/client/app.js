//SETTINGS
var settings = {
  server: {
    url: 'http://localhost:42069'
  },
  xhr: new XMLHttpRequest()
};

//INIT
function onload() {
  document.querySelector('#inputForm').addEventListener('submit', e => {
    e.preventDefault();
    requestCSV();
  });

  settings.xhr.onreadystatechange = (e) => {
    if(settings.xhr.readyState === 4) {
      document.querySelector('#results').innerHTML = settings.xhr.responseText;
    }
  }
}

function requestCSV() {
  settings.xhr.open("POST", `${settings.server.url}/convert`, true);
  settings.xhr.setRequestHeader('Content-type', 'application/json');
  settings.xhr.send(JSON.stringify({data: document.querySelector('#JSON').value}));
}