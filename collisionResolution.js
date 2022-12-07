/**
 * @description takes two objects that are colliding and moves them them in the opposite direction of the velocity of the objects, so that thay are no longer colliding
 * @param {*} objec1 (circle or box)
 * @param {*} objec2 (circle or box)
 */
function staticCollisionResolution(objec1, objec2) {
  if(objec1.vol.x == 0 && objec1.vol.y == 0) { // handels a ege case
   objec1.vol = createVector(0,0.00001) 
  }

  let energyBefor = getEnergyOfObject(objec1);

  if (objec2 instanceof Box) {
    while (circleCollisionChek(objec1, objec2).ans) {
      moveObjectStatic(objec1, objec1.vol, -0.1);
    }
  } else { // circles to circle have to be handeld slightly different from circle to box
    // problemer er sikkert her i nærheden
    let VectorToOther = p5.Vector.sub(objec2.pos, objec1.pos);
    if (angleBetweenVectors(objec1.vol, VectorToOther) * (180 / PI) <= 90) {
      while (circleCollisionChek(objec1, objec2).ans) {
        moveObjectStatic(objec1, objec1.vol, -0.1);
      }
      // console.log(circleCollisionChek(objec2,objec1).ans)
    }
  }
  // change the speed of the objet to what it was at the point of colition
  let energyAfter = getEnergyOfObject(objec1);
  let energydifferense = energyAfter - energyBefor
  let newKeneticEnergy = 1/2*objec1.mass*objec1.vol.mag()**2 - energydifferense;
  let newVolMag = sqrt(newKeneticEnergy/(1/2*objec1.mass))
  let volDirection = createVector(objec1.vol.x,objec1.vol.y).setMag(1);
  objec1.vol.x = volDirection.x*newVolMag
  objec1.vol.y = volDirection.y*newVolMag
}
  
  /**
   * @description takes two circles that are colliding and changes the velocity to make realistic collision
   * @param {*} circle1 
   * @param {*} circle2 
   */
function dynamicCollisionResolutionC (circle1,circle2) {

  let m1 = circle1.mass;
  let m2 = circle2.mass;

  let tempVol1 = createVector(circle1.vol.x,circle1.vol.y)
  let tempVol2 = createVector(circle2.vol.x,circle2.vol.y)

  // Findes the volocety of the center of mass
  let centerMassVolX = (tempVol1.x*m1 + tempVol2.x*m2)/(m1+m2)
  let centerMassVolY = (tempVol1.y*m1 + tempVol2.y*m2)/(m1+m2)
  let centerMassVol = createVector(centerMassVolX,centerMassVolY)

  tempVol1.sub(centerMassVol)
  tempVol2.sub(centerMassVol)


  let x1s = tempVol1.x;  
  let y1s = tempVol1.y; 
  let x2s = tempVol2.x; 
  let y2s = tempVol2.y; 

  let p1x = circle1.pos.x;
  let p1y = circle1.pos.y;
  let p2x = circle2.pos.x;
  let p2y = circle2.pos.y;

  let n1x = (m1*p1x**2*x1s - 2*m1*p1x*p2x*x1s + m1*p1y**2*x1s - 2*m1*p1y*p2y*x1s + m1*p2x**2*x1s + m1*p2y**2*x1s - m2*p1x**2*x1s + 2*m2*p1x**2*x2s - 2*m2*p1x*p1y*y1s + 2*m2*p1x*p1y*y2s + 2*m2*p1x*p2x*x1s - 4*m2*p1x*p2x*x2s + 2*m2*p1x*p2y*y1s - 2*m2*p1x*p2y*y2s + m2*p1y**2*x1s + 2*m2*p1y*p2x*y1s - 2*m2*p1y*p2x*y2s - 2*m2*p1y*p2y*x1s - m2*p2x**2*x1s + 2*m2*p2x**2*x2s - 2*m2*p2x*p2y*y1s + 2*m2*p2x*p2y*y2s + m2*p2y**2*x1s)/(m1*p1x**2 - 2*m1*p1x*p2x + m1*p1y**2 - 2*m1*p1y*p2y + m1*p2x**2 + m1*p2y**2 + m2*p1x**2 - 2*m2*p1x*p2x + m2*p1y**2 - 2*m2*p1y*p2y + m2*p2x**2 + m2*p2y**2); 
  let n1y = (m1*p1x**2*y1s - 2*m1*p1x*p2x*y1s + m1*p1y**2*y1s - 2*m1*p1y*p2y*y1s + m1*p2x**2*y1s + m1*p2y**2*y1s + m2*p1x**2*y1s - 2*m2*p1x*p1y*x1s + 2*m2*p1x*p1y*x2s - 2*m2*p1x*p2x*y1s + 2*m2*p1x*p2y*x1s - 2*m2*p1x*p2y*x2s - m2*p1y**2*y1s + 2*m2*p1y**2*y2s + 2*m2*p1y*p2x*x1s - 2*m2*p1y*p2x*x2s + 2*m2*p1y*p2y*y1s - 4*m2*p1y*p2y*y2s + m2*p2x**2*y1s - 2*m2*p2x*p2y*x1s + 2*m2*p2x*p2y*x2s - m2*p2y**2*y1s + 2*m2*p2y**2*y2s)/(m1*p1x**2 - 2*m1*p1x*p2x + m1*p1y**2 - 2*m1*p1y*p2y + m1*p2x**2 + m1*p2y**2 + m2*p1x**2 - 2*m2*p1x*p2x + m2*p1y**2 - 2*m2*p1y*p2y + m2*p2x**2 + m2*p2y**2);
  let n2x = (2*m1*p1x**2*x1s - m1*p1x**2*x2s + 2*m1*p1x*p1y*y1s - 2*m1*p1x*p1y*y2s - 4*m1*p1x*p2x*x1s + 2*m1*p1x*p2x*x2s - 2*m1*p1x*p2y*y1s + 2*m1*p1x*p2y*y2s + m1*p1y**2*x2s - 2*m1*p1y*p2x*y1s + 2*m1*p1y*p2x*y2s - 2*m1*p1y*p2y*x2s + 2*m1*p2x**2*x1s - m1*p2x**2*x2s + 2*m1*p2x*p2y*y1s - 2*m1*p2x*p2y*y2s + m1*p2y**2*x2s + m2*p1x**2*x2s - 2*m2*p1x*p2x*x2s + m2*p1y**2*x2s - 2*m2*p1y*p2y*x2s + m2*p2x**2*x2s + m2*p2y**2*x2s)/(m1*p1x**2 - 2*m1*p1x*p2x + m1*p1y**2 - 2*m1*p1y*p2y + m1*p2x**2 + m1*p2y**2 + m2*p1x**2 - 2*m2*p1x*p2x + m2*p1y**2 - 2*m2*p1y*p2y + m2*p2x**2 + m2*p2y**2);
  let n2y = (m1*p1x**2*y2s + 2*m1*p1x*p1y*x1s - 2*m1*p1x*p1y*x2s - 2*m1*p1x*p2x*y2s - 2*m1*p1x*p2y*x1s + 2*m1*p1x*p2y*x2s + 2*m1*p1y**2*y1s - m1*p1y**2*y2s - 2*m1*p1y*p2x*x1s + 2*m1*p1y*p2x*x2s - 4*m1*p1y*p2y*y1s + 2*m1*p1y*p2y*y2s + m1*p2x**2*y2s + 2*m1*p2x*p2y*x1s - 2*m1*p2x*p2y*x2s + 2*m1*p2y**2*y1s - m1*p2y**2*y2s + m2*p1x**2*y2s - 2*m2*p1x*p2x*y2s + m2*p1y**2*y2s - 2*m2*p1y*p2y*y2s + m2*p2x**2*y2s + m2*p2y**2*y2s)/(m1*p1x**2 - 2*m1*p1x*p2x + m1*p1y**2 - 2*m1*p1y*p2y + m1*p2x**2 + m1*p2y**2 + m2*p1x**2 - 2*m2*p1x*p2x + m2*p1y**2 - 2*m2*p1y*p2y + m2*p2x**2 + m2*p2y**2);
  
  // ændre på tallet såled at restitutionskoifisienten er med


  // calculating kenetic energy in each axis
  let x1E = 1/2 * m1 * n1x**2;
  let y1E = 1/2 * m1 * n1y**2;
  let x2E = 1/2 * m2 * n2x**2;
  let y2E = 1/2 * m2 * n2y**2;

  //changes velosety bassed on coefficientOfRestitution
  let n1xr = sqrt((2*coefficientOfRestitution*x1E)/m1);
  let n1yr = sqrt((2*coefficientOfRestitution*y1E)/m1);
  let n2xr = sqrt((2*coefficientOfRestitution*x2E)/m2);
  let n2yr = sqrt((2*coefficientOfRestitution*y2E)/m2);

  //makes shure that it's still the right orientation
  if(n1x < 0) n1xr = -n1xr;
  if(n1y < 0) n1yr = -n1yr;
  if(n2x < 0) n2xr = -n2xr;
  if(n2y < 0) n2yr = -n2yr;

  //adds back the center mass to the object 
  n1xr += centerMassVol.x;
  n1yr += centerMassVol.y;
  n2xr += centerMassVol.x;
  n2yr += centerMassVol.y;
  
  //updates the cirles vecocity to what we have calculatet
  circle1.vol.x = n1xr;
  circle1.vol.y = n1yr;
  circle2.vol.x = n2xr;
  circle2.vol.y = n2yr;

  // on the ofchanse that a vol is NaN then change it 
  if(circle1.vol.x != circle1.vol.x || circle1.vol.y != circle1.vol.y ){ // makes so that vol is not (NaN, NaN, 0)
    circle1.vol = createVector(0,0.00000001)
    console.warn("Circle had a vol of (NaN, NaN). Made it (0,0.00000001)")
  }
  if(circle2.vol.x != circle2.vol.x || circle2.vol.y != circle2.vol.y ){ // makes so that vol is not (NaN, NaN, 0)
    circle2.vol = createVector(0,0.00000001)
    console.warn("Circle had a vol of (NaN, NaN). Made it (0,0.00000001)")
  }
}
  
  
/**
 * @description Changes the velocity of the circle to make realistic collision between the circle and box
 * @param {*} circle 
 * @param {*} box 
 * @param {*} object {point1: number, point2: number} object that contains the index's of the two points that creates the ege of the box that the circle is coliding with
 */
function dynamicCollisionResolutionBox (circle,box,eges) {
  if(eges == undefined){ // arrer handeling
    console.warn("eges is undefind in findContactSide()")
    return; // mulighvis dårlig løsning
  }

  let linefunction = new liniarMathFunction(box.points[eges.point1],box.points[eges.point2])
  let v = Math.atan(linefunction.a);

  let closestCorner = findClosestPoint(createVector(circle.pos.x,circle.pos.y),box).closestPoint
  let distToCorner = dist(circle.pos.x,circle.pos.y,closestCorner.x,closestCorner.y)

  if(distToCorner <= circle.r+0.1){

    let vectorToClosestPoint = p5.Vector.sub(closestCorner,circle.pos)
    let orthogonalVector = createVector(vectorToClosestPoint.y,-vectorToClosestPoint.x)
    let otherPoint = p5.Vector.add(closestCorner,orthogonalVector)
    let newLineFunction = new liniarMathFunction(closestCorner,otherPoint)
    v = Math.atan(newLineFunction.a)
  }

  let tempVector = convertVectorIntoNewCoordinateSystem(circle.vol,v); // skriver vectoren om så den er i et kordinasystem som er paralelt med siden
  let keneticEnergyY = 1/2*circle.mass*tempVector.y**2
  let newVolY
  if(tempVector.y >= 0) {
     newVolY = sqrt((coefficientOfRestitution * keneticEnergyY)/(1/2*circle.mass))
  }
  if(tempVector.y < 0) {
    newVolY = -sqrt((coefficientOfRestitution * keneticEnergyY)/(1/2*circle.mass))
  }
  tempVector = createVector(tempVector.x,-newVolY) // vender y-komposanten om
  let newVol = convertVectorIntoNewCoordinateSystem(tempVector,-v); // skriver vectoren om til det originale kordinatsystem
  circle.vol = newVol
}
  
/**
 * @description cheks if the axis is parallel with any of the box's sides 
 * @param {*} objekt box
 * @param {*} axis vector 
 * @returns true if any of the sides of the box are parallel with the axis
 */
function doesAxisAlignWithSides(objekt,axis){
  let sideMached = 0

  for (let i = 0; i < objekt.norms.length; i++){
    let norm = objekt.norms[i]
    norm.setMag(1)
    // gør op for floation point arror
    if((fpeCorection(axis.x,norm.x) && fpeCorection(axis.y,norm.y)) || (fpeCorection(axis.x,-norm.x) && fpeCorection(axis.y,-norm.y))) {
      sideMached++;
    }
  }

  if (sideMached == 0){
    return false
  }
  return true
}
  
  
/**
 * @description findes witch side of the box the circle is touching
 * @param {*} box 
 * @param {*} axis direction that the colition is happening at
 * @param {*} circle 
 * @returns returns a object contaning the indexes of the points that create the sides of the box, that the circle is colliding with
 */
function findContactSide(box,axis, circle){

  let deapestPoint = createVector(circle.pos.x + axis.x * -circle.r,circle.pos.y + axis.y * -circle.r)
  // i think the contents of the following if statements is the problem to the still circles at corners ishue
  if (doesAxisAlignWithSides(box,axis) == false){
    //console.info("aligning axis",box.norms[0],box.norms[1],axis )

    let closestBoxPointIndex = circle.findClosestPoint(box).index;
    
    let point1Index;
    let point2Index;

    if (closestBoxPointIndex == 0) {point1Index = 3; point2Index = 1;}
    else if (closestBoxPointIndex == 1) {point1Index = 0; point2Index = 2;}
    else if (closestBoxPointIndex == 2) {point1Index = 1; point2Index = 3;}
    else if (closestBoxPointIndex == 3) {point1Index = 2; point2Index = 0;}

    let v1 = p5.Vector.sub(box.points[point1Index],box.points[closestBoxPointIndex]);
    let v2 = p5.Vector.sub(box.points[point2Index],box.points[closestBoxPointIndex]);

    let angle1 = angleBetweenVectors(v1,circle.vol)*(180/PI)
    let angle2 = angleBetweenVectors(v2,circle.vol)*(180/PI)

    if(angle1 <= angle2){

      axis = p5.Vector.sub(box.points[closestBoxPointIndex],box.points[point1Index]).setMag(1)
    } else axis = p5.Vector.sub(box.points[closestBoxPointIndex],box.points[point2Index]).setMag(1)

  }
  const precision = 0.00001 // a precision is addet tho give the if statement a range becuse a floting point errer may have accered 
  //const tempaxis = axis.setMag(0.0001); // same as axis but smaller. needed to make shure that tempPoint in not axidentealy on the other side of the line
  for (let i = 0; i < box.norms.length; i++){

    let norm = box.norms[i]
    norm.setMag(1)
    
    if((axis.x <= norm.x + precision && axis.x >= norm.x - precision && axis.y <= norm.y + precision && axis.y >= norm.y - precision) || (axis.x <= -norm.x + precision && axis.x >= -norm.x - precision && axis.y <= -norm.y + precision && axis.y >= -norm.y - precision) ){
      if (i == 0){ // hvis det er axe index 0

        const distTo0 = dist(deapestPoint.x,deapestPoint.y,box.points[0].x,box.points[0].y);
        let tempaxis = createVector(axis.x,axis.y)
        tempaxis.setMag(0.0001)
        //axis.setMag(0.0001);
        const tempPoint = p5.Vector.add(deapestPoint,tempaxis);
        const distTo0After = dist(tempPoint.x,tempPoint.y,box.points[0].x,box.points[0].y);
  
        if(distTo0After < distTo0) {
          return {point1: 0, point2: 1}; // end
        } else {
          const distTo2 = dist(deapestPoint.x,deapestPoint.y,box.points[2].x,box.points[2].y);
          const tempaxis = axis.setMag(0.0001);
          const tempPoint = p5.Vector.add(deapestPoint,tempaxis);
          const distTo2After = dist(tempPoint.x,tempPoint.y,box.points[2].x,box.points[2].y);
          if(distTo2After < distTo2) {
            return {point1: 2, point2: 3}; 
          }
        }
      } 
      else {
        if (i == 1){ // hvis der er akse index 1
          const distTo3 = dist(deapestPoint.x,deapestPoint.y,box.points[3].x,box.points[3].y);
          const tempaxis = axis.setMag(0.0001);
          const tempPoint = p5.Vector.add(deapestPoint,tempaxis);
          const distTo3After = dist(tempPoint.x,tempPoint.y,box.points[3].x,box.points[3].y);
    
          if(distTo3After < distTo3) {
            return {point1: 3, point2:0}; // end
          } else {
            const distTo1 = dist(deapestPoint.x,deapestPoint.y,box.points[1].x,box.points[1].y);
            const tempaxis = axis.setMag(0.0001);
            const tempPoint = p5.Vector.add(deapestPoint,tempaxis);
            const distTo1After = dist(tempPoint.x,tempPoint.y,box.points[1].x,box.points[1].y);

  
            if( distTo1After < distTo1) {
              return {point1: 1, point2: 2} 
            }
          } 
        }
      }
    }
  }
}