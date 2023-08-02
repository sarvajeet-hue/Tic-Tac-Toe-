const gameInfo = document.querySelector(".game-info");
const boxes = document.querySelectorAll('.box');
const newGameButton = document.querySelector('.btn');


let currentPlayer;
let gameGrid;
const winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
initGame();

function initGame() {
    currentPlayer = 'X';
    gameGrid = ["", "", "", "", "", "", "", "", ""];
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        boxes[index].classList.remove('win');
    })
    newGameButton.classList.remove('active');
    

}

function swapPlayer() {
    if (currentPlayer === 'X') {
        currentPlayer = 'O';

    }
    else {
        currentPlayer = 'X';

    }
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}


function handleClick(index) {
    if (gameGrid[index] === "") {
        boxes[index].innerText = currentPlayer;

        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none"
        swapPlayer();
        checkGameOver();

    }
}

boxes.forEach((box, index) => {
    box.addEventListener('click', () => {
        handleClick(index);
    })
})


function checkGameOver() {
    let answer = "";
    winningPositions.forEach((positions) => {
        if ((gameGrid[positions[0]] !== "" && gameGrid[positions[1]] !== "" && gameGrid[positions[1]] !== "") && (gameGrid[positions[0]] === gameGrid[positions[1]]) && (gameGrid[positions[1]] === gameGrid[positions[2]])) {
            if(gameGrid[positions[0]] === 'X'){
                answer = 'X'; 
            }
            else{
                answer = 'O';
            }
            
            boxes.forEach((box) =>{
                box.style.pointerEvents ='none';
            })
            boxes[positions[0]].classList.add('win');
            boxes[positions[1]].classList.add('win');
            boxes[positions[2]].classList.add('win');
        }
    })
    if(answer !== ""){
        gameInfo.innerText = `Winner - ${answer}`;
        newGameButton.classList.add("active");
        return;

    }
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box !== ""){
            fillCount++;
        }
        
    });
    if(fillCount === 9)
    {
        gameInfo.innerText = "Game Tied";
        newGameButton.classList.add('active');
    }

}

newGameButton.addEventListener('click', initGame);
 
