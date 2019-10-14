var fs = require('fs-extra');
var path = require('path');
// var thinkTankPath = 'E://ThinkTank/ThinkTank.txt';
var selectedFilePath;
var selectedFileName;
var saveTimout;
var saveCount = 0;

function objectSize() {
  window.bottomnav = document.getElementById('bottomnav');
  if (!bottomnav) {
    $("#centralNotePad").css("height", "calc(100vh - 52px)");
    $("#sideMenu").css("height", "calc(100vh - 52px)");
  }
}

function openThisFile(selectedFilePath) {
  window.selectedFilePath = selectedFilePath;
  fs.readFile(selectedFilePath, 'utf8', function(err, data) {
    if (err) throw err;
    else {
      document.getElementById("centralNotePad").innerHTML = (data);
      window.selectedFileName = (selectedFilePath.split("\\"))[(selectedFilePath.split("\\")).length - 1];
      document.getElementById("fileTitle").innerHTML = selectedFileName;
      startAutoSave();
    }
  });
}
function startAutoSave() {
  $('#centralNotePad').keydown(function() {
    resetSaveTimeout();
    startSaveTimeout();
  })
}
function startSaveTimeout() {
  saveTimout = setTimeout(saveThisFile, 5000);
}
function resetSaveTimeout() {
  clearTimeout(saveTimout);
}
function saveThisFile() {
  content = $('#centralNotePad').val();
  fs.writeFile(selectedFilePath, content, function(err) {
    if (err) throw err;
    saveCount++;
    document.getElementById('fileTitle').innerHTML = selectedFileName+' - Saved (' + saveCount + ')';
  });
}

$(document).ready(objectSize);

















// function init() {
//   const notePadTextArea = $("#centralNotePad");

//   document.getElementById("lineCount").innerHTML += (1);
//   $("#centralNotePad").keypress(function(event) {
//     if (event.keyCode === 13) {
//       var text = document.getElementById("centralNotePad").value;   
//       var lines = text.split(/\r|\r\n|\n/);
//       var count = lines.length + 1;

//       var lineCountTextArea = document.getElementById("lineCount").innerHTML += ('\n'+ count);
//     }
//     else if (event.keyCode === 9) {
//       let { keyCode } = event;
//       let { value, selectionStart, selectionEnd } = notePadTextArea;
//       event.preventDefault();
//       notePadTextArea.value = value.slice(0, selectionStart) + "  " + value.slice(selectionEnd);
//       notePadTextArea.setSelectionRange(selectionStart+2, selectionStart+2)
//     }
//   });


//   var target = $("#lineCount")[0]; // <== Getting raw element
//   $("#centralNotePad").scroll(function() {
//     target.scrollTop = this.scrollTop;
//     target.scrollLeft = this.scrollLeft;
//   });


//   // notePadTextArea.keypress(function(event) {
//   //   if(e.keyCode === 9) {

//   //   let { keyCode } = event;
//   //   let { value, selectionStart, selectionEnd } = notePadTextArea;

//   //   if (keyCode === 9) {  // TAB = 9
//   //     event.preventDefault();
//   //     notePadTextArea.value = value.slice(0, selectionStart) + "  " + value.slice(selectionEnd);
//   //     notePadTextArea.setSelectionRange(selectionStart+2, selectionStart+2)
//   //   }}
//   // });
// }
// $(document).ready(init);