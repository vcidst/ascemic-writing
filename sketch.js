var frameInterval = 5; // how many frames per segment
var numMolnarGridsX = 4; // how many letters per row
var numMolnarGridsY = 5; // how many rows of letters
var gridSizeX = 4;  // how many GridX in each letter
var gridSizeY = 2; // how many GridY in each letter
var letterWidth = 100;
var letterHeight = 100;

var molnarGrids = [];
var indexActive = 0;

var curvedVertices = false;
var textHeight;
var margin = 25;

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(100);

  // text for header
  rectMode(CORNERS);
  textSize(32);
  fill(255);
  text('Ascemic Writing', 30, 60);
  noFill();

  // grid constants
  textHeight = windowHeight / 2;
  numMolnarGridsY = round(textHeight / letterHeight);
  numMolnarGridsX = round(windowWidth / letterWidth);
  console.log(numMolnarGridsX);

  // define the grid
  for (var y=0; y<numMolnarGridsY; y++) {
    for (var x=0; x<numMolnarGridsX; x++) {
      var mx = map(x, 0, numMolnarGridsX, margin, windowWidth);
      var my = map(y, 0, numMolnarGridsY, margin * 2.5, windowHeight);
      var mwidth = width / numMolnarGridsX;
      var mheight = textHeight / numMolnarGridsY;
      
      var m = new MolnarGrid(mx, my, mwidth, mheight, gridSizeX, gridSizeY, margin);
      m.createOrder();
      molnarGrids.push(m);
    }
  }
}

function draw() {
  stroke(255);

  molnarGrids[indexActive].update();
  
  // check if it's done... if it is, set to update the next molnar grid
  if (molnarGrids[indexActive].isDone()) {
    indexActive = min(indexActive, molnarGrids.length-1);
    if (indexActive % 3 == 0 && round(random()))
      indexActive = indexActive + 2;
    else
      indexActive = indexActive + 1
    
  }
  
  for (var i=0; i<molnarGrids.length; i++) {
    molnarGrids[i].draw();
  }
}

