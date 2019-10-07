// // RETURN BUTTON ------------------------------------------------------------------------
// function goBack() {
//   TweenMax.to("#return", 0.5, {rotation: 360});
//   setTimeout(function(){ window.history.back(); }, 500);
// }
// // RETURN BUTTON ------------------------------------------------------------------------
var PropertiesReader = require('properties-reader');
var properties = PropertiesReader(__dirname + '/../../Alpha/Properties/user.properties');
const getSize = require('get-folder-size');

var fs = require('fs');
var path = require('path');

var baseAlphariumFolder = 'C://Alpharium'
var baseUsersFolder = properties.get('alphariumproperties.loggedin');

var folderPath;


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
  fs.readdir(folderPath, function(err, items) {
    for (var i=0; i<items.length; i++) {

      var folderName = items.id;
      newFolder = path.join(folderPath, items[i]);

      var thisFolderContainer = document.getElementById('fileContainer');
      var thisFolder = document.createElement('div');thisFolder.setAttribute("id", items[i]);thisFolder.setAttribute("class", "alphariumFolder");thisFolder.setAttribute("type", "file");thisFolder.setAttribute("rc-name", "alphariumFolder");
      thisFolderContainer.appendChild(thisFolder);
      var newThisFolder = document.getElementById(items[i]);
      var thisFolderIcon = document.createElement('i');thisFolderIcon.setAttribute("class", "far fa-folder");
      newThisFolder.appendChild(thisFolderIcon);
      var thisFolderName = document.createElement('div');thisFolderName.innerHTML = items[i]; thisFolderName.setAttribute("class", "folderName"); thisFolderName.setAttribute("id", "folderName");
      newThisFolder.appendChild(thisFolderName);
      var thisFolderSize = document.createElement('div'); thisFolderSize.setAttribute("class", "folderSize");
      newThisFolder.appendChild(thisFolderSize);

      getFileSize(thisFolderSize);
    }
  });
}

function getFileSize(thisFolderSize) {
  getSize(newFolder, function(err, size) {
    folderSize = ((size / 1024 / 1024).toFixed(2) + ' MB');
    thisFolderSize.innerHTML = folderSize;
  });
}


function alphariumFolderRename(e, folderCommand) {
  document.getElementById("commandLineBox").innerHTML = folderCommand;

  $('#userCommandLineBox').css("display", "block");
  $('#submitUserCommand').css("display", "block");
  $('#userCommandLineBox').attr("placeholder", "New Folder Name...");

  $("#userCommandLineBox").unbind();        // THIS STOPS EVENT LISTENERS FROM STACKING / BEING ADDED
  $('#submitUserCommand').unbind();         // WHEN YOU ADD A .ON OR .KEYDOWN IT DOESNT REPLACE THE OLD ONES
                                            // MEANING THAT THE EVEN IS CALLED AS MANY TIMES AS THEIR ARE EVENT LISTENERS
  $("#userCommandLineBox").keydown(function(event) {
    if (event.keyCode === 13) {submitThisRename(e);}})
  $('#submitUserCommand').on('click', function() {submitThisRename(e);})
}

function submitThisRename(e) {
  var thisFolder = e.currentTarget.id;
  var newFolderPath = path.join(folderPath, thisFolder);
  var child = e.currentTarget.children;
  var newFolderName = document.getElementById("userCommandLineBox").value;
  child[1].innerHTML = newFolderName;
  fs.rename(newFolderPath, folderPath+'/'+newFolderName, function() {});
  $('#userCommandLineBox').css("display", "none");
  $('#submitUserCommand').css("display", "none");
  document.getElementById("userCommandLineBox").value = "";
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











function openfolderCommand() {

  document.getElementById("userOpenFolderCommandArea").value = ("");
  document.getElementById("commandLineBox").innerHTML += ('\nPlease Enter the Folder you want to open or type "cancel" to return.');
  $("#userCommandArea").css("visibility", "hidden");
  $("#userOpenFolderCommandArea").css("visibility", "visible");

  $("#userOpenFolderCommandArea").keypress(function(event) {
    if (event.keyCode === 13) {
      var openDirName = $("#userOpenFolderCommandArea").val();
      if (openDirName === ("cancel")) {
        $("#userCommandArea").css("visibility", "visible");
        $("#userOpenFolderCommandArea").css("visibility", "hidden");
        document.getElementById("commandLineBox").innerHTML += ('\nAction Canceled');
        // return;
      }
      // else if (!fs.access(openDirName)) {
      //   document.getElementById("commandLineBox").innerHTML += ('\nNo such folder.');
      //   return;
      // }
      else {
        newFolderPath = oldFolderPath + '\\' + openDirName;
        document.getElementById("commandLineBox").innerHTML += ('\n'+ newFolderPath);
        document.getElementById("directoryLocation").innerHTML = ('Alpha Drive\\' + newFolderPath);
        $("#userCommandArea").css("visibility", "visible");
        $("#userOpenFolderCommandArea").css("visibility", "hidden");
        }
      }
    }
)};

function newfolderCommand() {
  document.getElementById("commandLineBox").innerHTML += ('\nEnter the Folder Name you want to create or type "cancel" to return.');
  $("#userCommandArea").css("visibility", "hidden");
  $("#userNewFolderCommandArea").css("visibility", "visible");

  $("#userNewFolderCommandArea").keypress(function(event) {
    if (event.keyCode === 13) {
      var newFolderName = $("#userNewFolderCommandArea").val();
      document.getElementById("userNewFolderCommandArea").value = ('');

      if (newFolderName === ("cancel")) {
        $("#userCommandArea").css("visibility", "visible");
        $("#userNewFolderCommandArea").css("visibility", "hidden");
        document.getElementById("commandLineBox").innerHTML += ('\nAction Canceled');
        return;
      }
      else {
// I AM TRYING TO CREATE A FOLDER WITHIN A FOLDER, CURRENTLY IT JUST MAKES A NEW FOLDER IN THE BASE DIRECTORY. IE WITH CENTRAL/DRAW ETC, AND NOT WITHIN THE SELECTED DIRECTORY, SUCH AS 'USERDATA' OR 'SUBFOLDER' ITS AN ISSUE WITH 'NEWFOLDERPATH'
// ALSO WHEN CREATING A NEW FOLDER IT NAMES IT 'UserData + the name...' and it is unable to search the current directory for existing folders ie, if you made a folder called 'subfolder' it would just create the folder 'userdatasubfolder' in the base directory.
        if (!fs.existsSync(newFolderPath + '\\' + newFolderName)){
          fs.mkdirSync(newFolderPath + '\\' + newFolderName)
          document.getElementById("commandLineBox").innerHTML += ('\n'+ newFolderName + ' has been created within ' + newFolderPath);
          newFolderPath = folderPath +'\\'+ newFolderName;
          document.getElementById("directoryLocation").innerHTML = ('Alpha Drive\\' + newFolderPath);
          $("#userCommandArea").css("visibility", "visible");
          $("#userNewFolderCommandArea").css("visibility", "hidden");
          return(newFolderPath);
        }
        else {
          document.getElementById("commandLineBox").innerHTML += ('\nFile ' + newFolderName + ' already exists.');
        }
      }
    }
    }
  );
}





function newfileCommand() {
  document.getElementById("commandLineBox").innerHTML += ('\nEnter the File Name you want to create or type "cancel" to return.');
  $("#userCommandArea").css("visibility", "hidden");
  $("#userNewFileCommandArea").css("visibility", "visible");

  $("#userNewFileCommandArea").keypress(function(event) {
    if (event.keyCode === 13) {
      var newFileName = $("#userNewFileCommandArea").val();
      document.getElementById("userNewFileCommandArea").value = ('');

      if (newFileName === ("cancel")) {
        $("#userCommandArea").css("visibility", "visible");
        $("#userNewFileCommandArea").css("visibility", "hidden");
        document.getElementById("commandLineBox").innerHTML += ('\nAction Canceled');
        return;
      }
      else {
        fs.writeFileSync(newFolderPath + '\\' + newFileName, newFileName);
        document.getElementById("commandLineBox").innerHTML += ('\nFile ' + newFileName + ' has been created within ' + newFolderPath);
        $("#userCommandArea").css("visibility", "visible");
        $("#userNewFileCommandArea").css("visibility", "hidden");
        return;
      }
    }
    }
  );
}



// NOTE TO SELF. DOES EXISTSSYNC ONLY INCLUDE DIRECTORIES OR IS IT FILES TOO???
// IF ITS FILES TOO THEN I CAN DO A TEST FOR IF THE FILE NAME EXISTS ALREADY


  // if (!fs.existsSync(userDirectoryName)){
  //   fs.mkdirSync(userDirectoryName, function() {
  //     document.getElementById("commandLineBox").innerHTML += ('\n' + "Directory '" + userDirectoryName + "' has been created within " + usersBaseFilePath);
  //   });
  // }
  // else {
  //   document.getElementById("commandLineBox").innerHTML += ('\n' + "Directory '" + userDirectoryName + "' already exists.");
  // }



$(document).ready(initBaseFolder);