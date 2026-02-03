let colors = [
  [255, 0, 0],
  [0, 255, 0],
  [0, 0, 255],
  [255, 255, 0],
  [255, 0, 255]
];

let currentColor;

function setup() {
  createCanvas(400, 400);
  currentColor = color(0); 
}

function draw() {
  background(220);

  
  fill(currentColor);
  ellipse(mouseX, mouseY, 40, 40);

  
  for (let i = 0; i < colors.length; i++) {
    fill(colors[i]);
    ellipse(50 + i * 60, 350, 40, 40);
  }
}

function mousePressed() {
  for (let i = 0; i < colors.length; i++) {
    let colorCircleX = 50 + i * 60;
    let colorCircleY = 350;

    let distanceToCircle = dist(mouseX, mouseY, colorCircleX, colorCircleY);

    if (distanceToCircle < 20) {
      currentColor = color(colors[i]);
    }

  }
}

