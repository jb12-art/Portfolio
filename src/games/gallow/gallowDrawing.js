// src/games/gallow/gallowDrawing.js

// Drawing

'use strict';

// Draw vector elements for the hanging stage
export function drawGallows(ctx) {
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
export function drawHangman(ctx, wrongGuesses) {
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
export function drawGameUI(
  ctx,
  currentWord,
  guessedLetters,
  wrongGuesses,
  maxGuesses,
  labels,
) {
  // Render hidden word
  ctx.font = 'bold 32px sans-serif';
  ctx.fillStyle = '#2c3e50';
  ctx.textAlign = 'left';

  let startX = 350;
  let startY = 220;

  for (let i = 0; i < currentWord.length; i++) {
    const char = currentWord[i];
    if (guessedLetters.includes(char)) {
      ctx.fillText(char, startX + i * 45, startY);
    } else {
      ctx.fillText('_', startX + i * 45, startY);
    }
  }

  // Strikes, clues & instructions
  ctx.font = 'italic 18px sans-serif';
  ctx.fillStyle = '#7f8c8d';

  ctx.font = 'bold 20px sans-serif';
  ctx.fillStyle = '#c0392b';
  ctx.fillText(`${labels.strikes}: ${wrongGuesses} / ${maxGuesses}`, 350, 330);

  // Guessed letters
  ctx.font = '16px sans-serif';
  ctx.fillStyle = '#34495e';
  ctx.fillText(`${labels.guessed}: ${guessedLetters.join(',')}`, 350, 380);

  // Instructions
  ctx.font = '14px sans-serif';
  ctx.fillStyle = '#95a5a6';
  ctx.fillText(labels.instruction, 350, 400);
}

// End screen
export function drawEndScreen(ctx, canvas, gameState, currentWord, labels) {
  // white transparent overlay when the game end
  ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.textAlign = 'center';

  if (gameState === 'WON') {
    ctx.fillStyle = '#27ae60';
    ctx.font = 'bold 45px sans-serif';
    ctx.fillText(labels.won, canvas.width / 2, canvas.height / 2 - 20);
  } else {
    ctx.fillStyle = '#c0392b';
    ctx.font = 'bold 45px sans-serif';
    ctx.fillText(labels.lost, canvas.width / 2, canvas.height / 2 - 40);

    ctx.fillStyle = '#2c3e50';
    ctx.font = '24px sans-serif';
    ctx.fillText(
      `${labels.answer}: ${currentWord}`,
      canvas.width / 2,
      canvas.height / 2 + 10,
    );
  }

  ctx.fillStyle = '#34495e';
  ctx.font = '20px sans-serif';
  ctx.fillText(labels.restart, canvas.width / 2, canvas.height / 2 + 80);
}
