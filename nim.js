const pile_container = document.querySelector('#pieces-container');
const button_container = document.querySelector('#buttons-container');
const turnLabel = document.querySelector('#turn-label');
const piecesLabel = document.querySelector('#pieces-label');
let numberOfPieces = 5;
let firstTurn = 'user'; // "user" vs "AI"
let tree = new TreeModel();

function constructTree(firstTurn, numOfPieces) {
    // Constructing a tree
    // Create root node and first children
    let idCounter = 0;
    let initialTime = (new Date()).getTime() / 1000;
    console.log((new Date()).getTime() / 1000 - initialTime);
    
    
    // Traverse tree for each node and create its children    
    let root = tree.parse({value: numOfPieces, cost:0, level: 0, id: ++idCounter, children:[{value: numOfPieces-3, cost:0, level: 0, id: ++idCounter}, {value: numOfPieces-2, cost:0, level: 0, id: ++idCounter}, {value: numOfPieces-1, cost: 0, level: 0, id: ++idCounter}]});
    
    for (let i = 2; i <= idCounter; i++) {
        let node = root.first(node => node.model.id === i);
        if (node.model.value - 3 >= 0) {
                let child = tree.parse({value: node.model.value - 3, cost:0, level: 0, id: ++idCounter});
                node.addChild(child);
            }
            if (node.model.value - 2 >= 0) {
                let child = tree.parse({value: node.model.value - 2, cost:0, level: 0, id: ++idCounter});
                node.addChild(child);
            }
            if (node.model.value - 1 >= 0) {
                let child = tree.parse({value: node.model.value - 1, cost:0, level: 0, id: ++idCounter});
                node.addChild(child);
            }
    }
    
    // Put the entire tree into an array
    let treeArray = [];
    for (let i = 1; i <= idCounter; i++) {
        let node = root.first(node => node.model.id === i);
        treeArray.push(node);
    }
    // console.log(treeArray);
    console.log((new Date()).getTime() / 1000 - initialTime);

    // Set the level for each node (root node is level 1)
    let lvl = 1;
    let temp = 0;
    for (let i = 1; i <= idCounter; i++) {
        let node = treeArray[i - 1];
        // console.log(node.model.id);

        if( node == root ){
            node.model.level = lvl;
            lvl = lvl +1;
            temp = node.model.value;
        }else{
            if( node.model.value == temp-1 ){
                node.model.level = lvl;
                lvl = lvl+1
                temp = node.model.value;
            }else{
                node.model.level = lvl;
            }
        }
        
    }

    console.log((new Date()).getTime() / 1000 - initialTime);

    // Calculate the cost based on the turn
    lvl = lvl - 1;
    while( lvl >= 1 ){
        for (let i = 1; i <= idCounter; i++) {
        let node = treeArray[i - 1];
        let hasChildren = typeof node.model.children !== "undefined";

        if( node.model.level == lvl ){
            if (hasChildren) {
                let childrenOfRoot = node.model.children;
                let sumOfChildren = 0;
                for( let i = 0; i < childrenOfRoot.length; i++ ){
                    sumOfChildren += childrenOfRoot[i].cost;
                }
                node.model.cost = sumOfChildren/childrenOfRoot.length;
            } else {
                if( node.model.value == 0 ){
                if( node.model.level%2 == 0 ){
                    if (firstTurn === 'user') node.model.cost = 1;
                    else node.model.cost = 0;
                }else{
                    if (firstTurn === 'user') node.model.cost = 0;
                    else node.model.cost = 1;
                }
            }else if( node.model.value == 1 ){
                if( node.model.level%2 == 0 ){
                    if (firstTurn === 'user') node.model.cost = 0;
                    else node.model.cost = 1;
                }else{
                    if (firstTurn === 'user') node.model.cost = 1;
                    else node.model.cost = 0;
                }
            }
            }
            
            
        }
    }
    lvl = lvl - 1;
}

console.log((new Date()).getTime() / 1000 - initialTime);
console.log(root.model);

}

// Search Tree Function Skeleton
function getPiecesToTake(numOfPieces) {
    let numOfPiecesToTake = -1;
    return numOfPiecesToTake;
}

function playCPURound() {
    turnLabel.textContent = 'Please wait, it is AI\'s turn!'
    setTimeout(function () {
        let taken;
        do {
            taken = Math.floor(Math.random() * 10 / 2); // SEARCH TECHNIQUE FUNC HERE
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

// constructTree(firstTurn, numberOfPieces);
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