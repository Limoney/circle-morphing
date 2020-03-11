let r = 150;
let circlePath_old = [];
let rectPath = [];
let trianglePath = []
let currentShape = [];
let hexagonPath = [];
let ms;
let bs1,bs2,bs3,bs4;
let res = 10;
let theta = 0;
function setup()
{
  createCanvas(400,400);
  angleMode(DEGREES);
  ellipseMode(CENTER);
  for(let i=-45;i<315;i+=res)
  {
    circlePath_old.push(createVector(cos(i)*r,sin(i)*r));
  }

  rectPath.push(createVector(cos(45)*r,sin(-45)*r));
  rectPath.push(createVector(cos(45)*r,sin(45)*r));
  rectPath.push(createVector(cos(135)*r,sin(45)*r));
  rectPath.push(createVector(cos(135)*r,sin(-45)*r));

  trianglePath.push(createVector(cos(90)*r,sin(-90)*r));
  trianglePath.push(createVector(cos(30)*r,sin(30)*r));
  trianglePath.push(createVector(cos(150)*r,sin(30)*r));
  //trianglePath.push(createVector(cos(120)*r,sin(120)*r));

  hexagonPath.push(createVector(cos(0)*r,sin(0)*r));
  hexagonPath.push(createVector(cos(60)*r,sin(60)*r));
  hexagonPath.push(createVector(cos(120)*r,sin(120)*r));
  hexagonPath.push(createVector(cos(180)*r,sin(0)*r));
  hexagonPath.push(createVector(cos(240)*r,sin(240)*r));
  hexagonPath.push(createVector(cos(300)*r,sin(300)*r));

  //classes


  bs1 = new BasicShape(rectPath,color(100,150,200),"rect");
  bs1.create(circlePath_old);

  bs2 = new BasicShape(circlePath_old,color(200,150,100),"circle");
  bs2.create(circlePath_old);

  bs3 = new BasicShape(hexagonPath,color(150,200,100),"hexagon");
  bs3.create(circlePath_old);

  bs4 = new BasicShape(trianglePath,color(100,200,150),"triangle");
  bs4.create(circlePath_old);

  ms = new MorphableShape(circlePath_old);
  //ms.morphFrom(bs2);
  //ms.morphTo(bs4);
  ms.useMorphingSequence([bs2,bs1,bs2,bs3,bs2,bs4]);// smoething is not right with order in first cycle
}

function draw()
{
  translate(width/2,height/2);
  background(51);
  //clear();
  strokeWeight(10);
  noFill();
  rotate(theta);
  //bs4.showVertices();
  //bs2.showVertices();
  ms.update();
  ms.showShape();
  //theta+=0.9;
}

Array.prototype.insert = function(index) {
    index = Math.min(index+1, this.length);
    arguments.length > 1
        && this.splice.apply(this, [index, 0].concat([].pop.call(arguments)))
        && this.insert.apply(this, arguments);
    return this;
};

function deepCopy(src) {
  let target = {};
  for (let prop in src) {
    if (src.hasOwnProperty(prop)) {
      // if the value is a nested object, recursively copy all it's properties
      if (isObject(src[prop])) {
        target[prop] = deepCopy(src[prop]);
      } else {
        target[prop] = src[prop];
      }
    }
  }
  return target;
}
function isObject(obj) {
  var type = typeof obj;
  return type === 'function' || type === 'object' && !!obj;
};

function swap(x){return x}
