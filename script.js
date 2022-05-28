/*
handles DOM
*/
const rock = document.querySelector('#rock');
const paper = document.querySelector('#paper');
const scissors = document.querySelector('#scissors');
const restart = document.querySelector('#restart-btn');
const playerCurrScore = document.querySelector('#player-score');
const computerCurrScore = document.querySelector('#computer-score');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const playerSign = document.querySelector('#player-sign');
const computerSign = document.querySelector('#computer-sign');
var modalMsg = document.querySelector('.modal .modal-msg');
var announce = document.querySelector('.announcement');

/*
event listeners on buttons
*/
rock.addEventListener("click", () => click("rock"));
paper.addEventListener("click", () => click("paper"));
scissors.addEventListener("click", () => click("scissors"));
restart.addEventListener("click", restartGame);


/*
Initial game state
*/
let playerScore = 0;
let computerScore = 0;

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
        announce.textContent = "It's a tie!";
        return 0;
    }
    // Just minor formatting - capitalising the first letter of choice made
    let playerChoice = playerSelection.charAt(0).toUpperCase() + playerSelection.slice(1);
    let computerChoice = computerSelection.charAt(0).toUpperCase() + computerSelection.slice(1);

    if (playerSelection === "scissors") {
        if (computerSelection === "rock") {
            announce.textContent = "You Lose! " + computerChoice + " beats " + playerChoice;
            return 2;
        } else {
            announce.textContent = "You Win! " + playerChoice + " beats " + computerChoice;
            return 1;
        } 
    } else if (playerSelection === "paper") {
        if (computerSelection === "rock") {
            announce.textContent = "You Win! " + playerChoice + " beats " + computerChoice;
            return 1;
        } else {
            announce.textContent = "You Lose! " + computerChoice + " beats " + playerChoice;
            return 2;
        } 
    } else {
        if (computerSelection === "paper") {
            announce.textContent = "You Lose! " + computerChoice + " beats " + playerChoice;
            return 2;
        } else {
            announce.textContent = "You Win! " + playerChoice + " beats " + computerChoice;
            return 1;
        } 
    }
}


function click(playerSelection) {
    if (isGameOver()) {
        openModal();
    }
    const computerSelection = computerPlay();
    const result = playRound(playerSelection, computerSelection);
    updateScore(result);
    updateChoices(playerSelection, computerSelection);

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
    playerCurrScore.textContent = `You: ${playerScore}`;
    computerCurrScore.textContent = `Computer: ${computerScore}`;
}

/*
Update to display choice of player and computer 
*/
function updateChoices(playerSelection, computerSelection) {
    switch (playerSelection) {
        case "rock":
            playerSign.textContent = '🪨';
            break;
        case "paper":
            playerSign.textContent = '📄';
            break;
        case "scissors":
            playerSign.textContent = '✂️'
    }

    switch (computerSelection) {
        case "rock":
            computerSign.textContent = '🪨';
            break;
        case "paper":
            computerSign.textContent = '📄';
            break;
        case "scissors":
            computerSign.textContent = '✂️'
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
    ? modalMsg.textContent = "You Won!" 
    :  modalMsg.textContent = "You Lost!"
}

/*
Restarts game
*/
function restartGame() {
    playerScore = 0;
    computerScore = 0;
    announce.textContent = "~ First to 5 wins ~";
    playerCurrScore.textContent = "You: 0";
    computerCurrScore.textContent = "Computer: 0";
    playerSign.textContent = '❓';
    computerSign.textContent = '❓';
    closeModal();
}


