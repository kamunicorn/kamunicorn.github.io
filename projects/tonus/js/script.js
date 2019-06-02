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

    // Адреса всех магазинов для карты
    let shops = [
                // поселки
            {
                'name': 'магазин «Татьяна»',
                'info': 'Камчатский край, Елизовский район, с. Сосновка, магазин «Татьяна»'
            }, {
                'name': 'магазин «Эконом»',
                'info': 'Камчатский край, Елизовский район, п. Вулканный, магазин «Эконом» (ул. Центральная, 12)'
            }, {
                'name': 'магазин «Гамбринус»',
                'info': 'Камчатский край, п. Пионерский, ул. Николая Коляды, 9'
            },
                // Елизово
            {
                'name': 'магазин «Центральный»',
                'info': 'Камчатский край, г. Елизово, магазин «Центральный»'
            }, {

                'name': 'магазин «Камадор»',
                'info': 'Камчатский край, г. Елизово, ул. Пограничная, 27а'
            }, {
                'name': 'Ярмарка камчатских производителей',
                'info': 'Камчатский край, г. Елизово, ул. Завойко, 29а, Ярмарка камчатских производителей'
            }, {
                'name': 'Ярмарка камчатских производителей',
                'info': 'Камчатский край, г. Елизово, ул. Завойко, 6, Ярмарка камчатских производителей'
            }, {
                'name': 'магазин «Сюрприз»',
                'info': 'Камчатский край, г. Елизово, ул. В. Кручины, 13а, магазин «Сюрприз»'
            }, {
                'name': 'магазин «Продукты»',
                'info': 'Камчатский край, г. Елизово, ул. Беринга, 6, магазин «Продукты»'
            }, {
                'name': 'магазин «Фирюза»',
                'info': 'Камчатский край, г. Елизово, ул. Магистральная, 41а, магазин «Фирюза»'
            },
                // г. Петропавловск-Камчатский, 
            {
                'name': 'ТЦ «Агротек»',
                'info': 'г. Петропавловск-Камчатский, ул. Ларина, 7/1, ТЦ «Агротек» '
            }, {
                'name': 'магазин «Агротек»',
                'info': 'г. Петропавловск-Камчатский, ул. Мишенная, 120, магазин «Агротек»'
            }, {
                'name': 'ТЦ «Крым»',
                'info': 'г. Петропавловск-Камчатский, ул. Вольского, 8, ТЦ «Крым»'
            }, {
                'name': 'ТЦ «Меркурий»',
                'info': 'г. Петропавловск-Камчатский, ул. Ак. Королёва, 45/3, ТЦ «Меркурий»'
            }, {
                'name': 'магазин «Юбилейный»',
                'info': 'г. Петропавловск-Камчатский, 50 лет Октября, 24, магазин «Юбилейный»'
            }, {
                'name': 'магазин «Юбилейный»',
                'info': 'г. Петропавловск-Камчатский, ул. Ленинградская, 74, магазин «Юбилейный»'
            }, {
                'name': 'КВЦ, павильон «Сделано на Камчатке»',
                'info': 'г. Петропавловск-Камчатский, ул. Ленинская, 62'
            }
        ];
        
        // Создание карт - с магазинами и адресом производства
    ymaps.ready(init);
    function init() {
    
            // Создание карты с магазинами
        let shopsMap = new ymaps.Map("shops__map-container", {
            center: [53.021109, 158.647728],
            zoom: 12,
            controls: ['zoomControl', 'typeSelector',  'fullscreenControl', 'routeButtonControl']
        }, {
            searchControlProvider: 'yandex#search'
        });
    
        // Строка с адресом, который необходимо геокодировать
        for (let i = 0; i < shops.length; i++) {
            let shopName = shops[i]['name'],
                shopInfo = shops[i]['info'];

            // Ищем координаты указанного адреса
            // https://tech.yandex.ru/maps/doc/jsapi/2.1/ref/reference/geocode-docpage/
            let geocoder = ymaps.geocode(shopInfo);

            // После того, как поиск вернул результат, вызывается callback-функция
            geocoder.then(
                function (res) {
        
                    // координаты объекта
                    let coordinates = res.geoObjects.get(0).geometry.getCoordinates();
        
                    // Добавление метки (Placemark) на карту
                    let placemark = new ymaps.Placemark(
                        coordinates, {
                            'balloonContent': shopInfo,
                            'iconCaption': shopName
                        }, {
                            preset: 'islands#greenDotIconWithCaption',
                            iconColor: '#739535'
                        }
                    );
        
                    shopsMap.geoObjects.add(placemark);
                }
            );
        }
        shopsMap.behaviors.disable('scrollZoom');

            // Создание карты с поизводством
        let contactMap = new ymaps.Map("contact__map-container", {
            center: [53.081185, 158.299736],
            zoom: 16,
            controls: ['zoomControl', 'typeSelector',  'fullscreenControl', 'routeButtonControl']
        }, {
            searchControlProvider: 'yandex#search'
        });
        
            // Добавление метки (Placemark) на карту
        let point = new ymaps.GeoObject({
            // Описание геометрии.
            geometry: {
                type: "Point",
                coordinates: [53.081185, 158.299736]
            },
            // Свойства.
            properties: {
                iconCaption: 'Производство хлеба «Тонус»',
                balloonContent: 'Камчатский край, Елизовский район, с. Сосновка, ул. Центральная, д. 2а',
                hintContent: 'Камчатский край, Елизовский район, с. Сосновка, ул. Центральная, д. 2а'
            }
        }, {
            // Опции.
            preset: 'islands#greenDotIconWithCaption',
            iconColor: '#739535'
        });

        contactMap.geoObjects.add(point);
        contactMap.behaviors.disable('scrollZoom');
    }
        
});