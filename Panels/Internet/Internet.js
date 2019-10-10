if (localStorage.getItem('InternetSearchLocation')) {
  var storedLocation = localStorage.getItem('InternetSearchLocation');
  if (document.getElementsByClassName("checked")[0]) {
    var currentSelected = document.getElementsByClassName("checked")[0].getAttribute("id");
    $("#"+currentSelected).removeClass("checked");
  }
  $("#"+storedLocation).addClass("checked");
}

function listeners() {
  $("#searchPageSearchBox").keypress(function(event) {
    if (event.keyCode === 13) {searchLocation();}
  }); $("#searchPageEnterSearch").on("click", searchLocation);
}

$(".searchLocation").on("click", function(e) {
  var currentSelected = document.getElementsByClassName("checked")[0].getAttribute("id");
  $("#"+currentSelected).removeClass("checked");
  var thisNewSelected = e.currentTarget.getAttribute("id");
  $("#"+thisNewSelected).addClass("checked");
  localStorage.setItem('InternetSearchLocation', thisNewSelected);
})

function searchLocation() {
  var location = document.getElementsByClassName("checked")[0].getAttribute("id").replace("searchLocation", "");
  var searchInput = $("#searchPageSearchBox").val();
  if (location == "Google") {
    var userSearch = (`https://www.Google.co.uk/search?q=`+searchInput);
  } else {
    var userSearch = (`https://www.`+location+`.com/?q=`+searchInput);
  }
  $("#searchPageBackgroundMain").html('<webview partition="persist:googlepluswidgets" autosize="on" style="width:100vw;height:calc(100vh - 24px);" src="'+userSearch+'"/>');
}

$(document).ready(listeners)