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
Determines the outcome after 1 round
1 -- draw
2 -- player won
3 -- computer won
null -- invalid input
*/
function playRound(playerSelection, computerSelection) {
    var playerSelection = playerSelection.toLowerCase();
    
    if (!playerSelection) {
        console.log("Input must be given");
        return null;
    } 

    if (playerSelection === computerSelection) {
        console.log("It's a tie!");
        return 1;
    }

    let playerChoice = playerSelection.charAt(0).toUpperCase() + playerSelection.slice(1);
    let computerChoice = computerSelection.charAt(0).toUpperCase() + computerSelection.slice(1);

    if (playerSelection === "scissors") {
        if (computerSelection === "rock") {
            console.log("You Lose! " + computerChoice + " beats " + playerChoice);
            return 3;
        } else {
            console.log("You Win! " + playerChoice + " beats " + computerChoice);
            return 2;
        } 
    } else if (playerSelection === "paper") {
        if (computerSelection === "rock") {
            console.log("You Win! " + playerChoice + " beats " + computerChoice);
            return 2;
        } else {
            console.log("You Lose! " + computerChoice + " beats " + playerChoice);
            return 3;
        } 
    } else if (playerSelection === "rock") {
        if (computerSelection === "paper") {
            console.log("You Lose! " + computerChoice + " beats " + playerChoice);
            return 3;
        } else {
            console.log("You Win! " + playerChoice + " beats " + computerChoice);
            return 2;
        } 
    } else {
        console.log("Input given must be valid -- Select one of rock, paper, or scissors");
        return null;
    }
}

/*
Returns in string, the outcome of the game - win, draw or lsoe
Function ensures 5 valid rounds are played, repeating prompt if invalid/no input given
*/
function game() {
    let playerScore = 0;
    let computerScore = 0;
    for  (let i = 0; i < 5; i++) {
        let outcome = null;
        while (!outcome) {
            let playerSelect = prompt("Your Choice?");
            outcome = playRound(playerSelect, computerPlay());
        }
        if (outcome == 2) {
            playerScore++;
        } else if (outcome == 3) {
            computerScore++;
        }
        /*
        why bother playing?
        if (computerScore >= 3 || playerScore >= 3) {
            break;
        }
        */
    }
    if (computerScore > playerScore) {
        return "You Lost!";
    } else if (playerScore > computerScore) {
        return "You Won!";
    } else {
        return "It's a draw!";
    }
}

console.log(game());

