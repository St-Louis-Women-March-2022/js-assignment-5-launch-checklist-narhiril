// Write your JavaScript code here!

const { formSubmission } = require("./scriptHelper");

window.addEventListener("load", function() {

    const launchChecklist = {
        pilot: {name: '', isReady: false},
        copilot: {name: '', isReady: false},
        fuelLevel: {value: '', isReady: false},
        cargoLevel: {value: '', isReady: false}
    }

    const form = document.querySelector('form');
    form.addEventListener('submit', function(event){
        let pilotName = document.querySelector('input[name=pilotName]');
        let copilotName = document.querySelector('input[name=copilotName]');
        let fuelLevel = document.querySelector('input[name=fuelLevel]');
        let cargoLevel = document.querySelector('input[name=cargoLevel]');
        if (formSubmission(document, launchChecklist, pilotName, copilotName, fuelLevel, cargoLevel)){

        } else {

        }
    });
    

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
   
});