/**
 * @file
 * script.js
 */

(function (Drupal, $) {
  Drupal.behaviors.slick = {
    attach: function (context, settings) {
      $('.slick-slider').slick({
        accessibility: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        variableWidth: false,
        autoplay: true,
        dots: true,
        responsive: [
          {
            breakpoint: 767,
            settings: {
              slidesToShow: 1,
              prevArrow: '.slick-slider-container .prev-btn',
              nextArrow: '.slick-slider-container .next-btn',
            }
          }
        ]
      });
    },
  };
})(Drupal, jQuery);
