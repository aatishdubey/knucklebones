export function calcScores(player1Squares, player2Squares) {
  let player1Score = 0;
  let player2Score = 0;
  let player1 = [0, 0, 0];
  let player2 = [0, 0, 0];

  for (let i = 0; i < player1.length; i++) {
    const count = {};
    let total = 0;
    for (let j = 0; j < player1Squares[i].length; j++) {
      if (!count[player1Squares[i][j]]) count[player1Squares[i][j]] = 1;
      else {
        count[player1Squares[i][j]] = count[player1Squares[i][j]] + 1;
      }
    }
    Object.keys(count).forEach((key) => {
      total = total + parseInt(key) * count[key];
    });
    player1[i] = total;
  }

  player1Score = player1.reduce((partialSum, a) => partialSum + a, 0);

  for (let i = 0; i < player2.length; i++) {
    const count = {};
    let total = 0;
    for (let j = 0; j < player2Squares[i].length; j++) {
      if (!count[player2Squares[i][j]]) count[player2Squares[i][j]] = 1;
      else {
        count[player2Squares[i][j]] = count[player2Squares[i][j]] + 1;
      }
    }
    Object.keys(count).forEach((key) => {
      total = total + parseInt(key) * count[key];
    });
    player2[i] = total;
  }

  player2Score = player2.reduce((partialSum, a) => partialSum + a, 0);

  return { player1Score, player2Score };
}

export function removeItem(array, item) {
  var i = array.length;

  while (i--) {
    if (array[i] === item) {
      array.splice(array.indexOf(item), 1);
    }
  }
}
