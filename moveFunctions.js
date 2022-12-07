/**
 * @description Moves object measured in canvas pixels
 * @param {*} object (circle or box)
 * @param {*} vector direction
 * @param {*} number amount moved in canvas pixels
 */
function moveObjectStatic(object, direction, amount) {
    let notAPointerDirection = createVector(direction.x,direction.y).setMag(1); // uesd not a pointer becuse the setMag() would change the speed of the object and not just this temperary vector
    let movementVektor = createVector(notAPointerDirection.x * amount, notAPointerDirection.y * amount);
  
      for (let i = 0; i < object.points.length; i++) {
        object.points[i].add(movementVektor);
      }
      object.center.add(movementVektor);
}
  
/**
 * @description Moves object measured in meters
 * @param {*} object (circle or box)
 * @param {*} vector direction
 * @param {*} amount amount moved in meters
 */
function moveObject(object, direction, amount) {
    let notAPointerDirection = createVector(direction.x,direction.y).setMag(1); // uesd not a pointer becuse the setMag() would change the speed of the object and not just this temperary vector
  
    let movementX = notAPointerDirection.x * amount * 100 / worldScale;
    let movementY = notAPointerDirection.y * amount * 100 / worldScale;
    let movementVektor = createVector(movementX, movementY);
  
    for (let i = 0; i < object.points.length; i++) {
      object.points[i].add(movementVektor);
    }
    object.center.add(movementVektor);
  
    for (let i = 0; i < allObjekts.length; i++) {
      allObjekts[i].updateVektors();
    }
}