let boardState = [...Array(3)].map(e => Array(3).fill(0));
let $playerOneName = document.querySelector("#playerOneName");
let $playerTwoName = document.querySelector("#playerTwoName");
let $startModal = document.querySelector("#startGame");
let $endModal = document.querySelector("#endGame");

const restartGame = () => {
    const restartButtonHandler = () => {
        boardState = [...Array(3)].map(e => Array(3).fill(0));
        displayController.clearBoard();
        $playerOneName.style.background = '#39FF14';
        $playerTwoName.style.background = 'none';
        Gameboard.setPlayerOneTurn();
    }
    let $restart = document.querySelector("#endGame form button");
    $restart.addEventListener("click", restartButtonHandler);  
}

const displayController = (function() {
    //cache DOm
    let $startButton = document.querySelector("#startButton button")
    let $submit = document.querySelector(`input[type="submit"`);
    let $main = document.querySelector("#main");
    let $arrayGridItems = [...document.querySelector(".gameboard").children];



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
            let index = $arrayGridItems.indexOf(event.target);
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
                Gameboard.changeTurns();
            }
            let winner = Gameboard.checkWin();
            if (typeof winner == "number") {
                if (winner == 1 || winner == -1) {
                    $endModal.showModal();
                }
                let winnerText = (winner == 1) ? "Player 1" : "Player 2";
                let winningTextNode = document.querySelector("#endGame form h2");
                winningTextNode.textContent = `${winnerText} has won!`;
                let $endModalForm = document.querySelector("#endGame form");
                $endModalForm.prepend(winningTextNode);
            }
        }
    
        for (let i = 0; i < $arrayGridItems.length; i++) {
            $arrayGridItems[i].addEventListener("click", gridHandler);
        }
    }

    const clearBoard = () => {
        let $grids = document.querySelectorAll(".gameboard div");
        for (let i = 0; i < $grids.length; i++) {
            $grids[i].textContent = "";
        }
        console.log("grid cleared");
    }
    
    // bind events
    $startButton.addEventListener("click", () => {
        $startModal.showModal();
    });
    $submit.addEventListener("click", submitButtonHandler);
    return {render, clearBoard};
})();

const Gameboard = (function() {
    let playerOneTurn = true;

    const changeTurns = () => playerOneTurn = !playerOneTurn;
    const getPlayerOneTurn = () => playerOneTurn;
    const setPlayerOneTurn = () => playerOneTurn = true;

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
            return -99;
        }
    };
    return {checkWin, changeTurns, getPlayerOneTurn, setPlayerOneTurn}
})();

const startGame = (function () {
    displayController.render();
    restartGame();
})

startGame();