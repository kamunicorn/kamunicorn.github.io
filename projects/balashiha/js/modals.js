// function modals() {
"use strict";

document.addEventListener('DOMContentLoaded', () => {
    
        // Кнопки "Посмотреть" в каталоге продукции
    let productButtons = document.querySelectorAll('button.product__button');
    productButtons.forEach((btn) => {
        btn.addEventListener('click', function() {
            showPopup(this.id);
        });
    });

        // Текст "Перезвоните мне! в баре"
    let callMeRequest = document.querySelector('.call-me__request .call-me__text');
    callMeRequest.addEventListener('click', () => {
        showPopup('call-offer');
    });

        // Все модалки
    let popups = document.querySelectorAll('.popup');

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
});
// }

// module.exports = modals;