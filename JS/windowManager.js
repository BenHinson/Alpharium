function createNav() {
  window.exisitingNavBar = document.getElementById('windowsFrame');
  if (!exisitingNavBar) {
    var navBarParent = document.body;
    var navBar = document.createElement('div');
    navBar.setAttribute("id", "windowsFrame");
    navBarParent.appendChild(navBar);
    var theFirstChild = navBarParent.firstChild;
    navBarParent.insertBefore(navBar, theFirstChild);
    $(function(){$("#windowsFrame").load("../../Alpha/WinFrame/windowsFrame.html") })
  }
  if (document.body.style.height != "100vh") {
    document.body.style.height = "100vh";
  }
}
$(document).ready(createNav)