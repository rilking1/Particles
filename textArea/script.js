const container = document.getElementById("particle-container");

// Генерує випадкове число в діапазоні
function getRandomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

// Створення частинки
function createParticle(x, y) {
  const particle = document.createElement("div");
  particle.classList.add("particle");

  // Початкова позиція
  particle.style.left = `${x}px`;
  particle.style.top = `${y}px`;

  // Випадковий напрямок руху
  particle.style.setProperty("--move-x", `${getRandomInRange(-100, 100)}px`);
  particle.style.setProperty("--move-y", `${getRandomInRange(-100, 100)}px`);

  // Додаємо частинку в контейнер
  container.appendChild(particle);

  // Видаляємо частинку після завершення анімації
  setTimeout(() => {
    particle.remove();
  }, 1000);
}

// Обробка кліку миші
document.addEventListener("mousemove", (event) => {
  for (let i = 0; i < 5; i++) {
    // Створюємо кілька частинок за раз
    createParticle(event.clientX, event.clientY);
  }
});
