/**
 * @file
 * script.js
 */

(function (Drupal, drupalSettings) {
  Drupal.behaviors.header_menu = {
    attach: function (context, settings) {
      document
        .querySelectorAll('.menu--level-1 > li > .menu__link--level-1')
        .forEach((menuLink) => {
          menuLink.addEventListener('keydown', function (event) {
            // Handle spacebar (key code 32)
            if (event.keyCode === 32) {
              event.preventDefault(); // Prevent the default spacebar action (scrolling)
              const submenu = this.nextElementSibling;

              // Close any open submenus
              document
                .querySelectorAll('.menu--level-2.menu-active')
                .forEach((activeSubmenu) => {
                  if (activeSubmenu !== submenu) {
                    activeSubmenu.classList.remove('menu-active');
                  }
                });

              // Toggle the submenu
              if (submenu && submenu.classList.contains('menu--level-2')) {
                submenu.classList.toggle('menu-active');
              }
            }
          });
        });

      // Close all menus when clicking outside
      document.addEventListener('click', function (event) {
        const isClickInside = event.target.closest('.menu--level-1');

        // If the click is outside any of the menu items, close all submenus
        if (!isClickInside) {
          document
            .querySelectorAll('.menu--level-2.menu-active')
            .forEach((activeSubmenu) => {
              activeSubmenu.classList.remove('menu-active');
            });
        }
      });

      const menuToggle = document.getElementById('menu-toggle');
      const headerNav = document.querySelector('.header-nav');

      menuToggle.addEventListener('click', function () {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';

        // Toggle the aria-expanded attribute
        menuToggle.setAttribute('aria-expanded', !isExpanded);

        // Toggle the visibility class on the nav
        if (isExpanded) {
          headerNav.classList.remove('visible');
        } else {
          headerNav.classList.add('visible');
        }
      });

      // Function to handle mobile menu toggle
      function toggleMobileMenu(event) {
        const screenWidth = window.innerWidth;

        // Only run this script on screens below 768px
        if (screenWidth < 768) {
          event.preventDefault();
          const currentItem = this.parentElement;
          const currentSubmenu = this.nextElementSibling;
          const isActive = currentItem.classList.contains('active');

          // If the current item is active (i.e., the submenu is open), close it
          if (isActive) {
            currentItem.classList.remove('active');
            if (currentSubmenu) {
              currentSubmenu.style.display = 'none';
            }
          } else {
            // Close any open submenus
            document.querySelectorAll('.menu--level-1 > li').forEach((item) => {
              item.classList.remove('active');
              const submenu = item.querySelector('.menu--level-2');
              if (submenu) {
                submenu.style.display = 'none';
              }
            });

            // Open the clicked item
            currentItem.classList.add('active');
            if (currentSubmenu) {
              currentSubmenu.style.display = 'block';
            }
          }
        }
      }

      // Attach event listeners to level 1 menu items
      document
        .querySelectorAll(
          '.menu--level-1 > li.menu__item--has-children > .menu__link--level-1',
        )
        .forEach((menuLink) => {
          menuLink.addEventListener('click', toggleMobileMenu);
        });

      // Optional: Remove active class and close menu on click outside
      document.addEventListener('click', function (event) {
        const screenWidth = window.innerWidth;

        // Only run this script on screens below 768px
        if (screenWidth < 768) {
          const isClickInside = event.target.closest('.menu--main');
          if (!isClickInside) {
            document
              .querySelectorAll('.menu--level-1 > li.active')
              .forEach((activeItem) => {
                activeItem.classList.remove('active');
                const submenu = activeItem.querySelector('.menu--level-2');
                if (submenu) {
                  submenu.style.display = 'none';
                }
              });
          }
        }
      });
    },
  };
})(Drupal, drupalSettings);
