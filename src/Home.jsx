import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Hub de Juegos</h1>
      <p>Selecciona un juego para comenzar:</p>
      <ul>
        <li><Link to="/tictactoe">Tres en Raya</Link></li>
        <li><Link to="/hangman">Ahorcado</Link></li>
        <li><Link to="/sudoku">Sudoku</Link></li>
      </ul>
    </div>
  );
}

export default Home;
