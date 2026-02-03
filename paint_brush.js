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
  currentColor = color(0); // default black
}

function draw() {
  background(220);

  // draw cursor
  fill(currentColor);
  ellipse(mouseX, mouseY, 40, 40);

  // draw color palette
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
