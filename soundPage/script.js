const textarea = document.querySelector("textarea");
const canvas = document.getElementById("particleCanvas");
const ctx = canvas.getContext("2d");

let particles = [];
let lastInputTime = 0;
let shakeIntensity = 0;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

function getRandomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = getRandomInRange(2, 6);
    this.alpha = 1;
    this.speedX = getRandomInRange(-2, 2);
    this.speedY = getRandomInRange(-4, -1);
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.alpha -= 0.02;
  }

  draw() {
    ctx.fillStyle = `rgba(255, 0, 0, ${this.alpha})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }
}

function addParticlesAroundTextarea(rect, count) {
  for (let i = 0; i < count; i++) {
    const x = getRandomInRange(rect.left - 20, rect.right + 20);
    const y = getRandomInRange(rect.top - 20, rect.bottom + 20);
    particles.push(new Particle(x, y));
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles = particles.filter((particle) => particle.alpha > 0);
  particles.forEach((particle) => {
    particle.update();
    particle.draw();
  });
  requestAnimationFrame(animateParticles);
}

animateParticles();

textarea.addEventListener("input", (e) => {
  const currentTime = Date.now();
  const timeDifference = currentTime - lastInputTime;

  shakeIntensity = Math.min(2000 / Math.max(timeDifference, 10), 1000);

  const randomX = getRandomInRange(-shakeIntensity, shakeIntensity);
  const randomY = getRandomInRange(-shakeIntensity, shakeIntensity);
  textarea.style.setProperty("--shake-x", `${randomX}px`);
  textarea.style.setProperty("--shake-y", `${randomY}px`);

  textarea.classList.add("shake");
  setTimeout(() => textarea.classList.remove("shake"), 200);
  const rect = textarea.getBoundingClientRect();
  const particleCount = Math.min(
    Math.floor(200 / Math.max(timeDifference, 10)),
    50
  );
  addParticlesAroundTextarea(rect, particleCount);
  lastInputTime = currentTime;
});
