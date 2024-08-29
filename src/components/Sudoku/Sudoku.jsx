import React, { useState, useEffect } from 'react';
import sudoku from 'sudoku';

const Sudoku = () => {
  const [sudokuBoard, setSudokuBoard] = useState([]);
  const [solution, setSolution] = useState([]);
  const [isComplete, setIsComplete] = useState(false);
  const [message, setMessage] = useState('');

  // Generar un nuevo tablero de Sudoku al cargar el componente
  useEffect(() => {
    initializeBoard();
  }, []);

  // Inicializar el tablero de Sudoku
  const initializeBoard = () => {
    const newBoard = sudoku.makepuzzle();
    setSudokuBoard(newBoard);
    setSolution(sudoku.solvepuzzle(newBoard));
    setIsComplete(false);
    setMessage('');
  };

  // Manejar cambios en el input de las celdas del Sudoku
  const handleInputChange = (index, value) => {
    // Solo permitir números del 1 al 9
    if (!/^[1-9]?$/.test(value)) return;

    // Crear una copia del tablero actual
    const updatedBoard = [...sudokuBoard];

    // Actualizar el valor de la celda seleccionada
    updatedBoard[index] = value === '' ? null : parseInt(value);

    // Actualizar el estado con el nuevo tablero
    setSudokuBoard(updatedBoard);
    setIsComplete(updatedBoard.every(cell => cell !== null)); // Verificar si el tablero está completo
  };

  // Comprobar si la solución es correcta
  const checkSolution = () => {
    if (JSON.stringify(sudokuBoard) === JSON.stringify(solution)) {
      setMessage('¡Felicidades! Has resuelto el Sudoku.');
    } else {
      setMessage('La solución no es correcta. Inténtalo de nuevo.');
    }
  };

  // Mostrar la solución del Sudoku
  const solveSudoku = () => {
    setSudokuBoard(solution);
  };

  // Reiniciar el tablero
  const resetBoard = () => {
    initializeBoard();
  };

  return (
    <div>
      <h2>Sudoku</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(9, 40px)', gap: '5px' }}>
        {sudokuBoard.map((cell, index) => (
          <input
            key={index}
            type="text"
            value={cell === null ? '' : cell}  // Mostrar un valor vacío si la celda es null
            onChange={(e) => handleInputChange(index, e.target.value)}
            maxLength={1}  // Limitar la entrada a un solo carácter
            style={{
              width: '40px',
              height: '40px',
              textAlign: 'center',
              fontSize: '20px',
              border: '1px solid #ccc',
            }}
            disabled={sudokuBoard[index] !== null}  // Deshabilitar la edición si la celda ya tiene un valor
          />
        ))}
      </div>
      <div style={{ marginTop: '10px' }}>
        <button onClick={solveSudoku}>Mostrar Solución</button>
        <button
          onClick={checkSolution}
          disabled={!isComplete}  // Habilitar solo si el tablero está completo
        >
          Comprobar Solución
        </button>
        <button onClick={resetBoard}>Reiniciar Tablero</button>
      </div>
      {message && <p>{message}</p>}
      {message && <button onClick={initializeBoard}>Empezar Nueva Partida</button>}
    </div>
  );
};

export default Sudoku;
