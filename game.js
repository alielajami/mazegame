//Initialized variables
let is_game_running = false; 
let score = 0;

//Declared variables
let end;
let start;
let timeLeft;
let boundaries;
let timeInterval;
let timerDisplay;
let status_display; 

document.addEventListener("DOMContentLoaded", loadPage);

function displayScore(message){
    if(message != "")
        status_display.innerHTML = message + "<br/>" + "Your Score is: " + score;
}

function gameOver(){
    if(is_game_running){
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
    timeLeft = 3;
    displayTimer(timeLeft)
    timeInterval = setInterval(updateTimer, 1000); // Update the timer every second
    for(let i = 0; i < boundaries.length; i++)
        boundaries[i].style.backgroundColor = "#eeeeee"; 
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

function endGame(){
    if(is_game_running){
        clearInterval(timeInterval); // Stop the timer
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
    end.addEventListener("mouseover", endGame);
    start.addEventListener("click", startGame);
    for(let i = 0; i < boundaries.length; i++){
        boundaries[i].addEventListener("mouseover", gameOver);
    }
}