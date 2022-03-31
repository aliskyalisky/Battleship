import { player1Board, player2Board } from "./index";

function updateDOM(player) {
    if (player === "player1") {
      for (let coordinate of player1Board.shipCoordinates) {
        document
          .querySelector(`.player1container .${coordinate}`)
          .classList.add("ship");
      }
      for (let coordinate of player1Board.hitCoordinates) {
        document
          .querySelector(`.player1container .${coordinate}`)
          .classList.add("hit");
      }
      for (let coordinate of player1Board.missCoordinates) {
        document
          .querySelector(`.player1container .${coordinate}`)
          .classList.add("miss");
      }
      return;
    }
    if (player === "player2") {
      for (let coordinate of player2Board.hitCoordinates) {
        document
          .querySelector(`.player2container .${coordinate}`)
          .classList.add("hit");
      }
      for (let coordinate of player2Board.missCoordinates) {
        document
          .querySelector(`.player2container .${coordinate}`)
          .classList.add("miss");
      }
    }
  }

  function calculateScore() {
    let accuracy = (
      (player2Board.hitCoordinates.length / player2Board.allShots.length) *
      100
    ).toFixed(0);
    let shipHealth = (
      100 -
      (player1Board.hitCoordinates.length / player1Board.shipCoordinates.length) *
        100
    ).toFixed(0);
    let score = accuracy * shipHealth;
  
    document.querySelector(".score").textContent = `SCORE: ${score}`;
    document.querySelector(".accuracy").textContent = `Accuracy: ${accuracy}%`;
    document.querySelector(
      ".shiphealth"
    ).textContent = `Ship health: ${shipHealth}%`;
  }

  

  export {
      updateDOM,
      calculateScore
  }