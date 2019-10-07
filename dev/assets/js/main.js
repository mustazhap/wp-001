// Parallax with rellax
var rellax = new Rellax('.rellax', { 
    center: false,
    wrapper: null,
    round: true,
    vertical: true,
    horizontal: false
});


$(document).ready(function () {
    //initialize swiper when document ready
    var mySwiper = new Swiper ('.slider-container', {
        // Optional parameters
        loop: true,
        // If we need pagination
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
    
      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    })

    var mySwiper2 = new Swiper ('.news__line', {
        // Optional parameters
        slidesPerView: 4,
        spaceBetween: 30,
        // If we need pagination
        simulateTouch:false,
    
      // Navigation arrows
      navigation: {
        nextEl: '.news-button-next',
        prevEl: '.news-button-prev',
      },
    })
    var mySwiper3 = new Swiper ('.team__list', {
        // Optional parameters
        slidesPerView: 6,
        spaceBetween: 30,
        // If we need pagination
        simulateTouch:false,
    
      // Navigation arrows
      navigation: {
        nextEl: '.team-button-next',
        prevEl: '.team-button-prev',
      },
    })
});

$(document).on('click','.spoiler__title',function(e){
  e.preventDefault();
  $(this).find(".fas").toggleClass("icon-active")
  $(this).toggleClass('spoiler-active');
  $(this).parent().find('.spoiler__body').first().slideToggle(500);
})
$(document).on('click','.spoiler__close',function(e){
  e.preventDefault();
  $(this).parent().parent().parent().find(".fas").toggleClass("icon-active")
  $(this).toggleClass('spoiler-active');
  $(this).parent().parent().first().slideToggle(500);
})