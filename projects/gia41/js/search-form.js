// раньше открытие (визуально) происходило путем добавления класса .active блоку-родителю (.search-form)

jQuery(function() {
    initSearchForm();
});

function initSearchForm() {
    // родитель (position: static) с высотой 0 содержит стилизованный блок формы
    var parent = $('.search-form'),
        search = parent.children();
        openBtn = $('#open-search-form'),
        isOpened = false, // применяется для того, чтобы ставить фокус на инпут или кнопку открытия (в зависимости была открыта форма или нет)
        input = search.find('input'),
        closeBtn = search.find('#close-search-form');

    parent.hide();
    search.hide();

    // по клику на кнопку "Открыть поиск" (с иконкой или любую другую, определенную по id) может проиходить как открытие, так и ее закрытие
    openBtn.click(function() {
        if (isOpened) {
            close();
        } else {
            open();
        }
        isOpened = !isOpened;
    });

    closeBtn.click(function() {
        isOpened = false;
        close();
    });

    // после открытия формы фокус ставится на инпут
    function open() {
        parent.show();
        search.slideDown();
        input.focus();
    }

    // после закрытия формы фокус ставится на кнопку открытия
    function close() {
        search.slideUp(function() {
            parent.hide();
            openBtn.focus();
        });
    }
}
