var userPropertiesReader = require('properties-reader');
var userProperties = userPropertiesReader(__dirname + '/../../Alpha/Properties/user.properties');

var settingsIsOpen = false;
var settingsAnimation;

var userIsOpen = false;
var userAnimation;


var leftparallelogramOpen = false;
function showleftparallelogramContent() {
    if (!leftparallelogramOpen) {
        TweenMax.to("#leftparallelogramContent", 0.5, {width: '40vw',   left: '0'})
        leftparallelogramOpen = true;
    }
    else {
        TweenMax.to("#leftparallelogramContent", 0.5, {width: '0', left: '40vw'})
        leftparallelogramOpen = false;
    }
}

var rightparallelogramOpen = false;
function showrightparallelogramContent() {
    if (!rightparallelogramOpen) {
        TweenMax.to("#rightparallelogramContent", 0.5, {width: '40vw',   right: '0'})
        // TweenMax.to(["#userL", "#userR", "#usersName"], 0.8, {borderColor: "rgb(60, 60, 60)"})
        rightparallelogramOpen = true;
    }
    else {
        TweenMax.to("#rightparallelogramContent", 0.5, {width: '0', right: '40vw'})
        // TweenMax.to(["#userL", "#userR", "#usersName"], 0.8, {borderColor: "rgb(0, 170, 182)"})
        rightparallelogramOpen = false;
    }
}


function userAnimationPlay() {
    var theLoggedInAccount = userProperties.get('alphariumproperties.loggedin');
    if (userIsOpen) {
        userAnimation.reverse();
        userIsOpen  = false;
        var firstUserLetter = theLoggedInAccount.substr(0, 1).toUpperCase();
        document.getElementById('usersName').innerHTML = (firstUserLetter);
    }
    else if (settingsIsOpen){
        settingsAnimation.reverse()
        settingsIsOpen = false;
        settingsAnimation.eventCallback("onReverseComplete", function() {
            userAnimation.play();
            userIsOpen = true;
        })
    }
    else {
        userAnimation.play();
        userIsOpen = true;
        $("#usersName").text(theLoggedInAccount);
    }
}

function userSettingsAnimationSetup() {
    userAnimation = new TimelineMax({paused:true});
    userAnimation.to("#userL", 0.5, {marginRight: "+=80px"})
    userAnimation.to("#usernameContainer", 0.5, {width: "+=70px"}, '-=0.5')

    $("#userL").on('click', userAnimationPlay)
    $("#userR").on('click', userAnimationPlay)
};

// function openFilePage() {
//     setTimeout(function() {window.open("../FileManagerCode/filePage.html", "Alpha Drive", "height=700,width=1000,location=yes")}, 200)
// }

function openInternetWebview(userSearch) {
    $("#searchPageBackgroundMain").html('<webview id="internetWebview" partition="persist:googlepluswidgets" autosize="on" style="height:100%; width: 100vw;" src="'+userSearch+'"/>');
}

$(document).ready(userSettingsAnimationSetup)