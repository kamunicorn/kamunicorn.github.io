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
    let popup = document.querySelector('.popup.' + popupClass);
    showElem.call(popup);
    document.body.style.overflow = 'hidden';
    // console.log('множ.назначение события shoPopup');
}

function closePopup(popup) {
    hideElem.call(popup);
    document.body.style.overflow = '';
    // console.log('множ.назначение события closePopup');
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
    success: {
        title: 'Спасибо!',
        message: 'Спасибо! Скоро мы с вами свяжемся!'
    },
    failure: {
        title: 'Ошибка',
        message: 'Извините, произошла какая-то ошибка.'
    }
};

    // отправляет данные в formData, атрибут data - необязателен (данные, которые надо отправить дополнительно к данным с формы), форма - this
function submitForm(form, data) {
    let formInputs = form.querySelectorAll('input'),
        formData = new FormData(form);

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
    
    let request = new XMLHttpRequest();
    
    request.open('POST', 'server.php');
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    // request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    request.send(formData);
    
    request.onreadystatechange = function() {
        if (request.readyState < 4) {
            setStatus('loading', form);
        } else if (request.readyState === 4 && request.status === 200) {
            setStatus('success', form);
        } else {
            setStatus('failure', form);
        }
    };

    formInputs.forEach( (input) => input.value = '' );
}

function setStatus(type, form) {
    if (type == 'loading') {
        let statusBox = document.createElement('div');
        statusBox.classList.add('status');
        form.appendChild(statusBox);
        statusBox.innerHTML = statusMessage.loading;
        setTimeout(() => statusBox.remove(), 3000);

    } else if (type == 'success' || type == 'failure') {

        if (form.classList.contains('popup-form')) {
            let popup = document.querySelector('.popup.popup-form');
            if (form == popup.querySelector('form')) {
                closePopup(popup);
            }
        }
        showPopup('thanks');
        let statusTitle = document.querySelector('.thanks__title'),
            statusText = document.querySelector('.thanks__text');

        statusTitle.innerText = statusMessage[type].title;
        statusText.innerText = statusMessage[type].message;
    }

}
