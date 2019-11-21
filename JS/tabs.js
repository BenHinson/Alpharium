// ---------------------------------- T A B S   tabs -----------------------------------------
// ---------------------------------- T A B S   tabs -----------------------------------------
// ---------------------------------- T A B S   tabs -----------------------------------------

function panelTabs() {
  $(".newPanelTab, .dropTabSwitcher, .panelTabOpen").unbind();
  $(".newPanelTab").on("click", function() {
    openThisPanel($("#"+displayedPanelId)[0], 'tab');
  })
  $(".dropTabSwitcher").on("click", function() {
    if ($(".dropdownMain").is(':visible')) {
      $(".dropdownMain").hide();
      $('.tabContainer').show();
    } else {
      $(".dropdownMain").show();
      $('.tabContainer').hide();
    }
  })
}

function newTab() {
  displayedPanel.style.cssText = "display: none; z-index: 100";
  var panelParentTab = document.getElementById(thisPanelName+"Parent");
  var newTabCreation = document.createElement('div');
  newTabCreation.setAttribute("id", "generated"+thisPanelName);
  newTabCreation.setAttribute("class", "centralContentBoxFullscreenMaster");
  newTabCreation.setAttribute("tabNumber", panelParentTab.childNodes.length);
  newTabCreation.style.cssText = "display: block; z-index: 100";
  panelParentTab.appendChild(newTabCreation);
  var fullscreenToolLoad = '../../Panels/'+thisPanelName+'/'+thisPanelName+'.html';
  $(newTabCreation).load(fullscreenToolLoad);
  displayedPanel = newTabCreation;
  panelTabManager();
}
function panelTabManager() {
  $("#tabContainer > .panelTabOpen").remove();
  let panelMaster = document.getElementById(thisPanelName+"Parent")
  numberOfOpenTab = panelMaster.querySelectorAll(":scope > #generated"+thisPanelName);
  numberOfOpenTab.forEach(function(tab, index) {
    tabParent = document.getElementById('tabContainer')
    panelTab = document.createElement('div');
    panelTab.setAttribute("id", "panelTabOpen");
    panelTab.setAttribute("class", "panelTabOpen");
    panelTab.setAttribute("tabNum", index);
    tab.setAttribute("tabnumber", index);
    panelTab.innerHTML = thisPanelName;
    tabParent.appendChild(panelTab);
    panelTabClose = document.createElement('div');
    panelTabClose.setAttribute("class", "panelTabClose");
    panelTabClose.setAttribute("title", "Close Tab");
    panelTab.appendChild(panelTabClose);
    panelTabCloseIcon = document.createElement('i');
    panelTabCloseIcon.setAttribute("class", "fas fa-times");
    panelTabClose.appendChild(panelTabCloseIcon);
  })
  shownTabNumber = $(displayedPanel).attr("tabnumber");
  activeTab = document.getElementById("tabContainer").querySelectorAll('[tabnum="'+shownTabNumber+'"]')[0]
  activeTab.style.background = "rgba(173, 173, 168, 0.85)";
  panelListener();
}
function panelListener() {
  $(".panelTabOpen").on("mousedown", function(e) {
    var tabNumber = $(e.target).attr("tabNum");
    if (e.which == 2) {e.stopImmediatePropagation(); e.preventDefault(); closeTab(e);} else {
      if (e.target.id == "panelTabOpen") {
        panelTabToOpen = (document.getElementById(displayedPanelId+"Parent").querySelectorAll('[tabNumber="'+tabNumber+'"]')[0])
        if (panelTabToOpen.style.display == "none") {
          displayedPanel.style.display = "none";
          activeTab.style.background = "";
          panelTabToOpen.style.display = "block";
          e.target.style.background = "rgba(173, 173, 168, 0.85)";
          displayedPanel = panelTabToOpen;
          activeTab = e.target;
        }
      }
    }
  })

  $(".panelTabClose").on("click", function(e) {
    e.stopImmediatePropagation();
    closeTab(e);
  })
}
function closeTab(e) {
  if (e.currentTarget.id != "panelTabOpen") {e = e.currentTarget;} else {e = e.target.childNodes[0]};
  var tabNumber = eval($(e.parentNode).attr("tabNum"));
  panelTabToClose = (document.getElementById(displayedPanelId+"Parent").querySelectorAll('[tabNumber="'+tabNumber+'"]')[0]);
  if (panelTabToClose.style.display == "none") {
    panelTabToClose.remove();
    panelTabManager();
  } else {
    let panelMaster = document.getElementById(thisPanelName+"Parent")
    numberOfOpenTab = panelMaster.querySelectorAll(":scope > #generated"+thisPanelName);
    panelTabToClose.remove();
    if (numberOfOpenTab.length == 1) {
      activeTab = null;
      panelShortcutClose(displayedPanelId);
    } else {
      if ((document.getElementById(displayedPanelId+"Parent").querySelectorAll('[tabNumber="'+ [tabNumber + 1] +'"]')[0])) {
        panelTabToOpen = (document.getElementById(displayedPanelId+"Parent").querySelectorAll('[tabNumber="'+ [tabNumber + 1] +'"]')[0])
      } else {
        panelTabToOpen = (document.getElementById(displayedPanelId+"Parent").querySelectorAll('[tabNumber="'+ [tabNumber - 1] +'"]')[0])
      }
      panelTabToOpen.style.display = "block";
      e.parentNode.style.background = "rgba(173, 173, 168, 0.85)";
      displayedPanel = panelTabToOpen;
      activeTab = e.parentNode;
      panelTabManager();
    }
  }
}
