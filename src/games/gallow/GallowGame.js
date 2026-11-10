// src/games/gallow/GallowGame.js

// Game Controller

'use strict';

import {
  drawGallows,
  drawHangman,
  drawGameUI,
  drawEndScreen,
} from './gallowDrawing.js';

// Import word database
import { gameData } from './wordData.js';

export function initGame(canvas) {
  // HTML elements
  const ctx = canvas.getContext('2d');
  const keyboard = document.getElementById('keyboard');
  const restartButton = document.getElementById('restartButton');
  const startButton = document.getElementById('startButton');
  const gameSettings = document.getElementById('gameSettings');
  const gameArea = document.getElementById('gameArea');
  const languageSelect = document.getElementById('languageSelect');
  const genreSelect = document.getElementById('genreSelect');

  // Game configuration & words
  const wordList = [
    { word: 'JAVASCRIPT' },
    { word: 'ARCADE' },
    { word: 'CANVAS' },
    { word: 'PORTFOLIO' },
  ];

  // Game variables
  let currentWord = '';
  let guessedLetters = [];
  let wrongGuesses = 0;
  const maxGuesses = 6;
  let gameState = 'PLAYING'; // "PLAYING", "WON", "LOST"
  let selectedLanguage = 'en';
  let selectedGenre = 'animals';
  let allowedLetters = [];
  let keyboardRows = [];
  let gameStarted = false;

  // Language settings
  const languages = {
    en: {
      rows: ['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM'],

      labels: {
        strikes: 'Strikes',
        guessed: 'Letters guessed',
        instruction: 'Choose a letter to play',
        won: 'You escaped!',
        lost: 'You got roped!',
        answer: 'The word was',
        restart: '',
      },

      genres: {
        animals: 'Animals',
        food: 'Food',
        countries: 'Countries',
        technology: 'Technology',
        nature: 'Nature',
        sports: 'Sports',
      },
    },

    no: {
      rows: ['QWERTYUIOPÅ', 'ASDFGHJKLØÆ', 'ZXCVBNM'],

      labels: {
        strikes: 'Feil',
        guessed: 'Gjettede bokstaver',
        instruction: 'Velg en bokstav',
        won: 'Du unnslapp!',
        lost: 'Du ble tauet!',
        answer: 'Ordet var',
        restart: '',
      },

      genres: {
        animals: 'Dyr',
        food: 'Mat',
        countries: 'Land',
        technology: 'Teknologi',
        nature: 'Natur',
        sports: 'Sport',
      },
    },

    fi: {
      rows: ['QWERTYUIOP', 'ASDFGHJKLÖÄ', 'ZXCVBNM'],

      labels: {
        strikes: 'Virheet',
        guessed: 'Arvatut kirjaimet',
        instruction: 'Valitse kirjain',
        won: 'Pääsit pakoon!',
        lost: 'Solmussa!',
        answer: 'Sana oli',
        restart: '',
      },

      genres: {
        animals: 'Eläimet',
        food: 'Ruoka',
        countries: 'Maat',
        technology: 'Teknologia',
        nature: 'Luonto',
        sports: 'Urheilu',
      },
    },
  };

  // Update genre names
  function updateGenreOptions() {
    const genres = languages[selectedLanguage].genres;
    genreSelect.innerHTML = '';
    Object.keys(genres).forEach((genre) => {
      const option = document.createElement('option');
      option.value = genre;
      option.textContent = genres[genre];
      genreSelect.appendChild(option);
    });
  }

  // Select language
  languageSelect.addEventListener('change', () => {
    selectedLanguage = languageSelect.value;

    updateGenreOptions();
  });

  // Select a new word and data structure
  function selectNewWord() {
    const words = gameData[selectedLanguage][selectedGenre];
    const randomIndex = Math.floor(Math.random() * words.length);
    currentWord = words[randomIndex].toUpperCase();
    guessedLetters = [];
    wrongGuesses = 0;
    gameState = 'PLAYING';
    restartButton.hidden = true;
  }

  // Guess a letter
  function guessLetter(letter) {
    if (gameState !== 'PLAYING') {
      return;
    }

    if (!allowedLetters.includes(letter)) {
      return;
    }

    if (guessedLetters.includes(letter)) {
      return;
    }

    guessedLetters.push(letter);

    if (!currentWord.includes(letter)) {
      wrongGuesses++;
    }

    checkStatus();
    updateKeyboard();
  }

  // Check win or loss
  function checkStatus() {
    if (wrongGuesses >= maxGuesses) {
      gameState = 'LOST';
      restartButton.hidden = false;
      return;
    }

    const won = currentWord
      .split('')
      .every((letter) => guessedLetters.includes(letter));

    if (won) {
      gameState = 'WON';
      restartButton.hidden = false;
    }
  }

  // HTML virtual keyboard
  function setupVirtualKeyboard() {
    keyboard.innerHTML = '';

    // Get the keyboard layout for the selected language
    keyboardRows = languages[selectedLanguage].rows;

    // Get all available letters
    allowedLetters = keyboardRows.join('').split('');

    // Create each keyboard row
    keyboardRows.forEach((row) => {
      const rowContainer = document.createElement('div');

      rowContainer.className = 'keyboard-row';

      row.split('').forEach((letter) => {
        const button = document.createElement('button');

        button.type = 'button';
        button.textContent = letter;

        button.addEventListener('click', () => {
          guessLetter(letter);
        });

        rowContainer.appendChild(button);
      });

      keyboard.appendChild(rowContainer);
    });
  }

  // Update disabled keyboard buttons
  function updateKeyboard() {
    const buttons = keyboard.querySelectorAll('button');
    buttons.forEach((button) => {
      if (guessedLetters.includes(button.textContent)) {
        button.disabled = true;
      }
    });
  }

  // Physical keyboard input
  function handleInput(e) {
    if (!gameStarted) {
      return;
    }

    const key = e.key.toUpperCase();

    if (key === 'ENTER' && gameState !== 'PLAYING') {
      restartGame();
      return;
    }

    if (allowedLetters.includes(key)) {
      guessLetter(key);
    }
  }

  // Restart game
  function restartGame() {
    selectNewWord();
    setupVirtualKeyboard();
  }

  // Start game
  startButton.addEventListener('click', () => {
    selectedLanguage = languageSelect.value;
    selectedGenre = genreSelect.value;
    gameSettings.hidden = true;
    gameArea.hidden = false;
    gameStarted = true;

    selectNewWord();
    setupVirtualKeyboard();
    gameLoop();
  });

  // Restart button
  restartButton.addEventListener('click', () => {
    restartGame();
  });

  // Physical keyboard listener
  window.addEventListener('keydown', handleInput);

  // Game loop
  function gameLoop() {
    if (!gameStarted) {
      return;
    }

    // Background clear canvas
    ctx.fillStyle = '#f8f9fa';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Drawing
    drawGallows(ctx);
    drawHangman(ctx, wrongGuesses);
    drawGameUI(
      ctx,
      currentWord,
      guessedLetters,
      wrongGuesses,
      maxGuesses,
      languages[selectedLanguage].labels,
    );

    // End screen
    if (gameState !== 'PLAYING') {
      drawEndScreen(
        ctx,
        canvas,
        gameState,
        currentWord,
        languages[selectedLanguage].labels,
      );
    }

    requestAnimationFrame(gameLoop);
  }

  // Initial setup
  selectedLanguage = languageSelect.value;
  updateGenreOptions();
}
