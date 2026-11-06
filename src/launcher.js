// src/launcher.js
// Game loader
// This file reads the URL parameter (?games=gallow), imports the correct game code dynamically, and starts it up.

'use strict';

// 1. Get the game name from the URL (e.g. game.html?games=gallow)
const urlParams = new URLSearchParams(window.location.search);
const gameName = urlParams.get('games');

const titleElement = document.getElementById('gameTitle');
const canvas = document.getElementById('gameCanvas');

// 2. A map pointing to where each game's startup function lives
const games = {
  gallow: { title: 'The Gallow', path: './games/gallow/GallowGame.js' },
};

// 3. Check if the game exists, then dynamically import it
if (games[gameName]) {
  titleElement.textContent = games[gameName].title;

  // Dynamically import the specific game file
  import(games[gameName].path)
    .then((module) => {
      // Assume each game file exports a function called 'initGame'
      module.initGame(canvas);
    })
    .catch((err) => {
      titleElement.textContent = 'Error loading game.';
      console.error(err);
    });
} else {
  titleElement.textContent = 'Game Not Found';
}
