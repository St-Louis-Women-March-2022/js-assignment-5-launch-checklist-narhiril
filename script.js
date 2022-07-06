// Write your JavaScript code here!

//const { formSubmission } = require("./scriptHelper");

window.addEventListener("load", function() {

    let launchChecklist = {
        pilot: {name: '', isReady: false},
        copilot: {name: '', isReady: false},
        fuelLevel: {value: '', isReady: false},
        cargoLevel: {value: '', isReady: false}
    };
    const form = document.querySelector('form');

    form.addEventListener("submit", function(event){
        event.preventDefault();
        const pilotName = document.querySelector('input[name="pilotName"]').value;
        const copilotName = document.querySelector('input[name="copilotName"]').value;
        const fuelLevel = document.querySelector('input[name="fuelLevel"]').value;
        const cargoLevel = document.querySelector('input[name="cargoMass"]').value;
        formSubmission(document, launchChecklist, pilotName, copilotName, fuelLevel, cargoLevel);
    });
    
/*
   let listedPlanets;
   // Set listedPlanetsResponse equal to the value returned by calling myFetch()
   let listedPlanetsResponse;
   listedPlanetsResponse.then(function (result) {
       listedPlanets = result;
       console.log(listedPlanets);
   }).then(function () {
       console.log(listedPlanets);
       // Below this comment call the appropriate helper functions to pick a planet fom the list of planets and add that information to your destination.
   })
*/
});