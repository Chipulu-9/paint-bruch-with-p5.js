let strokeSegments = [];
let undoneSegments = [];

let availableColors = ["black", "red", "blue", "green"];
let activeStrokeColor = "black";

let bottomToolbarHeight = 100;
let canvasBackgroundColor = 255;

let brushSizeSlider;
let isEraserActive = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(canvasBackgroundColor);

  brushSizeSlider = createSlider(2, 40, 10);
  brushSizeSlider.position(300, height - 45);
  brushSizeSlider.style("width", "180px");
}

function draw() {
  background(canvasBackgroundColor);

  for (let segment of strokeSegments) {
    segment.drawSegment();
  }

  drawBottomToolbar();
 
}

class StrokeSegment {
  constructor(x, y, px, py, strokeColor, strokeWeightValue) {
    this.x = x;
    this.y = y;
    this.px = px;
    this.py = py;
    this.strokeColor = strokeColor;
    this.strokeWeightValue = strokeWeightValue;
  }

  drawSegment() {
    stroke(this.strokeColor);
    strokeWeight(this.strokeWeightValue);
    line(this.px, this.py, this.x, this.y);
  }
}

function drawBottomToolbar() {
  fill(240);
  noStroke();
  rect(0, height - bottomToolbarHeight, width, bottomToolbarHeight);

  // Color palette
  for (let i = 0; i < availableColors.length; i++) {
    let x = 60 + i * 60;
    let y = height - bottomToolbarHeight / 2; //half of 100

    fill(availableColors[i]); 
    ellipse(x, y, 30);

    if (availableColors[i] === activeStrokeColor && !isEraserActive) {
      noFill(); //no inside color
      stroke(0);
      strokeWeight(2);
      ellipse(x, y, 40);
      noStroke();
    }
  }

  fill(0);
  textSize(14);
  textAlign(LEFT, CENTER);
  text("Brush Size", 310, height - 75);

  // Redo (left of Eraser)
  fill(200);
  rect(width - 190, height - 85, 80, 30, 6);
  fill(0);
  textAlign(CENTER, CENTER);
  text("Redo", width - 150, height - 70);

  // Eraser
  fill(isEraserActive ? 180 : 200);
  rect(width - 100, height - 85, 80, 30, 6);
  fill(0);
  text("Eraser", width - 60, height - 70);

  // Clear
  fill(220);
  rect(width - 100, height - 45, 80, 30, 6);
  fill(0);
  text("Clear", width - 60, height - 30);
}

function mouseDragged() {
  if (mouseY < height - bottomToolbarHeight) {
    let drawColor = isEraserActive
      ? canvasBackgroundColor
      : activeStrokeColor;

    strokeSegments.push(
      new StrokeSegment(
        mouseX,
        mouseY,
        pmouseX,
        pmouseY,
        drawColor,
        brushSizeSlider.value()
      )
    );

    // New drawing clears redo history
    undoneSegments = [];
  }
}

function mousePressed() {
  if (mouseY > height - bottomToolbarHeight) {

    // Color selection
    for (let i = 0; i < availableColors.length; i++) {
      let x = 60 + i * 60;
      let y = height - bottomToolbarHeight / 2;

      if (dist(mouseX, mouseY, x, y) < 15) {
        activeStrokeColor = availableColors[i];
        isEraserActive = false;
      }
    }

    // Redo — restore EVERYTHING
    if (
      mouseX > width - 190 && mouseX < width - 110 &&
      mouseY > height - 85 && mouseY < height - 55
    ) {
      if (undoneSegments.length > 0) {
        strokeSegments = strokeSegments.concat(undoneSegments);
        undoneSegments = [];
      }
    }

    // Eraser
    if (
      mouseX > width - 100 && mouseX < width - 20 &&
      mouseY > height - 85 && mouseY < height - 55
    ) {
      isEraserActive = true;
    }

    // Clear (save all strokes for redo)
    if (
      mouseX > width - 100 && mouseX < width - 20 &&
      mouseY > height - 45 && mouseY < height - 15
    ) {
      undoneSegments = [...strokeSegments];
      strokeSegments = [];
      background(canvasBackgroundColor);
    }
  }
}

function keyPressed() {
  // Undo (still one step at a time)
  if ((key === "z" || key === "Z") && strokeSegments.length > 0) {
    undoneSegments.push(strokeSegments.pop());
  }
}
