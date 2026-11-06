// src/games/gallow/GallowGame.js

// Game Controller

'use strict';

import {
  drawGallows,
  drawHangman,
  drawGameUI,
  drawEndScreen,
} from './gallowDrawing.js';

export function initGame(canvas) {
  // HTML elements
  const ctx = canvas.getContext('2d');
  const keyboard = document.getElementById('keyboard');
  const restartButton = document.getElementById('restartButton');

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

  // Select a new word and data structure
  function selectNewWord() {
    const pick = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = pick.word;
    guessedLetters = [];
    wrongGuesses = 0;
    gameState = 'PLAYING';
  }

  // Guess a letter
  function guessLetter(letter) {
    if (gameState !== 'PLAYING') {
      return;
    }

    if (!guessedLetters.includes(letter)) {
      guessedLetters.push(letter);

      if (!currentWord.includes(letter)) {
        wrongGuesses++;
      }

      checkStatus();
    }
  }

  function checkStatus() {
    if (wrongGuesses >= maxGuesses) {
      gameState = 'LOST';
      return;
    }

    const won = currentWord
      .split('')
      .every((char) => guessedLetters.includes(char));
    if (won) {
      gameState = 'WON';
    }
  }

  // HTML virtual keyboard
  function setupVirtualKeyboard() {
    keyboard.innerHTML = '';

    const keys = 'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÄ'.split('');
    keys.forEach((letter) => {
      const button = document.createElement('button');

      button.textContent = letter;
      button.addEventListener('click', () => {
        guessLetter(letter);

        button.disabled = true;
      });
      keyboard.appendChild(button);
    });
  }

  // Physical keyboard input
  function handleInput(e) {
    const key = e.key.toUpperCase();

    // Restart game
    if (gameState !== 'PLAYING' && key === 'ENTER') {
      selectNewWord();
      setupVirtualKeyboard();

      return;
    }

    // Only accept A-Z English version
    if (/^[A-Z]$/.test(key)) {
      guessLetter(key);

      // Update virtual keyboard
      const buttons = keyboard.querySelectorAll('button');

      buttons.forEach((button) => {
        if (button.textContent === key) {
          button.disabled = true;
        }
      });
    }
  }

  // Restart button
  restartButton.addEventListener('click', () => {
    selectNewWord();
    setupVirtualKeyboard();
  });

  //
  // Start Physical keyboard listener
  window.addEventListener('keydown', handleInput);

  // Start game
  selectNewWord();
  // Create virtual keyboard
  setupVirtualKeyboard();

  function gameLoop() {
    // Background clean canvas clear
    ctx.fillStyle = '#f8f9fa';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawGallows(ctx);
    drawHangman(ctx, wrongGuesses);
    drawGameUI(ctx, currentWord, guessedLetters, wrongGuesses, maxGuesses);

    if (gameState !== 'PLAYING') {
      drawEndScreen(ctx, canvas, gameState, currentWord);
    }

    requestAnimationFrame(gameLoop);
  }

  gameLoop();
}
