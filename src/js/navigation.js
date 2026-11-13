// src/js/navigation.js

'use strict';

// Navigation container
const navigation = document.querySelector('.nav');

// Nav links
navigation.innerHTML = `
  <a href="index.html">Home</a>

  <a href="about.html">About</a>

  <a href="game.html?games=gallow">Games</a>
`;

// Find the current page
const currentPage = window.location.pathname.split('/').pop();

// Find the nav links
const links = navigation.querySelectorAll('a');

// Highlight the current page
links.forEach(function (link) {
  const linkPage = link.getAttribute('href').split('?')[0];

  if (linkPage === currentPage) {
    link.classList.add('active');
  }
});
