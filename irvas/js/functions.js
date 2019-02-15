"use strict";

function addZero(digit) {
	return (digit < 10) ? '0' + digit : '' + digit;
}

function verifyTelephone(str) {
	let s = removeNotDigits(str);
	return (s == '') ? '' : s;
}

function removeNotDigits(str) {
	return str.replace(/[\D]/gi, '');
}

function removeNotLetters(str) {
    return str.replace(/[^a-zа-яё]/gi, '');
}

function showPopup(popupClass) {
    let popup = document.querySelector('.' + popupClass),
        close = popup.querySelector(`.${popupClass}_close`);

    showElem.call(popup);
    document.body.style.overflow = 'hidden';

    close.addEventListener('click', () => {
        closePopup(popup);
    });

    popup.addEventListener('click', function(event) {
        let e = event || window.event;
        if (e.target == this) {
            closePopup(popup);
        }
    });
}

function closePopup(popup) {
    hideElem.call(popup);
    document.body.style.overflow = '';
}

function showElem() {
    this.style.display = 'block';
}

function hideElem() {
    this.style.display = 'none';
}

    // Submit form

let statusMessage = {
    loading: 'Загрузка...',
    success: 'Спасибо! Скоро мы с вами свяжемся!',
    failure: 'Что-то пошло не так.'
};

    // отправляет данные в formData, атрибут data - необязателен (данные, которые надо отправить дополнительно к данным с формы), форма - this
function submitForm(data) {
    let formInputs = this.querySelectorAll('input'),
        statusBox = document.createElement('div');

    statusBox.classList.add('status');
    this.appendChild(statusBox);
    let formData = new FormData(this);

         // append Object to FormData
    if (data) {
        for (let key in data) {
            formData.append(key, data[key]);
        }
    }

    /*    // FormData to Object
    let json = (data) ? data : {};
    for (const [key, value]  of formData.entries()) {
        json[key] = value;
    }

    let formData2 = JSON.stringify(json);
    console.warn('json : formData -> JSON , append data from JSON');
    console.log(json);
    console.warn('formData2 = JSON.stringify(json) : formData -> JSON , append data from JSON');
    console.log(formData2);
    formData = formData2; */
    
    function postData(data) {

        return new Promise(function(resolve, reject) {
            let request = new XMLHttpRequest();
            request.open('POST', 'server.php');
            request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            // request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
            
            request.onreadystatechange = function() {
                if (request.readyState < 4) {
                    // resolve();
                    statusBox.innerHTML = statusMessage.loading;
                } else if (request.readyState === 4 && request.status === 200) {
                    resolve();
                } else {
                    reject();
                }
            };

            request.send(data);

        });
    }	// End postData

    postData(formData)
            // .then(() => statusBox.innerHTML = statusMessage.loading)
            .then(() => statusBox.innerHTML = statusMessage.success)
            .catch(() => statusBox.innerHTML = statusMessage.failure);
    
    formInputs.forEach( (input) => input.value = '' );
    setTimeout(() => statusBox.remove(), 3000);
}
