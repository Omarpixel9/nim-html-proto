const pile_container = document.querySelector('#pieces-container');
const button_container = document.querySelector('#buttons-container');
const turnLabel = document.querySelector('#turn-label');
const piecesLabel = document.querySelector('#pieces-label');
let numberOfPieces = 15;

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

// Convention: Whoever takes the last piece loses
function game(numberOfObjectsInPile) {
    let isUserTurn = true;
    let objects = numberOfObjectsInPile;

    function takeObjectsFromPile() {
        if (isUserTurn) // let user insert input
            return prompt(`${objects} pieces remain.\nEnter how many to take: `);
        else { // let CPU take
            let taken;
            do {
                taken = Math.floor(Math.random() * 10 / 2);
            } while (taken > objects || taken > 3 || taken < 1);

            alert(`CPU Player took ${taken} pieces`);
            return taken;
        }
    }

    while (objects != 0) {
        // playerTurn = playerTurn == 1 ? 2 : 1; // change turn
        let taken = takeObjectsFromPile()
        while (taken > objects || taken > 3 || taken < 1) {
            alert("Invalid entered value. Make sure you only take 1, 2, or 3.");
            taken = takeObjectsFromPile();
        }
        objects -= taken; // decrement taken
        visualizePile(objects);

        isUserTurn = !isUserTurn;

    }
    if (isUserTurn) {
        alert('User Player wins!');
    } else {
        alert('AI wins.');
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

updatePiecesCounter(numberOfPieces);
visualizePile(numberOfPieces);
addEventListenersToButtons();
// game(numberOfPieces);