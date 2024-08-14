"use strict";

/**
 * @file
 * script.js
 */

(function (Drupal, once) {
  var modeConfig = {
    dark: {
      bodyClass: 'contrast-colors',
      highContrast: true
    },
    light: {
      bodyClass: 'default-colors',
      highContrast: false
    }
  };
  function applyMode(mode) {
    var config = modeConfig[mode];
    var body = document.body;

    // Determine class of current mode
    var currentModeClass = body.classList.contains('default-colors') ? 'default-colors' : 'contrast-colors';
    var newModeClass = config.bodyClass;

    // Only change class if it's different
    if (currentModeClass !== newModeClass) {
      body.classList.remove(currentModeClass);
      body.classList.add(newModeClass);
    }

    // Store the mode in localStorage
    localStorage.setItem('highContrast', config.highContrast);
  }
  function toggleContrast() {
    var currentContrast = localStorage.getItem('highContrast');
    var newMode = JSON.parse(currentContrast) ? 'light' : 'dark';
    applyMode(newMode);
  }
  Drupal.behaviors.modeToggle = {
    attach: function attach(context) {
      // Use the new once() function
      once('accessibility-mode-toggle', '.accessibility-mode-toggle', context).forEach(function (element) {
        element.addEventListener('click', function () {
          toggleContrast();
        });
      });

      // Initial setup:  apply default light mode or saved mode
      var savedContrast = JSON.parse(localStorage.getItem('highContrast'));
      applyMode(savedContrast ? 'dark' : 'light');
    }
  };
})(Drupal, once);