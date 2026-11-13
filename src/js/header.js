// src/js/header.js

'use strict';

// Automatically load Google Fonts for the logo on every page
const protocol = 'https://';
const sub = 'fonts.';
const domain = 'googleapis.com';
const path = '/css2';
const query = '?family=Molle:ital@1&display=swap';

const fontLink = document.createElement('link');
fontLink.rel = 'stylesheet';
fontLink.href = protocol + sub + domain + path + query;
document.head.appendChild(fontLink);

// Find the logo/header container
const logo = document.querySelector('.header');

// Create the storefronts
logo.innerHTML = `
<div class="store-logo" aria-label="Storefront logo">

  <!-- 1. street light -->
  <div class="street-lamp"></div>

  <!-- Left store: Closed -->

  <!-- 1. Closed -->
  <div class="store closed hide-on-mobile">

    <div class="roof"></div>
    <div class="awning"></div>

    <div class="store-front">
      <div class="shop-sign">CLOSED</div>
      <div class="window"></div>
      <div class="door"></div>
    </div>
  </div>

  <!-- 2. Closed -->
   <div class="store closed hide-on-mobile">

    <div class="roof"></div>
    <div class="awning"></div>

    <div class="store-front">
      <div class="shop-sign">CLOSED</div>
      <div class="window"></div>
      <div class="door"></div>
    </div>
  </div>

  <!-- 3. Closed -->
   <div class="store closed">

    <div class="roof"></div>
    <div class="awning"></div>

    <div class="store-front">
      <div class="shop-sign">CLOSED</div>
      <div class="window"></div>
      <div class="door"></div>
    </div>
  </div>

  <!-- 4. Middle store: Open -->
  <div class="store open">

    <div class="roof"></div>
    <div class="my-name">Jørgen Bjørnethun</div>
    <div class="awning"></div>

    <div class="store-front">
      <div class="shop-sign">OPEN</div>
      <div class="window"></div>
      <div class="door"></div>
    </div>
  </div>

  <!-- Right store: Closed -->

  <!-- 5. Closed -->
  <div class="store closed">

    <div class="roof"></div>
    <div class="awning"></div>

    <div class="store-front">
      <div class="shop-sign">CLOSED</div>
      <div class="window"></div>
      <div class="door"></div>
    </div>
  </div>

  <!-- 6. Closed -->
  <div class="store closed hide-on-mobile">

    <div class="roof"></div>
    <div class="awning"></div>

    <div class="store-front">
      <div class="shop-sign">CLOSED</div>
      <div class="window"></div>
      <div class="door"></div>
    </div>
  </div>

  <!-- 7. Closed -->
   <div class="store closed hide-on-mobile">

    <div class="roof"></div>
    <div class="awning"></div>

    <div class="store-front">
      <div class="shop-sign">CLOSED</div>
      <div class="window"></div>
      <div class="door"></div>
    </div>
  </div>

  <!-- 7. street light -->
  <div class="street-lamp"></div>  

</div>
`;
