const Gameboard = (function() {
    let playerOneScore = 0;
    let playerTwoScore = 0;
    let playerOneTurn = true;

    // let boardState = [...Array(3)].map(e => Array(3).fill(0));
    let boardState = [
        [-1, 1, -1],
        [-1, 1, 0],
        [-1, -1, 1]
      ]

    function playerOneWin() {
        playerOneScore++;
    };

    function playerTwoWin() {
        playerTwoScore++;
    }

    function changeTurn () {
        playerOneTurn = !playerOneTurn;
    }

    function checkWin() {
        for (let i = 0; i < boardState.length; i++) {
            if (boardState[i]) {
                if (calcRowSum(i) == 3 || calcRowSum(i) == -3) {
                    console.log("row win found");
                    return boardState[i][boardState.length - 1];
                }
                if (calcColumnSum(i) == 3 || calcColumnSum(i) == -3) {
                    console.log("column win found");
                    return boardState[boardState.length - 1][i];
                }
            }
        }
        console.log("no win");
    };

    function calcRowSum (index) {
        let rowSum = boardState[index].reduce((sum, num) => sum + num);
        return rowSum;
    }

    function calcColumnSum (index) {
        let columnSum = 0;
        for (let i = 0; i < boardState.length; i++) {
            columnSum += boardState[i][0];
        }
        return columnSum;
    }

    console.log(boardState);
    console.log(checkWin());
})();