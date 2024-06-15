
const emo = ["🍔", "🍔", "🍕", "🍕", "🍟", "🍟", "🌯", "🌯", "🌭", "🌭", "🌮", "🌮", "🥓", "🥓", "🍳", "🍳"];
var score = localStorage.getItem('memory_game_score') || 0;
var isAnimating = false; 

function resetGame() {
    document.querySelector('.game').innerHTML = '';
    startGame();
}

function resetScore() {
    const confirmation = confirm("האם אתה בטוח שברצונך לאפס את הניקוד? פעולה זו לא ניתנת לביטול.");

    if (confirmation) {
        score = 0;
        localStorage.setItem('memory_game_score', score);
        updateScoreDisplay();
    }

}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function startGame() {
    shuffleArray(emo);

    for (var i = 0; i < emo.length; i++) {
        let box = document.createElement('div')
        box.className = 'item';
        box.innerHTML = emo[i];

        box.onclick = function () {
            if (!isAnimating) { 
                isAnimating = true; 
                this.classList.add('boxOpen');
                setTimeout(() => {
                    if (document.querySelectorAll('.boxOpen').length > 1) {
                        if (document.querySelectorAll('.boxOpen')[0].innerHTML == document.querySelectorAll('.boxOpen')[1].innerHTML) {
                            document.querySelectorAll('.boxOpen')[0].classList.add('boxMatch');
                            document.querySelectorAll('.boxOpen')[1].classList.add('boxMatch');

                            document.querySelectorAll('.boxOpen')[1].classList.remove('boxOpen');
                            document.querySelectorAll('.boxOpen')[0].classList.remove('boxOpen');

                            if (document.querySelectorAll('.boxMatch').length == emo.length) {
                                score++;
                                localStorage.setItem('memory_game_score', score);
                                updateScoreDisplay();
                                alert('יש בך את הרעב לנצח, ניצחון!');
                            }
                        } else {
                            document.querySelectorAll('.boxOpen')[1].classList.remove('boxOpen');
                            document.querySelectorAll('.boxOpen')[0].classList.remove('boxOpen');
                        }
                    }
                    isAnimating = false;
                }, 500)
            }
        }

        document.querySelector('.game').appendChild(box);
    }
}

function updateScoreDisplay() {
    document.querySelector('.score').textContent = 'ניקוד: ' + score;
}

startGame();
updateScoreDisplay();
