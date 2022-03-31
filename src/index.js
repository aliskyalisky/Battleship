import { shipFactory, gameBoardFactory } from "./factoryFunctions";
import {initGrid} from "./gridInit";
import {updateDOM, calculateScore} from "./DOMmanipulation";

const startBtn = document.querySelector(".startbtn");
const pirateMessage = document.querySelector(".phmessage");
const verticalBtn = document.querySelector(".verticalplacement");
const infoText = document.querySelector(".infotext");

let bot = {
    attack: () => {
      let shootHere = randomCoordinate();
      player1Board.receiveAttack(shootHere);
      updateDOM("player1");
      switchTurn();
    },
    turn: false,
  };
  
let player = {
    turn: true,
  };

let player1Board = gameBoardFactory();
let player2Board = gameBoardFactory();
let verticalActive = false;
let placementActive = true;
let currentShipLength = 5;

initGrid("player1");
initGrid("player2");



let player1Cells = document.querySelectorAll(".player1container div");
let player2Cells = document.querySelectorAll(".player2container div");



function generateBotShips() {
  let currentBotShipLength = 5;

  for (let i = 0; i < 4; i++) {
    let fullShip = [];
    let character = String.fromCharCode(97 + Math.floor(Math.random() * 10));
    let number = Math.floor(Math.random() * 10 + 1);

    while (
      number + currentBotShipLength > 11 ||
      player2Board.shipCoordinates.includes(character + number) ||
      player2Board.shipCoordinates.includes(
        character + (number + (currentBotShipLength - 1))
      )
    ) {
      number = Math.floor(Math.random() * 10 + 1);
    }

    for (let i = 0; i < currentBotShipLength; i++) {
      fullShip.push(character + (number + i));
    }
    currentBotShipLength--;
    player2Board.placeShip(fullShip);
  }
}

function randomCoordinate() {
  let character = String.fromCharCode(97 + Math.floor(Math.random() * 10));
  let number = Math.floor(Math.random() * 10 + 1);

  while (player1Board.allShots.includes(character + number)) {
    character = String.fromCharCode(97 + Math.floor(Math.random() * 10));
    number = Math.floor(Math.random() * 10 + 1);
  }
  return character + number;
}

function switchTurn() {
  bot.turn ? (bot.turn = false) : (bot.turn = true);
  player.turn ? (player.turn = false) : (player.turn = true);
}



function checkStatus() {
  if (bot.turn) {
    setTimeout(() => {
      bot.attack();
    }, 1000);
  }

  if (player2Board.isWiped()) {
    calculateScore();
    document.querySelector(".piratehead").classList.toggle("hidden");
    document.querySelector(".phmessagecontainer").classList.toggle("hidden");
    document.querySelector(".cop1").classList.toggle("player1choose");
    document.querySelector(".cop2").classList.toggle("player2behind");
    document.querySelector(".statdisplay").classList.toggle("visible");
    pirateMessage.textContent = "You win! Well done captain.";
  }
}



function placeShip(e) {
  let startPoint = e.target.classList.value.toString().split("");
  if (startPoint[2] === "0") {
    startPoint[1] = "10";
  }
  let allPoints = [];

  if (verticalActive) {
    for (let i = 0; i < currentShipLength; i++) {
      allPoints.push(
        String.fromCharCode(startPoint[0].charCodeAt(0) + i) + startPoint[1]
      );
    }

    if (startPoint[0].charCodeAt(0) + currentShipLength > 107) {
      pirateMessage.textContent = "Can't place your ship there captain!";
      return;
    }
  } else {
    for (let i = 0; i < currentShipLength; i++) {
      allPoints.push(startPoint[0] + (Number(startPoint[1]) + i));
    }

    if (Number(startPoint[1]) + currentShipLength > 11) {
      pirateMessage.textContent = "Can't place your ship there captain!";
      return;
    }
  }

  for (let point of allPoints) {
    if (player1Board.shipCoordinates.includes(point)) {
      pirateMessage.textContent = "Can't place your ship there captain!";
      return;
    }
  }

  player1Board.placeShip(allPoints);
  updateDOM("player1");
  if (currentShipLength > 3) {
    pirateMessage.textContent = `Good! ${currentShipLength - 2} more.`;
  } else if (currentShipLength === 3) {
    pirateMessage.textContent = `One more, hope you\'re ready for battle cap!`;
  } else {
    pirateMessage.textContent = `Fight!`;
  }
  currentShipLength--;
  shipsPlaced();
}

function shipsPlaced() {
  if (currentShipLength === 1) {
    document.querySelector(".piratehead").classList.toggle("hidden");
    document.querySelector(".phmessagecontainer").classList.toggle("hidden");
    document.querySelector(".cop1").classList.toggle("player1choose");
    document.querySelector(".cop2").classList.toggle("player2behind");
    document.querySelector(".verticalplacement").classList.toggle("hidden");
    placementActive = false;
  }
}

generateBotShips();


document.querySelector(".startbtn").addEventListener("click", () => {
    document.querySelector(".cop1").classList.add("start");
    document.querySelector(".cop2").classList.add("start");
    document.querySelector(".verticalplacement").classList.add("start");
    document.querySelector(".header img").classList.add("start");
    document.querySelector(".piratehead").classList.toggle("hidden");
    document.querySelector(".phmessagecontainer").classList.toggle("hidden");
    document.querySelector(".startbtn").classList.add("hidden");
  });

  player1Cells.forEach((cell) =>
  cell.addEventListener("click", (e) => {
    if (placementActive) {
      placeShip(e);
    }
  })
);

player1Cells.forEach((cell) =>
  cell.addEventListener("mouseenter", () => {
    if (placementActive) {
      let currentCell = cell.classList.value.toString().split("");
      if (currentCell[2] === "0") {
        currentCell[1] = "10";
      }

      if (verticalActive) {
        if (currentCell[0].charCodeAt(0) + currentShipLength > 107) {
          cell.classList.toggle("invalid");
          return;
        }

        for (let i = 0; i < currentShipLength; i++) {
          document
            .querySelector(
              `.${
                String.fromCharCode(currentCell[0].charCodeAt(0) + i) +
                currentCell[1]
              }`
            )
            .classList.toggle("miss");
        }
      } else {
        if (Number(currentCell[1]) + currentShipLength > 11) {
          cell.classList.toggle("invalid");
          return;
        }

        for (let i = 0; i < currentShipLength; i++) {
          document
            .querySelector(`.${currentCell[0] + (Number(currentCell[1]) + i)}`)
            .classList.toggle("miss");
        }
      }
    }
  })
);

player1Cells.forEach((cell) =>
  cell.addEventListener("mouseleave", () => {
    if (placementActive) {
      let currentCell = cell.classList.value.toString().split("");
      if (currentCell[2] === "0") {
        currentCell[1] = "10";
      }

      if (verticalActive) {
        if (currentCell[0].charCodeAt(0) + currentShipLength > 107) {
          cell.classList.toggle("invalid");
          return;
        }

        for (let i = 0; i < currentShipLength; i++) {
          document
            .querySelector(
              `.${
                String.fromCharCode(currentCell[0].charCodeAt(0) + i) +
                currentCell[1]
              }`
            )
            .classList.toggle("miss");
        }
      } else {
        if (Number(currentCell[1]) + currentShipLength > 11) {
          cell.classList.toggle("invalid");
          return;
        }

        for (let i = 0; i < currentShipLength; i++) {
          document
            .querySelector(`.${currentCell[0] + (Number(currentCell[1]) + i)}`)
            .classList.toggle("miss");
        }
      }
    }
  })
);

player2Cells.forEach((cell) =>
  cell.addEventListener("click", (e) => {
    if (bot.turn) {
      return;
    }
    player2Board.receiveAttack(e.target.classList.value.toString());
    updateDOM("player2");
    switchTurn();
    checkStatus();
  })
);

document.querySelector(".verticalplacement").addEventListener("click", () => {
    document.querySelector(".verticalplacement").classList.toggle("on");
    verticalActive = !verticalActive;
  });

  export{
      player1Board,
      player2Board
  }