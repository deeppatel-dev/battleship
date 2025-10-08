import "./styles.css";
import { startGame } from "./game";

console.log("Document Loaded");

let currentCleanup = null;

function initializeGame() {
  if (currentCleanup) {
    currentCleanup();
  }
  currentCleanup = startGame();
}

initializeGame();

document.querySelector("#new-game").addEventListener("click", () => {
  initializeGame();
});

document.querySelector("#modal-new-game").addEventListener("click", () => {
  initializeGame();
  document.querySelector("#game-over-modal").classList.add("hidden");
});
