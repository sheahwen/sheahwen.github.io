//-------- Setting up chess board coloring

// for colors

const backgroundLight =
  "url('http://www.zingerbugimages.com/backgrounds/green_marble_background_seamless.jpg')";
const backgroundDark =
  "url('http://www.zingerbugimages.com/backgrounds/green_sand_stone.jpg')";
const colorYellow = "yellow";

for (let i = 0; i < 8; i++) {
  for (let j = 0; j < 8; j++) {
    if ((i + j) % 2 !== 0) {
      const thisSquareLeft = document.getElementById(`r${i}c${j}`);
      const thisSquareRight = document.getElementById(`R${i}C${j}`);
      thisSquareLeft.style.backgroundImage = backgroundLight;
      thisSquareRight.style.backgroundImage = backgroundLight;
    } else {
      const thisSquareLeft = document.getElementById(`r${i}c${j}`);
      const thisSquareRight = document.getElementById(`R${i}C${j}`);
      thisSquareLeft.style.backgroundImage = backgroundDark;
      thisSquareRight.style.backgroundImage = backgroundDark;
    }
  }
}

//common function
function checkInBetween(axis, row1, col1, row2, col2, arr) {
  switch (axis) {
    case "row": {
      for (let i = Math.min(row1, row2) + 1; i < Math.max(row1, row2); i++) {
        if (findElement(i, col1, arr) !== undefined) {
          console.log("blocked");
          return false;
        }
      }
      return true;
    }
    case "column": {
      for (let i = Math.min(col1, col2) + 1; i < Math.max(col1, col2); i++) {
        if (
          arr.find(
            ({ position }) => position[0] === row1 && position[1] === i
          ) !== undefined
        ) {
          return false;
        }
      }
      return true;
    }
    case "diagonal": {
      let step = Math.abs(row1 - row2) - 1;
      if (step == 0) {
        return true;
      }
      while (step > 0) {
        if (row1 > row2 && col1 > col2) {
          if (
            arr.find(
              ({ position }) =>
                position[0] === row1 - step && position[1] === col1 - step
            ) !== undefined
          ) {
            return false;
          }
        } else if (row1 < row2 && col1 < col2) {
          if (
            arr.find(
              ({ position }) =>
                position[0] === row1 + step && position[1] === col1 + step
            ) !== undefined
          ) {
            return false;
          }
        } else if (row1 > row2 && col1 < col2) {
          if (
            arr.find(
              ({ position }) =>
                position[0] === row1 - step && position[1] === col1 + step
            ) !== undefined
          ) {
            return false;
          }
        } else if (row1 < row2 && col1 > col2) {
          if (
            arr.find(
              ({ position }) =>
                position[0] === row1 + step && position[1] === col1 - step
            ) !== undefined
          ) {
            return false;
          }
        }
        step--;
      }
      return true;
    }
  }
}

//---------- Classes

class Pawn {
  constructor(type, color, position, isNew = true) {
    this.type = type;
    this.color = color;
    this.position = position; // array[row, column]
    this.isNew = isNew;
  }
  checkValidMove(row2, col2, arr) {
    const row1 = this.position[0];
    const col1 = this.position[1];

    if (col1 !== col2) {
      return false;
    }
    if (this.color === "white") {
      if (
        this.isNew === true &&
        row1 + 2 === row2 &&
        checkInBetween("row", row1, col1, row2, col2, arr) === true
      ) {
        return true;
      } else if (row1 + 1 === row2) {
        return true;
      } else {
        return false;
      }
    } else if (this.color === "black") {
      if (
        this.isNew === true &&
        row2 + 2 === row1 &&
        checkInBetween("row", row1, col1, row2, col2, arr) === true
      ) {
        return true;
      } else if (row2 + 1 === row1) {
        return true;
      } else {
        return false;
      }
    }
  }

  checkCaptureMove(row2, col2) {
    const row1 = this.position[0];
    const col1 = this.position[1];

    if (this.color === "white") {
      if (row1 + 1 === row2 && Math.abs(col1 - col2) === 1) {
        return true;
      }
    } else if (this.color === "black") {
      if (row2 + 1 === row1 && Math.abs(col1 - col2) === 1) {
        return true;
      }
    } else return false;
  }
}

class Rook {
  constructor(type, color, position, isNew = true) {
    this.type = type;
    this.color = color;
    this.position = position; // array[row, column]
    this.isNew = isNew;
  }
  checkValidMove(row2, col2, arr) {
    const row1 = this.position[0];
    const col1 = this.position[1];

    if (row1 !== row2 && col1 !== col2) {
      return false;
    } else if (row1 == row2) {
      if (checkInBetween("column", row1, col1, row2, col2, arr) === false)
        return false;
      else return true;
    } else {
      if (checkInBetween("row", row1, col1, row2, col2, arr) === false)
        return false;
      // to review
      else return true;
    }
  }
}

class Knight {
  constructor(type, color, position) {
    this.type = type;
    this.color = color;
    this.position = position; // array[row, column]
  }
  checkValidMove(row2, col2) {
    //to add capture
    const row1 = this.position[0];
    const col1 = this.position[1];

    if (
      Math.abs(row2 - row1) + Math.abs(col2 - col1) === 3 &&
      Math.abs(row2 - row1) !== 3 &&
      Math.abs(col2 - col1) !== 3
    ) {
      return true;
    } else return false;
  }
}

class Bishop {
  constructor(type, color, position) {
    this.type = type;
    this.color = color;
    this.position = position; // array[row, column]
  }
  checkValidMove(row2, col2, arr) {
    //to add capture
    const row1 = this.position[0];
    const col1 = this.position[1];

    if (
      Math.abs(row2 - row1) === Math.abs(col2 - col1) &&
      checkInBetween("diagonal", row1, col1, row2, col2, arr) === true
    ) {
      return true;
    } else return false;
    // to add
  }
}

class Queen {
  constructor(type, color, position) {
    this.type = type;
    this.color = color;
    this.position = position; // array[row, column]
  }
  checkValidMove(row2, col2, arr) {
    //to add capture
    const row1 = this.position[0];
    const col1 = this.position[1];

    if (
      Math.abs(row2 - row1) === Math.abs(col2 - col1) &&
      checkInBetween("diagonal", row1, col1, row2, col2, arr) === true
    ) {
      return true;
    } else if (
      row1 === row2 &&
      checkInBetween("column", row1, col1, row2, col2, arr) === true
    ) {
      return true;
    } else if (
      col1 === col2 &&
      checkInBetween("row", row1, col1, row2, col2, arr) === true
    ) {
      return true;
    } else return false;
  }
}

class King {
  constructor(type, color, position, inCheck = false, isNew = true) {
    this.type = type;
    this.color = color;
    this.position = position; // array[row, column]
    this.inCheck = inCheck;
    this.isNew = isNew;
  }

  checkValidMove(row2, col2, arr, board) {
    const row1 = this.position[0];
    const col1 = this.position[1];

    if (
      //diagonal move
      Math.abs(row2 - row1) === Math.abs(col2 - col1) &&
      Math.abs(row2 - row1) === 1
    ) {
      return true;
    } else if (Math.abs(row1 - row2) + Math.abs(col1 - col2) === 1) {
      return true;
    } else if (
      (row1 === 0 &&
        row2 === 0 &&
        col1 === 4 &&
        col2 === 2 &&
        this.color === "white" &&
        this.isNew) ||
      (row1 === 0 &&
        row2 === 0 &&
        col1 === 4 &&
        col2 === 6 &&
        this.color === "white" &&
        this.isNew) ||
      (row1 === 7 &&
        row2 === 7 &&
        col1 === 4 &&
        col2 === 2 &&
        this.color === "black" &&
        this.isNew) ||
      (row1 === 7 &&
        row2 === 7 &&
        col1 === 4 &&
        col2 === 6 &&
        this.color === "black" &&
        this.isNew)
    ) {
      return castling(row1, col1, row2, col2, arr, board);
    } else return false;
  }
}

//----------------castling function
function castling(row1, col1, row2, col2, arr, board) {
  if (col2 === 2) {
    const arrLoop = [];
    arrLoop.push(findElement(row1, 0, arr));
    for (let i = 1; i < 4; i++) {
      arrLoop.push(findElement(row1, i, arr));
      if (arrLoop[i] !== undefined) return false;
      if (checkFor(arrLoop[0].color, arr, row1, i)) {
        return false;
      }
    }
    if (row1 === 0) {
      if (
        arrLoop[0].type === "rook" &&
        arrLoop[0].color === "white" &&
        arrLoop[0].isNew
      ) {
        arrLoop[0].position = [row1, 3];
        updateHTML(row1, 0, row2, 3, board);
        return true;
      } else return false;
    } else {
      if (
        arrLoop[0].type === "rook" &&
        arrLoop[0].color === "black" &&
        arrLoop[0].isNew
      ) {
        arrLoop[0].position = [row1, 3];
        updateHTML(row1, 0, row2, 3, board);
        return true;
      } else return false;
    }
  } else {
    const arrLoop = [];
    arrLoop.push(findElement(row1, 7, arr));
    for (let i = 6; i > 4; i--) {
      arrLoop.push(findElement(row1, i, arr));
      if (arrLoop[i] !== undefined) return false;
      if (checkFor(arrLoop[0].color, arr, row1, i)) {
        return false;
      }
    }

    if (row1 === 0) {
      if (
        arrLoop[0].type === "rook" &&
        arrLoop[0].color === "white" &&
        arrLoop[0].isNew
      ) {
        arrLoop[0].position = [row1, 5];
        updateHTML(row1, 7, row2, 5, board);
        return true;
      } else return false;
    } else {
      if (
        arrLoop[0].type === "rook" &&
        arrLoop[0].color === "black" &&
        arrLoop[0].isNew
      ) {
        arrLoop[0].position = [row1, 5];
        updateHTML(row1, 7, row2, 5, board);
        return true;
      } else return false;
    }
  }
}
//-------------creating pieces

const activePiecesLeft = [];
const activePiecesRight = [];

for (let i = 0; i < 8; i++) {
  activePiecesLeft.push(new Pawn("pawn", "white", [1, i]));
  activePiecesRight.push(new Pawn("pawn", "white", [1, i]));
}
for (let i = 0; i < 8; i++) {
  activePiecesLeft.push(new Pawn("pawn", "black", [6, i]));
  activePiecesRight.push(new Pawn("pawn", "black", [6, i]));
}

activePiecesLeft.push(new Rook("rook", "white", [0, 0]));
activePiecesLeft.push(new Rook("rook", "white", [0, 7]));
activePiecesLeft.push(new Rook("rook", "black", [7, 0]));
activePiecesLeft.push(new Rook("rook", "black", [7, 7]));
activePiecesLeft.push(new Knight("knight", "white", [0, 1]));
activePiecesLeft.push(new Knight("knight", "white", [0, 6]));
activePiecesLeft.push(new Knight("knight", "black", [7, 1]));
activePiecesLeft.push(new Knight("knight", "black", [7, 6]));
activePiecesLeft.push(new Bishop("bishop", "white", [0, 2]));
activePiecesLeft.push(new Bishop("bishop", "white", [0, 5]));
activePiecesLeft.push(new Bishop("bishop", "black", [7, 2]));
activePiecesLeft.push(new Bishop("bishop", "black", [7, 5]));
activePiecesLeft.push(new Queen("queen", "white", [0, 3]));
activePiecesLeft.push(new Queen("queen", "black", [7, 3]));
activePiecesLeft.push(new King("king", "white", [0, 4]));
activePiecesLeft.push(new King("king", "black", [7, 4]));

activePiecesRight.push(new Rook("rook", "white", [0, 0]));
activePiecesRight.push(new Rook("rook", "white", [0, 7]));
activePiecesRight.push(new Rook("rook", "black", [7, 0]));
activePiecesRight.push(new Rook("rook", "black", [7, 7]));
activePiecesRight.push(new Knight("knight", "white", [0, 1]));
activePiecesRight.push(new Knight("knight", "white", [0, 6]));
activePiecesRight.push(new Knight("knight", "black", [7, 1]));
activePiecesRight.push(new Knight("knight", "black", [7, 6]));
activePiecesRight.push(new Bishop("bishop", "white", [0, 2]));
activePiecesRight.push(new Bishop("bishop", "white", [0, 5]));
activePiecesRight.push(new Bishop("bishop", "black", [7, 2]));
activePiecesRight.push(new Bishop("bishop", "black", [7, 5]));
activePiecesRight.push(new Queen("queen", "white", [0, 3]));
activePiecesRight.push(new Queen("queen", "black", [7, 3]));
activePiecesRight.push(new King("king", "white", [0, 4]));
activePiecesRight.push(new King("king", "black", [7, 4]));

console.log(activePiecesLeft);
console.log(activePiecesRight);

// ----------------------- variable declaration

// ==> Right board

// states = ["activated_piece_white", "destination_square_white".... then black]
let stateLeft = 1;
let stateRight = 1;

// Activated piece, e.g. pawn_white_1
let activatedPieceLeft = "";
let activatedPieceRight = "";

// Activated piece square aka first click square coordination
let activatedPieceSquareLeft = "";
let activatedPieceSquareRight = "";

// row and column number of activated piece square
let activatedPieceRowLeft = 0;
let activatedPieceColLeft = 0;
let activatedPieceRowRight = 0;
let activatedPieceColRight = 0;

// index of the activated piece in the activePieces array
let activePieceIndexLeft = 0;
let activePieceIndexRight = 0;

// array to store captured pieces
const capturedWhiteLeft = [];
const capturedBlackLeft = [];
const capturedWhiteRight = [];
const capturedBlackRight = [];

// querySelector
const logDisplayLeft = document.getElementById("logLeft");
const logDisplayRight = document.getElementById("logRight");

// =>  for fun
const emoji = ["&#x1f622", "&#x1f44f"];

// piece recycled from captured tray
let invPieceLeft = "";
let invPieceLeftId = "";
let invPieceRight = "";
let invPieceRightId = "";

// ------------ function declarations

function updateHTML(row1, col1, row2, col2, board) {
  let originalHTML = "";
  let destinationHTML = "";

  if (board === "left") {
    originalHTML = document.getElementById(`r${row1}c${col1}`);
    destinationHTML = document.getElementById(`r${row2}c${col2}`);
  } else {
    originalHTML = document.getElementById(`R${row1}C${col1}`);
    destinationHTML = document.getElementById(`R${row2}C${col2}`);
  }

  destinationHTML.innerHTML = originalHTML.innerHTML;

  originalHTML.innerHTML = "";
}

function unhighlightSquare(row1, col1, board) {
  let activatedHTML = "";
  if (board === "left") {
    activatedHTML = document.getElementById(`r${row1}c${col1}`);
  } else {
    activatedHTML = document.getElementById(`R${row1}C${col1}`);
  }

  if ((row1 + col1) % 2 !== 0) {
    activatedHTML.style.backgroundImage = backgroundLight;
  } else {
    activatedHTML.style.backgroundImage = backgroundDark;
  }
}

function highlightSquare(squareId) {
  const activatedHTML = document.getElementById(squareId);
  activatedHTML.style.backgroundImage = "none";
  activatedHTML.style.backgroundColor = colorYellow;
}

function addCaptured(color, id, board) {
  let length = 0;

  const div = document.getElementById(`capturedBox${color}${board}`);
  const newDiv = document.createElement("div");
  newDiv.className = "gg";

  // determine ID number

  if (color === "White" && id[0] === "r") {
    length = capturedWhiteLeft.length - 1;
  } else if (color === "Black" && id[0] === "r") {
    length = capturedBlackLeft.length - 1;
  } else if (color === "White" && id[0] === "R") {
    length = capturedWhiteRight.length - 1;
  } else if (color === "Black" && id[0] === "R") {
    length = capturedBlackRight.length - 1;
  }

  const colorVar = color[0].toUpperCase();
  const boardVar = board[0].toUpperCase();

  newDiv.id = `gg${colorVar}${boardVar}${length}`;
  newDiv.innerHTML = document.getElementById(id).innerHTML;
  div.append(newDiv);
}

function checkFor(color, arr, row = undefined, col = undefined) {
  // locating the kings
  if (row === undefined) {
    let blackKing = arr.find(
      (piece) => piece.color === "black" && piece.type === "king"
    );

    let whiteKing = arr.find(
      (piece) => piece.color === "white" && piece.type === "king"
    );

    if (color === "white") {
      row = whiteKing.position[0];
      col = whiteKing.position[1];
    } else {
      row = blackKing.position[0];
      col = blackKing.position[1];
    }
  }

  // return true is white king is in check
  if (color === "white") {
    for (const piece of arr.filter((piece) => piece.color === "black")) {
      if (
        (piece.type !== "pawn" &&
          piece.checkValidMove(row, col, arr) === true) ||
        (piece.type === "pawn" &&
          piece.checkCaptureMove(row, col, arr) === true)
      ) {
        return true;
      }
    }
    return false;
  }

  // return true if black king is in check
  if (color === "black") {
    for (const piece of arr.filter((piece) => piece.color === "white")) {
      if (
        (piece.type !== "pawn" &&
          piece.checkValidMove(row, col, arr) === true) ||
        (piece.type === "pawn" &&
          piece.checkCaptureMove(row, col, arr) === true)
      ) {
        console.log("black king is in check");
        return true;
      }
    }
    return false;
  }
}

function nextMoveCheck(
  color,
  isCapture,
  arr,
  board,
  targetRow,
  targetCol,
  capturedPieceIndex
) {
  let removedPiece = "";
  let temp = false;

  let activePieceIndex = 0;
  let activatedPieceRow = 0;
  let activatedPieceCol = 0;

  if (board === "left") {
    activePieceIndex = activePieceIndexLeft;
    activatedPieceRow = activatedPieceRowLeft;
    activatedPieceCol = activatedPieceColLeft;
  } else {
    activePieceIndex = activePieceIndexRight;
    activatedPieceRow = activatedPieceRowRight;
    activatedPieceCol = activatedPieceColRight;
  }

  arr[activePieceIndex].position = [targetRow, targetCol];

  if (isCapture) {
    removedPiece = arr.splice(capturedPieceIndex, 1);
  }

  if (color === "white") {
    if (checkFor("white", arr)) {
      temp = true;
    }
  }

  if (color === "black") {
    if (checkFor("black", arr)) {
      temp = true;
    }
  }

  if (isCapture) {
    arr.splice(capturedPieceIndex, 0, removedPiece[0]);
  }

  arr[activePieceIndex].position = [activatedPieceRow, activatedPieceCol];

  return temp;
}

function stateIncrement(board) {
  if (board === "left") {
    stateLeft++;
    if (stateLeft === 5) {
      stateLeft = 1;
    }
  } else {
    stateRight++;
    if (stateRight === 5) {
      stateRight = 1;
    }
  }
}

function findElement(row, col, arr) {
  return arr.find(({ position }) => position[0] === row && position[1] === col);
}

function updateIndex(color, board, index, arr) {
  for (let i = index; i < arr.length; i++) {
    const div = document.getElementById(`gg${color}${board}${i + 1}`);
    div.id = `gg${color}${board}${i}`;
  }
}

// ------------ upon clicking the start button
function startFunction() {
  document.querySelector("button").remove();
  document.querySelector("#boardLeft").addEventListener("click", gamePlayLeft);
  document
    .querySelector("#boardRight")
    .addEventListener("click", gamePlayRight);
  logDisplayRight.innerText = "White to start";
  logDisplayLeft.innerText = "White to start";
  countingDown();
}

// ------------- main function

function recyclingFunction(e) {
  if (e.target.className === "gg") {
    const divID = e.target.id;
    const color = divID[2]; // W / B
    let board = divID[3]; // L / R

    const invIndex = Number(divID.slice(4));

    if (stateRight === 1 && color === "W" && board === "L") {
      invPieceRight = capturedWhiteLeft[invIndex];
      invPieceRightId = divID;
      document.getElementById(invPieceRightId).style.backgroundColor =
        colorYellow;
      stateIncrement("right");
    } else if (stateRight === 3 && color === "B" && board === "L") {
      invPieceRight = capturedBlackLeft[invIndex];
      invPieceRightId = divID;
      document.getElementById(invPieceRightId).style.backgroundColor =
        colorYellow;
      stateIncrement("right");
    } else if (stateLeft === 1 && color === "W" && board === "R") {
      console.log("captured piece clicked");
      invPieceLeft = capturedWhiteRight[invIndex];
      invPieceLeftId = divID;
      document.getElementById(invPieceLeftId).style.backgroundColor =
        colorYellow;
      stateIncrement("left");
    } else if (stateLeft === 3 && color === "B" && board === "R") {
      invPieceLeft = capturedBlackRight[invIndex];
      invPieceLeftId = divID;
      document.getElementById(invPieceLeftId).style.backgroundColor =
        colorYellow;
      stateIncrement("left");
    } else if (
      (stateLeft === 2 && color === "W" && board === "R") ||
      (stateLeft === 4 && color === "B" && board === "R")
    ) {
      document.getElementById(invPieceLeftId).style.backgroundColor =
        "transparent";
      invPieceLeft = "";
      invPieceLeftId = "";
      logDisplayLeft.innerText = "Cancelled";
      stateLeft--;
    } else if (
      (stateRight === 2 && color === "W" && board === "L") ||
      (stateRight === 4 && color === "B" && board === "L")
    ) {
      document.getElementById(invPieceRightId).style.backgroundColor =
        "transparent";
      invPieceRight = "";
      invPieceRightId = "";
      stateRight--;
      logDisplayRight.innerText = "Cancelled";
    } else return;
  } else return;
}

function gamePlayLeft(e) {
  if (e.target.className === "square") {
    if (stateLeft === 1 || stateLeft === 3) {
      //first click

      if (invPieceLeft === "") {
        activatedPieceSquareLeft = e.target.id;
        activatedPieceRowLeft = Number(activatedPieceSquareLeft[1]);
        activatedPieceColLeft = Number(activatedPieceSquareLeft[3]);

        activatedPieceLeft = findElement(
          activatedPieceRowLeft,
          activatedPieceColLeft,
          activePiecesLeft
        );
        activePieceIndexLeft = activePiecesLeft.indexOf(activatedPieceLeft);

        // if empty square
        if (activatedPieceLeft === undefined) {
          logDisplayLeft.innerText = "empty square selected";
        }

        // if not empty square => check for color ~~~ proceed
        else {
          if (
            (stateLeft === 1 && activatedPieceLeft.color === "white") ||
            (stateLeft === 3 && activatedPieceLeft.color === "black")
          ) {
            logDisplayLeft.innerText = `${activatedPieceLeft.type} at ${activatedPieceRowLeft},${activatedPieceColLeft} is selected`;
            highlightSquare(activatedPieceSquareLeft, activePiecesLeft, "left");
            stateIncrement("left");
          } else {
            logDisplayLeft.innerText = "wrong color is selected";
          }
        }
      }
    } else if (stateLeft === 2 || stateLeft === 4) {
      //second click

      const targetSquare = e.target.id;
      const targetRow = Number(targetSquare[1]);
      const targetCol = Number(targetSquare[3]);

      const targetPiece = findElement(targetRow, targetCol, activePiecesLeft);
      const isOccupied = targetPiece !== undefined;
      let capturedPieceIndex = -1;

      if (invPieceLeft === "") {
        capturedPieceIndex = -1;
        if (targetPiece !== undefined) {
          capturedPieceIndex = activePiecesLeft.indexOf(targetPiece);
        }

        const isSameSquare = activatedPieceSquareLeft === targetSquare;
        const isSameColor =
          isOccupied && targetPiece.color === activatedPieceLeft.color;
        let isValidMove = false;
        let inCheck = false;
        let inCheckNext = false;

        // not run if targeting pieces of the same color
        if (!isSameColor) {
          if (stateLeft === 2) {
            inCheck = checkFor("white", activePiecesLeft);
            inCheckNext = nextMoveCheck(
              "white",
              isOccupied,
              activePiecesLeft,
              "left",
              targetRow,
              targetCol,
              capturedPieceIndex
            );
          } else {
            inCheck = checkFor("black", activePiecesLeft);
            inCheckNext = nextMoveCheck(
              "black",
              isOccupied,
              activePiecesLeft,
              "left",
              targetRow,
              targetCol,
              capturedPieceIndex
            );
          }
        } else {
          inCheck = false;
          inCheckNext = false;
        }

        if (activatedPieceLeft.type === "pawn" && isOccupied & !isSameColor) {
          isValidMove = activatedPieceLeft.checkCaptureMove(
            targetRow,
            targetCol,
            activePiecesLeft
          );
        } else {
          isValidMove = activatedPieceLeft.checkValidMove(
            targetRow,
            targetCol,
            activePiecesLeft,
            "left"
          );
        }

        // same square
        if (isSameSquare) {
          logDisplayLeft.innerText = "cancelled";
          unhighlightSquare(
            activatedPieceRowLeft,
            activatedPieceColLeft,
            "left"
          );
          stateLeft--;
        }
        // different square
        else {
          // different square => if valid move or color is different
          if (!isSameColor && isValidMove) {
            if (!inCheck && inCheckNext) {
              logDisplayLeft.innerText =
                "invalid move - king is moved into check";
              stateLeft--;
              unhighlightSquare(
                activatedPieceRowLeft,
                activatedPieceColLeft,
                "left"
              );
            } else if (inCheck && inCheckNext) {
              logDisplayLeft.innerText =
                "invalid move - king is still in check";
              stateLeft--;
              unhighlightSquare(
                activatedPieceRowLeft,
                activatedPieceColLeft,
                "left"
              );
            } else {
              logDisplayLeft.innerText = `moved`;
              activePiecesLeft[activePieceIndexLeft].position = [
                targetRow,
                targetCol,
              ];
              unhighlightSquare(
                activatedPieceRowLeft,
                activatedPieceColLeft,
                "left"
              );
              if (isOccupied) {
                if (activePiecesLeft[capturedPieceIndex].color === "white") {
                  capturedWhiteLeft.push(
                    activePiecesLeft.splice(capturedPieceIndex, 1)[0]
                  );
                  addCaptured("White", targetSquare, "Left");
                } else {
                  capturedBlackLeft.push(
                    activePiecesLeft.splice(capturedPieceIndex, 1)[0]
                  );

                  addCaptured("Black", targetSquare, "Left");
                }

                const temp = Math.floor(Math.random() * 2);
                logDisplayLeft.innerHTML = `captured ${emoji[temp]}`;
              }

              if (activatedPieceLeft.type === "pawn") {
                activatedPieceLeft.isNew = false;
              } else if (activatedPieceLeft.type === "rook") {
                activatedPieceLeft.isNew = false;
              } else if (activatedPieceLeft.type === "king") {
                activatedPieceLeft.isNew = false;
              }

              stateIncrement("left");
              updateHTML(
                activatedPieceRowLeft,
                activatedPieceColLeft,
                targetRow,
                targetCol,
                "left"
              );
            }
          } else {
            logDisplayLeft.innerText = "invalid move";
            unhighlightSquare(
              activatedPieceRowLeft,
              activatedPieceColLeft,
              "left"
            );
            stateLeft--;
          }
        }
      } else {
        // if invPiece is selected
        if (!isOccupied) {
          if (invPieceLeft.color === "white") {
            //remove invPiece from captured stash
            const index = capturedWhiteRight.indexOf(invPieceLeft);
            capturedWhiteRight.splice(index, 1);

            updateIndex("W", "R", index, capturedWhiteRight);
          } else {
            const index = capturedBlackRight.indexOf(invPieceLeft);
            capturedBlackRight.splice(index, 1);

            updateIndex("B", "R", index, capturedBlackRight);
          }

          //update target square symbol and remove the symbol from stash
          document.getElementById(targetSquare).innerHTML =
            document.getElementById(invPieceLeftId).innerHTML;
          document.getElementById(invPieceLeftId).remove();

          // update invPiece position to new square
          invPieceLeft.position = [targetRow, targetCol];
          activePiecesLeft.push(invPieceLeft);

          invPieceLeft = "";
          invPieceLeftId = "";

          stateIncrement("left");
        } else {
          invPieceLeft = "";
          invPieceLeftId = "";
          stateLeft--;
        }
      }
    }
    console.log(`current left state is ${stateLeft}`);
  }
}

function gamePlayRight(e) {
  if (e.target.className === "square") {
    if (stateRight === 1 || stateRight === 3) {
      //first click

      activatedPieceSquareRight = e.target.id;
      activatedPieceRowRight = Number(activatedPieceSquareRight[1]);
      activatedPieceColRight = Number(activatedPieceSquareRight[3]);

      activatedPieceRight = findElement(
        activatedPieceRowRight,
        activatedPieceColRight,
        activePiecesRight
      );
      activePieceIndexRight = activePiecesRight.indexOf(activatedPieceRight);

      // if empty square
      if (activatedPieceRight === undefined) {
        logDisplayRight.innerText = "empty square selected";
      }

      // if not empty square => check for color ~~~ proceed
      else {
        if (
          (stateRight === 1 && activatedPieceRight.color === "white") ||
          (stateRight === 3 && activatedPieceRight.color === "black")
        ) {
          logDisplayRight.innerText = `${activatedPieceRight.type} at ${activatedPieceRowRight},${activatedPieceColRight} is selected`;
          highlightSquare(
            activatedPieceSquareRight,
            activePiecesRight,
            "right"
          );
          stateIncrement("right");
        } else {
          logDisplayRight.innerText = "wrong color is selected";
        }
      }
    } else if (stateRight === 2 || stateRight === 4) {
      //second click

      const targetSquare = e.target.id;
      const targetRow = Number(targetSquare[1]);
      const targetCol = Number(targetSquare[3]);

      const targetPiece = findElement(targetRow, targetCol, activePiecesRight);

      const isOccupied = targetPiece !== undefined;
      let inCheck = false;
      let inCheckNext = false;
      let capturedPieceIndex = -1;

      if (invPieceRight === "") {
        if (targetPiece !== undefined) {
          capturedPieceIndex = activePiecesRight.indexOf(targetPiece);
        }

        let isValidMove = false;
        const isSameSquare = activatedPieceSquareRight === targetSquare;
        const isSameColor =
          isOccupied && targetPiece.color === activatedPieceRight.color;

        // not run if targeting pieces of the same color
        if (!isSameColor) {
          if (stateRight === 2) {
            inCheck = checkFor("white", activePiecesRight);
            inCheckNext = nextMoveCheck(
              "white",
              isOccupied,
              activePiecesRight,
              "right",
              targetRow,
              targetCol,
              capturedPieceIndex
            );
          } else {
            inCheck = checkFor("black", activePiecesRight);
            inCheckNext = nextMoveCheck(
              "black",
              isOccupied,
              activePiecesRight,
              "right",
              targetRow,
              targetCol,
              capturedPieceIndex
            );
          }
        } else {
          inCheck = false;
          inCheckNext = false;
        }

        if (activatedPieceRight.type === "pawn" && isOccupied & !isSameColor) {
          isValidMove = activatedPieceRight.checkCaptureMove(
            targetRow,
            targetCol,
            activePiecesRight
          );
        } else {
          isValidMove = activatedPieceRight.checkValidMove(
            targetRow,
            targetCol,
            activePiecesRight,
            "right"
          );
        }

        // same square
        if (isSameSquare) {
          logDisplayRight.innerText = "cancelled";
          unhighlightSquare(
            activatedPieceRowRight,
            activatedPieceColRight,
            "right"
          );
          stateRight--;
        }
        // different square
        else {
          // different square => if valid move or color is different
          if (!isSameColor && isValidMove) {
            if (!inCheck && inCheckNext) {
              logDisplayRight.innerText =
                "invalid move - king is moved into check";
              stateRight--;
              unhighlightSquare(
                activatedPieceRowRight,
                activatedPieceColRight,
                "right"
              );
            } else if (inCheck && inCheckNext) {
              logDisplayRight.innerText =
                "invalid move - king is still in check";
              stateRight--;
              unhighlightSquare(
                activatedPieceRowRight,
                activatedPieceColRight,
                "right"
              );
            } else {
              logDisplayRight.innerText = `moved`;
              activePiecesRight[activePieceIndexRight].position = [
                targetRow,
                targetCol,
              ];
              unhighlightSquare(
                activatedPieceRowRight,
                activatedPieceColRight,
                "right"
              );
              if (isOccupied) {
                if (activePiecesRight[capturedPieceIndex].color === "white") {
                  capturedWhiteRight.push(
                    activePiecesRight.splice(capturedPieceIndex, 1)[0]
                  );
                  addCaptured("White", targetSquare, "Right");
                } else {
                  capturedBlackRight.push(
                    activePiecesRight.splice(capturedPieceIndex, 1)[0]
                  );

                  addCaptured("Black", targetSquare, "Right");
                }

                const temp = Math.floor(Math.random() * 2);
                logDisplayRight.innerHTML = `captured ${emoji[temp]}`;
              }

              if (activatedPieceRight.type === "pawn") {
                activatedPieceRight.isNew = false;
              } else if (activatedPieceRight.type === "rook") {
                activatedPieceRight.isNew = false;
              } else if (activatedPieceRight.type === "king") {
                activatedPieceRight.isNew = false;
              }

              stateIncrement("right");
              updateHTML(
                activatedPieceRowRight,
                activatedPieceColRight,
                targetRow,
                targetCol,
                "right"
              );
            }
          } else {
            logDisplayRight.innerText = "invalid move";
            unhighlightSquare(
              activatedPieceRowRight,
              activatedPieceColRight,
              "right"
            );
            stateRight--;
          }
        }
      } else {
        console.log(invPieceRight);
        // if invPiece is selected
        if (!isOccupied) {
          if (invPieceRight.color === "white") {
            //remove invPiece from captured stash
            const index = capturedWhiteLeft.indexOf(invPieceRight);
            capturedWhiteLeft.splice(index, 1);
            updateIndex("W", "L", index, capturedWhiteLeft);
          } else {
            const index = capturedBlackLeft.indexOf(invPieceRight);
            capturedBlackLeft.splice(index, 1);
            updateIndex("B", "L", index, capturedBlackLeft);
          }

          //update target square symbol
          document.getElementById(targetSquare).innerHTML =
            document.getElementById(invPieceRightId).innerHTML;
          //remove the symbol from stash
          document.getElementById(invPieceRightId).remove();
          //update id of the remaining pieces

          // update invPiece position to new square
          invPieceRight.position = [targetRow, targetCol];
          activePiecesRight.push(invPieceRight);

          invPieceRight = "";
          invPieceRightId = "";

          stateIncrement("right");
        } else {
          invPieceRight = "";
          invPieceRightId = "";
          stateRight--;
        }
      }
    }
    console.log(`current right state is ${stateRight}`);
  }
}

// timer function

const STARTMIN = 10;
let timeBlackLeft = STARTMIN * 60 * 1000;
let timeWhiteLeft = STARTMIN * 60 * 1000;
let timeWhiteRight = STARTMIN * 60 * 1000;
let timeBlackRight = STARTMIN * 60 * 1000;

const ONE_SEC_PERCENT = (1 / (STARTMIN * 60)) * 100;

const timerBL = document.getElementById("timerBlackLeft");
const timerWL = document.getElementById("timerWhiteLeft");
const timerBR = document.getElementById("timerBlackRight");
const timerWR = document.getElementById("timerWhiteRight");

timerBL.innerText =
  timerWL.innerText =
  timerWR.innerText =
  timerBR.innerText =
    "10:00";

function formatTime(time) {
  let min = Math.floor(time / 1000 / 60);
  let second = Math.floor((time / 1000) % 60);

  if (min < 10) {
    min = `0${min}`;
  }
  if (second < 10) {
    second = `0${second}`;
  }
  return `${min}:${second}`;
}

let timerLeft;
let timerRight;

//function to countdown the relevant timers
function countingDown() {
  if (
    timeBlackLeft > 0 &&
    timeWhiteLeft > 0 &&
    timeBlackRight > 0 &&
    timeWhiteRight > 0
  ) {
    timerLeft = setInterval(switchTimerLeft, 1000);
    timerRight = setInterval(switchTimerRight, 1000);
  }
}

//functions to determine the active timer based on states
function switchTimerLeft() {
  if (stateLeft === 1 || stateLeft === 2) {
    decrementWL();
  } else decrementBL();
}

function switchTimerRight() {
  if (stateRight === 1 || stateRight === 2) {
    decrementWR();
  } else decrementBR();
}

//functions to decrement each timer
function decrementBL() {
  timeBlackLeft -= 1000;
  timerBL.innerHTML = formatTime(timeBlackLeft);
  const width = (timeBlackLeft / (STARTMIN * 60 * 1000)) * 160;
  timerBL.style.width = `${width}px`;
  changeColor(width, timerBL);
}

function decrementWL() {
  timeWhiteLeft -= 1000;
  timerWL.innerHTML = formatTime(timeWhiteLeft);
  const width = (timeWhiteLeft / (STARTMIN * 60 * 1000)) * 160;
  timerWL.style.width = `${width}px`;
  changeColor(width, timerWL);
}
function decrementBR() {
  timeBlackRight -= 1000;
  timerBR.innerHTML = formatTime(timeBlackRight);
  const width = (timeBlackRight / (STARTMIN * 60 * 1000)) * 160;
  timerBR.style.width = `${width}px`;
  changeColor(width, timerBR);
}
function decrementWR() {
  timeWhiteRight -= 1000;
  timerWR.innerHTML = formatTime(timeWhiteRight);
  const width = (timeWhiteRight / (STARTMIN * 60 * 1000)) * 160;
  timerWR.style.width = `${width}px`;
  changeColor(width, timerWR);
}

function changeColor(width, timer) {
  if (width < 32) {
    timer.style.backgroundColor = "#282419";
    timer.style.color = "red";
  } else if (width < 64) {
    timer.style.backgroundColor = "#C43726";
  } else if (width < 96) {
    timer.style.backgroundColor = "#F1DCBD";
  } else if (width < 128) {
    timer.style.backgroundColor = "#449A6D";
  }
}

//--------------------for event listener

document.querySelector("button").addEventListener("click", startFunction);
document
  .querySelector("#capturedContainerLeft")
  .addEventListener("click", recyclingFunction);
document
  .querySelector("#capturedContainerRight")
  .addEventListener("click", recyclingFunction);
