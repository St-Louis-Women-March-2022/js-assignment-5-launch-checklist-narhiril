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

    const formEntries = [pilot, copilot, fuelLevel, cargoLevel];
    for (const entry of formEntries){
        if (validateInput(entry) === "Empty"){
            alert("All fields are required!");
            break;
        }
    }

    class InputStrings {
        constructor(keyName, expected, onSuccess, onFail, onOutOfBounds = '', compareType = 'none'){
            this.keyName = keyName;
            this.expected = expected;
            this.onSuccess = onSuccess;
            this.onFail = onFail;
            this.onOutOfBounds = onOutOfBounds;
            this.compareType = compareType;
        }
    }

    const pilotStrings = new InputStrings("pilot", "Not a Number", `${pilot} (Pilot) Ready`, "Pilot Not Ready");
    const copilotStrings = new InputStrings("copilot", "Not a Number", `${copilot} (Co-pilot) Ready`, "Co-pilot Not Ready");
    const fuelStrings = new InputStrings("fuelLevel", "Is a Number", "Fuel level high enough for launch", "Fuel information required for launch", "Insufficient fuel for launch", ">=");
    const cargoStrings = new InputStrings("cargoLevel", "Is a Number", "Cargo mass low enough for launch", "Cargo information required for launch", "Cargo mass too high for launch", "<=");

    const threshold = {fuel: 10000, cargo: 10000};

    const launchStatus = document.getElementById('launchStatus');
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

    function doChecks(inputParam, stringObj, element, compareValue = null){
        const {keyName, expected, onSuccess, onFail, onOutOfBounds, compareType} = stringObj;
        const inputType = validateInput(inputParam);
        switch (expected){
            case "Not a Number":
                if (inputType === "Not a Number"){
                    list[keyName].name = inputParam;
                    list[keyName].isReady = true;
                    element.innerHTML = onSuccess;
                } else {
                    list[keyName].isReady = false;
                    element.innerHTML = onFail;
                }
                break;
            case "Is a Number":
                const operators = {
                    ">=": (a,b) => {return a >= b;},
                    "<=": (a,b) => {return a <= b;},
                    ">": (a,b) => {return a > b;},
                    "<": (a,b) => {return a < b;},
                    "===": (a,b) => {return a === b;},
                    "!==": (a,b) => {return a !== b;},
                    "none": () => {throw Error('formSubmission: Invalid compareType');}
                }
                if (inputType === "Is a Number"){
                    const num = parseFloat(inputParam);
                    list[keyName].value = num;
                    if(operators[compareType](num, compareValue)){
                        list[keyName].isReady = true;
                        element.innerHTML = onSuccess;
                    } else {
                        list[keyName].isReady = false;
                        element.innerHTML = onOutOfBounds;
                    }
                } else {
                    list[keyName].isReady = false;
                    element.innerHTML = onFail;
                }
                break;
            default:
                throw Error('formSubmission: Invalid value for stringObj.expected');
        }
    }

    doChecks(pilot, pilotStrings, pilotElement);
    doChecks(copilot, copilotStrings, copilotElement);
    doChecks(fuelLevel, fuelStrings, fuelElement, threshold.fuel);
    doChecks(cargoLevel, cargoStrings, cargoElement, threshold.cargo);

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
