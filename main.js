let r = 100;
let circlePath = [];
let rectPath = [];
let trianglePath = []
let currentShape = [];
let hexagonPath = [];
let res = 10;
let desiredShapeArray = [];
let lastShape = [];
let reverse = false;
let defaultColor;
let desiredColor;
let tmp = 0;
let colorsSwapped=false;
let nextPathIndex = 0;
let allPaths=[];
function setup()
{
  createCanvas(400,400);
  angleMode(DEGREES);
  ellipseMode(CENTER);
  r=150;
  defaultColor = color(100,150,200);
  desiredColor = color(200,200,100);
  for(let i=-45;i<315;i+=res)
  {
    circlePath.push(createVector(cos(i)*r,sin(i)*r));
    currentShape.push(createVector(cos(i)*r,sin(i)*r));
    desiredShapeArray.push(createVector(cos(i)*r,sin(i)*r));
    lastShape.push(createVector(cos(i)*r,sin(i)*r));
  }

  rectPath.push(createVector(cos(45)*r,sin(-45)*r));
  rectPath.push(createVector(cos(45)*r,sin(45)*r));
  rectPath.push(createVector(cos(135)*r,sin(45)*r));
  rectPath.push(createVector(cos(135)*r,sin(-45)*r));

  rectPath = createPath(rectPath);

  trianglePath.push(createVector(0,sin(-45)*r));
  trianglePath.push(createVector(cos(45)*r,sin(45)*r));
  trianglePath.push(createVector(cos(135)*r,sin(45)*r));

  trianglePath = createPath(trianglePath);

  //r*=0.75;
  hexagonPath.push(createVector(cos(0)*r,sin(0)*r));
  hexagonPath.push(createVector(cos(60)*r,sin(60)*r));
  hexagonPath.push(createVector(cos(120)*r,sin(120)*r));
  hexagonPath.push(createVector(cos(180)*r,sin(0)*r));
  hexagonPath.push(createVector(cos(240)*r,sin(240)*r));
  hexagonPath.push(createVector(cos(300)*r,sin(300)*r));

  hexagonPath = createPath(hexagonPath);

  defaultColor = swap(defaultColor,defaultColor=desiredColor);
  desiredColor = swap(defaultColor,defaultColor=desiredColor);

  allPaths.push(rectPath);
  allPaths.push(trianglePath);
  allPaths.push(hexagonPath);
  nextPath = allPaths[nextPathIndex];
}

function draw()
{
  translate(width/2,height/2);
  background(51);
  strokeWeight(4);
  noFill();
  updateVertices();
  stroke(lerpColor(defaultColor,desiredColor,tmp));


  let c = currentShape[17].copy();
  let d = desiredShapeArray[17].copy();
  let l = lastShape[17].copy();
  let fulldist = dist(l.x,l.y,d.x,d.y);
  let currdist = dist(l.x,l.y,c.x,c.y);

  tmp = currdist/fulldist;

  beginShape();
  for(let point of currentShape)
  {
    //ellipse(point.x,point.y,5);
    vertex(point.x,point.y);
  }
  endShape(CLOSE);
  for(let point of lastShape)
  {
    //ellipse(point.x,point.y,10);
  }
}

Array.prototype.insert = function(index) {
    index = Math.min(index+1, this.length);
    arguments.length > 1
        && this.splice.apply(this, [index, 0].concat([].pop.call(arguments)))
        && this.insert.apply(this, arguments);
    return this;
};

function createPath(vertices)
{
  let verticesCopy = vertices.slice();
  for(let i=0;i<vertices.length;i++)
  {
    let current = vertices[i].copy();
    let next = vertices[(i+1)%vertices.length].copy();
    let distance = dist(current.x,current.y,next.x,next.y);
    let dir = next.copy().sub(current).normalize();
    let segmentCount = circlePath.length/vertices.length;
    let segments = [];
    let jump = distance/segmentCount;
    for(let j=1;j<segmentCount;j++)
    {
      let nextstep = dir.copy().mult(jump*j);
      segments.push(current.copy().add(nextstep));
    }
    verticesCopy.insert(i*segmentCount,segments);
  }
  return verticesCopy;
}
function updateVertices()
{
  let finished = true;
  for(let i=0;i<circlePath.length;i++)
  {
    let c = currentShape[i].copy();
    let d = desiredShapeArray[i].copy();
    let distance = dist(c.x,c.y,d.x,d.y);
    if(distance>1) finished = false;
    i%2 ? stroke(150,100,200,64) : stroke(200,100,150,64);
    //line(c.x,c.y,d.x,d.y);
    let vec;
    vec = d.sub(c).setMag(distance*0.1);
    currentShape[i].add(vec);
  }
  if(finished)
  {
    lastShape = desiredShapeArray.slice();
    colorsSwapped = false;
    nextPathIndex = (nextPathIndex+1)%allPaths.length;
    if(reverse)
    {
      setTimeout(()=>
      {
        if(!colorsSwapped)
        {
          defaultColor = swap(defaultColor,defaultColor=desiredColor);
          desiredColor = swap(defaultColor,defaultColor=desiredColor);
          colorsSwapped = true;
        }
        desiredShapeArray = circlePath.slice();
        reverse = false;
      },31);
    }
    else
    {
      setTimeout(()=>
      {
        if(!colorsSwapped)
        {
          defaultColor = swap(defaultColor,defaultColor=desiredColor);
          desiredColor = swap(defaultColor,defaultColor=desiredColor);
          colorsSwapped = true;
        }
        desiredShapeArray = allPaths[nextPathIndex];
        reverse = true;
      },31);
    }
  }
}

function swap(x){return x}
