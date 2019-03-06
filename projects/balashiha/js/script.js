'use strict';

document.addEventListener('DOMContentLoaded', () => {
    let productButtons = document.querySelectorAll('button.product__button');

        productButtons.forEach(btn, () => {
            btn.addEventListener('click', function() {
                console.log(this.id);
                showPopup(this.id);
            });
        });
});