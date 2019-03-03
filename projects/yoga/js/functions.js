"use strict";

function addZero(digit) {
	return (digit < 10) ? '0' + digit : '' + digit;
}

function verifyTelephone(str) {
	let s = removeNotDigits(str);
	return (s == '') ? '' : '+' + s;
}

function removeNotDigits(str) {
	return str.replace(/[\D]/gi, '');
}

function removeNotLetters(str) {
    return str.replace(/[^a-zа-яё]/gi, '');
}

function isContainOnlyDigits(str) {  // проверка строки на содержание в ней только цифр (?и точки)
    if (str == null || str == '') {
        return false;
    }
    return !/[\D]/gi.test(str);   
}