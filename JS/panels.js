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


function openThisPanel(thisPanelShortcut, openNow, panelOverlay) {
  if (thisPanelShortcut.id == "alphaPanelViewer") {
    if (openPanels.includes("alphaPanelViewer")) {
      panelShortcutClose("alphaPanelViewer");
    } else {openPanelManager();}
  }
  document.getElementById("centralContentBoxFullscreenMaster").style.display="grid";
  window.thisPanelName = thisPanelShortcut.id;
    if (openPanels.includes(thisPanelName)) {
        if (thisPanelName === displayedPanelId) {
          if (openNow != "openNow") {
            if (panelOverlay != "displayOntop") {
              document.getElementById("generated"+thisPanelName).style.display="none";
              displayedPanelId = undefined;
              displayedPanel = undefined;
              thisPanelShortcut.style.cssText = "background-color: ; color: cyan";
            } else {
              displayedPanelId = undefined;
              displayedPanel = undefined;
              thisPanelShortcut.style.cssText = "background-color: ; color: cyan";
            }
          }
        } else {
          if (displayedPanelId) {
            document.getElementById(displayedPanelId).style.cssText = "background-color: ; color: cyan";
            displayedPanel.style.display="none";
          }
          displayedPanel = document.getElementById("generated"+thisPanelName);
          document.getElementById("generated"+thisPanelName).style.display="block";
          thisPanelShortcut.style.cssText = "background-color: rgba(173, 173, 168, 0.85); color: cyan";
          displayedPanelId = thisPanelName;
        }
    } else {
      newPanel();
      document.getElementById("generated"+thisPanelName).style.display="block";
      thisPanelShortcut.style.cssText = "background-color: rgba(173, 173, 168, 0.85); color: cyan";
      openPanels.push(thisPanelName);
      setTimeout(function() {
        if (displayedPanel == null) {
          displayedPanel = document.getElementById("generated"+thisPanelName);
          displayedPanelId = thisPanelName;
        } else {
          displayedPanel.style.display="none";
          displayedPanel = document.getElementById("generated"+thisPanelName);
          document.getElementById(displayedPanelId).style.cssText = "background-color:; color: cyan";
          displayedPanelId = thisPanelName;
        }
      },20);
    }
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

function hidePanel() {

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
  if (displayedPanelId != "alphaPanelViewer") {
    var counter = 0;
    $("#panelContainer").empty();
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
          var panelContainer = document.getElementById("panelContainer");
          panelMini = document.createElement('div');
          panelMini.setAttribute("class", "miniPanel");
          panelMini.setAttribute("id", "panel"+counter);
          panelContainer.appendChild(panelMini);

          if (panel == "Internet") {
            panelMini.innerHTML = "Preview Not Supported";
          } else {
            createPanelImage(panel, counter);
          }
        }
      })

      $('.miniPanel').css({width: 'calc(100vw / '+(panelCount - 0.5)+')', height: 'calc(100vh / '+(panelCount - 0.5)+')'});
      panelContainerHeight = $("#panelContainer").height();
      $('#panelContainer').css({top: 'calc(50% - ('+panelContainerHeight+'px) / 2)'});
      }
    }, 10);
  }
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
  thisPanelShortcut = thisObject.target;
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
  if (RCCommand) {
    var panelToRemove = Caller.target.id;
  } else {
    var panelToRemove = Caller;
  }
  var PanelParent = document.querySelector("#centralContentBoxFullscreenMaster");
  var PanelChild = document.querySelector("#generated"+panelToRemove);
  setTimeout(function() {
    PanelParent.removeChild(PanelChild);
    openPanels.pop(panelToRemove);
    if (displayedPanelId == panelToRemove) {
      displayedPanelId = undefined;
      displayedPanel = undefined;
    }
    panelCount--;
    document.getElementById(panelToRemove).style.cssText = "color:";
  }, 100);
}




$(document).ready(readPanelFolder)