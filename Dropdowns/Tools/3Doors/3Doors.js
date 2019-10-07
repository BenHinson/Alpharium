function run3Doors() {
  var change = true;
  var wins = 0;
  var i = 0;

  while (i < 100000) {
    let winningDoor = Math.floor(Math.random() * 3 + 1);      // Chooses Winning Door
    let chosenDoor = Math.floor(Math.random() * 3 + 1);       // Chooses What Door Contestent Selects
    let shownDoor = Math.floor(Math.random() * 3 + 1);      
    while ((shownDoor == chosenDoor) || (shownDoor == winningDoor)) {
      shownDoor = Math.floor(Math.random() * 3 + 1);
    }                                                         // Shows whats behind a loosing door
    originalChosen = chosenDoor;


    if (change === false) {                           // If not switching doors, checks if
      if (chosenDoor === winningDoor) {               // chosen door is the winning door
        wins++;
      }
    } else {
      while ((chosenDoor == shownDoor) || (chosenDoor == originalChosen)) {    // Switcing door function
        chosenDoor = Math.floor(Math.random() * 3 + 1);
      }
      if (chosenDoor === winningDoor) {
        wins++;
      }
    }
    i++;
  }
  document.getElementById("resultEntry").value = wins;
}