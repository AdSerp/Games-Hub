import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import TicTacToe from './components/TicTacToe/TicTacToe.jsx';
import Hangman from './components/Hangman/Hangman';
import Sudoku from './components/Sudoku/Sudoku';
import Home from './Home';

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link> | <Link to="/tictactoe">Tres en Raya</Link> | <Link to="/hangman">Ahorcado</Link> | <Link to="/sudoku">Sudoku</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tictactoe" element={<TicTacToe />} />
        <Route path="/hangman" element={<Hangman />} />
        <Route path="/sudoku" element={<Sudoku />} />
      </Routes>
    </Router>
  );
}

export default App;

