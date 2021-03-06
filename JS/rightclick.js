// HTML with attribute of 'rc-name' |  right-click-name of the index in rightclick.config
// rc-name="centralContentBox"

var PropertiesReader = require('properties-reader');
var properties = PropertiesReader(__dirname + '/../../Alpha/rightclick.config');

setTimeout(function() {
  initRightClick();
}, 500);


function initRightClick() {
  $("[rc-name] .centralContentBoxFullscreenMaster").on("contextmenu", function(e) {e.stopPropagation();})
  $("[rc-name]").on("contextmenu", function(e) {
    e.stopImmediatePropagation();
    e.preventDefault();
    if (e.currentTarget.hasAttribute("rc-name")) {
      var thisObject = e.currentTarget.getAttribute("rc-name");
      rightClickCreator(e, thisObject);
      windowWidth = $("body").width();
      windowHeight = $("body").height();
      thisDropdownHeight = (optionLength*25);
      if ((windowWidth < (e.pageX + 181)) && (windowHeight < (e.pageY + thisDropdownHeight))) {
        $("#rightClickContainer").css("left", (e.pageX - (181)));
        $("#rightClickContainer").css("top", (e.pageY - (thisDropdownHeight + 1)));
      } else if (windowHeight < (e.pageY + thisDropdownHeight)) {
        $("#rightClickContainer").css("left", (e.pageX - 1));
        $("#rightClickContainer").css("top", (e.pageY - (thisDropdownHeight + 1)));
      } else if (windowWidth < (e.pageX + 181)) {
        $("#rightClickContainer").css("left", (e.pageX - (181)));
        $("#rightClickContainer").css("top", (e.pageY - 1));
      } else {
        $("#rightClickContainer").css("left", (e.pageX - 1));
        $("#rightClickContainer").css("top", (e.pageY - 1));
      }
      $("#rightClickContainer").fadeIn(100, startFocusOut());
    }
  });
}

function startFocusOut() {
  setTimeout(function() {
    $(document).on("click",function(){
      $("#rightClickContainer").hide();
      $(document).off("click");
    });
  },20)
}


function rightClickCreator(e, thisObject) {
  var thisObjectSplit = thisObject.split(',');
  var removeDropdown = $("#rightClickContainer").children();
  removeDropdown.remove();
  var dropContainer = document.getElementById('rightClickContainer');
  window.options = 0;
  thisObjectSplit.forEach(function(thisObject) {
    var properties = PropertiesReader(__dirname + '/../../Alpha/rightclick.config');
    var rightClickItemsRaw = properties.get(thisObject);
    window.rightClickItems = rightClickItemsRaw.split(','); //Splits properties after each ','
    rightClickItems.forEach(function(item) {
      var newOption = document.createElement('li'); newOption.innerHTML = item;
      newOption.setAttribute("key", thisObject);
      dropContainer.appendChild(newOption);
      options++;
    });
    window.optionLength = options;
  })
  $("#rightClickContainer > li").unbind();
  $("#rightClickContainer > li").click(function() {
    var RCCommand = ($(this).text().split(' ').join('')); // Right Click Command
    var key = $(this).attr("key");
    // console.log(key+RCCommand);
    window[key+RCCommand](e, RCCommand, thisObject, key);
    // Calls the function that has the same name (with spaces removed) as the list in the rightclick.config file + command ie:'homepageBoxDemo(e, command, object)' as long as the file is linked.
  });
}

function homepageBoxDemo(thisObject, Caller, key, Command) {
  // console.log(thisObject, Caller, key, Command);
  console.log(thisObject);  // Callers CurrentTarget rightclick.config key
  console.log(Caller);  // The Right-Click Caller Raw
  console.log(key)      // The key caller, (key in prop file)
  console.log(Command);  // The Option Selected
}

function internetGoogle() {
  openThisPanel(document.getElementById("Browser"), "tab");
  setTimeout(function() {
    openInternetWebview('https://www.google.com');
  }, 10)
}
function internetDuckDuckGo() {
  openThisPanel(document.getElementById("Browser"), "tab");
  setTimeout(function() {
    openInternetWebview('https://www.duckduckgo.com');
  }, 10)
}