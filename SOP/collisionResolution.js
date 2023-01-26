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
    while (collisionChek(objec1, objec2).ans) {
      moveObjectStatic(objec1, objec1.vol, -0.1);
    }
  } else { // circles to circle have to be handeld slightly different from circle to box
    // problemer er sikkert her i nærheden
    let VectorToOther = p5.Vector.sub(objec2.pos, objec1.pos);
    if (angleBetweenVectors(objec1.vol, VectorToOther) * (180 / PI) <= 90) {
      while (collisionChek(objec1, objec2).ans) {
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

  let m_1 = circle1.mass;
  let m_2 = circle2.mass;


  // Findes the volocety of the center of mass
  let centerMassVolX = (circle1.vol.x*m_1 + circle2.vol.x*m_2)/(m_1+m_2)
  let centerMassVolY = (circle1.vol.y*m_1 + circle2.vol.y*m_2)/(m_1+m_2)
  let centerMassVol = createVector(centerMassVolX,centerMassVolY)

  let reletiveVol1 = p5.Vector.sub(circle1.vol,centerMassVol);
  let reletiveVol2 = p5.Vector.sub(circle2.vol,centerMassVol);

  //defines variables
  let v_1x = reletiveVol1.x;
  let v_1y = reletiveVol1.y;
  let v_2x = reletiveVol2.x;
  let v_2y = reletiveVol2.y;
  
  let p_1x = circle1.pos.x;
  let p_1y = circle1.pos.y;
  let p_2x = circle2.pos.x;
  let p_2y = circle2.pos.y;

  // findes new velocities 
  let u_1x = (m_1*p_1x**2*v_1x - 2*m_1*p_1x*p_2x*v_1x + m_1*p_1y**2*v_1x - 2*m_1*p_1y*p_2y*v_1x + m_1*p_2x**2*v_1x + m_1*p_2y**2*v_1x - m_2*p_1x**2*v_1x + 2*m_2*p_1x**2*v_2x - 2*m_2*p_1x*p_1y*v_1y + 2*m_2*p_1x*p_1y*v_2y + 2*m_2*p_1x*p_2x*v_1x - 4*m_2*p_1x*p_2x*v_2x + 2*m_2*p_1x*p_2y*v_1y - 2*m_2*p_1x*p_2y*v_2y + m_2*p_1y**2*v_1x + 2*m_2*p_1y*p_2x*v_1y - 2*m_2*p_1y*p_2x*v_2y - 2*m_2*p_1y*p_2y*v_1x - m_2*p_2x**2*v_1x + 2*m_2*p_2x**2*v_2x - 2*m_2*p_2x*p_2y*v_1y + 2*m_2*p_2x*p_2y*v_2y + m_2*p_2y**2*v_1x)/(m_1*p_1x**2 - 2*m_1*p_1x*p_2x + m_1*p_1y**2 - 2*m_1*p_1y*p_2y + m_1*p_2x**2 + m_1*p_2y**2 + m_2*p_1x**2 - 2*m_2*p_1x*p_2x + m_2*p_1y**2 - 2*m_2*p_1y*p_2y + m_2*p_2x**2 + m_2*p_2y**2)
  let u_1y = (m_1*p_1x**2*v_1y - 2*m_1*p_1x*p_2x*v_1y + m_1*p_1y**2*v_1y - 2*m_1*p_1y*p_2y*v_1y + m_1*p_2x**2*v_1y + m_1*p_2y**2*v_1y + m_2*p_1x**2*v_1y - 2*m_2*p_1x*p_1y*v_1x + 2*m_2*p_1x*p_1y*v_2x - 2*m_2*p_1x*p_2x*v_1y + 2*m_2*p_1x*p_2y*v_1x - 2*m_2*p_1x*p_2y*v_2x - m_2*p_1y**2*v_1y + 2*m_2*p_1y**2*v_2y + 2*m_2*p_1y*p_2x*v_1x - 2*m_2*p_1y*p_2x*v_2x + 2*m_2*p_1y*p_2y*v_1y - 4*m_2*p_1y*p_2y*v_2y + m_2*p_2x**2*v_1y - 2*m_2*p_2x*p_2y*v_1x + 2*m_2*p_2x*p_2y*v_2x - m_2*p_2y**2*v_1y + 2*m_2*p_2y**2*v_2y)/(m_1*p_1x**2 - 2*m_1*p_1x*p_2x + m_1*p_1y**2 - 2*m_1*p_1y*p_2y + m_1*p_2x**2 + m_1*p_2y**2 + m_2*p_1x**2 - 2*m_2*p_1x*p_2x + m_2*p_1y**2 - 2*m_2*p_1y*p_2y + m_2*p_2x**2 + m_2*p_2y**2)
  let u_2x = (2*m_1*p_1x**2*v_1x - m_1*p_1x**2*v_2x + 2*m_1*p_1x*p_1y*v_1y - 2*m_1*p_1x*p_1y*v_2y - 4*m_1*p_1x*p_2x*v_1x + 2*m_1*p_1x*p_2x*v_2x - 2*m_1*p_1x*p_2y*v_1y + 2*m_1*p_1x*p_2y*v_2y + m_1*p_1y**2*v_2x - 2*m_1*p_1y*p_2x*v_1y + 2*m_1*p_1y*p_2x*v_2y - 2*m_1*p_1y*p_2y*v_2x + 2*m_1*p_2x**2*v_1x - m_1*p_2x**2*v_2x + 2*m_1*p_2x*p_2y*v_1y - 2*m_1*p_2x*p_2y*v_2y + m_1*p_2y**2*v_2x + m_2*p_1x**2*v_2x - 2*m_2*p_1x*p_2x*v_2x + m_2*p_1y**2*v_2x - 2*m_2*p_1y*p_2y*v_2x + m_2*p_2x**2*v_2x + m_2*p_2y**2*v_2x)/(m_1*p_1x**2 - 2*m_1*p_1x*p_2x + m_1*p_1y**2 - 2*m_1*p_1y*p_2y + m_1*p_2x**2 + m_1*p_2y**2 + m_2*p_1x**2 - 2*m_2*p_1x*p_2x + m_2*p_1y**2 - 2*m_2*p_1y*p_2y + m_2*p_2x**2 + m_2*p_2y**2)
  let u_2y = (m_1*p_1x**2*v_2y + 2*m_1*p_1x*p_1y*v_1x - 2*m_1*p_1x*p_1y*v_2x - 2*m_1*p_1x*p_2x*v_2y - 2*m_1*p_1x*p_2y*v_1x + 2*m_1*p_1x*p_2y*v_2x + 2*m_1*p_1y**2*v_1y - m_1*p_1y**2*v_2y - 2*m_1*p_1y*p_2x*v_1x + 2*m_1*p_1y*p_2x*v_2x - 4*m_1*p_1y*p_2y*v_1y + 2*m_1*p_1y*p_2y*v_2y + m_1*p_2x**2*v_2y + 2*m_1*p_2x*p_2y*v_1x - 2*m_1*p_2x*p_2y*v_2x + 2*m_1*p_2y**2*v_1y - m_1*p_2y**2*v_2y + m_2*p_1x**2*v_2y - 2*m_2*p_1x*p_2x*v_2y + m_2*p_1y**2*v_2y - 2*m_2*p_1y*p_2y*v_2y + m_2*p_2x**2*v_2y + m_2*p_2y**2*v_2y)/(m_1*p_1x**2 - 2*m_1*p_1x*p_2x + m_1*p_1y**2 - 2*m_1*p_1y*p_2y + m_1*p_2x**2 + m_1*p_2y**2 + m_2*p_1x**2 - 2*m_2*p_1x*p_2x + m_2*p_1y**2 - 2*m_2*p_1y*p_2y + m_2*p_2x**2 + m_2*p_2y**2) 

  //changes velosety bassed on coefficientOfRestitution
  u_1x = coefficientOfRestitution*u_1x;
  u_1y = coefficientOfRestitution*u_1y;
  u_2x = coefficientOfRestitution*u_2x;
  u_2y = coefficientOfRestitution*u_2y;

  //adds back the center mass to the object 
  u_1x += centerMassVol.x;
  u_1y += centerMassVol.y;
  u_2x += centerMassVol.x;
  u_2y += centerMassVol.y;
  
  //updates the cirles vecocity to what we have calculatet
  circle1.vol.x = u_1x;
  circle1.vol.y = u_1y;
  circle2.vol.x = u_2x;
  circle2.vol.y = u_2y;

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
function dynamicCollisionResolutionBox (circle,box,colitionPlane) {

  let v = Math.atan(colitionPlane.x/-colitionPlane.y);

  let closestCorner = findClosestPoint(createVector(circle.pos.x,circle.pos.y),box).closestPoint
  let distToCorner = dist(circle.pos.x,circle.pos.y,closestCorner.x,closestCorner.y)

  if(doesAxisAlignWithSides(box,colitionPlane) == false && distToCorner > circle.r+0.1){ //if plane is not aligned with any of the sides and it's not a corner hit 
    let newAxis = findSide(box,circle);
    v = Math.atan(newAxis.y/newAxis.x);
  }

  if(distToCorner <= circle.r+0.1){ //hjærneslag
    let vectorToClosestPoint = p5.Vector.sub(closestCorner,circle.pos)
    let orthogonalVector = createVector(vectorToClosestPoint.y,-vectorToClosestPoint.x)
    v = Math.atan(orthogonalVector.y/orthogonalVector.x);
  }

  let tempVector = convertVectorIntoNewCoordinateSystem(circle.vol,v); // skriver vectoren om så den er i et kordinasystem som er paralelt med siden
  tempVector.y = -tempVector.y*coefficientOfRestitution;
  let newVel = convertVectorIntoNewCoordinateSystem(tempVector,-v); // skriver vectoren om til det originale kordinatsystem
  circle.vol = newVel
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
 * @description findes the vekter that describes the direction of witch side of the box the circle is touching
 * @param {*} box 
 * @param {*} circle 
 * @returns the vekter describing the direction of the side
 */
function findSide(box,circle){
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

    return p5.Vector.sub(box.points[closestBoxPointIndex],box.points[point1Index]).setMag(1)
  } else return p5.Vector.sub(box.points[closestBoxPointIndex],box.points[point2Index]).setMag(1)
}