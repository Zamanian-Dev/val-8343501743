import "./style.css";

document.querySelector("#app").innerHTML = `
  <main class="card">
    <p class="tag">Till världens mest underbara tjej</p>
    <h1>Vill du bli min Valentine?</h1>

    <div class="button-row">
      <button id="yesBtn" autofocus>Ja, absolut</button>
      <button id="noBtn" tabindex="-1">Nej</button>
    </div>

  </main>

  <section class="celebration hidden" id="celebration" aria-live="polite">
    <div class="celebration-card">
      <h2>Yay! 🥰😍</h2>
      <p class="hearts">&lt;3 &lt;3 &lt;3</p>
    </div>
  </section>

  <div id="sparkles"></div>
`;

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const hint = document.getElementById("hint");
const celebration = document.getElementById("celebration");
const sparkles = document.getElementById("sparkles");

const noTexts = [
  "Nej",
  "Inte nu",
  "Forsok igen",
  "Nix",
  "Missade",
  "Nastan",
  "Fel knapp",
];

let accepted = false;
let moving = false;

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function avoidYesZone(x, y) {
  const yesRect = yesBtn.getBoundingClientRect();
  const noWidth = noBtn.offsetWidth;
  const noHeight = noBtn.offsetHeight;
  const padding = 30;

  return !(
    x + noWidth > yesRect.left - padding &&
    x < yesRect.right + padding &&
    y + noHeight > yesRect.top - padding &&
    y < yesRect.bottom + padding
  );
}

function moveNoButton() {
  if (accepted || moving) {
    return;
  }

  moving = true;
  noBtn.style.position = "fixed";
  noBtn.style.zIndex = "40";

  const limit = {
    left: 8,
    top: 8,
    right: window.innerWidth - noBtn.offsetWidth - 8,
    bottom: window.innerHeight - noBtn.offsetHeight - 8,
  };

  let nextX = random(limit.left, Math.max(limit.left + 1, limit.right));
  let nextY = random(limit.top, Math.max(limit.top + 1, limit.bottom));
  let tries = 0;

  while (!avoidYesZone(nextX, nextY) && tries < 40) {
    nextX = random(limit.left, Math.max(limit.left + 1, limit.right));
    nextY = random(limit.top, Math.max(limit.top + 1, limit.bottom));
    tries += 1;
  }

  noBtn.style.left = `${nextX}px`;
  noBtn.style.top = `${nextY}px`;
  noBtn.textContent = noTexts[Math.floor(Math.random() * noTexts.length)];
  hint.textContent =
    "Den har knappen ar inte tillganglig for slutgiltiga svar.";

  setTimeout(() => {
    moving = false;
  }, 60);
}

function distanceToNoButton(pointerX, pointerY) {
  const rect = noBtn.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  return Math.hypot(pointerX - cx, pointerY - cy);
}

function spraySparkles() {
  sparkles.innerHTML = "";

  for (let i = 0; i < 110; i += 1) {
    const piece = document.createElement("span");
    piece.className = "spark";
    piece.textContent = Math.random() > 0.5 ? "<3" : "*";
    piece.style.left = `${random(0, 100)}vw`;
    piece.style.fontSize = `${random(0.8, 2.1)}rem`;
    piece.style.opacity = random(0.5, 1).toFixed(2);
    piece.style.transform = `translateX(${random(-30, 30)}px)`;
    piece.style.setProperty("--dur", `${random(1.7, 3.5)}s`);
    piece.style.animationDelay = `${random(0, 0.75)}s`;
    sparkles.appendChild(piece);
  }
}

noBtn.addEventListener("mouseenter", moveNoButton);
noBtn.addEventListener("mousedown", (event) => {
  event.preventDefault();
  moveNoButton();
});
noBtn.addEventListener(
  "touchstart",
  (event) => {
    event.preventDefault();
    moveNoButton();
  },
  { passive: false },
);
noBtn.addEventListener("click", (event) => {
  event.preventDefault();
  moveNoButton();
});

document.addEventListener("pointermove", (event) => {
  if (accepted) {
    return;
  }
  if (distanceToNoButton(event.clientX, event.clientY) < 120) {
    moveNoButton();
  }
});

yesBtn.addEventListener("click", () => {
  accepted = true;
  celebration.classList.remove("hidden");
  noBtn.remove();
  hint.textContent = "Klart och valt. Perfekt beslut.";
  spraySparkles();
});

window.addEventListener("resize", () => {
  if (!accepted && noBtn.style.position === "fixed") {
    moveNoButton();
  }
});
