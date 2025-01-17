const textarea = document.querySelector("textarea");

let lastInputTime = 0; // Час останнього введення
let shakeIntensity = 0; // Інтенсивність "трусіння"

// Функція для створення випадкового числа в заданому діапазоні
function getRandomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

textarea.addEventListener("input", () => {
  const currentTime = Date.now();
  const timeDifference = currentTime - lastInputTime;

  // Інверсія залежності інтенсивності від часу між введеннями
  shakeIntensity = Math.min(2000 / Math.max(timeDifference, 10), 1000);
  // Мінімальна інтенсивність = 0.1, максимальна = 10
  console.log(
    `timeDifference: ${timeDifference}, shakeIntensity: ${shakeIntensity}`
  );

  // Генеруємо випадкові значення для напрямків
  const randomX = getRandomInRange(-shakeIntensity, shakeIntensity);
  const randomY = getRandomInRange(-shakeIntensity, shakeIntensity);

  // Встановлюємо CSS-змінні
  textarea.style.setProperty("--shake-x", `${randomX}px`);
  textarea.style.setProperty("--shake-y", `${randomY}px`);

  // Анімація
  textarea.classList.add("shake");
  setTimeout(() => textarea.classList.remove("shake"), 200);

  // Оновлення часу останнього введення
  lastInputTime = currentTime;
});
