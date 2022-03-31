const shipFactory = (length) => {
    let hitCells = [];
    const hit = (coordinate) => {
        hitCells.push(coordinate);
    }
    const isSunk = () => {
        if (length === hitCells.length) {
            return true;
        } else {
            return false;
        }
    }

    return{ length, hit, isSunk}
}

const gameBoardFactory = () => {
    let shipCoordinates = [];
    let hitCoordinates = [];
    let missCoordinates = [];
    let allShots = [];
    const placeShip = (coordinates) => {
        for(let coordinate of coordinates) {
            shipCoordinates.push(coordinate);
        }
    }
    const receiveAttack = (coordinates) => {
        if (shipCoordinates.includes(coordinates)) {
            hitCoordinates.push(coordinates);
            allShots.push(coordinates);
        } else {
            missCoordinates.push(coordinates);
            allShots.push(coordinates);
        }
    }
    let isWiped = () => {
        if (shipCoordinates.length === hitCoordinates.length) {
            return true;
        } else {
            return false;
        }
    }

    return { shipCoordinates, hitCoordinates, missCoordinates, allShots, placeShip, receiveAttack, isWiped}
}

export {
    shipFactory,
    gameBoardFactory
  };