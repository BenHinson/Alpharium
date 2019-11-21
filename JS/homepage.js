var userPropertiesReader = require('properties-reader');
var userProperties = userPropertiesReader(__dirname + '/../../Alpha/Properties/user.properties');

var settingsIsOpen = false;
var settingsAnimation;

var userIsOpen = false;
var userAnimation;

// window.addEventListener('beforeunload', (event) => {
//     event.returnValue = '';
//     if (openPanels.length != 0) {
//         userProperties.set(alreadyLoggedIn+'.lastPanels', openPanels);
//         userProperties.save(__dirname + '/../../Alpha/Properties/user.properties', function then (err, data) {});
//     }
//     delete event['returnValue']
//     return;
// });

function openInternetWebview(userSearch) {
    $("#searchPageBackgroundMain").replaceWith('<webview id="internetWebview" partition="persist:googlepluswidgets" autosize="on" style="height:100%; width: 100vw;" src="'+userSearch+'"/>');
}
