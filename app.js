let gameSequence = [];
let userSequence = [];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

let color = ["red","yellow","green","purple"];

document.addEventListener("keypress", function() {
    if(started== false) {
        console.log("game is started");
        started = true;

        levelUp();
    }
});

function userflash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 250);
}

function gameflash(btn) {
    btn.classList.add("gameflash");
    setTimeout(function () {
        btn.classList.remove("gameflash");
    }, 250);
}

function levelUp() {
    userSequence=[];
    level++;
    h2.innerText = `level ${level}`;

    let randomIdx = Math.floor(Math.random()*3);
    let randomColor = color[randomIdx];
    let randomBtn = document.querySelector(`.${randomColor}`);

    gameSequence.push(randomColor);
    console.log(gameSequence);
    gameflash(randomBtn);
}


function resetGame() {
    started = false;
    gameSequence = [];
    userSequence = [];
    level = 0;
}

function checkAns(idx) {
    if (userSequence[idx] === gameSequence[idx]) {
        // Correct so far
        if (userSequence.length === gameSequence.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        // WRONG input
        h2.innerHTML = `Game Over! your score was <b>${level}</b> <br>Press any key to restart`;
        document.querySelector("body").style.backgroundColor = "red";

        setTimeout(() => {
            document.querySelector("body").style.backgroundColor = "white";
        }, 200);

        // Reset game
        resetGame();
    }
}




function btnPress() {
    console.log(this);
    let btn = this;
    userflash(btn);

    let userColor = btn.getAttribute("id");
    userSequence.push(userColor);

    checkAns(userSequence.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}
