class Box {
  constructor(point1x, point1y, point2x, point2y, deapth) {
    let point1 = createVector(point1x, point1y);
    let point2 = createVector(point2x, point2y);
    let linje1 = p5.Vector.sub(point1, point2);
    let linje1Norm = createVector(-linje1.y, linje1.x).setMag(1);
    let point3 = p5.Vector.sub(point2, linje1Norm.setMag(deapth));
    let point4 = p5.Vector.sub(point1, linje1Norm.setMag(deapth));
    if(deapth< 0){
      point3 = p5.Vector.sub(point2, linje1Norm.setMag(deapth));
      point4 = p5.Vector.sub(point1, linje1Norm.setMag(-deapth));
    }
    this.id = allObjekts.length;

    this.vol = createVector(0,0)

    this.points = [
      point1,
      point2,
      point3,
      point4,
    ];

    this.updateVektors();
  }

  show() {
    line(this.points[0].x, this.points[0].y, this.points[1].x, this.points[1].y);
    line(this.points[1].x, this.points[1].y, this.points[2].x, this.points[2].y);
    line(this.points[2].x, this.points[2].y, this.points[3].x, this.points[3].y);
    line(this.points[3].x, this.points[3].y, this.points[0].x, this.points[0].y);
    //this.indexCorners()
    //point(this.center.x, this.center.y);
  }

  // shows the index of the corners on screan
  indexCorners(){
    text("0 ",this.points[0].x,this.points[0].y)
    text("1 ",this.points[1].x,this.points[1].y)
    text("2 ",this.points[2].x,this.points[2].y)
    text("3 ",this.points[3].x,this.points[3].y)
    text(this.id,this.center.x,this.center.y)

  }

  updateVektors() {
    this.lines = [
      p5.Vector.sub(this.points[1], this.points[0]),
      p5.Vector.sub(this.points[2], this.points[1]),
      p5.Vector.sub(this.points[3], this.points[2]),
      p5.Vector.sub(this.points[0], this.points[3]),
    ];

    this.norms = [
      createVector(this.lines[0].y, -this.lines[0].x).setMag(1),
      createVector(this.lines[1].y, -this.lines[1].x).setMag(1),
    ];

    let diagonal = p5.Vector.sub(this.points[2], this.points[0]);
    this.center = createVector(
      this.points[0].x + diagonal.x / 2,
      this.points[0].y + diagonal.y / 2
    );

    this.centerPoints = {
      a: p5.Vector.sub(this.points[0], this.center),
      b: p5.Vector.sub(this.points[1], this.center),
      c: p5.Vector.sub(this.points[2], this.center),
      d: p5.Vector.sub(this.points[3], this.center),
    };
  }

  rotateObject(amound, rotationPoint) {
    //if no rotational point is givven, then use the center of mass as the rotation point
    if (rotationPoint == undefined) {
      let toA = p5.Vector.sub(this.points[0], this.center);
      let toB = p5.Vector.sub(this.points[1], this.center);
      let toC = p5.Vector.sub(this.points[2], this.center);
      let toD = p5.Vector.sub(this.points[3], this.center);

      toA.rotate(amound);
      toB.rotate(amound);
      toC.rotate(amound);
      toD.rotate(amound);

      toA.add(this.center);
      toB.add(this.center);
      toC.add(this.center);
      toD.add(this.center);

      this.points[0] = toA;
      this.points[1] = toB;
      this.points[2] = toC;
      this.points[3] = toD;

      this.updateVektors();
    } else {
      let toA = p5.Vector.sub(this.points[0], rotationPoint);
      let toB = p5.Vector.sub(this.points[1], rotationPoint);
      let toC = p5.Vector.sub(this.points[2], rotationPoint);
      let toD = p5.Vector.sub(this.points[3], rotationPoint);

      toA.rotate(amound);
      toB.rotate(amound);
      toC.rotate(amound);
      toD.rotate(amound);

      toA.add(rotationPoint);
      toB.add(rotationPoint);
      toC.add(rotationPoint);
      toD.add(rotationPoint);

      this.points[0] = toA;
      this.points[1] = toB;
      this.points[2] = toC;
      this.points[3] = toD;

      this.updateVektors();
    }
  }

  move(){
    moveObject(this,this.vol,0.4)
    this.updateVektors()
  }
}
