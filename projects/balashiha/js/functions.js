"use strict";

function addZero(digit) {
	return (digit < 10) ? '0' + digit : '' + digit;
}

function verifyTelephone(str) {
	let s = removeNotDigits(str);
	return (s == '') ? '' : s;
}

function verifyEmail(str) {
    return (str.replace(/[^-.@_a-z0-9]/gi, '')).replace(/ /gi, '');
}

function removeNotDigits(str) {
	return str.replace(/[\D]/gi, '');
}

function removeNotLetters(str) {
    return (str.replace(/[^a-zа-яё ]/gi, '')).replace(/  /gi, ' ');
}

function showPopup(popupClass) {
    let popup = document.querySelector('.popup.' + popupClass);
    popup.animate([
        {"opacity": 0},
        {"opacity": 1}
    ], {
        duration: 600
    });
    showElem.call(popup);
    document.body.style.overflow = 'hidden';
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