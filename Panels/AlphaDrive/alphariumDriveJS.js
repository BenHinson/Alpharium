// PAGE SETUP FOR NEW WINDOW
if (!document.getElementById('bottomnav')) {
  $("#fileContainer").css("height", "calc(100vh - 95px)");
  $("#databaseBackgroundMain").css("height", "calc(100vh - 24px)");
  $(".rightClickContainer").attr('id', 'rightClickContainer');
}
// PAGE SETUP FOR NEW WINDOW

var PropertiesReader = require('properties-reader');
var properties = PropertiesReader(__dirname + '/../../Alpha/Properties/user.properties');
var getSize = require('get-folder-size');

var fs = require('fs-extra');
var path = require('path');

var baseAlphariumFolder = 'C://Alpharium'
// var baseAlphariumFolder = 'C://My Documents/Temparary'    // Set this to any folder to start from there, and set 'folderPath' to that value.
var baseUsersFolder = properties.get('alphariumproperties.loggedin');

var folderPath;
var previousFolder;

function initBaseFolder() {
  if (!fs.existsSync(baseAlphariumFolder)){
    fs.mkdir(baseAlphariumFolder, function() {
      initBaseFolder();
    });
  }
  else {
    window.folderPath = path.join(baseAlphariumFolder, baseUsersFolder);
    if (!fs.existsSync(folderPath)){
      fs.mkdir(folderPath, function() {
        document.getElementById("directoryLocation").innerHTML = (folderPath);
        document.getElementById("commandLineBox").innerHTML += (baseUsersFolder + ' Successfully Created.');
        listDirectory();
      })
    } else {
      document.getElementById("directoryLocation").innerHTML = (folderPath);
      listDirectory();
    }
  }
};


function listDirectory() {
  $("#fileContainer").empty();
  fs.readdir(folderPath, function(err, items) {
    for (var i=0; i<items.length; i++) {

      var folderName = items.id;
      newFolder = path.join(folderPath, items[i]);
      var isFile = fs.lstatSync(newFolder).isFile();

      var thisFolderContainer = document.getElementById('fileContainer');
      var thisFolder = document.createElement('div');thisFolder.setAttribute("id", items[i]);thisFolder.setAttribute("class", "alphariumFolder");thisFolder.setAttribute("type", "folder");thisFolder.setAttribute("rc-name", "alphariumFolder,alphaDrive");thisFolder.setAttribute("ondblclick", "alphariumFolderOpen(this)")
      thisFolderContainer.appendChild(thisFolder);
      var newThisFolder = document.getElementById(items[i]);
      var thisFolderIcon = document.createElement('i');thisFolderIcon.setAttribute("class", "far fa-folder");
      newThisFolder.appendChild(thisFolderIcon);
      var thisFolderName = document.createElement('div');thisFolderName.innerHTML = items[i]; thisFolderName.setAttribute("class", "folderName"); thisFolderName.setAttribute("id", "folderName");
      newThisFolder.appendChild(thisFolderName);
      var thisFolderSize = document.createElement('div'); thisFolderSize.setAttribute("class", "folderSize");
      newThisFolder.appendChild(thisFolderSize);
      if (isFile == true) {
        thisFolder.setAttribute("type", "file");thisFolder.setAttribute("rc-name", "alphariumFile,alphaDrive");thisFolder.setAttribute("ondblclick", "alphariumFileOpeninNotes(this)");thisFolderIcon.setAttribute("class", "far fa-file-alt");
      }
      getFileSize(thisFolderSize);
      initRightClick();
    }
  });
}

function getFileSize(thisFolderSize) {
  getSize(newFolder, function(err, size) {
    folderSize = ((size / 1024 / 1024).toFixed(2) + ' MB');
    thisFolderSize.innerHTML = folderSize;
  });
}

// ---------------------------------------------------------------------

function showInputBox(placeholder) {
  $('#userCommandLineBox').css("display", "block");
  $('#submitUserCommand').css("display", "block");
  $('#userCommandLineBox').attr("placeholder", placeholder);
  $("#userCommandLineBox").unbind();        // THIS STOPS EVENT LISTENERS FROM STACKING / BEING ADDED
  $('#submitUserCommand').unbind();         // WHEN YOU ADD A .ON OR .KEYDOWN IT DOESNT REPLACE THE OLD ONES
                                            // MEANING THAT THE EVEN IS CALLED AS MANY TIMES AS THERE ARE EVENT LISTENERS
}
function hideInputBox(){
  $('#userCommandLineBox').css("display", "none");
  $('#submitUserCommand').css("display", "none");
  document.getElementById("userCommandLineBox").value = "";
}

// ------------------Nav Menu Control Listeners-------------------------
  document.getElementById("directoryControlBack").addEventListener("click", function(){fileContainerBack()});
  document.getElementById("directoryControlForward").addEventListener("click", function(){fileContainerForward()});
  document.getElementById("directoryControlRefresh").addEventListener("click", function(){fileContainerRefresh()});
  document.getElementById("directoryControlNewFile").addEventListener("click", function(){fileContainerNewFile()});
  document.getElementById("directoryControlNewFolder").addEventListener("click", function(){fileContainerNewFolder()});
  document.getElementById("directoryControlAddToDrop").addEventListener("click", function(){});
// ---------------------------------------------------------------------
function fileContainerBack() {
  window.previousFolder = folderPath;
  window.folderPath = folderPath.slice(0, folderPath.lastIndexOf("\\"));
  if(folderPath == "C:\\Alpharium") {
    document.getElementById("commandLineBox").innerHTML = ('Access Restricted');
  } else {
    if (fs.existsSync(folderPath)) {
      document.getElementById("directoryLocation").innerHTML = (folderPath);
      listDirectory();
    }
  }
}
function fileContainerForward() {
  if (fs.existsSync(previousFolder)) {
    document.getElementById("directoryLocation").innerHTML = (previousFolder);
    window.folderPath = previousFolder;
    listDirectory();
  }
}
// ----------------------------------------------------------------
function fileContainerRefresh() {
  listDirectory();
}
// ----------------------------------------------------------------

function fileContainerNewFolder(thisObject, Caller, key, Command) {
  showInputBox("Folder Name...");
  $("#userCommandLineBox").keydown(function(event) {
    if (event.keyCode === 13) {newFolder();}})
  $('#submitUserCommand').on('click', function() {newFolder();})
  function newFolder() {
    folderName = document.getElementById("userCommandLineBox").value;
    if (!fs.existsSync(folderPath + '\\' + folderName)) {
      fs.mkdirSync(folderPath + '\\' + folderName);
      listDirectory();
      hideInputBox();
    } else {
      document.getElementById("commandLineBox").innerHTML = ('"' + folderName + '" already exists.');
    }
  }
}

// ----------------------------------------------------------------

function fileContainerNewFile(thisObject, Caller, key, Command) {
  showInputBox("File Name...");
  $("#userCommandLineBox").keydown(function(event) {
    if (event.keyCode === 13) {newFile();}})
  $('#submitUserCommand').on('click', function() {newFile();})
  function newFile() {
    fileName = document.getElementById("userCommandLineBox").value;
    if (!fs.existsSync(folderPath + '\\' + fileName)) {
      fs.writeFileSync(folderPath + '\\' + fileName,"");
      listDirectory();
      hideInputBox();
    } else {
      document.getElementById("commandLineBox").innerHTML = ('"' + fileName + '" already exists.');
    }
  }
}

// ---------------------------------------------------------------------

function fileContainerPaste() {};

// ---------------------------------------------------------------------

function alphariumFolderCopy() {};

// ---------------------------------------------------------------------

function alphaDriveRename(e, Caller) {
  showInputBox("New Folder Name...");
  $("#userCommandLineBox").keydown(function(event) {
    if (event.keyCode === 13) {submitThisRename(e);}})
  $('#submitUserCommand').on('click', function() {submitThisRename(e);})
  function submitThisRename(e) {
    var thisFolder = e.currentTarget.id;
    var currentFolder = path.join(folderPath, thisFolder);
    var child = e.currentTarget.children;
    var newFolderName = document.getElementById("userCommandLineBox").value;
    futureFolderPath = path.join(folderPath, newFolderName);
    if (!fs.existsSync(futureFolderPath)) {
      fs.rename(currentFolder, futureFolderPath, function() {});
      child[1].innerHTML = newFolderName;
      hideInputBox();
    } else {
      document.getElementById("commandLineBox").innerHTML = ('"' + newFolderName + '" already exists.');
    }
  }
}

// ----------------------------------------------------------------

function alphariumFolderOpen(folder, fromRC) {
  if (!fromRC) {
    thisFolder = folder.id;
  } else {
    thisFolder = folder.currentTarget.id;
  }
  window.previousFolder = folderPath;
  window.folderPath = path.join(folderPath, thisFolder);
  if (fs.existsSync(folderPath)) {
    document.getElementById("directoryLocation").innerHTML = (folderPath);
    listDirectory();
  }
}

// ----------------------------------------------------------------

function alphariumFileOpeninNotes(file, fromRC) {
  if (!fromRC) {
    fileLocation = path.join(folderPath, file.id);
  } else {
    fileLocation = path.join(folderPath, file.currentTarget.id);
  }
  thisPanelShortcut = document.getElementById("Notes");
  openThisPanel(thisPanelShortcut);
  setTimeout(function() {
    openThisFile(fileLocation);
  },100)
}











function openfileCommand() {
  document.getElementById("commandLineBox").innerHTML += ('\nPlease Enter the File you want to open or type "cancel" to return.');
  $("#userCommandArea").css("visibility", "hidden");
  $("#userOpenFileCommandArea").css("visibility", "visible");

  $("#userOpenFileCommandArea").keypress(function(event) {
    if (event.keyCode === 13) {
      var openDirName = $("#userOpenFileCommandArea").val();
      document.getElementById("userOpenFileCommandArea").value = ('');
      if (openDirName === ("cancel")) {
        $("#userCommandArea").css("visibility", "visible");
        $("#userOpenFileCommandArea").css("visibility", "hidden");
        document.getElementById("commandLineBox").innerHTML += ('\nAction Canceled');
        return;
      }
      else {

      fs.readFile(newFolderPath + '/' + openDirName, 'utf8', function(err, data) {
        if (err) {
          document.getElementById("commandLineBox").innerHTML += ('\nThat is not a valid file.');
        }
        else {
          document.getElementById("commandLineBox").innerHTML += ('\nOpening ' + openDirName + '\n--------------------');
          document.getElementById("commandLineBox").innerHTML += ('\n' + data + '\n');
          document.getElementById("commandLineBox").innerHTML += ('\nCancel   |   Edit   |   Print   |   Delete   |   Rename');

          $("#userFileCommandArea").css("visibility", "visible");
          $("#userOpenFileCommandArea").css("visibility", "hidden");


          $("#userFileCommandArea").keypress(function(event) {
            if (event.keyCode === 13) {
              var userFileCommand = $("#userFileCommandArea").val();
              document.getElementById("userFileCommandArea").value = ('');

              if (userFileCommand === ("cancel")) {
                $("#userCommandArea").css("visibility", "visible");
                $("#userFileCommandArea").css("visibility", "hidden");
                document.getElementById("commandLineBox").innerHTML += ('\nAction Canceled');
                return;
              }
              else if (userFileCommand === ("edit")) {
                editFileCommand();
              }
              else if (userFileCommand === ("print")) {
                var openTextEditor = window.open("../TextEditor/texteditor.html", "Text Editor", "height=800,width=1000,menubar=0,resizeable=no,toolbar=no,location=yes");
                return;
              }
              else if (userFileCommand === ("delete")) {
                fs.unlink(newFolderPath + '/' + openDirName, function (err) {
                  if (err) {console.log(err);}
                  document.getElementById("commandLineBox").innerHTML += ('\n'+ newFolderPath + '\\' + openDirName +' has been deleted.');
                  $("#userCommandArea").css("visibility", "visible");
                  $("#userFileCommandArea").css("visibility", "hidden");
                  return;
                })
              }
              else if (userFileCommand === ("rename")) {
                document.getElementById("commandLineBox").innerHTML += ('\nEnter the new name of the File or type "cancel" to return.');
                $("#userFileRenameCommandArea").css("visibility", "visible");
                $("#userFileCommandArea").css("visibility", "hidden");
                $("#userFileRenameCommandArea").keypress(function(event) {
                  if (event.keyCode === 13) {
                    var userFileRenameCommand = $("#userFileRenameCommandArea").val();
                    document.getElementById("userFileRenameCommandArea").value = ('');
                    if (userFileRenameCommand === ("cancel")) {
                      $("#userCommandArea").css("visibility", "visible");
                      $("#userFileRenameCommandArea").css("visibility", "hidden");
                      document.getElementById("commandLineBox").innerHTML += ('\nAction Canceled');
                      return;
                    }
                    else {
                      fs.rename(newFolderPath + '/' + openDirName, newFolderPath + '/' + userFileRenameCommand, function (err){if (err) throw err;});
                      document.getElementById("commandLineBox").innerHTML += ('\n'+ openDirName +' has been renamed to '+ userFileRenameCommand);
                      $("#userCommandArea").css("visibility", "visible");
                      $("#userFileRenameCommandArea").css("visibility", "hidden");
                      return;
                    }
                  }})
              }
            }}
          
          )}
          });

          return;
        }
      }
    }
  )};


$(document).ready(initBaseFolder);