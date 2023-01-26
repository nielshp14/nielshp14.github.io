class Circle {
  constructor(posX, posY, r, volX,volY,mass) {
    if(volX == undefined || volY == undefined) {
      volX = 0;
      volY = 0;
    }


    this.pos = createVector(posX, posY);
    this.r = r;
    this.mass = mass;
    this.vol = createVector(volX,volY);
    this.acc = createVector(0,gravitationalAcceleration)
    this.id = allObjekts.length;
  }

  updateVektors(norm){

    if(norm == undefined){
        norm = this.findClosestPoint().normal;
    }

    this.norms = [norm];

    this.center = this.pos;

    let pointOfset = norm.setMag(this.r);
    let point1 = p5.Vector.add(this.pos,pointOfset);
    let point2 = p5.Vector.sub(this.pos,pointOfset);
    
    this.points = [
        point1, point2
    ];
  }

  show() {
    noFill();
    circle(this.pos.x, this.pos.y, this.r * 2);
    //text(this.id,this.pos.x-7,this.pos.y)
    if(showVol) {
      drawVector(this.pos.x,this.pos.y,(this.pos.x + (this.vol.x * 100 / worldScale * volScale)), (this.pos.y + (this.vol.y* 100 / worldScale * volScale)),2,0,255,0)
    }

  }


  //metoden finder det tæteste punkt på det givede objekt. Hvis et objekt ikke er givet findes det tæteste punkt af alle objekterne
  findClosestPoint(objekt) {
    let closestPointVektor;
    let closestPoint;
    let index

    if(objekt != NaN|| objekt != undefined){
      if (objekt instanceof Box) {
        for (let i2 = 0; i2 < objekt.points.length; i2++) {
          let distVektor = p5.Vector.sub(objekt.points[i2], this.pos);
          if (
            closestPointVektor == undefined ||
            distVektor.mag() < closestPointVektor.mag()
          ) {
            closestPointVektor = distVektor;
            closestPoint = objekt.points[i2];
            index = i2
          }
        }
      } else if (objekt instanceof Circle && objekt != this) {
        let distVektor = p5.Vector.sub(objekt.pos, this.pos);
        if (
          closestPointVektor == undefined ||
          distVektor.mag() < closestPointVektor.mag()
        ) {
          closestPointVektor = distVektor;
          closestPoint = objekt.pos
          index = 0
        }
      }
    }

    if(objekt == undefined){
      for (let i = 0; i < allObjekts.length; i++) {
        //der skal gøres forskælige ting hvis objektet er en kasse eller en cirkel
        if (allObjekts[i] instanceof Box) {
          for (let i2 = 0; i2 < allObjekts[i].points.length; i2++) {
            let distVektor = p5.Vector.sub(allObjekts[i].points[i2], this.pos);
            if (
              closestPointVektor == undefined ||
              distVektor.mag() < closestPointVektor.mag()
            ) {
              closestPointVektor = distVektor;
              closestPoint = allObjekts[i].points[i2];
              index = i2;
            }
          }
        } else if (allObjekts[i] instanceof Circle && allObjekts[i] != this) {
          let distVektor = p5.Vector.sub(allObjekts[i].pos, this.pos);
          if (
            closestPointVektor == undefined ||
            distVektor.mag() < closestPointVektor.mag()
          ) {
            closestPointVektor = distVektor;
            closestPoint = allObjekts[i].pos
            index = 0;
          }
        }
      }
    }

    return {
      closestPoint: closestPoint,
      normal: closestPointVektor.setMag(-1),
      index: index
    };
  }

  move(){
    let gravAcc = createVector(0,gravitationalAcceleration)
    let t = 1/60
    let frictionX = 0;
    let frictionY = 0;
    let frictionDeleleration = coefficientOfFriction*g
    if(this.vol.mag() <= frictionDeleleration/60){
      this.vol.x = 0;
      this.vol.y = 0.000001;
    } else{
      let moveDir = createVector(this.vol.x,this.vol.y).setMag(1)
      frictionX = moveDir.x * frictionDeleleration;
      frictionY = moveDir.y * frictionDeleleration;
    }

    let xMove = 1/2*(gravAcc.x-frictionX)*t**2 +this.vol.x*t 
    let yMove = 1/2*(gravAcc.y-frictionY)*t**2 +this.vol.y*t 

    let movementVecotor = createVector(xMove,yMove)
    moveObject(this,movementVecotor,movementVecotor.mag())
    
    this.vol.x += (gravAcc.x-frictionX)*t
    this.vol.y += (gravAcc.y-frictionY)*t

    this.updateVektors()
  }
}
