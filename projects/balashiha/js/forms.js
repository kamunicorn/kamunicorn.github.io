
// function forms() {
"use strict";
document.addEventListener('DOMContentLoaded', () => {

        // проверка инпутов для телефона и имени
    let phoneInputs = document.querySelectorAll('input[type=tel]'),
        // mailInputs = document.querySelectorAll('input[type=mail]'),
        nameInputs = document.querySelectorAll('input[type=text]');
        
    phoneInputs.forEach( (inp) => {
        inp.addEventListener('input', function() {
            this.value = verifyTelephone(this.value);
        });
    });

    nameInputs.forEach( (inp) => {
        inp.addEventListener('input', function() {
            this.value = removeNotLetters(this.value);
        });
    });
    
        // Submit forms
    let allForms = document.querySelectorAll('.offer-form');
        
    allForms.forEach( (form) => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            submitForm(this);
        });
    });

});
// }

// module.exports = forms;