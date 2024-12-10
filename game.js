//Initialized variables
let is_game_running = false; 
let score = 0;
let timeInterval = null;
let coins = [];
const COIN_SCORE = 5;
let winSound = new Audio('https://www.soundjay.com/buttons/sounds/button-12.mp3');
let loseSound = new Audio('https://www.soundjay.com/buttons/sounds/button-10.mp3');
let collectSound = new Audio('https://www.soundjay.com/buttons/sounds/button-21.mp3');

//Declared variables
let end;
let start;
let timeLeft;
let boundaries;
let timerDisplay;
let status_display;
let resetButton;

document.addEventListener("DOMContentLoaded", loadPage);

function displayScore(message){
    if(message != "")
        status_display.innerHTML = message + "<br/>" + "Your Score is: " + score;
}

function gameOver(){
    if(is_game_running){
        playSound(loseSound);
        for(let i = 0; i < boundaries.length; i++)
            boundaries[i].style.backgroundColor = "rgb(243, 159, 159)"; 
        if(score > 0)
            score = score - 1;
        displayScore("Game Over!");
        is_game_running = false;
    }
}

function startGame(){
    displayScore("");
    is_game_running = true; 
    if (timeInterval) {
        clearInterval(timeInterval);
    }
    timeLeft = 5;
    displayTimer(timeLeft);
    timeInterval = setInterval(updateTimer, 1000);
    for(let i = 0; i < boundaries.length; i++)
        boundaries[i].style.backgroundColor = "#eeeeee";
    createCoins();
}

function createResetButton() {
    resetButton = document.createElement("button");
    resetButton.innerHTML = "Reset Game";
    resetButton.style.position = "absolute";
    resetButton.style.top = "10px";
    resetButton.style.right = "10px";
    resetButton.style.padding = "5px 10px";
    resetButton.style.backgroundColor = "#4CAF50";
    resetButton.style.color = "white";
    resetButton.style.border = "none";
    resetButton.style.borderRadius = "4px";
    resetButton.style.cursor = "pointer";
    
    resetButton.addEventListener("click", resetGame);
    document.body.appendChild(resetButton);
}

function resetGame() {
    score = 0;
    displayScore("Game Reset!");
    if (timeInterval) {
        clearInterval(timeInterval);
    }
    timeLeft = 5;
    displayTimer(timeLeft);
    for(let i = 0; i < boundaries.length; i++) {
        boundaries[i].style.backgroundColor = "#eeeeee";
    }
    is_game_running = false;
    createCoins();
}

function updateTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        displayTimer(timeLeft)
    } else {
        clearInterval(timeInterval);
        gameOver();
    }
}

function displayTimer(time) {
    document.getElementById("timer").innerText = `Time Left: ${time}s`;
}

function createCoins() {
    coins.forEach(coin => coin.remove());
    coins = [];

    const gameDiv = document.getElementById("game");
    
    const positions = [
        { top: "235px", left: "120px" },
        { top: "150px", left: "330px" },
        { top: "220px", left: "400px" }
    ];

    positions.forEach(pos => {
        const coin = document.createElement("div");
        coin.className = "coin";
        coin.style.position = "absolute";
        coin.style.width = "10px";
        coin.style.height = "10px";
        coin.style.backgroundColor = "gold";
        coin.style.borderRadius = "50%";
        coin.style.top = pos.top;
        coin.style.left = pos.left;
        coin.style.zIndex = "100";
        
        coin.addEventListener("mouseover", collectCoin);
        gameDiv.appendChild(coin);
        coins.push(coin);
    });
}

function collectCoin(event) {
    if (is_game_running) {
        playSound(collectSound);
        const coin = event.target;
        coin.style.display = "none";
        score += COIN_SCORE;
        displayScore("Coin collected! +" + COIN_SCORE + " points");
        playSound(collectSound);
    }
}

function playSound(sound) {
    sound.currentTime = 0; // Reset sound to start
    sound.play().catch(error => console.log("Sound play failed:", error));
}

function endGame(){
    if(is_game_running){
        playSound(winSound);
        if (timeInterval) {
            clearInterval(timeInterval);
        }
        for(let i = 0; i < boundaries.length; i++)
            boundaries[i].style.backgroundColor = "rgb(113 225 141)"; 
        score = score + 5;
        displayScore("You Won!");
        is_game_running = false;
    }
}

function loadPage(){
    end = document.getElementById("end");
    start = document.getElementById("start");
    boundaries = document.getElementsByClassName("boundary");
    status_display =  document.getElementById("status");

    timerDisplay = document.createElement("div");
    timerDisplay.id = "timer";
    timerDisplay.innerText = "Time Left: ", timeLeft, "s";
    document.body.appendChild(timerDisplay);
    createResetButton();
    end.addEventListener("mouseover", endGame);
    start.addEventListener("click", startGame);
    for(let i = 0; i < boundaries.length; i++){
        boundaries[i].addEventListener("mouseover", gameOver);
    }
    createCoins();
}