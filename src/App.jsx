import { useState, useEffect } from "react";
import "./App.css";
import { calcScores, removeItem } from "./scripts/main";

function App() {
  const [Player1Squares, setPlayer1Squares] = useState([[], [], []]);
  const [Player2Squares, setPlayer2Squares] = useState([[], [], []]);

  const [Player1Score, setPlayer1Score] = useState(0);
  const [Player2Score, setPlayer2Score] = useState(0);

  const [DiceRoll, setDiceRoll] = useState(0);

  const [CurrentPlayer, setCurrentPlayer] = useState(1);

  const [Winner, setWinner] = useState("");

  useEffect(() => {
    const { player1Score, player2Score } = calcScores(
      Player1Squares,
      Player2Squares
    );
    setPlayer1Score(player1Score);
    setPlayer2Score(player2Score);

    let player1SquaresFilled =
      Player1Squares[0].length +
      Player1Squares[1].length +
      Player1Squares[2].length;
    let player2SquaresFilled =
      Player2Squares[0].length +
      Player2Squares[1].length +
      Player2Squares[2].length;

    if (player1SquaresFilled === 9 || player2SquaresFilled === 9) {
      if (Player1Score > Player2Score) setWinner("Player 1");
      else setWinner("Player 2");
    }
  }, [Player1Squares, Player2Squares]);

  useEffect(() => {
    if (Winner && Winner.length > 0) {
      alert(
        `${Winner} wins with ${
          Winner === "Player 1" ? Player1Score : Player2Score
        } points!`
      );
      window.location.reload();
    }
  }, [Winner]);

  const roll = () => {
    const diceValue = Math.floor(Math.random() * 6) + 1;
    setDiceRoll(diceValue);
  };

  const placeDice = (player, col) => {
    let attackerSquares;
    let receiverSquares;
    if (player === "Player 1") {
      attackerSquares = Player1Squares;
      receiverSquares = Player2Squares;
    } else {
      attackerSquares = Player2Squares;
      receiverSquares = Player1Squares;
    }
    if (attackerSquares[col].length === 3) {
      alert("You can't add any more numbers there.");
    } else {
      const p1s = [...attackerSquares];
      const p2s = [...receiverSquares];
      p1s[col].push(DiceRoll);
      const replacement = [...p2s[col]];
      removeItem(replacement, DiceRoll);
      p2s[col] = replacement;

      if (player === "Player 1") {
        setPlayer1Squares(p1s);
        setPlayer2Squares(p2s);
      } else {
        setPlayer1Squares(p2s);
        setPlayer2Squares(p1s);
      }
    }
  };

  return (
    <div className="App">
      <div className="game">
        <div className="dice-roll-section">
          <h2>Player {CurrentPlayer}'s Turn</h2>
          <h2>{DiceRoll > 0 ? DiceRoll : ""}</h2>
          <button className="roll-btn" onClick={roll}>
            Roll
          </button>
        </div>
        <div>
          <div className="player-section">
            <div className="player-score">
              <h4>Player 1 (Score: {Player1Score})</h4>
            </div>
            <div className="player-squares">
              <div
                className="col-1"
                onClick={() => {
                  if (CurrentPlayer !== 1 || DiceRoll === 0) return;
                  placeDice("Player 1", 0);
                  setCurrentPlayer(2);
                  setDiceRoll(0);
                }}
              >
                <div className="score-box">{Player1Squares[0][2]}</div>
                <div className="score-box">{Player1Squares[0][1]}</div>
                <div className="score-box">{Player1Squares[0][0]}</div>
              </div>
              <div
                className="col-2"
                onClick={() => {
                  if (CurrentPlayer !== 1 || DiceRoll === 0) return;
                  placeDice("Player 1", 1);
                  setCurrentPlayer(2);
                  setDiceRoll(0);
                }}
              >
                <div className="score-box">{Player1Squares[1][2]}</div>
                <div className="score-box">{Player1Squares[1][1]}</div>
                <div className="score-box">{Player1Squares[1][0]}</div>
              </div>
              <div
                className="col-3"
                onClick={() => {
                  if (CurrentPlayer !== 1 || DiceRoll === 0) return;
                  placeDice("Player 1", 2);
                  setCurrentPlayer(2);
                  setDiceRoll(0);
                }}
              >
                <div className="score-box">{Player1Squares[2][2]}</div>
                <div className="score-box">{Player1Squares[2][1]}</div>
                <div className="score-box">{Player1Squares[2][0]}</div>
              </div>
            </div>
          </div>
          <div className="player-section">
            <div className="player-score">
              <h4>Player 2 (Score: {Player2Score})</h4>
            </div>
            <div className="player-squares">
              <div
                className="col-1"
                onClick={() => {
                  if (CurrentPlayer !== 2 || DiceRoll === 0) return;
                  placeDice("Player 2", 0);
                  setCurrentPlayer(1);
                  setDiceRoll(0);
                }}
              >
                <div className="score-box">{Player2Squares[0][0]}</div>
                <div className="score-box">{Player2Squares[0][1]}</div>
                <div className="score-box">{Player2Squares[0][2]}</div>
              </div>
              <div
                className="col-2"
                onClick={() => {
                  if (CurrentPlayer !== 2 || DiceRoll === 0) return;
                  placeDice("Player 2", 1);
                  setCurrentPlayer(1);
                  setDiceRoll(0);
                }}
              >
                <div className="score-box">{Player2Squares[1][0]}</div>
                <div className="score-box">{Player2Squares[1][1]}</div>
                <div className="score-box">{Player2Squares[1][2]}</div>
              </div>
              <div
                className="col-3"
                onClick={() => {
                  if (CurrentPlayer !== 2 || DiceRoll === 0) return;
                  placeDice("Player 2", 2);
                  setCurrentPlayer(1);
                  setDiceRoll(0);
                }}
              >
                <div className="score-box">{Player2Squares[2][0]}</div>
                <div className="score-box">{Player2Squares[2][1]}</div>
                <div className="score-box">{Player2Squares[2][2]}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="rules">
          <h2>Rules</h2>
          <ul>
            <li>
              Click "Roll" to roll the dice. The dice roll can give any number
              between 1 to 6.
            </li>
            <li>
              On each player's turn, click on a column on your squares to place
              the number in. The number is added to the first row of the column.{" "}
            </li>
            <li>
              The game ends if either one of the player's fills up all their
              boxes.
            </li>
            <li>
              Scores are calculated for each column. If there are multiple
              occurances of a number in the one column, the number is squared or
              cubed based on number of occurances (2 or 3)
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
