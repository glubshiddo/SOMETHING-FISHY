let INTERVAL = 0;
let boggus;
let bubbleUP = 2; // Define a speed for bubbles to move up
let bubblewiggle;
let bubblesX;
let numBubbles = 10; // Set the number of bubbles
let bubbles = []; // Create an array to store the bubble properties
let MAN = 0;
let Z = 0;
let x = -1500;
let xEND;
let frequency = 0.01; // Adjust this value to change the frequency of the sine wave
let amplitude; // Adjust this value to change the amplitude of the sine wave
let startY;
let fishSpeed; // Speed of the fish
let fishColor; // Color of the fish
let img;
let showImage = false; // Flag to control image visibility
let alpha = 0; // Alpha value for the image (0 to 255)
let fadingIn = true; // Flag to control fading direction
let fadeSpeed = 2; // Speed of fading

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  startY = random(-200, 200);
  boggus = map(noise(INTERVAL), 0, 1, -30, 30);

  // Initialize bubbles with random x positions and starting y position
  for (let i = 0; i < numBubbles; i++) {
    bubbles.push({
      x: random(width),
      y: random(height),
      wiggle: 0,
    });
  }

  xEND = width / 2 - 100;
  amplitude = height / 20;

  // Initialize fish speed and color
  fishSpeed = random(1, 5);
  fishColor = color(random(255), random(255), random(255));
}

function fished() {
  Z = Z + 0.1;
  let y = sin(Z) * (amplitude * 0.4) + startY;
  fill(fishColor);
  triangle(
    width / 2 + x,
    height / 2 + y,
    xEND + x,
    height / 2 - 100 + y,
    xEND + x,
    height / 2 + 100 + y
  );
  ellipse(width / 2 - 50 + x, height / 2 + y, 300, 100);
  triangle(
    width / 2 - 100 + x,
    height / 2 + y,
    width / 2 - 200 + x,
    height / 2 - 75 + y,
    width / 2 - 200 + x,
    height / 2 + 75 + y
  );
  fill(255);
  ellipse(width / 2 + 50 + x, height / 2 + y, 10, 10);
  ellipse(width / 2 - 20 + x, height / 2 + y, 10, 10);
  x = x + fishSpeed;

  if (x > width) {
    x = -1500; // Reset the x value to its initial value
    startY = random(-200, 200);
    fishSpeed = random(20, 50); // Assign a new random speed
    fishColor = color(random(255), random(255), random(255)); // Assign a new random color
  }
}

function bubblO() {
  fill(174, 221, 252, 128);
  for (let i = 0; i < numBubbles; i++) {
    let bubble = bubbles[i];
    bubblewiggle = boggus;
    bubble.y = bubble.y - bubbleUP;
    if (bubble.y < 0) {
      bubble.y = height;
      bubble.x = random(width);
    }
    ellipse(bubble.x + bubble.wiggle, bubble.y, 30, 30);
  }
}

function draw() {
  // Draw background gradient
  for (let y = 0; y <= height; y++) {
    let c = map(y, 0, height, 20, 200);
    fill(c, c, 230);
    rect(0, y, width, 1);
  }

  bubblO();
  fished();
  INTERVAL += 0.01;
}

// Adjust canvas size when the window is resized
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
