const divs = document.querySelectorAll("#board>div");
let isX = true;
let isGameOver = false;

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

        if (isX) {
            elem.innerText = "X";
        } else {
            elem.innerText = "O";
        }

        isX = !isX;
        showTurn();
        checkWinner();
    });
})


function showTurn() {
    document.querySelector('.currentTurn').classList.remove('currentTurn');

    if (isX) {
        document.querySelector("#players>div:first-child").classList.add('currentTurn');
    } else {
        document.querySelector("#players>div:last-child").classList.add('currentTurn');
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

    for (const op of options) {
        if (op.every(x => divs[x].innerText === 'X')) {
            scores.x++;
            winner(op, 'X');
            document.querySelector("#x_score").innerText = scores.x;
            break;
        } else if (op.every(x => divs[x].innerText === 'O')) {
            scores.o++;
            winner(op, 'O');
            document.querySelector("#o_score").innerText = scores.o;
            break;
        } else if ([...divs].every(x => x.innerText)) {
            setTimeout(() => alert("אין מנצח"), 50);
            isGameOver = true;
            break;
        }
    }
}

function winner(op, win) {
    op.forEach(x => divs[x].classList.add('win'));

    isGameOver = true;

    localStorage.x = scores.x;
    localStorage.o = scores.o;

    const winnerSpan = document.getElementById('winnerSpan');
    winnerSpan.innerText = `המנצח הוא - ${win}`;
    winnerSpan.style.display = 'block';
    winnerSpan.style.margin = '20px auto';

    setTimeout(() => {
        winnerSpan.style.display = 'none';
        isX = !isX;
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

        newGame();
    }
}

function newGame() {
    divs.forEach(div => {
        div.innerText = '';
        div.classList.remove('win');
    });

    document.body.classList.add('reset-background');
    setTimeout(() => {
        document.body.classList.remove('reset-background');
    }, 1000);

    isGameOver = false;
    showTurn();
}

function isBoardFull() {
    for (const div of divs) {
        if (!div.innerText) {
            return false;
        }
    }

    return true;
}
