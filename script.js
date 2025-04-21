const Gameboard = (function() {
    let playerOneScore = 0;
    let playerTwoScore = 0;
    let playerOneTurn = true;

    // let boardState = [...Array(3)].map(e => Array(3).fill(0));
    let boardState = [
        [-1, 1, 1],
        [-1, 0, -1],
        [-1, -1, 1]
    ];

    //cache DOm
    let $startButton = document.querySelector("#startButton button");
    let $startModal = document.querySelector("#startGame");
    let $submit = document.querySelector(`input[type="submit"`);
    let $main = document.querySelector("#main");

    // bind events
    $startButton.addEventListener("click", () => {
        $startModal.showModal();
    })

    const submitButtonHandler = (event) => {
        event.preventDefault();
        $main.style.display = "block";
        $startModal.close();
        $startButton.style.display = "none";
    }

    $submit.addEventListener("click", submitButtonHandler);


    const getPlayerOneScore = () => playerOneScore;
    const getPlayerTwoScore = () => playerTwoScore;
    const getPlayerOneTurn = () => playerOneTurn;

    const playerOneWin = () => playerOneScore++;
    const playerTwoWin = () => playerTwoScore++;

    const changeTurn = () => playerOneTurn = !playerOneTurn;
    
    const checkWin = () => {
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
        console.log("no win yet");
    };

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

    console.log(boardState);
    console.log(checkWin());

    return {checkWin};
})();