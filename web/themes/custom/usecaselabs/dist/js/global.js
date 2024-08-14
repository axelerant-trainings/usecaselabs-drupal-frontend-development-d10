"use strict";

/**
 * @file
 * script.js
 */

(function (Drupal, drupalSettings) {
  Drupal.behaviors.mobile_menu = {
    attach: function attach(context, settings) {
      // console.log('test');

      document.querySelectorAll('.menu--level-1 > li > a').forEach(function (menuLink) {
        menuLink.addEventListener('keydown', function (event) {
          // Handle spacebar (key code 32)
          if (event.keyCode === 32) {
            event.preventDefault(); // Prevent the default spacebar action (scrolling)
            var submenu = this.nextElementSibling;
            if (submenu && submenu.classList.contains('menu--level-2')) {
              submenu.style.display = submenu.style.display === 'flex' ? 'none' : 'flex';
            }
          }
        });
      });
    }
  };
})(Drupal, drupalSettings);