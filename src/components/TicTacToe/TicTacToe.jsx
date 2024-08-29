import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TicTacToe = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [board, setBoard] = useState([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]);
  const [winner, setWinner] = useState(null);  // Nuevo estado para el ganador

  useEffect(() => {
    // Verifica si hay un ganador después de cada movimiento
    const checkWinner = () => {
      const winPatterns = [
        // Filas
        [board[0][0], board[0][1], board[0][2]],
        [board[1][0], board[1][1], board[1][2]],
        [board[2][0], board[2][1], board[2][2]],
        // Columnas
        [board[0][0], board[1][0], board[2][0]],
        [board[0][1], board[1][1], board[2][1]],
        [board[0][2], board[1][2], board[2][2]],
        // Diagonales
        [board[0][0], board[1][1], board[2][2]],
        [board[2][0], board[1][1], board[0][2]],
      ];

      for (const pattern of winPatterns) {
        if (pattern.every(cell => cell === 'X')) {
          setWinner('X');
          return;
        }
        if (pattern.every(cell => cell === 'O')) {
          setWinner('O');
          return;
        }
      }

      // Verifica empate
      if (board.flat().every(cell => cell !== null)) {
        setWinner('Draw');
      }
    };

    checkWinner();
  }, [board]);

  const handleClick = (row, col) => {
    if (winner || board[row][col]) return; // No hacer nada si el juego terminó o la celda ya está ocupada

    const newBoard = board.map((r, rowIndex) => 
      r.map((cell, colIndex) => (rowIndex === row && colIndex === col ? currentPlayer : cell))
    );

    setBoard(newBoard);
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  };

  const resetGame = () => {
    setIsStarted(false);
    setCurrentPlayer('X');
    setBoard([
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ]);
    setWinner(null);
  };

  return (
    <div>
      <h2>Tic-Tac-Toe</h2>
      {!isStarted ? (
        <button onClick={() => setIsStarted(true)}>Comenzar partida</button>
      ) : (
        <div>
          {winner && <h3>{winner === 'Draw' ? '¡Empate!' : `¡El jugador ${winner} ha ganado!`}</h3>}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 100px)', gap: '5px' }}>
            {board.map((row, rowIndex) => (
              row.map((cell, colIndex) => (
                <button
                  key={`${rowIndex}-${colIndex}`}
                  style={{ width: '100px', height: '100px', fontSize: '2rem' }}
                  onClick={() => handleClick(rowIndex, colIndex)}
                >
                  {cell}
                </button>
              ))
            ))}
          </div>
          <button onClick={resetGame}>Reiniciar juego</button>
        </div>
      )}
    </div>
  );
};

export default TicTacToe;
