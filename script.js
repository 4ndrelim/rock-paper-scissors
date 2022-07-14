/*
emojis
*/
const ROCK_SIGN = '👊';
const PAPER_SIGN = '✋';
const SCISSORS_SIGN ='✌️';
const DIFFICULTY = 0.28; // 28% of the time, the computer will win! Only applied in Hard mode
const NORMAL = "normal";
const HARD = "hard";

/*
Initial game state
*/
let playerScore = 0;
let computerScore = 0;
let currMode = "normal";

/*
handles DOM
*/
const rock = document.querySelector('#rock');
const paper = document.querySelector('#paper');
const scissors = document.querySelector('#scissors');
const restart = document.querySelectorAll('.restart-btn');
const playerCurrScore = document.querySelector('#player-score');
const computerCurrScore = document.querySelector('#computer-score');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const playerSign = document.querySelector('#player-sign');
const computerSign = document.querySelector('#computer-sign');
const toggleLevel = document.querySelector('.toggle-level')
var modalMsg = document.querySelector('.modal .modal-msg');
var announceHeader = document.querySelector('.announcement .rules');
var announce = document.querySelector('.announcement .condition');

/*
event listeners on buttons
*/
rock.addEventListener("click", () => click("rock"));
paper.addEventListener("click", () => click("paper"));
scissors.addEventListener("click", () => click("scissors"));
toggleLevel.addEventListener("click", changeMode);
restart.forEach(e => e.addEventListener("click", restartGame));

/*
handles audio
NOTE: chrome disables autoplay see here:
https://developer.chrome.com/blog/autoplay/
*/
const audioQuery = document.querySelector('#bgm');
window.addEventListener("DOMContentLoaded", event => {
    audioQuery.volume = 0.5;
    audioQuery.play();
});
document.querySelector('.buttons').addEventListener('click', function() {
    if (!audioQuery.play()) {
        audioQuery.play();
    }
});

/*
Sound effects
*/
var beatEffect = new Audio("./audio/success.mp3");
var lossEffect = new Audio("./audio/failure.mp3");

/*
Function to play beat effect whenever user wins a round
*/
function beatSound() {
    if (lossEffect.play()) {
        lossEffect.pause();
    }
    beatEffect.load();
    beatEffect.volume = 0.85;
    beatEffect.play();
}

/*
Function to play beat effect whenever user wins a round
*/
function lossSound() {
    if (beatEffect.play()) {
        beatEffect.pause();
    }
    lossEffect.load();
    lossEffect.volume = 0.85;
    lossEffect.play();
}



/*
Change the current gameplay mode and reload. Only 2 modes as of now.
*/
function changeMode() {
    if (currMode === NORMAL) {
        console.log("Switching to Hard");
        currMode = HARD;
        toggleLevel.textContent = `go ${NORMAL}`;
    } else {
        console.log("Switching to Normal");
        currMode = NORMAL;
        toggleLevel.textContent = `go ${HARD}`;
    }
    restartGame();
}

/*
Generate a winning move by the computer
*/
function computerWin(playerInput) {
    if (playerInput == null) {
        return "ERROR";
    }
    switch (playerInput) {
        case "rock":
            return "paper";
        case "paper":
            return "scissors";
        case "scissors":
            return "rock";
    }
}

/*
Generate a random move by the computer
*/
function computerPlay() {
    let num  = Math.random();
    if (num < 1/3) {
        return "scissors";
    } else if (num < 2/3) {
        return "paper";
    } else {
        return "rock";
    }
}

/*
Computer makes a choice depending on current mode
*/
function computerDecision(playerInput) {
    if (currMode === HARD) {
        let chance = Math.random();
        if (chance < DIFFICULTY) {
            return computerWin(playerInput);
        }
    }
    return computerPlay();
}

/*
Determines the outcome after 1 round & displays it
0 -- draw
1 -- player won
2 -- computer won
*/
function playRound(playerSelection, computerSelection) {
    if (!playerSelection) {
        announce.textContent = "Input must be given";
        return null;
    } 

    var playerSelection = playerSelection.toLowerCase();

    if (playerSelection === computerSelection) {
        announce.textContent = "it's a tie!";
        return 0;
    }
    /*
    // Just minor formatting - capitalising the first letter of choice made
    let playerChoice = playerSelection.charAt(0).toUpperCase() + playerSelection.slice(1);
    let computerChoice = computerSelection.charAt(0).toUpperCase() + computerSelection.slice(1);
    */
    playerChoice = playerSelection;
    computerChoice = computerSelection;

    if (playerSelection === "scissors") {
        if (computerSelection === "rock") {
            lossSound();
            announce.textContent = "you lose! " + computerChoice + " beats " + playerChoice;
            return 2;
        } else {
            beatSound();
            announce.textContent = "you win! " + playerChoice + " beats " + computerChoice;
            return 1;
        } 
    } else if (playerSelection === "paper") {
        if (computerSelection === "rock") {
            beatSound();
            announce.textContent = "you win! " + playerChoice + " beats " + computerChoice;
            return 1;
        } else {
            lossSound();
            announce.textContent = "you lose! " + computerChoice + " beats " + playerChoice;
            return 2;
        } 
    } else {
        if (computerSelection === "paper") {
            lossSound();
            announce.textContent = "you lose! " + computerChoice + " beats " + playerChoice;
            return 2;
        } else {
            beatSound();
            announce.textContent = "you win! " + playerChoice + " beats " + computerChoice;
            return 1;
        } 
    }
}


function click(playerSelection) {
    if (isGameOver()) {
        openModal();
    }
    announceHeader.textContent = "OUTCOME:";
    const computerSelection = computerDecision(playerSelection);
    const result = playRound(playerSelection, computerSelection);
    updateScore(result);
    updateDisplay(playerSelection, computerSelection);

    if (isGameOver()) {
        openModal();
        setModalMsg();
    }
}

/*
Updates playerScore and computerScore and correctly displays latest results 
0 -- draw
1 -- player won
2 -- computer won
Function is called in the function click
*/
function updateScore(result) {
    if (result === 1) {
        playerScore++;
    } else if (result === 2) {
        computerScore++;
    }
    playerCurrScore.textContent = `YOU: ${playerScore}`;
    computerCurrScore.textContent = `COMPUTER: ${computerScore}`;
}

/*
Update to display choice of player and computer 
*/
function updateDisplay(playerSelection, computerSelection) {
    switch (playerSelection) {
        case "rock":
            playerSign.textContent = ROCK_SIGN;
            break;
        case "paper":
            playerSign.textContent = PAPER_SIGN;
            break;
        case "scissors":
            playerSign.textContent = SCISSORS_SIGN;
    }

    switch (computerSelection) {
        case "rock":
            computerSign.textContent = ROCK_SIGN;
            break;
        case "paper":
            computerSign.textContent = PAPER_SIGN;
            break;
        case "scissors":
            computerSign.textContent = SCISSORS_SIGN;
    }
}

/*
Function checks if there exist a winner
*/
function isGameOver() {
    return playerScore === 5 || computerScore === 5;
}

/*
Show pop-up message after game ends
*/
function openModal() {
    modal.classList.add('active');
    overlay.classList.add('active');
}

/*
Close pop-up message when game restarts
*/
function closeModal() {
    modal.classList.remove('active');
    overlay.classList.remove('active');
}

/*
Sets message in modal
*/
function setModalMsg() {
    return playerScore > computerScore 
    ? modalMsg.textContent = "you WON!" 
    :  modalMsg.textContent = "you LOST!"
}

/*
Reset scores.
*/
function restartGame() {
    playerScore = 0;
    computerScore = 0;
    announceHeader.textContent = "RULES";
    announce.textContent = "~ first to 5 wins ~";
    playerCurrScore.textContent = "YOU: 0";
    computerCurrScore.textContent = "COMPUTER: 0";
    playerSign.textContent = '❓';
    computerSign.textContent = '❓';
    closeModal();
}


