var fs = require('fs');
var path = require('path');
var PropertiesReader = require('properties-reader');

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
}



///////////////////////////////////////
// CREATION OF PANELS AND PANEL MANAGER
///////////////////////////////////////


var displayedPanelId
var displayedPanel
var openPanels = [];
var panelCount = 0;


function openThisPanel(thisPanelShortcut) {
  document.getElementById("centralContentBoxFullscreenMaster").style.display="grid";
  window.thisPanelName = thisPanelShortcut.id;
    if (openPanels.includes(thisPanelName)) {
        if (thisPanelName === displayedPanelId) {
          document.getElementById("generated"+thisPanelName).style.display="none";
          displayedPanelId = undefined;
          displayedPanel = undefined;
          thisPanelShortcut.style.cssText = "background-color: ; color: cyan";
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
      // thisPanelShortcut.style.borderColor="cyan";
      // document.getElementById(thisPanelName).style.cssText = "background-color: rgba(173, 173, 168, 0.85); color: cyan"; 
      thisPanelShortcut.style.cssText = "background-color: rgba(173, 173, 168, 0.85); color: cyan";
      openPanels.push(thisPanelName);
      if (displayedPanel == null) {
        displayedPanel = document.getElementById("generated"+thisPanelName);
        displayedPanelId = thisPanelName;
      } else {
        displayedPanel.style.display="none";
        displayedPanel = document.getElementById("generated"+thisPanelName);
        document.getElementById(displayedPanelId).style.cssText = "background-color:; color: cyan";
        displayedPanelId = thisPanelName;
      }
    }
}

function newPanel() {
  panelCount++;
  var newPanelCreator = document.getElementById('centralContentBoxFullscreenMaster');
  var newPanelCreation = document.createElement('div');
  newPanelCreation.setAttribute("id", "generated"+thisPanelName);
  newPanelCreation.setAttribute("class", "centralContentBoxFullscreenMaster");
  newPanelCreation.style.zIndex = "100";
  newPanelCreation.style.background = "rgb(90, 90, 90)";
  newPanelCreator.appendChild(newPanelCreation);

  var fullscreenToolLoad = '../../Panels/'+thisPanelName+'/'+thisPanelName+'.html';
  $(newPanelCreation).load(fullscreenToolLoad);
}



$(document).ready(readPanelFolder)