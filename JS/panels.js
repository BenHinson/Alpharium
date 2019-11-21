var fs = require('fs-extra');
var path = require('path');
var PropertiesReader = require('properties-reader');
var hash = require('object-hash');
// const html2canvas = require(__dirname + '../../node_modules/html2canvas');

///////////////////////////////////////
// LOADING OF PANEL FOLDER AND IGNORING 'alpha' in name
///////////////////////////////////////


function readPanelFolder() {
  window.panelLocation = path.join(__dirname, '../../Panels');
  fs.readdir(panelLocation, function(err, panel) {
    if (panel.length < 1) {
      document.getElementById("bottomuni").innerHTML = "I Cant Find Any Panels?";
    } else {
      for (var i=0; i<panel.length; i++) {
        if (panel[i].indexOf("alpha") === -1) {
          // Loading the Icon from the properties file
          var properties = PropertiesReader(panelLocation+'/'+panel[i]+"/"+panel[i]+".properties");
          window.panelIcon = properties.get('properties.icon');
          var rightClickMenu = properties.get('properties.menu');
          // Creating the Panel Shortcut and its Location
          var panelLocationParent = document.getElementById('bottomuni');
          var panelLocationChild = document.createElement('span');
          panelLocationChild.setAttribute("id", "panelLocationChild");
          panelLocationParent.appendChild(panelLocationChild);
          var panelParent = document.getElementById("panelLocationChild");
          var panelChild = document.createElement('a');
          panelChild.setAttribute("class", "tooltip homeShortcutCircle fas " + panelIcon);
          panelChild.setAttribute("id", panel[i]);
          panelChild.setAttribute("onclick", "openThisPanel(this)");
          panelChild.setAttribute("rc-name", rightClickMenu);
          panelParent.appendChild(panelChild);

          var tooltipParent = document.getElementById(panel[i]);
          var tooltipChild = document.createElement('span');
          tooltipChild.setAttribute("class", "tooltipText");
          tooltipChild.style.bottom = "37px";
          tooltipChild.innerHTML = panel[i];
          tooltipParent.appendChild(tooltipChild);
        }
      }
    }
    panelTabs();
  })

  
  // $("#alphaPanelViewer").on("click", function() {openPanelManager()});
}



///////////////////////////////////////
// CREATION OF PANELS AND PANEL MANAGER
///////////////////////////////////////


var displayedPanelId
var displayedPanel
var openPanels = [];
var panelCount = 0;
var previousPanel;
var activeTab;


function openThisPanel(thisPanelShortcut, openNow, panelOverlay) {
  window.thisPanelName = thisPanelShortcut.id;
  if (openPanels.includes("alphaPanelViewer")) {
    panelShortcutClose("alphaPanelViewer");
  } else if (thisPanelName == "alphaPanelViewer") {
    openPanelManager();
  }
  if (openPanels.includes(thisPanelName)) {
    if (displayedPanelId == thisPanelName) {
      if (openNow == 'tab') {
        newTab();
      } else {
        minimizePanel(displayedPanel, thisPanelShortcut);
        displayedPanel = undefined;
        displayedPanelId = undefined;
      }
    } else {
      displayPanel(thisPanelShortcut);
    }
  } else {
    if (fs.existsSync((panelLocation+'/'+thisPanelName+"/"+thisPanelName+".properties"))) {
      var panelProperties = PropertiesReader(panelLocation+'/'+thisPanelName+"/"+thisPanelName+".properties");
      if (panelProperties.get('secure.'+alreadyLoggedIn)) {
        panelShortcutSecure(thisPanelShortcut, "alreadySet");
        return;
      }
    }
    document.getElementById("centralContentBoxFullscreenMaster").style.display="grid";
    newPanel();
    openPanels.push(thisPanelName);
    displayPanel(thisPanelShortcut);
  }
}

function displayPanel(thisPanelShortcut) {
  if (displayedPanel != null) {
    minimizePanel(displayedPanel)
    $(".dropdownMain").show();
    $('.tabContainer, .dropTabSwitcher').hide();
  }
  thisPanelShortcut.style.cssText = "background-color: rgba(173, 173, 168, 0.85); color: cyan;";
  displayedPanel = document.getElementById("generated"+thisPanelName);
  displayedPanel.style.cssText = "display: block; z-index: 100";
  displayedPanelId = thisPanelName;
  previousPanel = displayedPanelId;

  // Displaying Tabs instead of Dropdowns
  if (displayedPanelId != "alphaPanelViewer") {
    $(".dropdownMain").hide();
    $('.tabContainer, .dropTabSwitcher').show();
    panelTabManager();
  }
}

function minimizePanel(displayedPanel) {
  $(".dropdownMain").show();
  $('.tabContainer, .dropTabSwitcher').hide();
  previousPanel = displayedPanelId;
  displayedPanel.style.cssText = "display: none";
  document.getElementById(displayedPanelId).style.cssText = "background-color:; color: cyan";
}

function newPanel() {
  panelCount++;
  var newPanelCreator = document.getElementById('centralContentBoxFullscreenMaster');
  var newPanelContainer = document.createElement('div');
  newPanelContainer.setAttribute("id", thisPanelName+"Parent");
  newPanelContainer.setAttribute("class", "PanelParent");
  newPanelCreator.appendChild(newPanelContainer);
  var newPanelCreation = document.createElement('div');
  newPanelCreation.setAttribute("id", "generated"+thisPanelName);
  newPanelCreation.setAttribute("class", "centralContentBoxFullscreenMaster");
  newPanelCreation.setAttribute("tabNumber", newPanelContainer.childNodes.length);
  newPanelCreation.style.zIndex = "100";
  if ($("#"+thisPanelName).attr("Custom") != "transparent") {
    newPanelCreation.style.background = "rgb(90, 90, 90)";
  }
  newPanelContainer.appendChild(newPanelCreation);
  var fullscreenToolLoad = '../../Panels/'+thisPanelName+'/'+thisPanelName+'.html';
  $(newPanelCreation).load(fullscreenToolLoad);
}

// ---------------- PANEL SCROLL ACROSS -----------------------

// function panelDots() {
  // console.log(openPanels);
  // console.log(panelCount);
  // console.log(displayedPanel);
  // console.log(displayedPanelId);
// }


// ---------------------- PANEL VIEWER ------------------------

function openPanelManager() {
  var counter = 0;
  $("#panelContainer").empty().css({top: ''});
  $("#panelContainer2").empty().css({bottom: ''});
  setTimeout(function() {
    if (panelCount == 1) {
      noPanelsWarning = document.createElement('h2');
      noPanelsWarning.innerHTML = "No Panels are Currently Open";
      noPanelsWarning.setAttribute("class", "panelWarningMsg");
      document.getElementById("panelContainer").appendChild(noPanelsWarning);
    } else {
    openPanels.forEach(function(panel) {
      if (panel != "alphaPanelViewer") {
        counter++;
        if (openPanels.length >= 3 && counter >= 3) {
          var panelContainer = document.getElementById("panelContainer2");
        } else {
          var panelContainer = document.getElementById("panelContainer");
        }
        panelMiniCont = document.createElement('div');
        panelMiniCont.setAttribute("class", "miniPanelContainer");
        panelMiniCont.setAttribute("id", "miniPanel"+counter);
        panelContainer.appendChild(panelMiniCont);

        panelMiniControl = document.createElement('div');
        panelMiniControl.setAttribute("class", "miniPanelControls");
        panelMiniControl.setAttribute("id", "miniControls"+counter);
        panelMiniCont.appendChild(panelMiniControl);

        panelMiniName = document.createElement('span');
        panelMiniName.setAttribute("class", "miniPanelName");
        panelMiniName.setAttribute("id", "miniName"+counter);
        panelMiniControl.appendChild(panelMiniName);

        panelMiniClose = document.createElement('i');
        panelMiniClose.setAttribute("class", "miniPanelClose far fa-times-circle");
        panelMiniClose.setAttribute("id", "miniClose"+counter);
        panelMiniClose.setAttribute("onclick", "panelShortcutClose('"+panel+"')");
        panelMiniControl.appendChild(panelMiniClose);

        panelMini = document.createElement('div');
        panelMini.setAttribute("class", "miniPanel");
        panelMini.setAttribute("id", "panel"+counter);
        panelMini.setAttribute("onclick", 'panelShortcutOpen('+panel+', "panelViewer")');
        panelMiniCont.appendChild(panelMini);

        document.getElementById("miniName"+counter).innerHTML = panel;

        if (panel == "Browser") {
          panelMini.innerHTML = "Preview Not Supported";
        } else {
          createPanelImage(panel, counter);
        }
      }
    })

    if (panelCount <= 3) {
      $('.miniPanel').css({width: 'calc(100vw / '+(panelCount - 0.5)+')', height: 'calc(100vh / '+(panelCount - 0.5)+')'});
      panelContainerHeight = $("#panelContainer").height();
      $('#panelContainer').css({top: 'calc(50% - ('+panelContainerHeight+'px) / 2)'});
    }
    else if (panelCount <= 7) {
      $('.miniPanel').css({width: 'calc(100vw / '+(panelCount - (counter / 2))+')', height: 'calc(100vh / '+(panelCount - (counter / 2))+')'});
      panelContainerHeight = $("#panelContainer").height();
      $('#panelContainer').css({top: 'calc(((100vh -'+(panelContainerHeight * 2)+') / 2) - 24px)'});
      $('#panelContainer2').css({bottom: 'calc(((100vh -'+(panelContainerHeight * 2)+') / 2) - 10px)'});
    }
    }
    $("#PanelViewerBackground").on("click", function(e) {
      e.stopImmediatePropagation();
      if (e.target.id == "PanelViewerBackground" || e.target.id == "panelContainer") {
        panelShortcutClose('alphaPanelViewer');
      }
    })
  }, 20);
}

function createPanelImage(panel, counter) {
  document.querySelector("#generated"+panel).style.display = "block";
  html2canvas(document.getElementById("generated"+panel), {
    }).then(function (canvas) {
      $("#panel"+counter).append(canvas);
  });
  document.querySelector("#generated"+panel).style.display = "none";
}


// ---------------- RIGHT CLICK CONTROLS ----------------------


function panelShortcutOpen(thisObject, Caller, key, Command) {
  if (Caller == "panelViewer") {
    thisPanelShortcut = thisObject;
  } else {
    thisPanelShortcut = thisObject.target;
  }
  openThisPanel(thisPanelShortcut);
}

function panelShortcutOpeninNewWindow(Caller, RCCommand, thisObject) {
  var thisPanelName = Caller.target.id;
  var fullscreenPanelLoad = '../../Panels/'+thisPanelName+'/'+thisPanelName+'.html';
  const { BrowserWindow } = require('electron').remote
  let newChildWindow = new BrowserWindow({ width: 1000, height: 800, frame: false, webPreferences: {experimentalFeatures: true,nodeIntegration: true,webviewTag: true}})
  newChildWindow.on('closed', () => {
    newChildWindow = null
  })
  newChildWindow.loadURL(`file://${__dirname}/`+fullscreenPanelLoad)
  newChildWindow.webContents.on('did-finish-load', function() {
    newChildWindow.show();
  })
}


function panelShortcutClose(Caller, RCCommand) {
  if (RCCommand) {var panelToRemove = Caller.target.id;
  } else {var panelToRemove = Caller;}
  var PanelParent = document.querySelector("#centralContentBoxFullscreenMaster");
  var PanelChild = document.getElementById(panelToRemove+"Parent");
  if (panelToRemove == displayedPanelId) {$(".dropdownMain").show();$('.tabContainer, .dropTabSwitcher').hide();}
  setTimeout(function() {
    PanelParent.removeChild(PanelChild);
    openPanels = openPanels.filter(item => item != panelToRemove);
    if (displayedPanelId == panelToRemove) {
      displayedPanelId = undefined;
      displayedPanel = undefined;
    }
    if (displayedPanelId == 'alphaPanelViewer') {
      openPanelManager();
    }
    panelCount--;
    document.getElementById(panelToRemove).style.cssText = "color:";
  }, 100);
}

function panelShortcutSecure(Caller, RCCommand) {

  if ($("#panelSecureContainer")) {$("#panelSecureContainer").remove()}
  if (RCCommand == "alreadySet") {securePlaceholder = "Enter Password";} 
  else {securePlaceholder = "Set a Password";}

  panelSecureEntryContainer = document.createElement('div');
  panelSecureEntryContainer.setAttribute("class", "panelSecureContainer");
  panelSecureEntryContainer.setAttribute("id", "panelSecureContainer");
  panelSecureEntryContainer.setAttribute("dontClose", "true");
  document.body.appendChild(panelSecureEntryContainer)

  secureIcon = document.createElement('i');
  secureIcon.setAttribute("class", "panelSecureIcon fas fa-lock");
  secureIcon.setAttribute("id", "panelSecureIcon");
  panelSecureEntryContainer.appendChild(secureIcon);

  secureInput = document.createElement('input');
  secureInput.setAttribute("class", "panelSecureInput");
  secureInput.setAttribute("id", "panelSecureInput");
  secureInput.setAttribute("placeholder", securePlaceholder);
  secureInput.setAttribute("type", "password");
  panelSecureEntryContainer.appendChild(secureInput);

  secureInput.addEventListener('input', e => {
    if (secureInput.value != '') {
      secureIcon.setAttribute("class", "panelSecureIcon fas fa-sign-in-alt");secureIcon.style.cursor = "pointer";
    } else {
      secureIcon.setAttribute("class", "panelSecureIcon fas fa-lock");secureIcon.style.cursor = "";
    }
  })
  $(".panelSecureIcon fas fa-sign-in-alt").on("click", function() {panelPasswordManager();})
  $("#panelSecureInput").keypress(function(e) {if (e.keyCode === 13) {panelPasswordManager();}})

  setTimeout(function() {
    OffClickRemoveSecureEntry();
  }, 100);

  function panelPasswordManager() {
    if (RCCommand == "alreadySet") {
      panelProperties = PropertiesReader(panelLocation+'/'+Caller.id+"/"+Caller.id+".properties");
      panelPassword = panelProperties.get('secure.'+alreadyLoggedIn);
      if (panelPassword == passwordHash($("#panelSecureInput").val())) {
        panelSecureEntryContainer.remove();
        document.getElementById("centralContentBoxFullscreenMaster").style.display="grid";
        newPanel();
        openPanels.push(Caller.id);
        displayPanel(Caller);
      } else {secureInput.style.border = "1px solid red"};
    } else {
      panelProperties = PropertiesReader(panelLocation+'/'+Caller.target.id+"/"+Caller.target.id+".properties");
      panelProperties.set('secure.'+alreadyLoggedIn, passwordHash($("#panelSecureInput").val()));
      panelProperties.save(panelLocation+'/'+Caller.target.id+"/"+Caller.target.id+".properties", function then (err, data) {
        panelSecureEntryContainer.remove();
      });
    }
  }
}

function OffClickRemoveSecureEntry() {
  $(document).on("click",function(e) {
    var el = e.target;
    do {if (el.hasAttribute && el.hasAttribute("dontClose")) {return;}
    } while (el = el.parentNode);
    $("#panelSecureContainer").hide();
    $(document).off("click");
  });
}

function homepageBoxPanelView() {
  openThisPanel($("#alphaPanelViewer")[0]);
}



function panelManagerCloseAllPanels(Caller, RCCommand) {
  var panelBeingRemoved = openPanels;
  panelBeingRemoved.forEach(function(panel) {
    panelShortcutClose(panel);
  })
}
function panelManagerViewOpenPanels(Caller, RCCommand) {
  openThisPanel(Caller.target);
}



$(document).ready(readPanelFolder)