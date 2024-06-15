const board = document.querySelector("#board");
const width = window.screen.width < 640 ? 25 : 45; // הרוחב בהתאם לרוחב המסך
const height = 50;
const snake = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
const divs = [];
let direction = 'left';
let isGameOver = false;
let interval;
let random;
let score = 0;
let initialSpeed = 300;
let speedMultiplier = 1.07;
let originalSpeed = initialSpeed;
let boardCreated = false;

function createBoard() {
    if (!boardCreated) {
        board.style.gridTemplateColumns = `repeat(${width}, 1fr)`;

        for (let i = 0; i < width * height; i++) {
            const div = document.createElement("div");
            board.appendChild(div);
            divs.push(div);
        }

        boardCreated = true;
    }

    color();
    setApple();
}

function color() {
    // מנקה את כל התאים מהנחש
    divs.forEach(div => {
        div.classList.remove("snake", "head");
    });

    // שם את הנחש במיקום שלו
    snake.forEach((x, i) => {
        divs[x].classList.add("snake");

        if (i === 0) {
            divs[x].classList.add("head");
        }
    });
}

window.addEventListener("touchstart", handleTouchStart, false);
window.addEventListener("touchmove", handleTouchMove, false);

let xDown = null;
let yDown = null;

function handleTouchStart(evt) {
    xDown = evt.touches[0].clientX;
    yDown = evt.touches[0].clientY;
};

function handleTouchMove(evt) {
    if (!xDown || !yDown) {
        return;
    }

    let xUp = evt.touches[0].clientX;
    let yUp = evt.touches[0].clientY;

    let xDiff = xDown - xUp;
    let yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (xDiff > 0) {
            move('left');
        } else {
            move('right');
        }
    } else {
        if (yDiff > 0) {
            move('up');
        } else {
            move('down');
        }
    }
    /* reset values */
    xDown = null;
    yDown = null;
};


function move(dir) {
    if (isGameOver) {
        return;
    }

    let head = snake[0];

    if (dir === 'up') {
        if (direction === 'down') {
            return;
        }

        head -= width;

        // בדיקת גבולות - אם הנחש עומד לחרוג מה-0
        if (head < 0) {
            gameOver();
            return;
        }
    } else if (dir === 'down') {
        if (direction === 'up') {
            return;
        }

        head += width;

        if (head >= width * height) {
            gameOver();
            return;
        }
    } else if (dir === 'left') {
        if (direction === 'right') {
            return;
        }

        head++;

        if (head % width === 0) {
            gameOver();
            return;
        }
    } else if (dir === 'right') {
        if (direction === 'left') {
            return;
        }

        if (head % width === 0) {
            gameOver();
            return;
        }

        head--;
    }

    if (snake.includes(head)) {
        gameOver();
        return;
    }

    direction = dir;
    snake.unshift(head);

    if (head === random) {
        score++;
        document.querySelector("#score span").innerText = score;
        sound("./apple-bite.mp3");
        setApple();
        originalSpeed *= speedMultiplier;
    } else {
        snake.pop();
    }

    color();
    autoMove();

    if (score >= 30) {
        victory();
        return;
    }
}

function autoMove() {
    clearInterval(interval);
    const speed = originalSpeed - (score * 50);
    interval = setInterval(() => move(direction), speed > 50 ? speed : 50);
}

function gameOver() {
    isGameOver = true;
    clearInterval(interval);
    sound("./lose.mp3");
    document.querySelector("#newGame").style.display = "initial";
    var gameOverAlert = document.createElement("div");
    gameOverAlert.innerText = "הפסדת 😞";
    gameOverAlert.style.position = "fixed";
    gameOverAlert.style.top = "30%";
    gameOverAlert.style.left = "50%";
    gameOverAlert.style.transform = "translate(-50%, -50%)";
    gameOverAlert.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
    gameOverAlert.style.padding = "20px";
    gameOverAlert.style.border = "2px solid green";
    gameOverAlert.style.borderRadius = "10px";
    gameOverAlert.style.textAlign = "center";
    document.body.appendChild(gameOverAlert);

    setTimeout(function () {
        document.body.removeChild(gameOverAlert);
    }, 3.3 * 1000);
}

function setApple() {
    do {
        random = Math.floor(Math.random() * width * height);
    } while (snake.includes(random))

    divs.forEach(d => d.classList.remove('apple'));
    divs[random].classList.add("apple");
}

function sound(fileName) {
    const audio = document.createElement('audio');
    audio.src = fileName;
    audio.play();
}

function newGame() {
    snake.splice(0, snake.length);
    snake.push(9, 8, 7, 6, 5, 4, 3, 2, 1, 0);
    isGameOver = false;
    score = 0;
    originalSpeed = initialSpeed;
    document.querySelector("#score span").innerText = score;
    document.querySelector("#newGame").style.display = "none";
    createBoard();
}

window.addEventListener("keydown", ev => {
    ev.preventDefault();

    switch (ev.key) {
        case "ArrowUp": move("up"); break;
        case "ArrowRight": move("right"); break;
        case "ArrowDown": move("down"); break;
        case "ArrowLeft": move("left"); break;
        case "Escape": clearInterval(interval); break;
    }
});

function victory() {
    isGameOver = true;
    clearInterval(interval);
    sound("./win.mp3");
    document.querySelector("#newGame").style.display = "initial";
    var victoryAlert = document.createElement("div");
    victoryAlert.innerText = "ניצחת! 🎉";
    victoryAlert.style.position = "fixed";
    victoryAlert.style.top = "30%";
    victoryAlert.style.left = "50%";
    victoryAlert.style.transform = "translate(-50%, -50%)";
    victoryAlert.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
    victoryAlert.style.padding = "20px";
    victoryAlert.style.border = "2px solid green";
    victoryAlert.style.borderRadius = "10px";
    victoryAlert.style.textAlign = "center";
    document.body.appendChild(victoryAlert);

    setTimeout(function () {
        document.body.removeChild(victoryAlert);
    }, 3.3 * 1000);
}

function toggleInstructions() {
    var instructionsDiv = document.getElementById("instructions");
    instructionsDiv.style.display = (instructionsDiv.style.display === "none") ? "block" : "none";
}

function closeInstructions() {
    var instructionsDiv = document.getElementById("instructions");
    instructionsDiv.style.display = "none";
}
