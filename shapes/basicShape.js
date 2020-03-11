class BasicShape
{
  constructor(coreVertices,color,name)
  {
    this.name = name;
    this.color = color;
    this.vertices = coreVertices;
  }

  create(circlePath)
  {
    let verticesCopy = this.vertices.slice();
    for(let i=0;i<this.vertices.length;i++)
    {
      let current = this.vertices[i].copy();
      let next = this.vertices[(i+1)%this.vertices.length].copy();
      let distance = dist(current.x,current.y,next.x,next.y);
      let dir = next.copy().sub(current).normalize();
      let segmentCount = circlePath.length/this.vertices.length;
      let segments = [];
      let jump = distance/segmentCount;
      for(let j=1;j<segmentCount;j++)
      {
        let nextstep = dir.copy().mult(jump*j);
        segments.push(current.copy().add(nextstep));
      }
      verticesCopy.insert(i*segmentCount,segments);
    }
    this.vertices = verticesCopy;
  }

  showVertices()
  {
    stroke(this.color);
    for(let v of this.vertices)
    {
      ellipse(v.x,v.y,5);
    }
  }

  showShape()
  {
    stroke(this.color);
    beginShape();
    for(let v of this.vertices)
    {
      vertex(v.x,v.y);
    }
    endShape(CLOSE);
  }

  deepCopy()
  {
    let vertices = [];
    let c = color(this.color._getRed(),this.color._getGreen(),this.color._getBlue());
    for(let v of this.vertices)
    {
      vertices.push(createVector(v.x,v.y));
    }
    return new BasicShape(vertices,c,this.name);
  }
}
