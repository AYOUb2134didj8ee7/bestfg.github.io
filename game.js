const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const width = canvas.width;
const height = canvas.height;

// Players
const player1 = { x: 50, y: 180, w: 20, h: 50, color: "blue", dy: 0, dx:0, score:0 };
const player2 = { x: 730, y: 180, w: 20, h: 50, color: "red", dy: 0, dx:0, score:0 };

// Ball
const ball = { x: 400, y: 200, radius: 10, dx: 4, dy: 2, color: "white" };

// Key controls
const keys = {};
document.addEventListener("keydown", e => keys[e.key] = true);
document.addEventListener("keyup", e => keys[e.key] = false);

function update() {
  // Player 1 controls (Arrow keys)
  if(keys["ArrowUp"]) player1.y -= 5;
  if(keys["ArrowDown"]) player1.y += 5;
  if(keys["ArrowLeft"]) player1.x -= 5;
  if(keys["ArrowRight"]) player1.x += 5;

  // Player 2 controls (WASD)
  if(keys["w"]) player2.y -= 5;
  if(keys["s"]) player2.y += 5;
  if(keys["a"]) player2.x -= 5;
  if(keys["d"]) player2.x += 5;

  // Keep players inside canvas
  [player1, player2].forEach(p => {
    if(p.y < 0) p.y = 0;
    if(p.y + p.h > height) p.y = height - p.h;
    if(p.x < 0) p.x = 0;
    if(p.x + p.w > width) p.x = width - p.w;
  });

  // Move ball
  ball.x += ball.dx;
  ball.y += ball.dy;

  // Bounce top/bottom
  if(ball.y - ball.radius < 0 || ball.y + ball.radius > height) ball.dy *= -1;

  // Ball collision with players
  [player1, player2].forEach(p => {
    if(ball.x + ball.radius > p.x && ball.x - ball.radius < p.x + p.w &&
       ball.y + ball.radius > p.y && ball.y - ball.radius < p.y + p.h) {
      ball.dx *= -1;
    }
  });

  // Goal detection
  if(ball.x - ball.radius < 0) {
    player2.score++;
    resetBall();
  }
  if(ball.x + ball.radius > width) {
    player1.score++;
    resetBall();
  }
}

function resetBall() {
  ball.x = width / 2;
  ball.y = height / 2;
  ball.dx = 4 * (Math.random() > 0.5 ? 1 : -1);
  ball.dy = 2 * (Math.random() > 0.5 ? 1 : -1);
}

function draw() {
  ctx.clearRect(0,0,width,height);

  // Draw players
  [player1, player2].forEach(p => {
    ctx.fillStyle = p.color;
    ctx.fillRect(p.x, p.y, p.w, p.h);
  });

  // Draw ball
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2);
  ctx.fillStyle = ball.color;
  ctx.fill();
  ctx.closePath();

  // Draw scores
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText(`Player 1: ${player1.score}`, 20, 30);
  ctx.fillText(`Player 2: ${player2.score}`, width-140, 30);
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();

