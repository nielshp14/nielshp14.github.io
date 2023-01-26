/**
 * @description gives the distance to the closest point (closest ege) an extra agument can be given to only chek the points on one object
 * @param {*} startingPoint 
 * @param {*} objekt 
 * @returns object {closestPoint: position of closest point, normal: vektor to the point}
 */
function findClosestPoint(startingPoint,objekt) { // To Self: Denne function kan rettes/slettes fordi der er en meget lindende function med samme navn under circleClass.js. Jeg br kun have en funtion til hværd ting
  let closestPointVektor;
  let closestPoint;
 
  if(objekt != NaN){
    if (objekt instanceof Box) {
      for (let i2 = 0; i2 < objekt.points.length; i2++) {
        let distVektor = p5.Vector.sub(objekt.points[i2], startingPoint);
        if (
          closestPointVektor == undefined ||
          distVektor.mag() < closestPointVektor.mag()
        ) {
          closestPointVektor = distVektor;
          closestPoint = objekt.points[i2];
        }
      }
    } else if (objekt instanceof Circle && objekt != this) {
      let distVektor = p5.Vector.sub(objekt.pos, startingPoint);
      if (
        closestPointVektor == undefined ||
        distVektor.mag() < closestPointVektor.mag()
      ) {
        closestPointVektor = distVektor;
        closestPoint = objekt.pos
      }
    }
  }
 
  if(objekt == undefined) {
    for (let i = 0; i < allObjekts.length; i++) {
      //der skal gøres forskælige ting hvis objektet er en kasse eller en cirkel
      if (allObjekts[i] instanceof Box) {
        for (let i2 = 0; i2 < allObjekts[i].points.length; i2++) {
          let distVektor = p5.Vector.sub(allObjekts[i].points[i2], startingPoint);
          if (
            closestPointVektor == undefined ||
            distVektor.mag() < closestPointVektor.mag()
          ) {
            closestPointVektor = distVektor;
            closestPoint = allObjekts[i].points[i2];
          }
        }
      } else if (allObjekts[i] instanceof Circle && allObjekts[i] != this) {
        let distVektor = p5.Vector.sub(allObjekts[i].pos, startingPoint);
        if (
          closestPointVektor == undefined ||
          distVektor.mag() < closestPointVektor.mag()
        ) {
          closestPointVektor = distVektor;
          closestPoint = allObjekts[i].pos
        }
      }
    }
  }
 
  return {
    closestPoint: closestPoint,
    normal: closestPointVektor.setMag(1),
  };
}