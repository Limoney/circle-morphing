let r = 100;
let circlePath = [];
let rectPath = [];
let res = 10;
function setup()
{
  createCanvas(400,400);
  angleMode(DEGREES);
  ellipseMode(CENTER);
  r=150;
  for(let i=-45;i<45;i+=res)
  {
    circlePath.push(createVector(cos(i)*r,sin(i)*r));
  }
  r=75;
  rectPath.push(createVector(cos(45)*r,sin(-45)*r));
  rectPath.push(createVector(cos(45)*r,sin(45)*r));
  //rectPath.push(createVector(cos(135)*r,sin(45)*r));
  //rectPath.push(createVector(cos(135)*r,sin(-45)*r));

  let rectPathcp = rectPath.slice();
  console.log("sb "+ rectPathcp.length);
  for(let i = 0; i< rectPath.length;i++)
  {
    let injectPoints = [];
    let current = rectPath[i].copy();
    let next = rectPath[(i+1)%rectPath.length].copy();
    const distance = dist(current.x,current.y,next.x,next.y);
    const dir = next.sub(current).normalize();
    console.log(distance);
    //let jump = distance/((circlePath.length-4))*2;
    let jump = distance/(32)*2;
    //for(let j = 1;j<circlePath.length/4;j++)
    for(let j = 1;j<36/8;j++)
    {
      let distcp = dir.copy();
      let sth = createVector(current.x,current.y).add(distcp.add(distcp.mult(j*jump)));
      injectPoints.push(sth);
      console.log("call");
    }
    //jak to nie zadzialalo jak chcialem to rip z debugowanie tego w przyszlosci
    //rectPath.splice(injectPoints.length,0,...injectPoints);
    console.log("si "+ injectPoints.length);
    rectPathcp.insert2(rectPathcp.indexOf(current),injectPoints);

  }
  rectPath = rectPathcp;
  console.log("se "+ rectPath.length);
}

function draw()
{
  translate(width/2,height/2);
  background(51);
  strokeWeight(4);

  for(let i=0;i<circlePath.length;i++)
  {
    i%2==0 ? stroke(255,0,0,128) : stroke(255,128,255,64);
    let vec = rectPath[i].copy().sub(circlePath[i]);
    line(circlePath[i].x,circlePath[i].y,rectPath[i].x,rectPath[i].y);
    vec.normalize();
    //circlePath[i].add(vec);
  }
  noFill();
  stroke(100,150,200);
  beginShape();
  for(let point of circlePath)
  {
    ellipse(point.x,point.y,10);
    //vertex(point.x,point.y);
  }
  endShape(CLOSE);
  stroke(200,150,100,64);
  for(let point of rectPath)
  {
    ellipse(point.x,point.y,10);
  }
}

Array.prototype.insert2 = function(index) {
    index = Math.min(index+1, this.length);
    arguments.length > 1
        && this.splice.apply(this, [index, 0].concat([].pop.call(arguments)))
        && this.insert2.apply(this, arguments);
    return this;
};
