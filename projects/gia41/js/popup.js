
/* Для пользователей скрин ридеров предусмотрено:
 * - при открытии всплывающего окна - происходит фокус на нем;
 * - при закрытии всплывающего окна - происходит фокус на элементе, который был в фокусе до его открытия.
 * 
 * Если еще добавить элементу окна (.popup) атрибут tabIndex, т.е. сделать его фокусабельным, то при фокусе на нем скринридер начнет читать его содержимое.
 * 
 * Не реализовано:
 * - ловушка фокуса на всплывающем окне, т.е. при открытом всплывающем окне нельзя переместить фокус вне его.
 */

var popupParams = {
        'parent': '.popup',
        'overlay': '.popup__overlay',
        'body': '.popup__body',
        'close': '.popup__close',
        'setTabIndex': true // устанавливать tabIndex или нет
    },
    lastFocus;

jQuery(function($) {
    lastFocus = getLastFocus();

    initPopups(popupParams);
});

function initPopups(params) {

    $(params.parent).each(function() {
        var popup = $(this),
            inners = getInnersOfPopup(popup, params);

        inners.overlay.hide();
        inners.body.hide();
            
        inners.close.click(function() {
            close(popup, inners, lastFocus);
        });

        inners.overlay.click(function() {
            close(popup, inners, lastFocus);
        });

    });

    function close(popup, inners, lastFocus) {
        inners.overlay.fadeOut();
        $(inners.body).slideUp(function() {
            // popup.hide();
            popup.attr('hidden', 'hidden');
            if (params.setTabIndex) popup.removeAttr('tabIndex');
            if (lastFocus) lastFocus.focus();
        });
    }
}

function getInnersOfPopup(popup, params) {
    return {
        'close': popup.find(params.close),
        'overlay': popup.find(params.overlay),
        'body': popup.find(params.body)
    };
}

function openPopup(selector) {
    var popup = $(popupParams.parent).filter(selector),
        inners = getInnersOfPopup(popup, popupParams);

    lastFocus = getLastFocus();

    // popup.show();
    popup.removeAttr('hidden');
    inners.overlay.fadeIn();
    inners.body.slideDown();

    if (popupParams.setTabIndex) popup.attr('tabIndex', '-1');
    popup.focus();
}

function getLastFocus() {
    return document.activeElement;
}
