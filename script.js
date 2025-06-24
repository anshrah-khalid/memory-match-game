console.log("JS is working");

const board = document.getElementById("game-board");
const status = document.getElementById("status");
const symbols = ['🍕','🍕','🎮','🎮','🎧','🎧','📱','📱','🚀','🚀','👾','👾','⚡','⚡','💡','💡'];
let shuffled = symbols.sort(() => 0.5 - Math.random());
let first = null;
let second = null;
let lock = false;
let matched = 0;

function createCard(symbol, index) {
  const card = document.createElement("div");
  card.className = "card";
  card.dataset.symbol = symbol;
  card.dataset.index = index;
  card.addEventListener("click", handleCardClick);
  board.appendChild(card);
}

function handleCardClick(e) {
  const card = e.target;
  if (lock || card.classList.contains("revealed")) return;

  card.textContent = card.dataset.symbol;
  card.classList.add("revealed");

  if (!first) {
    first = card;
  } else {
    second = card;
    lock = true;
    setTimeout(() => {
      if (first.dataset.symbol === second.dataset.symbol) {
        matched += 1;
        if (matched === symbols.length / 2) {
          status.textContent = "🎉 You Win!";
        }
      } else {
        first.textContent = "";
        second.textContent = "";
        first.classList.remove("revealed");
        second.classList.remove("revealed");
      }
      first = null;
      second = null;
      lock = false;
    }, 800);
  }
}

shuffled.forEach((symbol, index) => {
  createCard(symbol, index);
});
