const fpePresition = 0.00001
/**
 * @name Floationg Point Error Correction 
 * @description returns true if a and b is the same number within a margin of 0.00001
 * @param {*} a 
 * @param {*} b 
 * @returns boolian
 */
function fpeCorection(a,b){
  if(a <= b + fpePresition && a >= b -fpePresition){
    return true;
  }
  return false;
}

/**
 * @param {*} vektor1 
 * @param {*} vektor2 
 * @returns dot produkt of the vektors
 */
function dotProdukt(vektor1, vektor2) {
  return vektor1.x * vektor2.x + vektor1.y * vektor2.y;
}

/**
 * @description finds the smallest overlab in the intervals [a,A] and [b,B]
 * @param {number} A 
 * @param {number} a 
 * @param {number} B 
 * @param {number} b 
 * @returns the size of the overlap
 */
function findSmallestOverlap(A, a, B, b) {
  let differenseAb = A - b;
  let differenseBa = B - a;

  if (differenseAb < differenseBa) return differenseAb;
  if (differenseBa < differenseAb) return differenseBa;
}

/**
 * @description findes the angle between two vectors in radions
 * @param {*} vector1 
 * @param {*} vector2 
 * @returns angle between vectors in radions
 */
function angleBetweenVectors(v1,v2){
  prikprodukt = v1.x*v2.x + v1.y*v2.y
  return Math.acos(prikprodukt/(v1.mag()*v2.mag()))
}

/**
 * @description findes the lenghth of the projectet vector down on the axis called floor
 * @param {*} floor 
 * @param {*} vektor 
 * @returns the length of the projectet vector
 */
function lengthOfprojektion(floor, vektor) {
  let projektionVektor = createVector(
    floor.x * dotProdukt(floor, vektor),
    floor.y * dotProdukt(floor, vektor)
  );
  if (dotProdukt(floor, vektor) < 0) {
    return -projektionVektor.mag();
  }
  return projektionVektor.mag();
}

/**
 * @description converts vektor into a different kordinat system that is rotated by angle
 * @param {*} vector 
 * @param {*} angle degrees
 * @returns the new vector
 */
function convertVectorIntoNewCoordinateSystem(vector,angle){
  let x = Math.cos(angle)*vector.x + Math.sin(angle)*vector.y
  let y = -Math.sin(angle)*vector.x + Math.cos(angle)*vector.y
  return createVector(x,y);
}