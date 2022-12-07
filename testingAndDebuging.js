/**
 * @returns the sum of all the kenetic- and potential energy in the simulation
 */
 function getSystemEnergy(){
    let keneticEnergy = 0;
    let potentialEnergy = 0;
    for (let i = 0; i < allObjekts.length; i++){
      if(allObjekts[i] instanceof Circle){
        let circle = allObjekts[i];
        keneticEnergy += 1/2 * circle.mass * (circle.vol.mag())**2
        let ballHeight = (height -circle.pos.y) / 100 * worldScale 
        potentialEnergy += circle.mass * ballHeight * gravitationalAcceleration
      }
    }
    let totalEnergy = keneticEnergy + potentialEnergy
    return totalEnergy
  }
  /**
   * 
   * @param {*} objec 
   * @returns the summ of the potential and kenatic energy of the object
   */
  function getEnergyOfObject(objec){
    let keneticEnergy = 0;
    let potentialEnergy = 0;
  
    keneticEnergy += 1/2 * objec.mass * (objec.vol.mag())**2
    let ballHeight = (400 -objec.pos.y) / 100 * worldScale 
    potentialEnergy += objec.mass * ballHeight * gravitationalAcceleration
  
    return keneticEnergy+ potentialEnergy
  }
  
  let addCircleTimer = 0;
  /**
   * @description adds a circle on the mouses position, if it is clicked
   */
  function addCircleOnMouseClick(){
    if (mouseIsPressed && mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height && addCircleTimer >= 10) { // player can add cirles evry 10 frame (for debugging)
      allObjekts.push(new Circle(mouseX, mouseY, newCircleR,newCircleVolX,newCircleVolY,newCircleMass));
      addCircleTimer = 0;
    }
    addCircleTimer++;
  }
  
  /**
   * @description sets the velosety of all the dynamic objects to be the same. the vol is bassed on the mouses position reletive to the center of the canvas
   */
  function setMouseVol(){
    let mouseDistToCenter = createVector(width/2-mouseX,height/2-mouseY)
    mouseDistToCenter.setMag(0.2);
  
    for(let i = 0; i < allObjekts.length; i++){
      if (allObjekts[i] instanceof Circle) {
        allObjekts[i].vol.y = -mouseDistToCenter.y;
        allObjekts[i].vol.x = -mouseDistToCenter.x;
      }
    }
  }