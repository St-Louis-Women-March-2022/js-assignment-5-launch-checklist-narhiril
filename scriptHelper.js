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

    const target = document.getElementById('missionTarget');
    const html = ['',
        `<h2>Mission Destination</h2>`,
        `<ol>`,
        `<li>Name: ${name}</li>`,
        `<li>Diameter: ${diameter}</li>`,
        `<li>Star: ${star}</li>`,
        `<li>Distance from Earth: ${distance}</li>`,
        `<li>Number of Moons: ${moons}</li>`,
        `</ol>`,
        `<img src="${imageUrl}">`
    ].join('\n');
    target.innerHTML = html;

}

function validateInput(testInput) {
    if (testInput === ''){
        return "Empty";
    } else {
        return ((isNaN(Number(testInput))) ? "Not a Number" : "Is a Number");
    }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    const threshold = {fuel: 10000, cargo: 10000};
    const formEntries = [pilot, copilot, fuelLevel, cargoLevel];

    const faultyItems = document.getElementById('faultyItems');
    const pilotElement = document.getElementById('pilotStatus');
    const copilotElement = document.getElementById('copilotStatus');
    const fuelElement = document.getElementById('fuelStatus');
    const cargoElement = document.getElementById('cargoStatus');

    function allChecksPassed(checklist){
        for (const item in checklist){
            if (!checklist[item].isReady){
                return false;
            }
        }
        return true;
    }

    for (const entry of formEntries){
        if (validateInput(entry) === "Empty"){
            alert("All fields are required!");
            break;
        }
    }

    if (validateInput(pilot) === "Not a Number"){
        list.pilot.name = pilot;
        list.pilot.isReady = true;
        pilotElement.innerHTML = `${pilot} (Pilot) Ready`;
    } else {
        list.pilot.isReady = false;
        pilotElement.innerHTML = "Pilot Not Ready";
    }

    if (validateInput(copilot) === "Not a Number"){
        list.copilot.name = copilot;
        list.copilot.isReady = true;
        copilotElement.innerHTML = `${copilot} (Co-pilot) Ready`;
    } else {
        list.copilot.isReady = false;
        copilotElement.innerHTML = "Co-pilot Not Ready";
    }

    if (validateInput(fuelLevel) === "Is a Number"){
        fuelLevel = parseFloat(fuelLevel);
        list.fuelLevel.value = fuelLevel;
        if (fuelLevel >= threshold.fuel){
            list.fuelLevel.isReady = true;
            fuelElement.innerHTML = "Fuel level high enough for launch";
        } else {
            list.fuelLevel.isReady = false;
            fuelElement.innerHTML = "Insufficient fuel for launch";
        }
    } else {
        list.fuelLevel.isReady = false;
        fuelElement.innerHTML = "Fuel information required for launch";
    }
    
    if (validateInput(cargoLevel) === "Is a Number"){
        cargoLevel = parseFloat(cargoLevel);
        list.cargoLevel.value = cargoLevel;
        if (cargoLevel <= threshold.cargo){
            list.cargoLevel.isReady = true;
            cargoElement.innerHTML = "Cargo mass low enough for launch";
        } else {
            list.cargoLevel.isReady = false;
            cargoElement.innerHTML = "Cargo mass too high for launch";
        }
    } else {
        list.cargoLevel.isReady = false;
        cargoElement.innerHTML = "Cargo information required for launch";
    }

    if (allChecksPassed(list)){
        faultyItems.style.visibility = "hidden";
        launchStatus.style.color = "green";
        launchStatus.innerHTML = "Shuttle is ready for launch";
    } else {
        faultyItems.style.visibility = "visible";
        launchStatus.style.color = "red";
        launchStatus.innerHTML = "Shuttle not ready for launch";
    }
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
