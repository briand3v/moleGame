const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
let lastHole;
let timeUp = false;
let score = 0;
let hit = false;



function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {

    const hole = Math.floor(Math.random() * holes.length);
    const idx = hole;

    if (hole === lastHole) {
        console.log('upps this hole is repeat again');
        return randomHole(holes);

    }
    lastHole = hole;
    return hole;
}

function popup() {
    const hole = randomHole(holes);
    const time = randomTime(200, 1000);

    holes[hole].classList.add('up');


    setTimeout(() => {
        holes[hole].classList.remove('up');
        if (!timeUp) popup()

        if (hit) {
            console.log('Hit!');
            hit = false;
        } else {
            document.body.classList.add('fail');

            setTimeout(() => {
                document.body.classList.remove('fail');
            }, 500)
        }

    }, 700)
}

function startGame() {
    timeUp = false;
    score = 0;
    scoreBoard.innerText = score;
    popup();
    setInterval(() => {
        timeUp = true;
    }, 7000)
}

function smashMole(e) {

    while (score < 8) {
        if (e.isTrusted) {
            hit = true;
            score++;
            console.log(score);

        }
        return scoreBoard.innerText = score;
    }

    if (score === 8) {
        timeUp = true;
        console.log('You winn');
    }

}

moles.forEach((mole) => {
    mole.addEventListener('click', smashMole);
})