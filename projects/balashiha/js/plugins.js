$(document).ready(function(){
    $('.our-foto .slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        infinite: true,
        autoplaySpeed: 3000,
        adaptiveHeight: false,
        dots: true,
        dotsClass: 'slider__dots',
        fade: true,
        prevArrow: '<button class="slider__prev slider__arrow"></button>',
        nextArrow: '<button class="slider__next slider__arrow"></button>'
    });
});

VK.init({apiId: 6886610, onlyWidgets: true});
VK.Widgets.Like("vk-like", {type: "button", height: 20});