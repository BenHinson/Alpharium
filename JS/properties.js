var PropertiesReader = require('properties-reader');
var properties = PropertiesReader(__dirname + '/../../Alpha/Properties/user.properties');
var passwordHash = require('object-hash');

$("#loginPage").on('click', startLoginSequence)
$("#loginBtn").on('click', loginAccountProperties)

function alreadyLoggedIn() {
  setTimeout(function() {
    // window.loginPageTest = document.getElementById('loginErrorMessage');
    window.loginPageTest = document.getElementById('loginPage');
    window.alreadyLoggedIn = properties.get('alphariumproperties.loggedin');
    if (loginPageTest) {
      if (alreadyLoggedIn != '') {
        document.getElementById('pressanyKey').innerHTML = (alreadyLoggedIn+"<br><br>CLICK ANYWHERE");
        document.getElementById('windowTitleUsername').innerHTML = (alreadyLoggedIn);
      }
    } else {
      document.getElementById('windowTitleUsername').innerHTML = (alreadyLoggedIn);
      if (document.getElementById('usersName')) {
        var firstUserLetter = alreadyLoggedIn.substr(0, 1).toUpperCase();
        document.getElementById('usersName').innerHTML = (firstUserLetter);
      }
    }
  }, 10)          // THIS VALUE MAY NEED INCREASING IF ERRORS OCCUR DUE TO SLOWER LOADING TIMES
}


function startLoginSequence() {
  setTimeout(function() {
    if (!alreadyLoggedIn) {
      openLogin();
    } else {
      if (loginPageTest) {
        setTimeout(function() {
          openPinLogin();
          // logoutBtnLogouttoPin();
          // quickCloseLogin(alreadyLoggedIn);
        }, 300);
      }
      document.getElementById('windowTitleUsername').innerHTML = (alreadyLoggedIn);
    }
  }, 80)
}

// LOGGING IN

function loginAccountProperties() {
  var properties = PropertiesReader(__dirname + '/../../Alpha/Properties/user.properties');
  loginErrorMessage = document.getElementById('loginErrorMessage');
  window.clientUsername = document.getElementById('usernameLogin').value;
  clientPassword = document.getElementById('passwordLogin').value;
  if (clientUsername && clientPassword) {
    var propertiesUsernameForClient = properties.get(clientUsername+'.username');
    if (propertiesUsernameForClient) {
      var hashedClientPassword = properties.get(clientUsername+'.passwordHash');
      var checkHashedPassword = passwordHash(clientPassword);
      if (hashedClientPassword === checkHashedPassword) {
        properties.set('alphariumproperties.loggedin', clientUsername);
        properties.save(__dirname + '/../../Alpha/Properties/user.properties', function then (err, data) {});
        document.getElementById('windowTitleUsername').innerHTML = (clientUsername);
        closeLogin();
        windowOpen();
      } else {
        loginErrorMessage.innerHTML = ("Incorrect Password");
      }
    } else {
      loginErrorMessage.innerHTML = ("Incorrect Username");
    }
  } else {
    loginErrorMessage.innerHTML = ("Missing Inputs");
  }
}


function openPinLogin() {
  winWidth = window.innerWidth;
  var logoutParent = document.getElementById("containerLogin");

  quickCloseAnimation = new TimelineMax ()
  .to("#loginContainer", 2.3, {scale: 20})

  setTimeout(function () {
    $("#loginPage").css("display", "none");
    var fullscreenToolLoad = '../../Panels/alphaPanelPinLogin/pinLogin.html';
    $(logoutParent).append($('<div id="pinLogin"></div>').load(fullscreenToolLoad));
  }, 1200)

  setTimeout(accountPinLogin, 1210)
}

function accountPinLogin () {
  setTimeout(function() {
    alreadyLoggedIn = properties.get('alphariumproperties.loggedin');
    document.getElementById('pinEntryBox').placeholder = "Pin";
    document.getElementById('pinFirstMessage').innerHTML = alreadyLoggedIn;
    document.getElementById('pinSecondMessage').innerHTML = "Change Account";
    $("#pinSecondMessage").on('click', accountLogout);
  
    $("#pinEntryBox").keypress(function(event) {
      if (event.keyCode === 13) {pinReader()}});
    $("#pinEntryAccept").on('click', pinReader);
  },50)
}

function pinReader () {
  var pinInput = $("#pinEntryBox").val();
  document.getElementById("pinEntryBox").value = ('');
  var hashedClientPin = properties.get(alreadyLoggedIn+'.pin');
  var checkHashedPin = passwordHash(pinInput);
  if (hashedClientPin === checkHashedPin) {
    location.href='../Homepage/homepage.html';
  } else {
    document.getElementById('pinEntryBox').placeholder = "Try Again";
  }
}



// CREATE ACCOUNT
// ------------------------------------------------------------------------------------
$("#signupPin").keypress(function(event) {
  if (event.keyCode === 13) {createAccountProperties()}});

function createAccountProperties() {
  createAccountClientUsername = document.getElementById('signupUsername').value;
  createAccountClientEmail = document.getElementById('signupEmail').value;
  createAccountClientPassword = document.getElementById('signupPassword').value;
  createAccountClientPasswordConf = document.getElementById('signupPasswordConf').value;
  createAccountClientPin = document.getElementById('signupPin').value;

  if (createAccountClientUsername && createAccountClientEmail && createAccountClientPassword && createAccountClientPasswordConf && createAccountClientPin) {
    var clientUsernameCheck = properties.get(createAccountClientUsername+'.username');
    if (clientUsernameCheck) {
      document.getElementById('signupErrorMessage').innerHTML = ("Username Taken");
    } else {
      if (createAccountClientPassword != createAccountClientPasswordConf) {
        document.getElementById('signupErrorMessage').innerHTML = ("Unmatching Passwords");
      } else {
        properties.set(createAccountClientUsername+'.username', createAccountClientUsername);
        properties.set(createAccountClientUsername+'.email', createAccountClientEmail);
        var hashedPassword = passwordHash(createAccountClientPassword);
        properties.set(createAccountClientUsername+'.passwordHash', hashedPassword);
        var hashedPin = passwordHash(createAccountClientPin);
        properties.set(createAccountClientUsername+'.pin', hashedPin);
        properties.save(__dirname + '/../../Alpha/Properties/user.properties', function then (err, data) {window.close(); });
      }
    }
  } else {
    document.getElementById('signupErrorMessage').innerHTML = ("Missing Inputs");
  }
}


// ------------------------------------------------------------------------------------

$("#logoutBtn").on('click', logoutBtnLogout)

function logoutBtnLogout() {

  warningPanelSetup("Logout", "Are you sure you want to Logout?", "No", "Yes");

  setTimeout(function() {
    $("#warningBoxAccept").on('click', accountLogout);
    $("#warningBoxDecline, #warningBoxClose").on('click', function() {
      var removeNode = document.querySelector("#warningCentralPanel");
      removeNode.parentNode.removeChild(removeNode);
      logoutWarningOpen = !logoutWarningOpen;
    });
  }, 100);
}

function logoutBtnLogouttoPin() {
  winWidth = window.innerWidth;

  var logoutParent = document.getElementById("entireContainer");

  var fullscreenToolLoad = '../../Panels/alphaPanelPinLogin/pinLogin.html';
  $(logoutParent).append($('<div id="pinLogin" style="position: absolute;"></div>').load(fullscreenToolLoad));

  lockingAnimation = new TimelineMax ()
  .to("#pinLogin", 0, {left: "-"+winWidth, top: 24})
  .to("#bottomnav", 0, {bottom: 24})
  .to(["#pinLogin", "#mainHomepage"], 2.5, {x: winWidth});

  setTimeout(accountPinLogin, 10)
}


function accountLogout() {
  properties.set('alphariumproperties.loggedin', '');
  properties.save(__dirname + '/../../Alpha/Properties/user.properties', function then (err, data) {});
  document.getElementById('windowTitleUsername').innerHTML = ("");
  setTimeout(function() {location.href='../Login/login.html'}, 200)
}

$(document).ready(alreadyLoggedIn)
