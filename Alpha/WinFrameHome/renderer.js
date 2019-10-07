const { remote, ipcRenderer } = require('electron')

var oldHeight;
var oldWidth;
var isMaximized = false;

function windowMinimize() {
  remote.getCurrentWindow().minimize();
}

function windowMinMax() {
  const currentWindow = remote.getCurrentWindow();

  if (!isMaximized) {
    oldWidth = window.outerWidth;
    oldHeight = window.outerHeight;
    currentWindow.maximize();
    isMaximized = !isMaximized;
  } else {
    currentWindow.setSize(oldWidth, oldHeight);
    isMaximized = !isMaximized;
  }
}

function windowClose() {
  window.close();
}




