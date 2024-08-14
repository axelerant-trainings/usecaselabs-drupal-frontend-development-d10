"use strict";

/**
 * @file
 * script.js
 */

(function (Drupal, drupalSettings) {
  Drupal.behaviors.ucl_modal = {
    attach: function attach(context, settings) {
      var modalElement = document.getElementById('ucl-modal'); // Get the the modal element

      if (modalElement) {
        window.onload = function () {
          var lastShownKey = 'modalLastShown'; // Key to store the last shown date in localStorage
          var daysToShowAgain = 30; // Number of days before showing the modal again

          // Get the current date and time
          var now = new Date().getTime();

          // Get the last shown date from localStorage
          var lastShown = localStorage.getItem(lastShownKey);

          // Check if the modal should be shown (if never shown or 30 days have passed)
          if (!lastShown || now - lastShown > daysToShowAgain * 24 * 60 * 60 * 1000) {
            // Show the modal after 2 seconds
            setTimeout(function () {
              modalElement.style.display = 'flex';
              document.body.classList.add('body-no-scroll'); // Disable body scroll

              // Store the current date and time in localStorage
              localStorage.setItem(lastShownKey, now);
            }, 2000);
          }

          // Close the modal when the close button is clicked
          document.getElementById('closeModal').addEventListener('click', function () {
            modalElement.style.display = 'none';
            document.body.classList.remove('body-no-scroll'); // Enable body scroll
          });

          // Optionally, close the modal when clicking outside the content
          window.addEventListener('click', function (event) {
            if (event.target === modalElement) {
              modalElement.style.display = 'none';
              document.body.classList.remove('body-no-scroll'); // Enable body scroll
            }
          });
        };
      }
    }
  };
})(Drupal, drupalSettings);