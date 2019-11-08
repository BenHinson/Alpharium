function preStart() {
    TweenMax.to("#pressanyKey", 3, {alpha:0.5, repeat:-1, yoyo:true, ease:Sine.easeInOut});
}
var helpOpen = false;
function showHelp () {
    if (!helpOpen) {
        TweenMax.to(["#forgotPw", "#createAccount", "#addHelp"], 1, {visibility: 'visible', opacity: '1'})
        TweenMax.to("#loginHelp", 0, {fontSize: '14px'})
        helpOpen = true;
    }
    else {
        TweenMax.to(["#forgotPw", "#createAccount", "#addHelp"], 1, {visibility: 'hidden', opacity: '0'})
        TweenMax.to("#loginHelp", 0, {fontSize: '12px'})
        helpOpen = false;
    }
}


function openLogin() {
    loginAnimation = new TimelineMax ()
        .to("#pressanyKey", 0.1 ,{visibility: "hidden"}) 
        .to("#loginContainer", 2,{width: "500", borderColor: "white"})
        .to("#companyTitle", 1, {visibility: 'visible', opacity: '1'})
        .to(["#usernameLogin", "#passwordLogin"], 1, {visibility: 'visible', opacity: '1'})
        .to(["#loginBtn", "#loginHelp"], 1,{visibility: 'visible', opacity: '1'});
}

function closeLogin() {

    var username = document.getElementById("usernameLogin").value;
    document.getElementById("welcomeUsername").innerHTML = username;

    closeAnimation = new TimelineMax ()
        .to(["#usernameLogin", "#passwordLogin", "#loginBtn"], 0.5, {opacity: '0', borderColor: 'rgb(32, 32, 32)', color: 'rgb(32, 32, 32)'})
        .to(["#usernameLogin", "#passwordLogin", "#loginBtn", "#loginErrorMessage"], 0, {display:"none"})
        .to(["#forgotPw", "#companyTitle", "#createAccount", "#addHelp", "#loginHelp"], 0, {display:"none"})
        .to("#loginContainer", 1, {width: "130"})
        .to("#loginContainer", 1.8, {scale: 20})
        .to(["#welcomeUser", "#welcomeUsername"], 0.5, {visibility: 'visible', opacity: '1'});
}

function quickCloseLogin(alreadyLoggedIn) {
    document.getElementById("welcomeUsername").innerHTML = alreadyLoggedIn;
    quickCloseAnimation = new TimelineMax ()
        .to("#loginContainer", 2.3, {scale: 20})
        .to(["#welcomeUser", "#welcomeUsername"], 1, {visibility: 'visible', opacity: '1'});
    slowWindowOpen();
}


function slowWindowOpen() {
    setTimeout(function() {location.href='../Homepage/homepage.html'}, 6000)}
function windowOpen() {
    setTimeout(function() {location.href='../Homepage/homepage.html'}, 8000)}

function createAccount() {
    const { BrowserWindow } = require('electron').remote
    let createAccountWindow = new BrowserWindow({ width: 400, height: 550, frame: false, webPreferences: {experimentalFeatures: true,nodeIntegration: true,webviewTag: true}})
    createAccountWindow.on('closed', () => {
        createAccountWindow = null
    })
    createAccountWindow.loadURL(`file://${__dirname}/createAccount.html`)
    createAccountWindow.webContents.on('did-finish-load', function() {
        createAccountWindow.show();
    })
}


$(document).ready(function() {
    $("#passwordLogin").bind('keypress', function(e) {
        if ( e.keyCode == '13') {
            loginAccountProperties();
        }
    });
    $("#signupPasswordConf").bind('keypress',function(e) {
        if(e.keyCode === 13) {
            createAccountProperties();
        }
     });
     $("#loginBtn").on("click", loginAccountProperties);
     $("#signupBtn").on("click", createAccountProperties);
});



$(document).ready(preStart);