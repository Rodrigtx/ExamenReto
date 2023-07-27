import React, { useState } from 'react';
import './App.css';

const INITIAL_STATE = {
  board: Array(9).fill(null),
  currentPlayer: 'X',
  winner: null,
  player1: 'Player1',
  player2: 'Player2',
  gameStarted: false, // es para desactivar el input
};

const App = () => {
  const [state, setState] = useState(INITIAL_STATE);

  const handleSquareClick = (index) => {
    if (state.board[index] || state.winner) {
      return;
    }

    const updatedBoard = [...state.board];
    updatedBoard[index] = state.currentPlayer;

    const winner = calculateWinner(updatedBoard);
    const nextPlayer = state.currentPlayer === 'X' ? 'O' : 'X';

    setState({
      ...state,
      board: updatedBoard,
      currentPlayer: nextPlayer,
      winner,
      gameStarted: true, // despues de el primer movimiento de bloquea
    });
  };

  const handleReset = () => {
    setState(INITIAL_STATE);
  };

  const handleInputChange = (event) => {
    // para desactivar el input en plena partida
    if (!state.gameStarted) {
      const { name, value } = event.target;
      setState({
        ...state,
        [name]: value,
      });
    }
  };

  const renderSquare = (index) => {
    return (
      <button className="square" onClick={() => handleSquareClick(index)}>
        {state.board[index]}
      </button>
    );
  };

  const calculateWinner = (board) => {
    const winLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winLines.length; i++) {
      const [a, b, c] = winLines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }

    return null;
  };

  const renderStatus = () => {
    if (state.winner) {
      const winnerName =
        state.winner === 'X' ? state.player1 : state.player2 || 'Empate';
      return <p>{winnerName} ha ganado!</p>;
    } else if (!state.board.includes(null)) {
      return <p>¡Es un empate!</p>;
    } else {
      return (
        <p>
          Turno de {state.currentPlayer === 'X' ? state.player1 : state.player2}
        </p>
      );
    }
  };

  return (
    <div className="App">
      <h1>TIC TAC TOE - Grupo 05</h1>
      
      {renderStatus()}
      <div className="board">
        {state.board.map((_, index) => (
          <div key={index}>{renderSquare(index)}</div>
        ))}
      </div>
      <div>
        <label>
          Player 1:
          <input
            type="text"
            name="player1"            
            value={state.player1}
            onChange={handleInputChange}
            disabled={state.gameStarted} //para desactivar el input en plena partida
          />
        </label>
        <label>
          Player 2:
          <input
            type="text"
            name="player2"
            value={state.player2}
            onChange={handleInputChange}
            disabled={state.gameStarted} // para desactivar el input en plena partida
          />
        </label>
      </div>
      <br/><button onClick={handleReset}>Jugar otra Vez</button>
    </div>
  );
};

export default App;