// GAME CONSTANTS & VARIABLES
let inputDirection = {x:0, y:0};
const foodSound = new Audio('foodEat.mp3');
const gameOverSound = new Audio('endGame.mp3');
const moveSound = new Audio('direction.mp3');
const backgroundMusic = new Audio('bgMusic.mp3');
let speed = 7;
let Score = 0;
let lastPaintTime = 0;
let snakeArr = [
    {x: 13, y: 15}
]
food = {x: 6, y: 7};

// GAME FUNCTIONS
function main(ctime) {
    window.requestAnimationFrame(main);
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();

}

function isCollide(snake){
    // If Snake bump into itself
    for(let index = 1; index < snakeArr.length; index++){
        if(snake[index].x === snake[0].x && snake[index].y === snake[0].y){
            return true;
        }
    }

    // If Snake bump into the wall
        if(snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0){
            return true;
        }
    }

function gameEngine(){
    // PART 1: UPDATING THE SNAKE ARRAY AND FOOD
    if(isCollide(snakeArr)){
        gameOverSound.play();
        backgroundMusic.pause();
        inputDirection = {x:0, y:0};
        alert("Game Over. Press any key to play again!");
        snakeArr = [{x:13, y:15}];
        backgroundMusic.play();
        Score = 0;
    }

    //  IF YOU HAVE EATEN THE FOOD, INCREAMENT THE SCORE AND REGENERATE THE FOOD
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodSound.play();
        Score += 1;
        if(Score>hiscoreval){
            hiscoreval = Score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "HighScore: " + hiscore;
}
        ScoreCount.innerHTML = "Score: "+ Score;
        snakeArr.unshift({x: snakeArr[0].x + inputDirection.x, y: snakeArr[0].y + inputDirection.y});
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
    }

    // Moving the Snake
    for(let i = snakeArr.length -2; i >= 0; i--){
        snakeArr[i+1] = {...snakeArr[i]}; 
    }

    snakeArr[0].x += inputDirection.x;
    snakeArr[0].y += inputDirection.y;

    // PART 2: DISPLAY THE SNAKE
    board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        
        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
        snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });

    // DISPLAY THE FOOD
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}

// MAIN LOGIC STARTS HERE
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "HighScore: " + hiscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
    inputDirection = {x: 0, y: 1} // start the game
    moveSound.play();
    switch(e.key){
        case "ArrowUp":
            console.log("ArrowUp")
            inputDirection.x = 0;
            inputDirection.y = -1;
            break;

        case "ArrowDown":    
            console.log("ArrowDown")
            inputDirection.x = 0;
            inputDirection.y = 1;
            break;

        case "ArrowLeft":    
            console.log("ArrowLeft")
            inputDirection.x = -1;
            inputDirection.y = 0;
            break;
            
        case "ArrowRight":    
            console.log("ArrowRight")
            inputDirection.x = 1;
            inputDirection.y = 0;
            break;

        default:
            break;    
    }
})