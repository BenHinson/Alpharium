var PropertiesReader = require('properties-reader');
var properties = PropertiesReader(__dirname + '/../../Alpha/Properties/user.properties');

logoutWarningOpen = false;

// CREATION OF WARNING PANEL | CALL WITH warningPanelSetup("title", "message", "option1", "option2");

function warningPanelSetup(title, message, decline, accept) {
  if (!logoutWarningOpen) {
    logoutWarningOpen = !logoutWarningOpen;
    document.getElementById("centralContentBoxFullscreenMaster").style.display="grid";
    
    var newPanelCreator = document.getElementById('centralContentBoxFullscreenMaster');
    var newPanelCreation = document.createElement('div');
    newPanelCreation.setAttribute("id", "warningCentralPanel");
    newPanelCreation.setAttribute("class", "centralContentBoxFullscreenMaster");
    newPanelCreation.style.zIndex = "100";
    newPanelCreator.appendChild(newPanelCreation);
    var fullscreenWarningLoad = '../../Panels/alphaPanelWarning/alphaPanelWarning.html';
    $(newPanelCreation).load(fullscreenWarningLoad);
    $(newPanelCreation).css("display", "none");

    setTimeout(function() {
      document.getElementById("warningBoxTitle").innerHTML = title;
      document.getElementById("warningBoxMessage").innerHTML = message;
      document.getElementById("warningBoxAccept").innerHTML = accept;
      document.getElementById("warningBoxDecline").innerHTML = decline;
      $(newPanelCreation).css("display", "block");
    }, 150)

  } else {
    var removeNode = document.querySelector("#centralContentBoxFullscreenMaster");
    var removeWarning = document.querySelector("#warningCentralPanel");
    removeNode.removeChild(removeWarning);
    logoutWarningOpen = !logoutWarningOpen;
  }
}


// --------------------------------------------------------------------


