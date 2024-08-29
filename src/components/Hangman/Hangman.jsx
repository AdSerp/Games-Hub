import React, { useState } from 'react';

const words = ['COCHE', 'CASA', 'PERRO', 'GATO', 'ARBOL']; // Palabras de ejemplo

const hangmanStages = [
  `
     
     
     
     
     
  ========
  `,
  `
     
     |
     |
     |
     |
  ========
  `,
  `
     +---+
     |   |
         |
         |
         |
  ========
  `,
  `
     +---+
     |   |
     O   |
         |
         |
  ========
  `,
  `
     +---+
     |   |
     O   |
     |   |
         |
  ========
  `,
  `
     +---+
     |   |
     O   |
    /|   |
         |
  ========
  `,
  `
     +---+
     |   |
     O   |
    /|\\  |
         |
  ========
  `,
  `
     +---+
     |   |
     O   |
    /|\\  |
    /    |
  ========
  `,
  `
     +---+
     |   |
     O   |
    /|\\  |
    / \\  |
  ========
  `,
];

const Hangman = () => {
  const [selectedWord, setSelectedWord] = useState('');
  const [guessedLetters, setGuessedLetters] = useState([]);  // Letras adivinadas
  const [wrongLetters, setWrongLetters] = useState([]);  // Letras incorrectas
  const [attempts, setAttempts] = useState(6);  // Intentos restantes
  const [inputLetter, setInputLetter] = useState('');  // Entrada del usuario
  const [isGameOver, setIsGameOver] = useState(false);  // Estado de fin de juego
  const [hasWon, setHasWon] = useState(false);  // Estado de victoria

  // Iniciar una nueva partida seleccionando una palabra aleatoria
  const startGame = () => {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setSelectedWord(randomWord);
    setGuessedLetters([]);
    setWrongLetters([]);
    setAttempts(6);
    setInputLetter('');
    setIsGameOver(false);
    setHasWon(false);
  };

  // Manejar la entrada de letras
  const handleInputChange = (e) => {
    const letter = e.target.value.toUpperCase();

    // Validar que solo se permita una letra del alfabeto
    if (/^[A-Z]$/.test(letter)) {
      setInputLetter(letter);
    } else {
      setInputLetter('');
    }
  };

  // Adivinar la letra ingresada
  const guessLetter = () => {
    if (inputLetter === '' || guessedLetters.includes(inputLetter) || wrongLetters.includes(inputLetter)) {
      return;  // No hacer nada si la entrada está vacía o la letra ya fue adivinada
    }

    if (selectedWord.includes(inputLetter)) {
      setGuessedLetters([...guessedLetters, inputLetter]);
    } else {
      setWrongLetters([...wrongLetters, inputLetter]);
      setAttempts(attempts - 1);
    }

    setInputLetter('');  // Limpiar el input después de adivinar

    // Verificar si el juego ha terminado
    checkGameOver();
  };

  // Verificar el fin del juego
  const checkGameOver = () => {
    if (attempts <= 0) {
      setIsGameOver(true);
      setHasWon(false);
    }
    if (selectedWord.split('').every((letter) => guessedLetters.includes(letter))) {
      setIsGameOver(true);
      setHasWon(true);
    }
  };

  return (
    <div>
      <h2>Hangman</h2>
      {selectedWord === '' ? (
        <button onClick={startGame}>Comenzar partida</button>
      ) : (
        <div>
          <div>
            <h3>Palabra: {selectedWord.split('').map((letter) => (guessedLetters.includes(letter) ? letter : '_')).join(' ')}</h3>
            <p>Letras incorrectas: {wrongLetters.join(', ')}</p>
            <p>Intentos restantes: {attempts}</p>
          </div>
          {/* Mostrar la animación del "hombre ahorcado" */}
          <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace', fontSize: '1.2rem' }}>
            {hangmanStages[6 - attempts]}
          </pre>
          {!isGameOver ? (
            <div>
              <input
                type="text"
                maxLength="1"
                value={inputLetter}
                onChange={handleInputChange}
                placeholder="Ingresa una letra"
              />
              <button onClick={guessLetter}>Adivinar letra</button>
            </div>
          ) : (
            <div>
              <h3>{hasWon ? '¡HAS GANADO!' : '¡HAS PERDIDO!'}</h3>
              <button onClick={startGame}>Reiniciar juego</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Hangman;
