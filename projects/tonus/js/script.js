$(document).ready(function(){
    'use strict';

    // аккордеон для адресов магазинов
    var acc = document.getElementsByClassName("shops__city");

    for (var i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function() {
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            } 
        });
    }

    // Открытие меню в мобильной версии
    $('.nav__menu-caption').on('click', function(){
        $('.nav')[0].classList.toggle("active");
    });

    // плавная прокрутка по клику на ссылке из меню
    $('nav.nav').on('click', function (e) {
        e.preventDefault();
        if (e.target.classList.contains('menu__link')) {
            let id = e.target.getAttribute('href');
            
            $(id)[0].scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });

    // Прокрутка к блоку с магазинами
    $('.main__button').on('click', function (e) {
        e.preventDefault();
        $('#shops')[0].scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });

    // Инициализация слайдера с наградами
    $('.awards-slider').slick({
        slidesToShow: 4,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
        arrows: false,
        focusOnSelect: true,
        dotsClass: 'slider__dots',
        adaptiveHeight: true,
        responsive: [{
            breakpoint: 1200,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 2
            }
        }, {
            breakpoint: 992,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2
            }
        }, {
            breakpoint: 768,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }]
    });
    
    let statusMessage = {
        loading: 'Загрузка...',
        success: 'Ваше письмо отправлено!',
        not_sent: 'Извините, письмо не отправлено по техническим причинам.',
        failure: 'Извините, произошла ошибка соединения с сервером.'
    };

        // отправка сообщения
    $('form.contact__form').on('submit', function(e) {
        e.preventDefault();
        let data = $(this).serialize(),
            form = e.target;

        $(form).find('.status').text(statusMessage.loading);
        
        $.ajax({
            url: 'mail/mailer.php',
            type: 'post',
            data: data,
            success: function (res) {
                $(form).find('.status').text(statusMessage[res]);
                clearForm(e.target);
            },
            error: function () {
                $(form).find('.status').text(statusMessage.failure);
                clearForm(e.target);
            }
        });
    });

    function clearForm(form) {
        setTimeout(function() {
            $(form).find('.status').text('');
            $(form)[0].reset();
        }, 3000);
    }
    
});