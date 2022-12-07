/**
 * @description shows all objects in the array allObjects on the screan
 */
function showAll() {
  for (let i = 0; i < allObjekts.length; i++) {
    allObjekts[i].show();
  }
}

/**
 * @description draws a point on the screan
 * @param {*} x
 * @param {*} y
 * @param {*} red
 * @param {*} green
 * @param {*} blue
 * @param {*} size
 */
function drawPoint(x, y, r, g, b, size) {
  strokeWeight(size);
  stroke(r, g, b);
  point(x, y);
  strokeWeight(1);
  stroke(0);
}

/**
 * @description draws a vector from point1 to point2
 * @param {number} x1
 * @param {number} y1
 * @param {number} x2
 * @param {number} y2
 * @param {number} size
 * @param {number} r red
 * @param {number} g green
 * @param {number} b blue
 */
function drawVector(x1, y1, x2, y2, size, r, g, b) {
  strokeWeight(size);
  stroke(r, g, b);

  line(x1, y1, x2, y2);
  let vX = x2 - x1;
  let vY = y2 - y1;

  let headX = cos(135) * vX - sin(135) * vY;
  let headY = sin(135) * vX + cos(135) * vY;
  let leng = sqrt(headX ** 2 + headY ** 2);
  headX = headX / leng; // unit vector Cordinets
  headY = headY / leng; // unit vector Cordinets

  line(x2, y2, x2 + headX * 10, y2 + headY * 10);
  line(x2, y2, x2 + -headY * 10, y2 + headX * 10);

  strokeWeight(1);
  stroke(0);
}

/**
 * @description draws a background grid
 */
function drawBackground() {
  background(220);
  stroke(200, 200, 200);

  //lavet linjer for værd 10 cm
  if (worldScale < 4) {
    // differen background bassed on world scale to remove cluder
    for (let i = 0; i < 100 * worldScale; i++) {
      let startX = 0 + (i * 10) / worldScale;
      let startY = 0;
      let endX = 0 + (i * 10) / worldScale;
      let endY = height;

      line(startX, startY, endX, endY);

      let startX2 = 0;
      let startY2 = 0 + (i * 10) / worldScale;
      let endX2 = 900;
      let endY2 = 0 + (i * 10) / worldScale;

      line(startX2, startY2, endX2, endY2);
    }
  }

  stroke(170, 170, 170);

  //Makes line for every meter
  for (let i = 0; i < 10 * worldScale; i++) {
    //Makes line for every 10 cm
    let startX = 0 + (i * 100) / worldScale;
    let startY = 0;
    let endX = 0 + (i * 100) / worldScale;
    let endY = height;

    line(startX, startY, endX, endY);

    let startX2 = 0;
    let startY2 = 0 + (i * 100) / worldScale;
    let endX2 = 900;
    let endY2 = 0 + (i * 100) / worldScale;

    line(startX2, startY2, endX2, endY2);

    //adds numbers the the background for scale
    if (worldScale < 4 || i % 5 == 0) {
      let textX = 0 + (i * 100) / worldScale + 1;
      let testY = 10;
      text(i + " m", textX, testY);

      let textX2 = 1;
      let testY2 = 0 + (i * 100) / worldScale + 10;
      text(i + " m", textX2, testY2);
    }
  }

  stroke(0);
}
