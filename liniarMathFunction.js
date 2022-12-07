// this opbjekt takes tow points and creates a liniar funktion between the tow points
class liniarMathFunction {
  constructor(point1, point2) {
    this.p1x = point1.x;
    this.p2x = point2.x;
    this.p1y = point1.y;
    this.p2y = point2.y;

    this.functionIsVertical = false;
    if (this.p1x == this.p2x) {
      this.functionIsVertical = true;
    }
    // y = a * x + b

    // a = delta y / delta x
    this.a = (this.p2y - this.p1y) / (this.p2x - this.p1x);
    // b = -a * x + y 
    this.b = -this.a * this.p2x + this.p2y;
  }

  f(x){
    if(this.functionIsVertical){
      console.log("warning: the function is vertical, x was returend")
      return this.p1x;
    }

    return this.a * x + this.b
  }
}
