var app = require('app');
var BrowserWindow = require('browser-window');

app.on('ready', function () {
  var window = new BrowserWindow({
    show: true,
    transparent: false
  });

  window.loadUrl(process.argv[2]);
  window.maximize();
});
