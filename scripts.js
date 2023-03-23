const canvas = document.getElementById("emdrCanvas");
const ctx = canvas.getContext("2d");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const directionSelect = document.getElementById("directionSelect");
const increaseSpeedBtn = document.getElementById("increaseSpeedBtn");
const decreaseSpeedBtn = document.getElementById("decreaseSpeedBtn");
const increaseSizeBtn = document.getElementById("increaseSizeBtn");
const decreaseSizeBtn = document.getElementById("decreaseSizeBtn");
const colorSelect = document.getElementById("colorSelect");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 20,
  dx: 5,
  dy: 0,
  color: "red",
};

function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = ball.color;
  ctx.fill();
  ctx.closePath();
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();

  ball.x += ball.dx;
  ball.y += ball.dy;

  if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
    ball.dx = -ball.dx;
  }

  if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
    ball.dy = -ball.dy;
  }
}

function animate() {
  update();
  animation = requestAnimationFrame(animate);
}

let animation;
startBtn.addEventListener("click", () => {
  if (!animation) {
    animate();
  }
});

stopBtn.addEventListener("click", () => {
  cancelAnimationFrame(animation);
  animation = null;
});

directionSelect.addEventListener("change", () => {
  const selectedDirection = directionSelect.value;
  switch (selectedDirection) {
    case "horizontal":
      ball.dx = Math.abs(ball.dx);
      ball.dy = 0;
      break;
    case "cross":
      ball.dx = 1;
      ball.dy = Math.abs(ball.dy) || Math.abs(ball.dx);
      break;
    case "diagonal":
      ball.dx = Math.abs(ball.dx);
      ball.dy = Math.abs(ball.dy) || Math.abs(ball.dx);
      break;
  }
});

increaseSpeedBtn.addEventListener("click", () => {
  ball.dx *= 1.1;
  ball.dy *= 1.1;
});

decreaseSpeedBtn.addEventListener("click", () => {
  ball.dx *= 0.9;
  ball.dy *= 0.9;
});

increaseSizeBtn.addEventListener("click", () => {
  ball.radius *= 1.1;
});

decreaseSizeBtn.addEventListener("click", () => {
  ball.radius *= 0.9;
});

colorSelect.addEventListener("change", () => {
  ball.color = colorSelect.value;
});
