import React, { useState, useEffect } from "react";
import Square from "./Square";

/**
 * COMPONENT
 */

const calcWinner = (board) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      if (board[a] === "X") {
        return "You are the winner!";
      } else if (board[a] === "O") {
        return "Tic-Tac-Tony has bested another opponent!";
      }
    }
  }
  return null;
};

export const Home = (props) => {
  const [board, setBoard] = useState(new Array(9).fill(null));
  const [xIsNext, setXisNext] = useState(true);
  const winner = calcWinner(board);

  useEffect(() => {
    if (!xIsNext) {
      tonysTurn();
    }
  }, [xIsNext]);

  const tonysChoice = () => {
    const boardCopy = [...board];
    let choice = 0;
    return choice;

    //     Win: If the player has two in a row, they can place a third to get three in a row.
    // Block: If the opponent has two in a row, the player must play the third themselves to block the opponent.
    // Fork: Cause a scenario where the player has two ways to win (two non-blocked lines of 2).
    // Blocking an opponent's fork: If there is only one possible fork for the opponent, the player should block it. Otherwise, the player should block all forks in any way that simultaneously allows them to make two in a row. Otherwise, the player should make a two in a row to force the opponent into defending, as long as it does not result in them producing a fork. For example, if "X" has two opposite corners and "O" has the center, "O" must not play a corner move to win. (Playing a corner move in this scenario produces a fork for "X" to win.)
    // Center: A player marks the center. (If it is the first move of the game, playing a corner move gives the second player more opportunities to make a mistake and may therefore be the better choice; however, it makes no difference between perfect players.)
    // Opposite corner: If the opponent is in the corner, the player plays the opposite corner.
    // Empty corner: The player plays in a corner square.
    // Empty side: The player plays in a middle square on any of the four sides.
  };

  const tonysTurn = () => {
    if (winner) return;
    let tonysChoice = tonysChoice();
    handleClick(tonysChoice);
  };

  const handleClick = (i) => {
    const boardCopy = [...board];
    if (winner || boardCopy[i]) return;
    boardCopy[i] = xIsNext ? "X" : "O";
    setBoard(boardCopy);
    setXisNext(!xIsNext);
  };

  const handleReset = () => {
    setXisNext(true);
    setBoard(new Array(9).fill(null));
  };

  return (
    <div>
      <div id="homepage">
        <div id="homepage-head">
          <h2 id="homepage-text">UNBEATABLE TIC-TAC-TONY</h2>
        </div>
        <div className="game--container">
          {board.map((square, i) => (
            <Square key={i} value={square} onClick={() => handleClick(i)} />
          ))}
        </div>
        <div id="homepage-footer">
          <p id="homepage-footer-text">
            {winner
              ? "Winner: " + winner
              : "Next Player: " + (xIsNext ? "X" : "O")}
          </p>
        </div>
        <div>
          <button onClick={() => handleReset()}>Reset</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
