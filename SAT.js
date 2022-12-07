
/**
 * @description cheks if the circle and other object are colliding using SAT
 * @param {*} circle 
 * @param {*} otherObject Circle or box
 * @returns object {ans: boolian, axis: vector}
 */
function circleCollisionChek(circle, other){
    let penetrationDeapth = undefined;
    let penetrationAxis = undefined;
    
    if(circle instanceof Circle && other instanceof Circle){ // if the tow objects are circles, then use this simple method
      let myDist = dist(circle.pos.x,circle.pos.y,other.pos.x,other.pos.y);
  
      if(myDist < circle.r + other.r){
        return {
          ans: true,
          axis: p5.Vector.sub(circle.pos,other.pos).setMag(1),
        };
      } else { return {ans: false}};
    }
  
    // this code only gets run if the other object is a box
    // cheks projektions overlap at box nomals
    for(let i = 0; i < other.norms.length; i++){
      let otherProjektion = startAndEndOfProjection(other.norms[i], other)
      let circleProjektion = startAndEndOfProjection(other.norms[i], circle)
      
      let overlap = doesProjectionOverlab(otherProjektion,circleProjektion);
      if(overlap.ans == false){
        return ({ans: false})
      }
  
      if (penetrationDeapth == undefined || penetrationDeapth > overlap.deapth){
        penetrationDeapth = overlap.deapth;
        penetrationAxis = other.norms[i]
      }
    }
    // cheks projektion overlap at cirkle normal
    let normal = findClosestPoint(circle.center, other).normal.setMag(1)
    circle.updateVektors(normal);
  
    let otherProjektion = startAndEndOfProjection(normal, other)
    let circleProjektion = startAndEndOfProjection(normal, circle);
  
  
    let overlap = doesProjectionOverlab(otherProjektion,circleProjektion);
    if(overlap.ans == false){
      return ({ans: false})
    }
    // if the code has reached this point then there is a colition
    if (penetrationDeapth == undefined || penetrationDeapth > overlap.deapth){
      penetrationDeapth = overlap.deapth;
      penetrationAxis = circle.norms[0]
    }
  
    //makes the colition axis be the right direciton
    let VektorBetween = p5.Vector.sub(circle.center, other.center);
    if (dotProdukt(VektorBetween, penetrationAxis) < 0) {
      penetrationAxis = createVector(-penetrationAxis.x, -penetrationAxis.y);
    }
   
    return {
      ans: true,
      axis: penetrationAxis
    };
}

/**
 * @description cheks the two boxes are colliding (not in use anymore)
 * @param {*} box 
 * @param {*} box 
 * @returns object {ans: boolian, penetrationDeapth: number, axis: vector}
 */
function boxCollisionChek(object1, object2) {
  
    let theObjects = [object1, object2];
    let penetrationDeapth = undefined;
    let penetrationAxis = undefined;
    // For værd objekt
    for (let i = 0; i < theObjects.length; i++){
      for (let j = 0; j < theObjects[i].norms.length; j++){
        theObjects[0].updateVektors()
        theObjects[1].updateVektors()
        let skygge1 = startAndEndOfProjection(theObjects[i].norms[j], object1)
        let skygge2 = startAndEndOfProjection(theObjects[i].norms[j], object2)
        // Vi skal nu se om skyggerne overlaper
        let overlap = doesProjectionOverlab(skygge1,skygge2);
        if(overlap.ans == false){
          return ({ans: false})
        }
        if (penetrationDeapth == undefined || penetrationDeapth > overlap.deapth){
          penetrationDeapth = overlap.deapth;
          penetrationAxis = theObjects[i].norms[j]
        }
      }
    }
  
  
    //hvis koden når her ned er der sket en colition
    let VektorBetween = p5.Vector.sub(theObjects[1].center, theObjects[0].center);
    //makes the colition axis be the right direciton
    if (dotProdukt(VektorBetween, penetrationAxis) < 0) {
      penetrationAxis = createVector(-penetrationAxis.x, -penetrationAxis.y);
    }
    return {
      ans: true,
      penetrationDeapth: penetrationDeapth,
      axis: penetrationAxis,
    };
}

/**
 * @description projects the object onto the norm and returns the position of the start of the projection and the postion of the end of the projection 
 * @param {*} norm vector
 * @param {*} object circle or box
 * @returns projectionsObject {max: number, min: number}
 */
function startAndEndOfProjection(norm,object){
  norm.setMag(1);
  let max;
  let min;

  if(object instanceof Box) {
    for (let i = 0; i < object.points.length; i++){
      let projektionslængde = lengthOfprojektion(
        norm,
        object.points[i]
      );
  
      if (projektionslængde > max || max == undefined)
        max = projektionslængde;
      if (projektionslængde < min || min == undefined)
        min = projektionslængde;
    } 
  } else {
    let projektionslængde = lengthOfprojektion(
      norm,
      object.pos
    );
    max = projektionslængde + object.r
    min = projektionslængde - object.r
  }

  return {max: max, min: min};
}

/**
 * @description takes two projections objects and cheks if thay are overlabing and returns how much thay are overlabing
 * @param {*} object projectet1 
 * @param {*} object projectet2 
 * @returns object {ans: boolian, deapth number}
 */
function doesProjectionOverlab(projectet1,projectet2){
  if(projectet1.min < projectet2.max && projectet1.max > projectet2.min){

    // true if the shadows overlab
    let penetrationDeapth = findSmallestOverlap(projectet1.max,projectet1.min,projectet2.max,projectet2.min);
    return({ans:true, deapth: penetrationDeapth});
  }
  return({ans: false});
}