function initGrid(playerNumber) {
    let gridContainer = document.querySelector(`.${playerNumber}container`);
    gridContainer.innerHTML = "";
    function rowA() {
      for (let i = 1; i < 11; i++) {
        let gridItem = document.createElement("div");
        gridItem.classList.add(`a${i}`);
        gridContainer.appendChild(gridItem);
      }
    }
    rowA();
    function rowB() {
      for (let i = 1; i < 11; i++) {
        let gridItem = document.createElement("div");
        gridItem.classList.add(`b${i}`);
        gridContainer.appendChild(gridItem);
      }
    }
    rowB();
    function rowC() {
      for (let i = 1; i < 11; i++) {
        let gridItem = document.createElement("div");
        gridItem.classList.add(`c${i}`);
        gridContainer.appendChild(gridItem);
      }
    }
    rowC();
    function rowD() {
      for (let i = 1; i < 11; i++) {
        let gridItem = document.createElement("div");
        gridItem.classList.add(`d${i}`);
        gridContainer.appendChild(gridItem);
      }
    }
    rowD();
    function rowE() {
      for (let i = 1; i < 11; i++) {
        let gridItem = document.createElement("div");
        gridItem.classList.add(`e${i}`);
        gridContainer.appendChild(gridItem);
      }
    }
    rowE();
    function rowF() {
      for (let i = 1; i < 11; i++) {
        let gridItem = document.createElement("div");
        gridItem.classList.add(`f${i}`);
        gridContainer.appendChild(gridItem);
      }
    }
    rowF();
    function rowG() {
      for (let i = 1; i < 11; i++) {
        let gridItem = document.createElement("div");
        gridItem.classList.add(`g${i}`);
        gridContainer.appendChild(gridItem);
      }
    }
    rowG();
    function rowH() {
      for (let i = 1; i < 11; i++) {
        let gridItem = document.createElement("div");
        gridItem.classList.add(`h${i}`);
        gridContainer.appendChild(gridItem);
      }
    }
    rowH();
    function rowI() {
      for (let i = 1; i < 11; i++) {
        let gridItem = document.createElement("div");
        gridItem.classList.add(`i${i}`);
        gridContainer.appendChild(gridItem);
      }
    }
    rowI();
    function rowJ() {
      for (let i = 1; i < 11; i++) {
        let gridItem = document.createElement("div");
        gridItem.classList.add(`j${i}`);
        gridContainer.appendChild(gridItem);
      }
    }
    rowJ();
  }

  export {initGrid};