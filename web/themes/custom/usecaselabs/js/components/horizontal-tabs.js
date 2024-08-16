/**
 * @file
 * script.js
 */

(function (Drupal, drupalSettings) {
  Drupal.behaviors.tabs = {
    attach: function (context, settings) {
      const tabTitles = document.querySelectorAll('.tab-title');
      const tabContents = document.querySelectorAll('.tab-content');
      const tabTitlesMobile = document.querySelectorAll(
        '.tabs-mobile .tab-title',
      );
      const tabContentsMobile = document.querySelectorAll(
        '.tabs-mobile .tab-content',
      );

      if (window.innerWidth > 767) {
        // Set the first tab and content as active by default
        if (tabTitles.length > 0 && tabContents.length > 0) {
          tabTitles[0].classList.add('active');
          tabContents[0].classList.add('active');
          tabTitles[0].setAttribute('aria-selected', 'true');
        }
      } else {
        // For mobile (accordion behavior)
        if (tabTitlesMobile.length > 0 && tabContentsMobile.length > 0) {
          tabTitlesMobile[0].classList.add('active');
          tabTitlesMobile[0].setAttribute('aria-expanded', 'true');
          tabContentsMobile[0].classList.add('active');
        }
      }

      tabTitles.forEach((title, index) => {
        title.addEventListener('click', function (e) {
          e.preventDefault();

          if (window.innerWidth > 767) {
            // For desktop (tabs behavior)
            // Remove active class from all tabs and contents
            tabTitles.forEach((tab, i) => {
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
          } else {
            const isActive = this.classList.contains('active');

            // Close all accordion sections
            tabTitles.forEach((tab, i) => {
              tab.classList.remove('active');
              tab.setAttribute('aria-expanded', 'false');
              tabContents[i].classList.remove('active');
              tabContents[i].setAttribute('hidden', '');
            });

            // Toggle the clicked section
            if (!isActive) {
              this.classList.add('active');
              this.setAttribute('aria-expanded', 'true');
              tabContents[index].classList.add('active');
              tabContents[index].removeAttribute('hidden');
            }
          }
        });
      });
    },
  };
})(Drupal, drupalSettings);
