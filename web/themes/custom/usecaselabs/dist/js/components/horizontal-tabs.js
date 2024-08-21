"use strict";

/**
 * @file
 * script.js
 */

(function (Drupal, drupalSettings) {
  Drupal.behaviors.tabs = {
    attach: function attach(context, settings) {
      // Get all tab components on the page
      var tabComponents = document.querySelectorAll('.tabs');
      tabComponents.forEach(function (tabComponent) {
        var tabTitles = tabComponent.querySelectorAll('.tab-title');
        var tabContents = tabComponent.querySelectorAll('.tab-content');
        var tabTitlesMobile = tabComponent.querySelectorAll('.tabs-mobile .tab-title');
        var tabContentsMobile = tabComponent.querySelectorAll('.tabs-mobile .tab-content');

        // Set the first tab and content as active by default
        if (window.innerWidth > 767) {
          if (tabTitles.length > 0 && tabContents.length > 0) {
            tabTitles[0].classList.add('active');
            tabContents[0].classList.add('active');
            tabTitles[0].setAttribute('aria-selected', 'true');
          }
        } else {
          if (tabTitlesMobile.length > 0 && tabContentsMobile.length > 0) {
            tabTitlesMobile[0].classList.add('active');
            tabTitlesMobile[0].setAttribute('aria-expanded', 'true');
            tabContentsMobile[0].classList.add('active');
          }
        }

        // Add event listeners to tab titles
        tabTitles.forEach(function (title, index) {
          title.addEventListener('click', function (e) {
            e.preventDefault();
            if (window.innerWidth > 767) {
              // For desktop (tabs behavior)
              // Remove active class from all tabs and contents within this component
              tabTitles.forEach(function (tab, i) {
                tab.classList.remove('active');
                tab.setAttribute('aria-selected', 'false');
                tabContents[i].classList.remove('active');
                tabContents[i].setAttribute('hidden', '');
              });

              // Add active class to clicked tab and corresponding content
              this.classList.add('active');
              this.setAttribute('aria-selected', 'true');
              tabContents[index].classList.add('active');
              tabContents[index].removeAttribute('hidden');
            }
          });
        });

        // Add event listeners for mobile accordion behavior
        tabTitlesMobile.forEach(function (title, index) {
          title.addEventListener('click', function (e) {
            e.preventDefault();
            var isActive = this.classList.contains('active');

            // Close all accordion sections within this component
            tabTitlesMobile.forEach(function (tab, i) {
              tab.classList.remove('active');
              tab.setAttribute('aria-expanded', 'false');
              tabContentsMobile[i].classList.remove('active');
              tabContentsMobile[i].setAttribute('hidden', '');
            });

            // Toggle the clicked section
            if (!isActive) {
              this.classList.add('active');
              this.setAttribute('aria-expanded', 'true');
              tabContentsMobile[index].classList.add('active');
              tabContentsMobile[index].removeAttribute('hidden');
            }
          });
        });
      });
    }
  };
})(Drupal, drupalSettings);