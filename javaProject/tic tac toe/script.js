const divs = document.querySelectorAll("#board > div");
let isX = true;
let isGameOver = false;
let startingPlayer = true; 

const scores = {
    x: localStorage.x ? Number(localStorage.x) : 0,
    o: localStorage.o ? Number(localStorage.o) : 0,
};

document.querySelector("#x_score").innerText = scores.x;
document.querySelector("#o_score").innerText = scores.o;

divs.forEach(div => {
    div.addEventListener("click", ev => {
        if (isGameOver) {
            return;
        }

        const elem = ev.target;

        if (elem.innerText) {
            return;
        }

        const clickSound = new Audio('click.mp3');
        clickSound.play();

        elem.innerText = isX ? "X" : "O";
        isX = !isX;
        showTurn();
        checkWinner();
    });
});

function showTurn() {
    document.querySelector('.currentTurn').classList.remove('currentTurn');

    if (isX) {
        document.querySelector("#players > div:first-child").classList.add('currentTurn');
    } else {
        document.querySelector("#players > div:last-child").classList.add('currentTurn');
    }
}

function checkWinner() {
    const options = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    let winnerFound = false;

    for (const op of options) {
        if (op.every(x => divs[x].innerText === 'X')) {
            handleWin(op, 'X');
            winnerFound = true;
            break;
        } else if (op.every(x => divs[x].innerText === 'O')) {
            handleWin(op, 'O');
            winnerFound = true;
            break;
        }
    }

    if (!winnerFound && [...divs].every(x => x.innerText)) {
        setTimeout(() => alert("אין מנצח"), 50);
        isGameOver = true;
    }
}

function handleWin(op, win) {
    op.forEach(x => divs[x].classList.add('win'));

    isGameOver = true;

    if (win === 'X') {
        scores.x++;
        localStorage.x = scores.x;
        document.querySelector("#x_score").innerText = scores.x;
    } else {
        scores.o++;
        localStorage.o = scores.o;
        document.querySelector("#o_score").innerText = scores.o;
    }

    const winnerSpan = document.getElementById('winnerSpan');
    winnerSpan.innerText = `המנצח הוא - ${win}`;
    winnerSpan.style.display = 'block';

    const winSound = new Audio('applause.mp3');
    winSound.play();

    setTimeout(() => {
        winnerSpan.style.display = 'none';
    }, 3000);
}


function resetScores() {
    const isConfirmed = confirm("האם אתה בטוח שברצונך לאפס את הניקוד?");

    if (isConfirmed) {
        scores.x = 0;
        scores.o = 0;
        localStorage.x = 0;
        localStorage.o = 0;
        document.querySelector("#x_score").innerText = scores.x;
        document.querySelector("#o_score").innerText = scores.o;
        resetGame();
    }
}

function resetScores() {
    const isConfirmed = confirm("האם אתה בטוח שברצונך לאפס את הניקוד?");

    if (isConfirmed) {
        scores.x = 0;
        scores.o = 0;
        document.querySelector("#x_score").innerText = scores.x;
        document.querySelector("#o_score").innerText = scores.o;
        resetGame();
    }
}

function resetGame() {
    divs.forEach(div => {
        div.innerText = '';
        div.classList.remove('win');
    });

    document.body.classList.add('reset-background');
    setTimeout(() => {
        document.body.classList.remove('reset-background');
    }, 1000);

    isGameOver = false;
    isX = startingPlayer; 
    showTurn();
}

function newGame() {
    divs.forEach(div => {
        div.innerText = '';
        div.classList.remove('win');
    });

    startingPlayer = !startingPlayer;

    document.body.classList.add('reset-background');
    setTimeout(() => {
        document.body.classList.remove('reset-background');
    }, 1000);

    isGameOver = false;
    isX = startingPlayer;
    showTurn();
}

window.addEventListener('load', () => {
    if (localStorage.x) {
        scores.x = Number(localStorage.x);
        document.querySelector("#x_score").innerText = scores.x;
    }

    if (localStorage.o) {
        scores.o = Number(localStorage.o);
        document.querySelector("#o_score").innerText = scores.o;
    }
});

isX = startingPlayer;
showTurn();




