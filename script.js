const Gameboard = (function() {
    let playerOneScore = 0;
    let playerTwoScore = 0;
    let playerOneTurn = true;

    // let boardState = [...Array(3)].map(e => Array(3).fill(0));
    let boardState = [
        [-1, -1, -1],
        [-1, 1, 0],
        [0, -1, 1]
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
                if (calculateRowSum(i) == 3 || calculateRowSum(i) == -3) {
                    return boardState[i][boardState.length - 1];
                }
            }
        }
        console.log("no win");
    };

    function calculateRowSum (index) {
        let rowSum = boardState[index].reduce((sum, num) => sum + num);
        return rowSum;
    }

    console.log(boardState);
    console.log(checkWin());
})();