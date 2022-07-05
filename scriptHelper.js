// Write your helper functions here!
require('isomorphic-fetch');


function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
   // Here is the HTML formatting for our mission target div.
   /*
                <h2>Mission Destination</h2>
                <ol>
                    <li>Name: </li>
                    <li>Diameter: </li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: </li>
                    <li>Number of Moons: </li>
                </ol>
                <img src="">
   */
}

function validateInput(testInput) {
    if (testInput === ''){
        return "Empty";
    } else {
        const isNonNumeric = /[^\-\.0-9e]|e(?=.*e)|\.(?=.*\.)|^e/i; //should catch everything that isNaN doesn't
        return ((isNonNumeric.test(testInput) || isNaN(testInput) ? "Not a Number" : "Is a Number"));
    }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    const threshold = {fuel: 10000, cargo: 10000};

    if (validateInput(pilot) === "Empty"){
        list.pilot.isReady = false;
        //update page to show invalid name
    } else {
        list.pilot.name = pilot;
        list.pilot.isReady = true;
        //remove invalid name prompt from page
    }

    if (validateInput(copilot) === "Empty"){
        list.copilot.isReady = false;
        //update page to show invalid name
    } else {
        list.copilot.name = pilot;
        list.copilot.isReady = true;
        //remove invalid name prompt from page
    }

    if (validateInput(fuelLevel) === "Is a Number"){
        fuelLevel = parseFloat(fuelLevel);
        list.fuelLevel.value = fuelLevel;
        if (fuelLevel >= threshold.fuel){
            list.fuelLevel.isReady = true;
            //remove insufficient fuel prompt from page
        } else {
            list.fuelLevel.isReady = false;
            //update page to show insufficient fuel
        }
    } else {
        list.fuelLevel.isReady = false;
        //update page to show invalid fuel entry
    }
    
    if (validateInput(cargoLevel) === "Is a Number"){
        cargoLevel = parseFloat(cargoLevel);
        list.cargoLevel.value = cargoLevel;
        if (cargoLevel <= threshold.cargo){
            list.cargoLevel.isReady = true;
            //remove too much cargo prompt from page
        } else {
            list.cargoLevel.isReady = false;
            //update page to show too much cargo
        }
    } else {
        list.cargoLevel.isReady = false;
        //update page to show invalid cargo entry
    }

    for (const item of list) {
        if (!item.isReady) {
            return false;
        }
    }
    return true;

}


async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch().then( function(response) {
        });

    return planetsReturned;
}

function pickPlanet(planets) {
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
