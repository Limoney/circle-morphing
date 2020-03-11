class MorphableShape
{

  constructor()
  {
    this.currentShape = null;
    this.fromShape = null;
    this.toShape = null;
    this.finishedMorphing = false;
    this.morphTargetArray = [];
    this.color = color(0,0,0);
    this.performancePercentage = 0;
    this.isMorphingSequenceOn = false;
    this.morphingSequence = [];
    this.sequenceIndex = 0;
  }

  update()
  {
    if(this.finishedMorphing)
    {
      this.finishedMorphing = false;
      this.toShape = swap(this.toShape,this.toShape=this.fromShape);
      this.fromShape = swap(this.toShape,this.toShape=this.fromShape);
      if(this.isMorphingSequenceOn)
      {
        this.sequenceIndex = ++this.sequenceIndex%this.morphingSequence.length;
        this.toShape = this.morphingSequence[this.sequenceIndex];
      }
      this.morphTargetArray = this.toShape.vertices;
    }
    this.finishedMorphing = true
    for(let i=0;i<this.currentShape.length;i++)
    {
      //morphing
      let current = this.currentShape[i].copy();
      let desired = this.morphTargetArray[i].copy();
      let distance = dist(current.x,current.y,desired.x,desired.y);
      if(distance>1) this.finishedMorphing = false;
      let vec;
      vec = desired.sub(current).setMag(distance*0.1);
      this.currentShape[i].add(vec);

      //color
      let center = floor(this.currentShape.length/2)-1;

      let c = this.currentShape[center].copy();
      let d = this.toShape.vertices[center].copy();
      let l = this.fromShape.vertices[center].copy();
      let fulldist = dist(l.x,l.y,d.x,d.y);
      let currdist = dist(l.x,l.y,c.x,c.y);

      this.performancePercentage = currdist/fulldist;

      this.color = lerpColor(this.fromShape.color,this.toShape.color,this.performancePercentage);
    }
  }

  morphFrom(basicShape)
  {
    basicShape = basicShape.deepCopy();
    this.fromShape = basicShape;
    this.currentShape = basicShape.deepCopy().vertices;
  }

  morphTo(basicShape)
  {
    basicShape = basicShape.deepCopy();
    this.toShape = basicShape;
    this.morphTargetArray = basicShape.deepCopy().vertices;
  }

  useMorphingSequence(basicShapeArray)
  {
    if(!Array.isArray(basicShapeArray) ||basicShapeArray.length<0) this.isMorphingSequenceOn = false;
    else if(basicShapeArray.length<2) throw ("array must contain at least 2 elements");
    else
    {
      this.morphingSequence = basicShapeArray;
      this.morphFrom(basicShapeArray[0]);
      this.morphTo(basicShapeArray[1]);
      this.sequenceIndex=2;
      this.isMorphingSequenceOn = true;
    }
  }

  showVertices()
  {
    stroke(this.color);
    for(let v of this.currentShape)
    {
      ellipse(v.x,v.y,5);
    }
  }

  showShape()
  {
    stroke(this.color);
    beginShape();
    // for(let v of this.currentShape)
    // {
    //   vertex(v.x,v.y);
    // }
    for(let i=0;i<this.currentShape.length;i++)
    {
      let c = this.currentShape[i].copy();
      let d = this.toShape.vertices[i].copy();
      let dn = this.toShape.vertices[(i+1)%this.currentShape.length].copy();
      let l = this.fromShape.vertices[i].copy();
      // let fulldist = dist(l.x,l.y,d.x,d.y);
      // let currdist = dist(l.x,l.y,c.x,c.y);
      line(d.x/2,d.y/2,dn.x/2,dn.y/2);
      line(c.x,c.y,d.x/2,d.y/2);
      vertex(this.currentShape[i].x,this.currentShape[i].y);
    }
    endShape(CLOSE);
  }
}
