// src/games/gallow/GallowGame.js
// Structuring an individual Game
// Inside your specific game file, you wrap your game engine inside a function so the launcher.js can trigger it only when requested.

'use strict';

export function initGame(canvas) {
  const ctx = canvas.getContext('2d');
  // console.log('Gallow game initialized on canvas.');

  // Game configuration & words
  const wordList = [
    { word: 'JAVASCRIPT' },
    { word: 'ARCADE' },
    { word: 'CANVAS' },
    { word: 'PORTFOLIO' },
  ];

  let currentWord = '';
  let guessedLetters = [];
  let wrongGuesses = 0;
  const maxGuesses = 6;
  let gameState = 'PLAYING'; // "PLAYING", "WON", "LOST"

  // Virtual On-screen keyboard parameters

  // Setup initial word and data structures
  function selectNewWord() {
    const pick = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = pick.word;
    guessedLetters = [];
    wrongGuesses = 0;
    gameState = 'PLAYING';
  }

  // Draw vector elements for the hanging stage
  function drawGallows() {
    ctx.strokeStyle = '#2c3e50';
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';

    // Base platform
    ctx.beginPath();
    ctx.moveTo(50, 450);
    ctx.lineTo(250, 450);
    ctx.stroke();
    // Vertical pole
    ctx.beginPath();
    ctx.moveTo(120, 450);
    ctx.lineTo(120, 150);
    ctx.stroke();
    // Top beam
    ctx.beginPath();
    ctx.moveTo(120, 150);
    ctx.lineTo(220, 150);
    ctx.stroke();
    // Hanging rope noose
    ctx.beginPath();
    ctx.moveTo(220, 150);
    ctx.lineTo(220, 190);
    ctx.stroke();
  }

  // Iteratively render stick figure parts depending on loss progression
  function drawHangman() {
    ctx.strokeStyle = '#e74c3c';
    ctx.lineWidth = 4;

    if (wrongGuesses > 0) {
      // Head
      ctx.beginPath();
      ctx.arc(220, 210, 20, 0, Math.PI * 2);
      ctx.stroke();
    }
    if (wrongGuesses > 1) {
      // Torso
      ctx.beginPath();
      ctx.moveTo(220, 230);
      ctx.lineTo(220, 310);
      ctx.stroke();
    }
    if (wrongGuesses > 2) {
      // Left arm
      ctx.beginPath();
      ctx.moveTo(220, 250);
      ctx.lineTo(190, 280);
      ctx.stroke();
    }
    if (wrongGuesses > 3) {
      // Right arm
      ctx.beginPath();
      ctx.moveTo(220, 250);
      ctx.lineTo(250, 280);
      ctx.stroke();
    }
    if (wrongGuesses > 4) {
      // Left leg
      ctx.beginPath();
      ctx.moveTo(220, 310);
      ctx.lineTo(190, 360);
      ctx.stroke();
    }
    if (wrongGuesses > 5) {
      // Right leg
      ctx.beginPath();
      ctx.moveTo(220, 310);
      ctx.lineTo(250, 360);
      ctx.stroke();
    }
  }

  // UI HUD and Text layout positions
  function drawGameUI() {
    // Render hidden mystery slots
    ctx.font = 'bold 32px sans-serif';
    ctx.fillStyle = '#2c3e50';
    ctx.textAlign = 'left';

    let startX = 350;
    let startY = 220;

    for (let i = 0; i < currentWord.length; i++) {
      let char = currentWord[i];
      if (guessedLetters.includes(char)) {
        ctx.fillText(char, startX + i * 45, startY);
      } else {
        ctx.fillText('_', startX + i * 45, startY);
      }
    }

    // Render clues & instructions
    ctx.font = 'italic 18px sans-serif';
    ctx.fillStyle = '#7f8c8d';

    ctx.font = 'bold 20px sans-serif';
    ctx.fillStyle = '#c0392b';
    ctx.fillText(`Strikes: ${wrongGuesses} / ${maxGuesses}`, 350, 330);

    // Render letters logged already
    ctx.font = '16px sans-serif';
    ctx.fillStyle = '#34495e';
    ctx.fillText(`Letters Guessed: ${guessedLetters.join(',')}`, 350, 380);

    ctx.fillStyle = '#95a5a6';
    ctx.font = '14px sans-serif';
    ctx.fillText('Type any letter on your keybord to play', 350, 400);
  }

  function drawEndScreen() {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.textAlign = 'center';
    if (gameState === 'WON') {
      ctx.fillStyle = '#27ae60';
      ctx.font = 'bold 45px sans-serif';
      ctx.fillText(
        'Victory! You Escaped the Gallow.',
        canvas.width / 2,
        canvas.height / 2 - 20,
      );
    } else {
      ctx.fillStyle = '#c0392b';
      ctx.font = 'bold 45px sans-serif';
      ctx.fillText('Game Over!', canvas.width / 2, canvas.height / 2 - 40);
      ctx.fillStyle = '#2c3e50';
      ctx.font = '24px sans-serif';
      ctx.fillText(
        `The word was: ${currentWord}`,
        canvas.width / 2,
        canvas.height / 2 + 10,
      );
    }

    ctx.fillStyle = '#34495e';
    ctx.font = '20px sans-serif';
    ctx.fillText(
      "Press 'ENTER' to play again",
      canvas.width / 2,
      canvas.height / 2 + 80,
    );
  }

  // Handle event input logic
  function handleInput(e) {
    const key = e.key.toUpperCase();

    if (gameState !== 'PLAYING') {
      if (key === 'ENTER') {
        selectNewWord();
      }
      return;
    }

    // Ensure keystroke is an aplha letter and hasn't been chosen yet
    if (key >= 'A' && key <= 'Å' && key.length === 1) {
      if (!guessedLetters.includes(key)) {
        guessedLetters.push(key);

        if (!currentWord.includes(key)) {
          wrongGuesses++;
        }
        checkStatus();
      }
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

  // Setup listener cleanup bindings
  window.addEventListener('keydown', handleInput);

  // Initialize canvas game loop
  selectNewWord();

  function gameLoop() {
    // Background clean canvas clear
    ctx.fillStyle = '#f8f9fa';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawGallows();
    drawHangman();
    drawGameUI();

    if (gameState !== 'PLAYING') {
      drawEndScreen();
    }

    requestAnimationFrame(gameLoop);
  }

  gameLoop();
}
