var fs = require('fs-extra');
var path = require('path');
var PropertiesReader = require('properties-reader');
const html2canvas = require('../../node_modules/html2canvas');

///////////////////////////////////////
// LOADING OF PANEL FOLDER AND IGNORING 'alpha' in name
///////////////////////////////////////

function readPanelFolder() {
  var panelLocation = path.join(__dirname, '../../Panels');
  fs.readdir(panelLocation, function(err, panel) {
    if (panel.length < 1) {
      document.getElementById("bottomuni").innerHTML = "I Cant Find Any Panels?";
    } else {
      for (var i=0; i<panel.length; i++) {
        if (panel[i].toLowerCase().indexOf("alpha") === -1) {
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


function openThisPanel(thisPanelShortcut, openNow, panelOverlay) {
  window.thisPanelName = thisPanelShortcut.id;

  if (openPanels.includes("alphaPanelViewer")) {
    panelShortcutClose("alphaPanelViewer");
  } else if (thisPanelName == "alphaPanelViewer") {
    openPanelManager();
  }

  if (openPanels.includes(thisPanelName)) {
    if (displayedPanelId == thisPanelName) {
      minimizePanel(displayedPanel, thisPanelShortcut);
      displayedPanel = undefined;
      displayedPanelId = undefined;
    } else {
      displayPanel(thisPanelShortcut);
    }
  } else {
    document.getElementById("centralContentBoxFullscreenMaster").style.display="grid";
    newPanel();
    openPanels.push(thisPanelName);
    displayPanel(thisPanelShortcut);
  }
}

function displayPanel(thisPanelShortcut) {
  if (displayedPanel != null) {
    minimizePanel(displayedPanel)
  }
  thisPanelShortcut.style.cssText = "background-color: rgba(173, 173, 168, 0.85); color: cyan;";
  displayedPanel = document.getElementById("generated"+thisPanelName);
  displayedPanel.style.cssText = "display: block; z-index: 100";
  displayedPanelId = thisPanelName;
  previousPanel = displayedPanelId;
}

function minimizePanel(displayedPanel) {
  previousPanel = displayedPanelId;
  displayedPanel.style.cssText = "display: none";
  document.getElementById(displayedPanelId).style.cssText = "background-color:; color: cyan";
}

function newPanel() {
  panelCount++;
  var newPanelCreator = document.getElementById('centralContentBoxFullscreenMaster');
  var newPanelCreation = document.createElement('div');
  newPanelCreation.setAttribute("id", "generated"+thisPanelName);
  newPanelCreation.setAttribute("class", "centralContentBoxFullscreenMaster");
  newPanelCreation.style.zIndex = "100";
  if ($("#"+thisPanelName).attr("Custom") != "transparent") {
    newPanelCreation.style.background = "rgb(90, 90, 90)";
  }
  newPanelCreator.appendChild(newPanelCreation);

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

        if (panel == "Internet") {
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

    // $('.miniPanel').css({width: 'calc(100vw / '+(panelCount - 0.5)+')', height: 'calc(100vh / '+(panelCount - 0.5)+')'});
    // panelContainerHeight = $("#panelContainer").height();
    // $('#panelContainer').css({top: 'calc(50% - ('+panelContainerHeight+'px) / 2)'});

    }
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
  setTimeout(function() {
    let thisNewPanelWindow = window.open(fullscreenPanelLoad, "", "height=650px,width=850px");
  }, 300);
}

function panelShortcutClose(Caller, RCCommand) {
  if (RCCommand) {var panelToRemove = Caller.target.id;
  } else {var panelToRemove = Caller;}
  var PanelParent = document.querySelector("#centralContentBoxFullscreenMaster");
  var PanelChild = document.querySelector("#generated"+panelToRemove);
  setTimeout(function() {
    PanelParent.removeChild(PanelChild);
    openPanels = openPanels.filter(item => item != panelToRemove);
    if (displayedPanelId == 'alphaPanelViewer') {
      openPanelManager();
    }
    if (displayedPanelId == panelToRemove) {
      displayedPanelId = undefined;
      displayedPanel = undefined;
    }
    panelCount--;
    document.getElementById(panelToRemove).style.cssText = "color:";
  }, 100);
}




$(document).ready(readPanelFolder)