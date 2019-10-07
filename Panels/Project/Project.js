function objectSize() {
  window.bottomnav = document.getElementById('bottomnav');
  if (!bottomnav) {
    $("#tableBackground").css("height", "calc(100vh - 24px)");
  }
}
$(document).ready(objectSize);