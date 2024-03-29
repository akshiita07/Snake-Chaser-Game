//all variables
let direction = { x: 0, y: 0 };

let speed = prompt("Enter desired speed: ");
let lastPaintTime = 0;

let score = 0

//all songs
const foodEat = new Audio('../music/food.mp3');
const gameOver = new Audio('../music/gameover.mp3');
const bgMusic = new Audio('../music/music.mp3');
const snakeMove = new Audio('../music/move.mp3');

//functions
function main(cTime) {
    window.requestAnimationFrame(main);
    if ((cTime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = cTime;
    gameFnc();
}

//creating snake array 12rows*18clms        ----y rows          |x clms
let snakeArray = [
    { x: 3, y: 3 }
]

food = { x: 15, y: 5 }

function isCollide(snake) {
    // If you bump into yourself 
    for (let i = 1; i < snakeArray.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    // If you bump into the wall
    if (snake[0].x >= 19 || snake[0].x <= 0 || snake[0].y >= 13 || snake[0].y <= 0) {
        return true;
    }

    return false;
}

function gameFnc() {
    // Part 1: Updating the snake array & Food
    if (isCollide(snakeArray)) {
        gameOver.play();
        bgMusic.pause();
        direction = { x: 0, y: 0 };
        alert("Game Over. Press any key to play again!");
        snakeArray = [{ x: 5, y: 10 }];
        bgMusic.play();
        score = 0;
        scoreBox.innerHTML = "Score: " + score;
    }

    // If you have eaten the food, increment the score and regenerate the food
    if (snakeArray[0].y === food.y && snakeArray[0].x === food.x) {
        foodEat.play();
        score += 1;

        if (score > highScore) {
            hiScoreValue = score;
            localStorage.setItem("highScore", JSON.stringify(hiScoreValue))
            highScoreBox.innerHTML = "High Score: " + hiScoreValue;
        }

        scoreBox.innerHTML = "Score: " + score;
        snakeArray.unshift({ x: snakeArray[0].x + direction.x, y: snakeArray[0].y + direction.y });
        let a = 2;
        let b = 11;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }

    // Moving the snake
    for (let i = snakeArray.length - 2; i >= 0; i--) {
        snakeArray[i + 1] = { ...snakeArray[i] };
    }

    snakeArray[0].x += direction.x;
    snakeArray[0].y += direction.y;

    // board = document.getElementsByClassName('board');
    board.innerHTML = "";

    snakeArray.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if (index === 0) {
            snakeElement.classList.add('head');
            // snakeElement.classList.add('arrowRight');
        }
        else {
            snakeElement.classList.add('snake');

        }

        board.appendChild(snakeElement);

    });

    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);


}

// bgMusic.play();
let highScore = localStorage.getItem("highScore");
if (highScore === null) {
    hiScoreValue = 0;
    localStorage.setItem("highScore", JSON.stringify(hiScoreValue))
}
else {
    hiScoreValue = JSON.parse(highScore);
    highScoreBox.innerHTML = "High Score: " + highScore;
}


window.requestAnimationFrame(main);
let isUpPressed=false;
let isDownPressed=false;
let isLeftPressed=false;
let isRightPressed=false;

window.addEventListener('keydown', e => {
    direction = { x: 0, y: 1 };
    snakeMove.play();
    let positionHead = document.querySelector('.head');

    switch (e.key) {
        case "ArrowUp":
            direction.x = 0;
            direction.y = -1;
            positionHead.classList.add('arrowUp');
            isUpPressed = true;

            break;

        case "ArrowDown":
            direction.x = 0;
            direction.y = 1;
            positionHead.classList.add('arrowDown');
            isDownPressed = true;
            break;

        case "ArrowLeft":
            direction.x = -1;
            direction.y = 0;
            positionHead.classList.add('arrowLeft');
            isLeftPressed = true;
            break;

        case "ArrowRight":
            direction.x = 1;
            direction.y = 0;
            positionHead.classList.add('arrowRight');
            isRightPressed = true;
            break;

        default:
            break;
    }

})


window.addEventListener('keyup', function (event) {
    let positionHead = document.querySelector('.head');

    if (event.key=="ArrowUp") {
        positionHead.classList.remove('arrowUp');
        isUpPressed=false;
    }
    else if (event.key=="ArrowDown") {
        positionHead.classList.remove('arrowDown');
        isDownPressed=false;
    }
    else if (event.key=="ArrowLeft") {
        positionHead.classList.remove('arrowLeft');
        isLeftPressed=false;
    }
    else if (event.key=="ArrowRight") {
        positionHead.classList.remove('arrowRight');
        isRightPressed=false;
    }
});


window.addEventListener('keypress', (event) => {
    let positionHead = document.querySelector('.head');

    if (event.key === 'ArrowUp' && !isUpPressed) {
        positionHead.classList.add('arrowUp');
    } 
    else if (event.key === 'ArrowDown' && !isDownPressed) {
        positionHead.classList.add('arrowDown');
    }
    else if (event.key === 'ArrowLeft' && !isLeftPressed) {
        positionHead.classList.add('arrowLeft');
    }
    else if (event.key === 'ArrowRight' && !isRightPressed) {
        positionHead.classList.add('arrowRight');
    }
});
