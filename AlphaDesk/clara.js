$(document).ready(function() {
  var activeShortcuts = localStorage.getItem("activeShortcuts");
  if (activeShortcuts >= 1) {

    for (var i = 0, len = localStorage.length; i < len; ++i) {
      var keyName =  (localStorage.key( i ));
      var shortNum = 0;

      if (keyName != 'dark-theme-enabled' && keyName != 'activeShortcuts' && keyName != 'activeWeblinks' && keyName != 'user') {
        var shortcutMain = document.getElementById('shortcutMain');
        var newShortcut = document.createElement('div');
        newShortcut.setAttribute("class", "shortcutItem");
        newShortcut.setAttribute("id", "shortcut" + keyName);
        newShortcut.setAttribute("name", (localStorage.getItem(localStorage.key(i))));
        newShortcut.setAttribute("style", "bottom:" + ((i + 1) * 40) + "px; left:" + ((i + 1) * 20) + "px");
        shortcutMain.appendChild(newShortcut);

        var shortcutControl = document.getElementById('shortcut' + keyName);
        var newShortcutControl = document.createElement('div');
        newShortcutControl.setAttribute("class", "shortcutControl");
        newShortcutControl.setAttribute("id", "SSCID" + keyName);
        shortcutControl.appendChild(newShortcutControl);

        var removeShortcut = document.getElementById('SSCID' + keyName);
        var newRemoveShortcut = document.createElement('button');
        newRemoveShortcut.setAttribute("class", "removeShortcut");
        newRemoveShortcut.setAttribute("id", "RSCID" + keyName);
        newRemoveShortcut.setAttribute("onclick", "removeShortcut(this)");
        removeShortcut.appendChild(newRemoveShortcut);

        var removeShortcutIcon = document.getElementById('RSCID' + keyName);
        var newRemoveShortcutIcon = document.createElement('div');
        newRemoveShortcutIcon.setAttribute("class", "fas fa-times");
        removeShortcutIcon.appendChild(newRemoveShortcutIcon);
        

      // <div class="shortcutControl" id="shortcutControl"><div id="removeShortcut" class="removeShortcut"><i class="fas fa-times"></i></div></div>
      }
    }
  }
  else {
    activeShortcuts = 1;
    localStorage.setItem("activeShortcuts", activeShortcuts);
    activeWeb = 0;
    localStorage.setItem("activeWeblinks", activeWeb);
  }

  setWebIcons();
})

function setWebIcons() {
  $("div[name*='www']").each(function() {
    let link = $(this).attr("name");
    $(this).css({
      background: "url(http://www.google.com/s2/favicons?domain=" + link + ") center no-repeat", "background-size":"16px"
    });
  });
  $("div[name*='http']").each(function() {
    let link = $(this).attr("name");
    $(this).css({
      background: "url(http://www.google.com/s2/favicons?domain=" + link + ") center no-repeat", "background-size":"16px"
    });
  });
}

var createNewShortcutActive = false;
var activeWeb = localStorage.getItem("activeWeblinks");
localStorage.setItem("activeWeblinks", activeWeb);
var activeShortcuts = localStorage.getItem("activeShortcuts");
localStorage.setItem("activeShortcuts", activeShortcuts);

var activeFileLinks = 0;
var activeApplications = 0;
var shortcutType = 'WebLink';


// function changeTheme() {
//   let darkThemeEnabled = document.body.classList.toggle('dark-theme');
//   localStorage.setItem('dark-theme-enabled', darkThemeEnabled);
// }
// if (JSON.parse(localStorage.getItem('dark-theme-enabled'))) {
//   document.body.classList.add('dark-theme');
// }


function createNewShortcut() {
  if (!createNewShortcutActive) {
    
    if (activeShortcuts < 8) {
      
      createNewShortcutActive = !createNewShortcutActive;

      document.getElementById('createShortcutSettings').setAttribute("style", "display:block");
      document.getElementById('shortcutItemCreate').setAttribute("style", "background-color:rgb(0, 128, 255);color:darkgrey");

      document.getElementById("shortcutAdd").addEventListener("click", function() {

      var shortcutLinkVar = shortcutLink();

      if (shortcutType === "WebLink") {
        activeWeb++;
        localStorage.setItem("activeWeblinks", activeWeb);
        localStorage.setItem(shortcutType+activeWeb, shortcutLinkVar);
        activeShortcuts++;
        createAShortcut();
        localStorage.setItem("activeShortcuts", activeShortcuts);
      }
      else if (shortcutType === "FileLink") {
        localStorage.setItem(shortcutType+activeFileLinks, shortcutLinkVar);
        activeFileLinks++;
        activeShortcuts++;localStorage.setItem("activeShortcuts", activeShortcuts);
      }
      else if (shortcutType === "Application") {
        localStorage.setItem(shortcutType+activeApplications, shortcutLinkVar);
        activeApplications++;
        activeShortcuts++;localStorage.setItem("activeShortcuts", activeShortcuts);
      }

      });


    }
    else {
      document.getElementById('shortcutItemCreate').style.borderColor = "red";
    }
  }
  else {
    document.getElementById('createShortcutSettings').setAttribute("style", "display:none");
    document.getElementById('shortcutItemCreate').setAttribute("style", "background-color:map-get($lightTheme, light5);color:map-get($darkTheme, dark4)");
    createNewShortcutActive = false;
  }
}


function weblinkChosen() {
  document.getElementById('selectedDropdown').innerHTML = "Web-Link";
  shortcutType = 'WebLink';
  $('#shortcutLink').attr('placeholder','www.example.com');
};
function filelinkChosen() {
  document.getElementById('selectedDropdown').innerHTML = "File-Link";
  shortcutType = 'FileLink';
  $('#shortcutLink').attr('placeholder','Link...');
};
function applicationChosen() {
  document.getElementById('selectedDropdown').innerHTML = "Application";
  shortcutType = 'Application';
  $('#shortcutLink').attr('placeholder','Choose Application...');
};


function removeShortcut(item) {
  event.stopPropagation();
  item.parentNode.parentNode.remove();
  var itemIdRAW = item.parentNode.parentNode.id;
  itemId = itemIdRAW.replace("shortcut", "");
  localStorage.removeItem(itemId);
  var activeWeb = localStorage.getItem("activeWeblinks");
  activeWeb--;
  localStorage.setItem("activeWeblinks", activeWeb);
  var activeShortcuts = localStorage.getItem("activeShortcuts");
  activeShortcuts--;
  localStorage.setItem("activeShortcuts", activeShortcuts);
}

$(document).on('click', 'div[id*=WebLink]', function (event) {
  let link = $(this).attr("name");
  require("electron").shell.openExternal(link);
});

function shortcutLink() {
  var shortcutLinkVar = document.getElementById('shortcutLink').value;
  return shortcutLinkVar;
}

function createAShortcut() {
  var shortcutLinkVar = shortcutLink();

  var shortcutMain = document.getElementById('shortcutMain');
  var newShortcut = document.createElement('div');
  newShortcut.setAttribute("class", "shortcutItem");
  newShortcut.setAttribute("id", "shortcutWebLink" + activeWeb);
  newShortcut.setAttribute("name", shortcutLinkVar);
  newShortcut.setAttribute("style", "bottom:" + (activeWeb * 40) + "px; left:" + (activeWeb * 20) + "px");
  shortcutMain.appendChild(newShortcut);

  setWebIcons();

  var shortcutControl = document.getElementById("shortcutWebLink" + activeWeb);
  var newShortcutControl = document.createElement('div');
  newShortcutControl.setAttribute("class", "shortcutControl");
  newShortcutControl.setAttribute("id", "SSCID" + activeWeb);
  shortcutControl.appendChild(newShortcutControl);

  var removeShortcut = document.getElementById('SSCID' + activeWeb);
  var newRemoveShortcut = document.createElement('button');
  newRemoveShortcut.setAttribute("class", "removeShortcut");
  newRemoveShortcut.setAttribute("id", "RSCID" + activeWeb);
  newRemoveShortcut.setAttribute("onclick", "removeShortcut(this)");
  removeShortcut.appendChild(newRemoveShortcut);

  var removeShortcutIcon = document.getElementById('RSCID' + activeWeb);
  var newRemoveShortcutIcon = document.createElement('div');
  newRemoveShortcutIcon.setAttribute("class", "fas fa-times");
  removeShortcutIcon.appendChild(newRemoveShortcutIcon);
}

