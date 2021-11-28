const pile_container = document.querySelector('#pieces-container');
const button_container = document.querySelector('#buttons-container');
const turnLabel = document.querySelector('#turn-label');
const piecesLabel = document.querySelector('#pieces-label');
let numberOfPieces = 15;
let firstTurn = 'user'; // "user" vs "AI"

function playCPURound() {
    turnLabel.textContent = 'Please wait, it is AI\'s turn!'
    setTimeout(function () {
        let taken;
        do {
            taken = Math.floor(Math.random() * 10 / 2);
        } while (taken > numberOfPieces || taken > 3 || taken < 1);
        turnLabel.textContent = `AI takes ${taken} pieces.`;
        numberOfPieces -= taken;
        visualizePile(numberOfPieces);
        updatePiecesCounter(numberOfPieces);
        if (numberOfPieces !== 0) {
            setTimeout(function () {
                switchTurn('user');
            }, 1000);
        } else {
            endGame('Player');
        }
    }, 500);


}

function switchTurn(turn) {
    const turnLabel = document.querySelector('#turn-label');
    const buttons = Array.from(button_container.getElementsByTagName('button'));
    if (turn == 'user') {
        turnLabel.textContent = 'Your Turn: '
        buttons.forEach(button => button.disabled = false);

        if (numberOfPieces < 3) {
            document.querySelector('#b3').disabled = true;
            switch (numberOfPieces) {
                case 2:
                    document.querySelector('#b3').disabled = true;
                    break;
                case 1:
                    document.querySelector('#b3').disabled = true;
                    document.querySelector('#b2').disabled = true;
                    break;
                case 0:
                    document.querySelector('#b3').disabled = true;
                    document.querySelector('#b2').disabled = true;
                    document.querySelector('#b1').disabled = true;
                default:
                    break;
            }
        }
    } else {
        turnLabel.textContent = 'Please wait, it is AI\'s turn!'
        buttons.forEach(button => button.disabled = true);
    }
}

function clearPile() {
    const divs = Array.from(pile_container.getElementsByClassName('piece'));
    divs.forEach(div => pile_container.removeChild(div));

}

// Used to graphically show the number of pieces in the pile
function visualizePile(numOfPieces) {
    clearPile(); // clear pile before adding
    for (let i = 0; i < numOfPieces; i++) {
        const newDiv = document.createElement('div');
        newDiv.className = 'piece';
        pile_container.appendChild(newDiv);
    }
}

function enterNumOfPiecesInPile() {
    return prompt('Welcome to Nim Game. Please input number of pieces to start with.');
}

function disableAllButtons() {
    const buttons = Array.from(button_container.getElementsByTagName('button'));
    buttons.forEach(button => button.disabled = true);
}

function updatePiecesCounter(pieces) {
    piecesLabel.textContent = `${pieces} Pieces Remain`;
}

function endGame(winner) {
    disableAllButtons();
    if (winner === 'Player') {
        turnLabel.textContent = 'Human Player Wins!';
    } else {
        turnLabel.textContent = 'AI Player Wins!\nYou lose.';
    }
}

function addEventListenersToButtons() {
    const buttons = Array.from(button_container.getElementsByTagName('button'));

    buttons.forEach(function (button) {
        button.addEventListener('click', function () {
            let piecesToTake = parseInt(button.textContent);
            numberOfPieces -= piecesToTake;
            visualizePile(numberOfPieces);
            updatePiecesCounter(numberOfPieces);
            if (numberOfPieces !== 0) {
                switchTurn('cpu');
                playCPURound();
            } else {
                endGame('AI')
            }
        });
    });
}

function mainMenu() {
    pile_container.style.display = 'none';
    piecesLabel.style.display = 'none';
    turnLabel.style.display = 'none';
    buttons = Array.from(document.querySelectorAll('#buttons-container'));
    buttons.forEach(button => button.style.display = 'none');
}

function startGame() {
    // Show game related elements
    pile_container.style.display = 'flex';
    piecesLabel.style.display = 'inline';
    turnLabel.style.display = 'inline';
    buttons = Array.from(document.querySelectorAll('#buttons-container'));
    buttons.forEach(button => button.style.display = 'block');

    // Hide main menu elements
    (document.querySelector('#main-menu')).style.display = 'none';

    updatePiecesCounter(numberOfPieces);
    visualizePile(numberOfPieces);
    addEventListenersToButtons();

    switchTurn(firstTurn);
    if (firstTurn !== 'user') playCPURound();
}
// Prompt user whether to start the game or the AI to start
function promptUserBeginning() {
    
}

mainMenu();

player1_button = document.querySelector('#player1');
player1_button.addEventListener('click', function () {
    player1_button.classList.add('clicked');
    AI_button.classList.remove('clicked');
    firstTurn = 'user';
    console.log(firstTurn);
    start_button.disabled = false;
    switchTurn(firstTurn);
});

AI_button = document.querySelector('#AI');
AI_button.addEventListener('click', function () {
    AI_button.classList.add('clicked');
    player1_button.classList.remove('clicked');
    firstTurn = 'AI';
    console.log(firstTurn);
    start_button.disabled = false;
});

start_button = document.querySelector('#startGame');
start_button.addEventListener('click', startGame);
start_button.disabled = true;
// game(numberOfPieces);