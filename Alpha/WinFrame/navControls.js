function changeTheme() {
  let darkThemeEnabled = document.body.classList.toggle('dark-theme');
  localStorage.setItem('dark-theme-enabled', darkThemeEnabled);
}
if (JSON.parse(localStorage.getItem('dark-theme-enabled'))) {
  document.body.classList.add('dark-theme');
}

function openAlphaDesk() {
  // setTimeout(function() {window.open("../../AlphaDesk/clara.html", "AlphaDesk", "height=650,width=650,location=yes")}, 200)
  const { BrowserWindow } = require('electron').remote
  let AlphaDesk = new BrowserWindow({ width: 500, height: 550, frame: false, transparent : true, webPreferences: {experimentalFeatures: true,nodeIntegration: true,webviewTag: true}})
  AlphaDesk.on('closed', () => {
    AlphaDesk = null
  })
  AlphaDesk.loadURL(`file://${__dirname}/../../AlphaDesk/clara.html`)
  AlphaDesk.webContents.on('did-finish-load', function() {
    AlphaDesk.show();
  })
}
fullscreen = true;
function toggleFullscreen() {
  var electron = require('electron');
  var window = electron.remote.getCurrentWindow();
  window.setFullScreen(fullscreen);
  fullscreen = !fullscreen;
}