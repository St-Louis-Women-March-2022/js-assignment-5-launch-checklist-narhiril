require('isomorphic-fetch'); //needed for autograder

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

    let alertInvalid = false;
    let alertEmptyField = false;

    for (let entry = 2; entry < arguments.length; entry++){ 
        if (validateInput(arguments[entry]) === "Empty"){
            alertEmptyField = true;
            break;
        }
    }

    class InputStrings {
        constructor(keyName, expected, onSuccess, onFail, onOutOfBounds = ''){
            this.keyName = keyName; //corresponding key in list object
            this.expected = expected; //response from validateInput for a valid input
            this.onSuccess = onSuccess;
            this.onFail = onFail;
            this.onOutOfBounds = onOutOfBounds; //for otherwise valid numeric input that fails comparison check
        }
    }

    class CheckableObject {
        constructor(inputParam, inputStrings, element, compareType = 'invalid', compareValue = null){
            this.inputParam = inputParam;
            this.inputStrings = inputStrings;
            this.element = element;
            this.compareType = compareType;
            this.compareValue = compareValue;
        }
    }

    const threshold = {fuel: 10000, cargo: 10000};

    const pilotStrings = new InputStrings("pilot", "Not a Number", `${pilot} (Pilot) Ready`, "Pilot Not Ready");
    const copilotStrings = new InputStrings("copilot", "Not a Number", `${copilot} (Co-pilot) Ready`, "Co-pilot Not Ready");
    const fuelStrings = new InputStrings("fuelLevel", "Is a Number", "Fuel level high enough for launch", "Fuel information required for launch", "Insufficient fuel for launch");
    const cargoStrings = new InputStrings("cargoLevel", "Is a Number", "Cargo mass low enough for launch", "Cargo information required for launch", "Cargo mass too high for launch");

    const pilotElement = document.getElementById('pilotStatus');
    const copilotElement = document.getElementById('copilotStatus');
    const fuelElement = document.getElementById('fuelStatus');
    const cargoElement = document.getElementById('cargoStatus');

    const checkables = [
        new CheckableObject(pilot, pilotStrings, pilotElement),
        new CheckableObject(copilot, copilotStrings, copilotElement),
        new CheckableObject(fuelLevel, fuelStrings, fuelElement, '>=', threshold.fuel),
        new CheckableObject(cargoLevel, cargoStrings, cargoElement, '<=', threshold.cargo)
    ];
    
    const launchStatus = document.getElementById('launchStatus');
    const faultyItems = document.getElementById('faultyItems');

    function allChecksPassed(checklist){
        for (const item in checklist){
            if (!checklist[item].isReady){
                return false;
            }
        }
        return true;
    }

    function doChecks(checkableObj){
        const {inputParam, inputStrings, element, compareType, compareValue} = checkableObj;
        const {keyName, expected, onSuccess, onFail, onOutOfBounds} = inputStrings;
        const inputType = validateInput(inputParam);
        switch (expected){
            case "Not a Number":
                if (inputType === "Not a Number"){
                    list[keyName].name = inputParam;
                    list[keyName].isReady = true;
                    element.innerHTML = onSuccess;
                } else {
                    alertInvalid = true;
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
                    "none": () => {return true;},
                    "invalid": () => {throw Error('formSubmission: Invalid compareType');}
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
                    alertInvalid = true;
                    list[keyName].isReady = false;
                    element.innerHTML = onFail;
                }
                break;
            //case "Empty": //not currently used
                //do hypothetical stuff
                //break;
            default:
                throw Error('formSubmission: Invalid value for stringObj.expected');
        }
    }

    for (const item of checkables){
        doChecks(item);
    }

    if (alertEmptyField){
        alert("All fields are required!");
    } else if (alertInvalid){
        alert("One or more fields contains invalid information.");
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

    await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
        planetsReturned = response.json();
    });

    return planetsReturned;
}

function pickPlanet(planets) {
    const roll = Math.floor(Math.random()*planets.length);
    return planets[roll];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
