const { remote, ipcRenderer } = require('electron')


document.getElementById('minimize-button').addEventListener('click', () => {
  remote.getCurrentWindow().minimize()
})

document.getElementById('close-button').addEventListener('click', () => {
  localStorage.setItem("activeShortcuts", activeShortcuts);
  window.close()
})