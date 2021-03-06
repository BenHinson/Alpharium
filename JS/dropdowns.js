var fs = require('fs-extra');
var path = require('path');

var dropdownOpen = false;
var selectedColumn = false;  // false = left column

// setTimeout(function() {
//   dropdownMainRefresh();
// }, 100);

function readDropdownFolder() {
  setTimeout(function() {
  window.dropdownFileLocation = path.join(__dirname, '../../Dropdowns');
  fs.readdir(dropdownFileLocation, function(err, items) {
    for (var i=0; i<items.length; i++) {
      // Loading from the properties file
      var properties = PropertiesReader(dropdownFileLocation+'/'+items[i]+"/"+items[i]+".properties");
      window.dropdownColour = properties.get('properties.colour');
      window.dropdownLocation = properties.get('properties.location');
      window.dropdownIconClass = properties.get('properties.iconClass');
      window.dropdownIcon = properties.get('properties.icon');

      var dropDownParent = document.getElementById('dropLocationChild');
      var dropDownChild = document.createElement('a');
      dropDownChild.setAttribute("id", items[i]);
      dropDownChild.setAttribute("class", "dropdownButton");
      dropDownChild.setAttribute("onclick", "openDropdown(this)");
      dropDownParent.appendChild(dropDownChild);
      if (dropdownLocation == "first") {
        firstDropItem = dropDownParent.firstChild;
        dropDownParent.insertBefore(dropDownChild, firstDropItem);
      }
      var iconParent = document.getElementById(items[i]);
      var iconChild = document.createElement('i');
      iconChild.setAttribute("id", items[i]+"Icon");
      if(dropdownIcon && dropdownIconClass) {
        iconChild.setAttribute("class", "fas "+dropdownIcon+" "+dropdownIconClass);
      } else {
        iconChild.setAttribute("class", "fas fa-chevron-down dropdownIcon");
      }
      iconChild.style.color = dropdownColour;
      iconChild.style.borderBottom = "1px solid "+dropdownColour;
      iconParent.appendChild(iconChild);
      var dropInfoParent = document.getElementById(items[i]);
      var dropInfoChild = document.createElement('a');
      dropInfoChild.setAttribute("class", "quickAccessInfo");
      if (items[i] == "UserControl") {
        var userProperties = PropertiesReader(__dirname + '/../../Alpha/Properties/user.properties');
        dropInfoChild.innerHTML = userProperties.get('alphariumproperties.loggedin');
      } else {
        dropInfoChild.innerHTML = items[i];
      }
      dropInfoChild.style.borderBottom = "1px solid "+dropdownColour;
      dropInfoParent.appendChild(dropInfoChild);
    }
  }) 
  }, 100);
  
}

function changeColumn() {selectedColumn = !selectedColumn;};

function openDropdown(dropdown) {
  thisDropDown = dropdown.id;
  selectedColumn = false;
  if (!dropdownOpen) {
    window.dropTypeProperties = PropertiesReader(dropdownFileLocation+'/'+thisDropDown+"/"+thisDropDown+".properties");
    window.dropdownSide = dropTypeProperties.get('properties.side');
    window.dropdownType = dropTypeProperties.get('properties.type');
    window.dropdownSearch = dropTypeProperties.get('properties.search');
    window.dropdownOrder = dropTypeProperties.get('properties.order');

    var ObjectDropdownParent = document.getElementById('dropdownLocation');
    var ObjectDropdownChild = document.createElement('div');
    ObjectDropdownChild.setAttribute("id", "objectDropdown");
    ObjectDropdownParent.appendChild(ObjectDropdownChild);

    var dropdownPosition = dropdown.getBoundingClientRect();
    var dropdownOffset = document.getElementById("dropLocationChild").getBoundingClientRect();
    if (dropdownSearch) {
      $("#dropItemsOL").css({"margin-top": "54px", "left":dropdownPosition.left - dropdownOffset.left});
      $("#objectDropdown").css({"left": "64px", "left":dropdownPosition.left - dropdownOffset.left});
      var searchBarParent = document.getElementById('objectDropdown');
      var searchBarChild = document.createElement('input');
      searchBarChild.setAttribute("type", "text");
      searchBarChild.setAttribute("id", "objectSearch");
      searchBarChild.setAttribute("class", "fas fas-search");
      searchBarChild.setAttribute("placeholder", thisDropDown+"...");
      searchBarChild.setAttribute("onkeyup", "searchingFunction()");
      searchBarChild.setAttribute("dontClose", "true");
      dropdownBorderColour = dropdown.children[0].style.color;
      searchBarChild.style.borderBottom = "1px solid "+dropdownBorderColour;
      searchBarParent.appendChild(searchBarChild);
    } else {
      $("#dropItemsOL").css({"margin-top": "24px", "left":dropdownPosition.left - dropdownOffset.left});
    }

    if (dropdownSide == "both") {
      var sideSelectorParent = document.getElementById('objectDropdown');
      var sideSelectorChild = document.createElement('label');
      sideSelectorChild.setAttribute("class", "objectSearchColumnSelect");
      sideSelectorChild.setAttribute("id", "objectSearchColumnSelect");
      sideSelectorParent.appendChild(sideSelectorChild);

      var SideSelectorCheckboxParent = document.getElementById('objectSearchColumnSelect');
      var SideSelectorCheckboxChild = document.createElement('input');
      SideSelectorCheckboxChild.setAttribute("type", "checkbox");
      SideSelectorCheckboxChild.setAttribute("id", "objectSearchColumnCheckbox");
      SideSelectorCheckboxChild.setAttribute("onclick", "changeColumn()");
      SideSelectorCheckboxChild.setAttribute("dontClose", "true");
      SideSelectorCheckboxParent.appendChild(SideSelectorCheckboxChild);
  
      var SideSelectorSliderParent = document.getElementById('objectSearchColumnSelect');
      var SideSelectorSliderChild = document.createElement('span');
      SideSelectorSliderChild.setAttribute("id", "sideSelectorSlider");
      SideSelectorSliderChild.setAttribute("class", "sideSelectorSlider");
      SideSelectorSliderChild.setAttribute("dontClose", "true");
      SideSelectorSliderParent.appendChild(SideSelectorSliderChild);
    }


    fs.readdir(dropdownFileLocation+'/'+thisDropDown, function(err, items) {
      if (dropdownType == "text") {
        var dropdownContent = dropTypeProperties.get('properties.content');
        dropdownContentSplit = dropdownContent.split(',');
        var dropdownOnclick  = dropTypeProperties.get('properties.onclick');
        dropdownContentSplit.forEach(function(object, index) {
          if (object != ">") {
            var thisAParent = document.getElementById('dropItemsOL');
            var thisLIParent = document.createElement('li');thisLIParent.setAttribute("id", object+"LI");
            thisAParent.appendChild(thisLIParent);
            var thisLIChild = document.getElementById(object+'LI');
            var thisAChild = document.createElement('a');thisAChild.innerHTML = object;thisAChild.setAttribute("id", "dropItemsA");
            if (!dropdownOnclick) {
              thisAChild.setAttribute("onclick", thisDropDown+"Selected(this)");
            }
            if (dropdownContentSplit[index + 1]) {
              var nextDropOption = dropdownContentSplit[index + 1];
              if (nextDropOption.indexOf('>') > - 1) {
                thisAChild.setAttribute("moreOptions", "true");
                var popoutIcon = document.createElement('i');popoutIcon.setAttribute("class", "dropdownMoreIcon fas fa-angle-right");
                thisLIChild.appendChild(popoutIcon);
              }
            }
            thisAChild.setAttribute("DDCommand", "true");
            thisAChild.setAttribute("dontClose", "true");
            thisLIChild.appendChild(thisAChild);
          }
        })
      
      } else {
        if (items.length < 2) {
          var errorParent = document.getElementById("dropItemsOL");
          var errorChild = document.createElement('li'); errorChild.setAttribute ("id", "errorMessageParent");
          errorParent.appendChild(errorChild);
          var errorMessageParent = document.getElementById("errorMessageParent");
          var errorMessageChild = document.createElement('a'); errorMessageChild.innerHTML = "I cant find any "+ thisDropDown;
          errorMessageChild.setAttribute("id", "dropItemsA");
          errorMessageParent.appendChild(errorMessageChild);
        } else {
          items.forEach(function(object) {
            if (object.toLocaleLowerCase().indexOf(".properties") === -1) {
              var thisAParent = document.getElementById('dropItemsOL');
              var thisLIParent = document.createElement('li');thisLIParent.setAttribute("id", object+"LI");
              thisAParent.appendChild(thisLIParent);
              var thisLIChild = document.getElementById(object+'LI');
              var thisAChild = document.createElement('a');thisAChild.innerHTML = object;thisAChild.setAttribute("id", "dropItemsA");thisAChild.setAttribute("onclick", thisDropDown+"Selected(this)");thisAChild.setAttribute("dontClose", "true");
              thisLIChild.appendChild(thisAChild);
            }
          })
        }
      }
      dropdownOpen = !dropdownOpen;
      if (dropdownOrder == "alphabetical") {
        sortListAlphabetical();
      }
      if (dropdownOnclick) {
        window[thisDropDown+"Listener"](this);
      }
      moreOptionsListener();
      dropdownOpenCloser();
    })
  } else {
    closeDropdown();
  }
}
function closeDropdown() {
  var removeNode = document.querySelector("#objectDropdown");
  removeNode.parentNode.removeChild(removeNode);
  var removeDropNode2 = document.getElementById("dropItemsOL");
  while (removeDropNode2.firstChild) {
    removeDropNode2.removeChild(removeDropNode2.firstChild);
  }
  dropdownOpen = !dropdownOpen;
  $("#popoutItemsOL").empty();
}
function dropdownOpenCloser() {
  $(document).on("click",function(e) {
    var el = e.target;
    do {
      if (el.hasAttribute && el.hasAttribute("dontClose")) {
        return;
      }
    } while (el = el.parentNode);

    $(document).off("click");
    if (document.querySelector("#objectDropdown")) {
      closeDropdown();
    }
  });
}


function searchingFunction() {
  var input, filter, ol, li, a, i, txtValue;
  input = document.getElementById('objectSearch');
  filter = input.value.toUpperCase();
  ol = document.getElementById("dropItemsOL");
  li = ol.getElementsByTagName('li');
  for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName("a")[0];
      txtValue = a.innerHTML || a.innerHTML;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
          li[i].style.display = "";
      } else {
          li[i].style.display = "none";
      }
  }
}

function sortListAlphabetical() {
  var list, i, switching, b, shouldSwitch, c;
  list = document.getElementById("dropItemsOL");
  switching = true;
  while (switching) {
    switching = false;
    b = list.getElementsByTagName("li");
    c = list.getElementsByTagName("a");
    for (i = 0; i < (c.length - 1); i++) { 
      shouldSwitch = false;
      if ((c[i].innerHTML) > (c[i + 1].innerHTML)) {
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      b[i].parentNode.insertBefore(b[i + 1], b[i]);
      switching = true;
    }
  }
}

// ------------------------------------------------------------
function moreOptionsListener() {
  $("[moreOptions]").on("mouseenter", function(e) {
    if (e.currentTarget.hasAttribute("moreOptions")) {
      var parentPopRaw = e.currentTarget;
      window.parentPopout = e.currentTarget.innerHTML.split(' ').join('').replace('<iclass="dropdownMoreIconfasfa-angle-right"></i>','');
      var popoutLocation = parentPopRaw.getBoundingClientRect();
      var dropdownOffset = document.getElementById("dropLocationChild").getBoundingClientRect();
      $("#popoutItemsOL").css({"margin-top": popoutLocation.top, "left":popoutLocation.right - dropdownOffset.left, "width":"200px"});
      var moreOptionsOnclick = dropTypeProperties.get('properties.Add'+parentPopout+"onclick");
      var moreOptions = dropTypeProperties.get('properties.Add'+parentPopout);
      var customDropdown = dropTypeProperties.get('properties.Add'+parentPopout+"Content");
      $("#popoutItemsOL").empty();
      if (customDropdown && customDropdown == "switchAccounts") {
        var AccountProperties = PropertiesReader(__dirname + '/../../Alpha/Properties/user.properties');
        var accountSwitchAccounts = AccountProperties.get(alreadyLoggedIn+'.switchAccounts');
        if (accountSwitchAccounts) {
          accountSwitchAccountsSplit = accountSwitchAccounts.split(',');
          generateDropdownItems(accountSwitchAccountsSplit, moreOptionsOnclick);
        }
      }
      moreOptionsSplit = moreOptions.split(',');
      generateDropdownItems(moreOptionsSplit, moreOptionsOnclick);

      // $("[popoutOption]").on("mouseleave", function() {
      //   var allHover = document.querySelectorAll(":hover"); 
      //   var hoveringOver = allHover[allHover.length-1];
      //   if (hoveringOver.hasAttribute("popoutOption")) {} else {$("#popoutItemsOL").empty();}
      // })
    }
  })
  $("[moreOptions]").on("mouseleave", function(e) {
    var allHover = document.querySelectorAll(":hover"); 
    var hoveringOver = allHover[allHover.length-1];
    if (hoveringOver.hasAttribute("popoutOption")) {} else {$("#popoutItemsOL").empty();}
  });
}
function generateDropdownItems(splitItems, moreOptionsOnclick) {
  splitItems.forEach(function(popObject, index) {
    var popoutItemsParent = document.getElementById("popoutItemsOL");
    var popoutLIParent = document.createElement('li');popoutLIParent.setAttribute("id",popObject+"LI");
    popoutItemsParent.appendChild(popoutLIParent);
    var popoutLIParent = document.getElementById(popObject+'LI');
    window.popoutAChild = document.createElement('a');popoutAChild.innerHTML = popObject;popoutAChild.setAttribute("id", "dropItemsA");popoutAChild.setAttribute("dontClose", "true");popoutAChild.setAttribute("popoutOption", "true");
    popoutLIParent.appendChild(popoutAChild);
    if (moreOptionsOnclick) {
      if (moreOptionsOnclick.includes("custom")) {
        popoutAChild.setAttribute("ddcommand", "true");
        window[thisDropDown+"Listener"](popoutAChild);
      }
      if (moreOptionsOnclick.includes("customSpecific")) {
        if (popoutAChild.innerHTML != "Add New User") {
          popoutAChild.removeAttribute("ddcommand");
          popoutAChild.setAttribute("customSpecific", "true");
        }
      }
      if (moreOptionsOnclick.includes("First")) {
        popoutLIParent.parentElement.insertBefore(popoutLIParent, popoutLIParent.parentElement.firstChild);
      }
    }
  })
}

// var eElement; // some E DOM instance
// var newFirstElement; //element which should be first in E

// eElement.insertBefore(newFirstElement, eElement.firstChild);
// ------------------------------------------------------------


function dropdownMainRefresh() {
  $("#dropLocationChild").empty();
  $("#popoutItemsOL").empty();
  readDropdownFolder();
}

// PLACEMENT OF THE TOOLS EITHER LEFT OR RIGHT

// ------------------------------------------------------------

var leftToolOrder = 0;
var rightToolOrder = 0;

function ToolsSelected(tool) {
  toolName = tool.innerHTML;
  var toolLoad   = '../../Dropdowns/Tools/'+toolName+'/'+toolName+'.html';

  if (!selectedColumn) {addThisLeftTool();}
  else {addThisRightTool();}

  function addThisLeftTool() {
    $("#boxL").append($('<div id="toolOrderL'+leftToolOrder+'" class="toolBox"></div>').load(toolLoad));
    document.getElementById("toolOrderL"+leftToolOrder).style.order = leftToolOrder;
    leftToolOrder++;
  }
  function addThisRightTool() {
    $("#boxR").append($('<div id="toolOrderR'+rightToolOrder+'" class="toolBox"></div>').load(toolLoad));
    document.getElementById("toolOrderR"+rightToolOrder).style.order = rightToolOrder;
    rightToolOrder++;
  }
}
function closeThisTool (objectToClose) {
  var parentName = objectToClose.parentNode.parentNode.parentNode.id;
  toolToRemove = document.getElementById(parentName).remove();
};
function moveTool (thisTool) {
  var moveDirection = thisTool.title;
  var toolBox = thisTool.parentNode.parentNode.parentNode;
  var thisToolSide = toolBox.parentNode.id;
  var toolSide = thisToolSide.replace("box", "");
  var otherTools = toolBox.parentNode.children;
  totalSideTools = otherTools.length;
  var thisToolPosition = toolBox.style.order;

  if (moveDirection === "Up") {

    if (thisToolPosition == 0) {
      console.log("cannot move up, no object above");
    } else { thisToolPosition--;
      var thisToolId = toolBox.id; 
      $("#"+thisToolId).css("order", thisToolPosition);
      var thisToolIdNum = thisToolId.replace("toolOrder"+toolSide, "");
      thisToolIdNum--;
      toolAbove = $("#toolOrder"+toolSide+thisToolIdNum);
      $("#"+thisToolId).attr("id","toolOrder"+toolSide+thisToolPosition)
      thisToolIdNum++;
      toolAbove.attr("id", "toolOrder"+toolSide+thisToolIdNum);
      toolAbove.css("order",thisToolIdNum);
      }
  } else if (moveDirection === "Down") {

    if (thisToolPosition == otherTools) {
      console.log("cannot move down, no object below");
    } else { thisToolPosition++;
      var thisToolId = toolBox.id; 
      $("#"+thisToolId).css("order", thisToolPosition);
      var thisToolIdNum = thisToolId.replace("toolOrder"+toolSide, "");
      thisToolIdNum++;
      toolAbove = $("#toolOrder"+toolSide+thisToolIdNum);
      $("#"+thisToolId).attr("id","toolOrder"+toolSide+thisToolPosition)
      thisToolIdNum--;
      toolAbove.attr("id", "toolOrder"+toolSide+thisToolIdNum);
      toolAbove.css("order",thisToolIdNum);
      }
  }
};

// -----------------------------------------------------------------------------

function WebpagesSelected(weblink) {
  let link = weblink.innerHTML;
  // require('electron').shell.openExternal('www.'+link);
  openThisPanel(document.getElementById("Browser"));
  setTimeout(function() {
    openInternetWebview('https://www.'+link);
  }, 10)
}

$(document).ready(readDropdownFolder)