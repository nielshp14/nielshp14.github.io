function setupSceans(){
  // makes scean 0
  scean0.push(new Box(100,350,800,350,50));
  scean0.push(new Box(300,200,300,300,50));
  scean0.push(new Box(400,300,400,200,50));
  scean0.push(new Box(100,145,218,207,50));
  scean0.push(new Box(500,270,700,250,50));
  scean0.push(new Box(700,250,800,100,50));
  scean0.push(new Box(-100,-100,0,-100,600));
  scean0.push(new Box(-100,-100,1000,-100,100));
  scean0.push(new Box(-100,400,1000,400,100));
  scean0.push(new Box(900,-100,1000,-100,600));
  // scean0.push(new Circle(440,140,20,-1,-1,100));
  // scean0.push(new Circle(400,100,15,1,0,10));

  let origonX = 400;
  let origonY = 200;

  // makes scean 1
  scean1.push(new Box(0+origonX,0+origonY,160+origonX,-139+origonY,-200));  
  scean1.push(new Box(129+origonX,46+origonY,270+origonX,86+origonY,-200)); 
  scean1.push(new Box(-137+origonX,140+origonY,289+origonX,104+origonY,200));
  scean1.push(new Box(-137+origonX,140+origonY,-166+origonX,-255+origonY,-200));
  scean1.push(new Circle(-28+origonX,52+origonY,25,-2.245,0.737,0.025));
  scean1.push(new Circle(-63+origonX,88+origonY,25,0,0,0.025));

  // makes scean 2
  scean2.push(new Box(0+origonX,0+origonY,160+origonX,-139+origonY,-200));
  scean2.push(new Box(129+origonX,46+origonY,270+origonX,86+origonY,-200));
  scean2.push(new Box(-137+origonX,140+origonY,289+origonX,104+origonY,200));
  scean2.push(new Box(-137+origonX,140+origonY,-166+origonX,-255+origonY,-200));
  scean2.push(new Circle(-33+origonX,45+origonY,25,-4.065,0.723,0.025));
  scean2.push(new Circle(-83+origonX,75+origonY,25,0,0,0.025));

  //makes scean 3
  scean3.push(new Box(0+origonX,0+origonY,160+origonX,-139+origonY,-200));
  scean3.push(new Box(129+origonX,46+origonY,270+origonX,86+origonY,-200));
  scean3.push(new Box(-137+origonX,140+origonY,289+origonX,104+origonY,200));
  scean3.push(new Box(-137+origonX,140+origonY,-166+origonX,-255+origonY,-200));
  scean3.push(new Circle(-5+origonX,37+origonY,25,-3.511,0.626,0.025));
  scean3.push(new Circle(-77+origonX,70+origonY,25,0,0,0.025));
}
/**
 * @description loades a scean
 * @param {*} nr int for what scean to loade
 */
function loadScean(nr){
    switch(nr){
      case 0:
  
        simulationActive = false;
        worldScaleInput.value = 0.5;
        restitutionInput.value = 1;
        frictionInput.value = 0;
        gravetyInput.value = 0.982;
        volScaleInput.value = 0.25;
        addCircleInput.checked = true;
        newCircleRInput.value = 15;
        newCircleMassInput.value = 10;
        newCircleVolXInput.value = 1;
        newCircleVolYInput.value = 0;
  
        allObjekts = scean0;
        break;
  
      case 1:
        simulationActive = false;
        worldScaleInput.value = 0.14;
        restitutionInput.value = 0.58;
        frictionInput.value = 0.205;
        gravetyInput.value = 0;
        volScaleInput.value = 0.25;
        addCircleInput.checked = false;
        newCircleRInput.value = 25;
        newCircleMassInput.value = 25;
        newCircleVolXInput.value = 1;
        newCircleVolYInput.value = 0;
        allObjekts = scean1;
        break;
  
      case 2:
        simulationActive = false;
        worldScaleInput.value = 0.14;
        restitutionInput.value = 0.58;
        frictionInput.value = 0.205;
        gravetyInput.value = 0;
        volScaleInput.value = 0.25;
        addCircleInput.checked = false;
        newCircleRInput.value = 25;
        newCircleMassInput.value = 25;
        newCircleVolXInput.value = 1;
        newCircleVolYInput.value = 0;
  
        allObjekts = scean2;
        break;
        
      case 3:
        simulationActive = false;
        worldScaleInput.value = 0.14;
        restitutionInput.value = 0.58;
        frictionInput.value = 0.205;
        gravetyInput.value = 0;
        volScaleInput.value = 0.25;
        addCircleInput.checked = false;
        newCircleRInput.value = 25;
        newCircleMassInput.value = 25;
        newCircleVolXInput.value = 1;
        newCircleVolYInput.value = 0;
  
        allObjekts = scean3;
        break;
    }
}