'use strict';
document.addEventListener('DOMContentLoaded', () => {
    let popups = document.querySelectorAll('.popup'),
        linksMoreInfo = document.querySelectorAll('.case__more-info');

        // открытие модалки
    linksMoreInfo.forEach( (link) => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector('.popup.' + this.id).style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });

        // закрытие модалки
    popups.forEach( (popup) => {
        let close = popup.querySelector('.popup__close');
        
        close.addEventListener('click', () => {
            closePopup(popup);
        });
        popup.addEventListener('click', function(event) {
            let e = event || window.event;
            if (e.target == this) {
                closePopup(popup);
            }
        });
    });

        // плавная прокрутка по клику на ссылке из меню
    let navbarMenu = document.querySelector('.navbar__menu');

    navbarMenu.addEventListener('click', (e) => {
        e.preventDefault();
        if (e.target.classList.contains('navbar__link')) {
            let id = e.target.getAttribute('href');
            
            document.querySelector(id).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });

});

function closePopup(popup) {
    popup.style.display = 'none';
    document.body.style.overflow = '';
}