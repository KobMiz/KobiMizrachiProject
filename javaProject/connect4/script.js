var playerRed = 'R';
var playerYellow = 'Y';
var currentPlayer = playerRed;

var gameOver = false;
var board;
var currentColumns;

var rows = 6;
var columns = 7;

window.onload = function () {
    setGame();
    displayTurnMessage();
}

function displayTurnMessage() {
    let turnMessage = document.getElementById("turnMessage");
    turnMessage.innerText = currentPlayer == playerRed ? "התור של האדום" : "התור של הצהוב";
    turnMessage.style.color = currentPlayer == playerRed ? "red" : "yellow";
    turnMessage.style.fontSize = "20px";
}

function setGame() {
    board = [];
    currentColumns = [5, 5, 5, 5, 5, 5, 5];

    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            row.push(' ');

            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add('tile');
            tile.addEventListener("click", setPiece);
            document.getElementById('board').appendChild(tile);
        }
        board.push(row);
    }
}

function setPiece() {
    if (gameOver) {
        return;
    }

    let coords = this.id.split("-");
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    let rowToFill = currentColumns[c];
    if (rowToFill < 0) {
        return;
    }

    board[rowToFill][c] = currentPlayer;
    let tile = document.getElementById(rowToFill.toString() + "-" + c.toString());
    if (currentPlayer == playerRed) {
        tile.classList.add("red-piece");
        currentPlayer = playerYellow;
    } else {
        tile.classList.add("yellow-piece");
        currentPlayer = playerRed;
    }

    rowToFill -= 1;
    currentColumns[c] = rowToFill;

    let turnMessage = document.getElementById("turnMessage");
    turnMessage.innerText = currentPlayer == playerRed ? "התור של האדום" : "התור של הצהוב";
    turnMessage.style.color = currentPlayer == playerRed ? "red" : "#dede2e";

    checkWinner();
}


function checkWinner() {
    // Check horizontal
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ' &&
                board[r][c] == board[r][c + 1] &&
                board[r][c + 1] == board[r][c + 2] &&
                board[r][c + 2] == board[r][c + 3]) {
                setWinner(r, c);
                return;
            }
        }
    }

    // Check vertical
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 3; r++) {
            if (board[r][c] != ' ' &&
                board[r][c] == board[r + 1][c] &&
                board[r + 1][c] == board[r + 2][c] &&
                board[r + 2][c] == board[r + 3][c]) {
                setWinner(r, c);
                return;
            }
        }
    }

    // Check diagonal (top-left to bottom-right)
    for (let r = 0; r < rows - 3; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ' &&
                board[r][c] == board[r + 1][c + 1] &&
                board[r + 1][c + 1] == board[r + 2][c + 2] &&
                board[r + 2][c + 2] == board[r + 3][c + 3]) {
                setWinner(r, c);
                return;
            }
        }
    }

    // Check diagonal (top-right to bottom-left)
    for (let r = 0; r < rows - 3; r++) {
        for (let c = 3; c < columns; c++) {
            if (board[r][c] != ' ' &&
                board[r][c] == board[r + 1][c - 1] &&
                board[r + 1][c - 1] == board[r + 2][c - 2] &&
                board[r + 2][c - 2] == board[r + 3][c - 3]) {
                setWinner(r, c);
                return;
            }
        }
    }

    // Check for tie
    let tie = true;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (board[r][c] == ' ') {
                tie = false;
                break;
            }
        }
        if (!tie) break;
    }
    if (tie) {
        let winner = document.getElementById("winner");
        winner.innerText = "תיקו";
        gameOver = true;
        document.getElementById("restartButton").style.display = "inline-block";
        return;
    }
}

function setWinner(r, c) {
    let winner = document.getElementById("winner");
    if (board[r][c] == playerRed) {
        winner.innerText = "האדום הוא המנצח";
        winner.style.color = 'red';
    } else {
        winner.innerText = "הצהוב הוא המנצח"
        winner.style.color = '#dede2e';
    }

    gameOver = true;
    document.getElementById("restartButton").style.display = "inline-block"; // תצוגת הכפתור גם במקרה של ניצחון
}

function restartGame() {
    document.getElementById("board").innerHTML = "";
    document.getElementById("winner").innerText = "";
    gameOver = false;
    currentPlayer = playerRed;
    setGame();
    document.getElementById("restartButton").style.display = "none";

    let turnMessage = document.getElementById("turnMessage");
    turnMessage.innerText = currentPlayer == playerRed ? "התור של האדום" : "התור של הצהוב";
    turnMessage.style.color = currentPlayer == playerRed ? "red" : "#dede2e";
}
