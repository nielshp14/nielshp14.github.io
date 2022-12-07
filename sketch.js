let frameRateSeting = 60;
let worldScale = 0.5; // måles i meter per 100 canvas pixels; 
let gravitationalAcceleration = 0;
let coefficientOfRestitution = 1;
let coefficientOfFriction = 0.1
let showVol = false;
let volScale = 0.25;
let addCircle = true;
let newCircleR = 15;
let newCircleMass = 10;
let newCircleVolX = 1;
let newCircleVolY = 0;
const g = 9.82


let allObjekts = [];
let simulationActive = false;

// difines DOM elements
let worldScaleInput = document.getElementById("WorldScaling");
let restitutionInput = document.getElementById("restitutionInput");
let frictionInput = document.getElementById("frictionInput");
let timeCounterDOM = document.getElementById("timeCounter");
let realTimeCounterDOM = document.getElementById("realTimeCounter");
let gravetyInput = document.getElementById("gravetyInput");
let showVolInput = document.getElementById("showVol");
let volScaleInput = document.getElementById("volScale");
let energyDOM = document.getElementById("energyDOM");
let addCircleInput = document.getElementById("addCircleInput");
let newCircleRInput = document.getElementById("radiusInput");
let newCircleMassInput = document.getElementById("massInput");
let newCircleVolXInput = document.getElementById("volX");
let newCircleVolYInput = document.getElementById("volY");

let scean0 = [];
let scean1 = [];
let scean2 = [];
let scean3 = [];


function setup() {
  createCanvas(900, 400);
  background(220);
  angleMode(DEGREES);
  frameRate(frameRateSeting);
  setupSceans()
  loadScean(1)

}

/**
 * @discription get's called from a DOM element and starts the simulation
 * @returns void
 */
function startSim(){
  if(simulationActive) {
    simulationActive = false;
    return;
  }
  simulationActive = true;
  timeCounter = 0;
  let d = new Date()
  startTime = (d.getMinutes() * 60000 + d.getSeconds() * 1000 + d.getMilliseconds())/1000
}


function draw() {
  if(addCircle) addCircleOnMouseClick();

  if (simulationActive) {
    simDraw(); // runs the simulation
    updaterDOMeliments();
  } 
  updateSetings()
  drawBackground();
  showAll();
}

/**
 * @description handles the simulation (Movement, Collision chek, Static collision resolution, Physics collision resolution)
 */
function simDraw() {
  // for every circle
  for (let i = 0; i < allObjekts.length; i++) {
    if(allObjekts[i] instanceof Circle == false){
      continue;
    }

    allObjekts[i].updateVektors()
    allObjekts[i].move(); 
    
    for (let j = 0; j < allObjekts.length; j++) { //compare with every other object
      if (i == j) {
        continue; // skips if the two objects are the same object
      }

      let collisionResult = circleCollisionChek(allObjekts[i], allObjekts[j]);

      if (collisionResult.ans == true) {

        let eges 
        if(allObjekts[j] instanceof Box){ 
          eges = findContactSide(allObjekts[j],collisionResult.axis,allObjekts[i]);
        }
        staticCollisionResolution(allObjekts[i], allObjekts[j]); //SCR

        if(allObjekts[j] instanceof Circle){ // circle to circle colition
          dynamicCollisionResolutionC(allObjekts[i],allObjekts[j]);
          allObjekts[i].move();
        } else { //circle to box colition
          dynamicCollisionResolutionBox(allObjekts[i],allObjekts[j],eges);
        }
      }
    }
  }
}

/**
 * @description updates a number of variabels bassed on user DOM-elements. Do note that some settings can only be changed when the simulation is paused
 */
 function updateSetings(){
  // set setings
  if(showVolInput.checked){ 
    showVol = true;
  } else showVol = false

  volScale = volScaleInput.value
  if(volScale < 0){
    volScale = 0.25;
    volScaleInput.value = 0.25;
  }
  if(addCircleInput.checked){
    addCircle = true;
  } else addCircle = false;

  newCircleR = parseFloat(newCircleRInput.value);
  if(newCircleR <= 0){
    newCircleR = 0.1;
    newCircleMassInput = 0.1;
  }

  newCircleMass = parseFloat(newCircleMassInput.value);
  if(newCircleMass < 0) {
    newCircleMass = -newCircleMass
    newCircleMassInput.value = newCircleMass
  }

  newCircleVolX = parseFloat(newCircleVolXInput.value) 

  newCircleVolY = parseFloat(newCircleVolYInput.value);

  if(!simulationActive){
    // sets world setings when pauesed
    worldScale = parseFloat(worldScaleInput.value);
    if(worldScale <= 0) {
      worldScale = 0.5;
      worldScaleInput.value = 0.5;
    }

    coefficientOfRestitution = parseFloat(restitutionInput.value);
    if(coefficientOfRestitution < 0) {
      coefficientOfRestitution = 0;
      restitutionInput.value = 0;
    }
    coefficientOfFriction = parseFloat(frictionInput.value);
      if(coefficientOfFriction < 0) {
        coefficientOfFriction = 0;
        frictionInput.value = 0;
      }

    gravitationalAcceleration = parseFloat(gravetyInput.value);
  }
}

let timeCounter = 0;
let realTimeCounter = 0;
let startTime;

/**
 * @Description Updates the DOM eliments shown on screan 
 */
function updaterDOMeliments(){
  timeCounter += 1/frameRateSeting;
  timeCounterDOM.textContent = "Time: " + timeCounter.toFixed(2) + " s";
  let d = new Date();
  realTimeCounter =  (d.getMinutes() * 60000 + d.getSeconds() * 1000 + d.getMilliseconds())/1000 - startTime;
  realTimeCounterDOM.textContent = "Real Time: " + realTimeCounter.toFixed(2) + " s";
  energyDOM.textContent = " " + getSystemEnergy().toFixed(4);
}