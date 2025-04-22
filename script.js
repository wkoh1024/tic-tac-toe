let boardState = [...Array(3)].map(e => Array(3).fill(0));
let $playerOneName = document.querySelector("#playerOneName");
let $playerTwoName = document.querySelector("#playerTwoName");

const resetGame = () => {
    boardState = [...Array(3)].map(e => Array(3).fill(0));
}

const displayController = (function() {
    //cache DOm
    let $startButton = document.querySelector("#startButton button");
    let $startModal = document.querySelector("#startGame");
    let $submit = document.querySelector(`input[type="submit"`);
    let $main = document.querySelector("#main");
    let $gridItems = [...document.querySelector(".gameboard").children];


    const submitButtonHandler = (event) => {
        event.preventDefault();

        let $playerOneNameInput = document.querySelector("#playerOneNameInput").value;
        let $playerTwoNameInput = document.querySelector("#playerTwoNameInput").value;

        let pOneName = document.createElement("div");
        pOneName.textContent = $playerOneNameInput;
        let pTwoName = document.createElement("div");
        pTwoName.textContent = $playerTwoNameInput;

        $playerOneName.append(pOneName);
        $playerTwoName.append(pTwoName);

        $main.style.display = "block";
        $startModal.close();
        $startButton.style.display = "none";
    }

    const render = () => {
        $playerOneName.style.background = '#39FF14';
        const gridHandler = (event) => {
            let index = $gridItems.indexOf(event.target);
            if (!event.target.textContent) {
                if (Gameboard.getPlayerOneTurn()) {
                    event.target.textContent = 'X';
                    boardState[Math.floor(index / 3)][index % 3] = 1;
                    $playerTwoName.style.background = '#39FF14';
                    $playerOneName.style.background = 'none';
                }
                else {
                    event.target.textContent = 'O';
                    boardState[Math.floor(index / 3)][index % 3] = -1;
                    $playerOneName.style.background = '#39FF14';
                    $playerTwoName.style.background = 'none';
                }
            }
            Gameboard.changeTurns();
            Gameboard.checkWin();
        }
    
        for (let i = 0; i < $gridItems.length; i++) {
            $gridItems[i].addEventListener("click", gridHandler);
        }
    }
    
    // bind events
    $startButton.addEventListener("click", () => {
        $startModal.showModal();
    });
    $submit.addEventListener("click", submitButtonHandler);
    return {render};
})();

const Gameboard = (function() {
    let playerOneTurn = true;

    const changeTurns = () => playerOneTurn = !playerOneTurn;
    const getPlayerOneTurn = () => playerOneTurn;

    const checkWin = () => {
        const calcRowSum = (index) => {
            let rowSum = boardState[index].reduce((sum, num) => sum + num);
            return rowSum;
        }
    
        const calcColumnSum = (index) => {
            let columnSum = 0;
            for (let i = 0; i < boardState.length; i++) {
                columnSum += boardState[i][index];
            }
            return columnSum;
        }
    
        const diagonalVictory = () => {
            let diagonalSum = 0;
            let counterDiagonalSum = 0;
            let arraySum = [];
            for (let i = 0; i < boardState.length; i++) {
                diagonalSum += boardState[i][i];
                counterDiagonalSum += boardState[i][boardState.length - 1 - i];
            }
            arraySum.push(diagonalSum);
            arraySum.push(counterDiagonalSum);
            // logic needs to be explained
            if (arraySum.includes(3)) {
                return arraySum.indexOf(3);
            }
            else if (arraySum.includes(-3)) {
                return arraySum.indexOf(-3);
            }
        }

        const checkTie  = () => {
            let tie = true;
            for (let i = 0; i < boardState.length; i++) {
                if (boardState[i].includes(0)) {
                    tie = false;
                }
            }
            return tie;
        }

        for (let i = 0; i < boardState.length; i++) {
            if (calcRowSum(i) == 3 || calcRowSum(i) == -3) {
                console.log("row win found");
                return boardState[i][boardState.length - 1];
            }
            if (calcColumnSum(i) == 3 || calcColumnSum(i) == -3) {
                console.log("column win found");
                return boardState[boardState.length - 1][i];
            }
        }
        if (diagonalVictory() == 0) {
            console.log("diag found");
            return boardState[0][0];
        }
        else if (diagonalVictory() == 1) {
            console.log("counterdiag found");
            return boardState[0][boardState.length - 1];
        }
        if (checkTie()) {
            return 'TIE';
        }
        return "no win yet";
    };

    console.log(boardState);
    console.log(checkWin())
    return {playerOneTurn, checkWin, changeTurns, getPlayerOneTurn}
})();

const startGame = (function () {
    resetGame();
    displayController.render();
})

startGame();