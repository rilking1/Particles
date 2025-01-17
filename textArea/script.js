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
  shakeIntensity = Math.min(2000 / Math.max(timeDifference, 10), 1000);
  console.log(
    `timeDifference: ${timeDifference}, shakeIntensity: ${shakeIntensity}`
  );
  const randomX = getRandomInRange(-shakeIntensity, shakeIntensity);
  const randomY = getRandomInRange(-shakeIntensity, shakeIntensity);
  textarea.style.setProperty("--shake-x", `${randomX}px`);
  textarea.style.setProperty("--shake-y", `${randomY}px`);
  textarea.classList.add("shake");
  setTimeout(() => textarea.classList.remove("shake"), 200);
  lastInputTime = currentTime;
});
