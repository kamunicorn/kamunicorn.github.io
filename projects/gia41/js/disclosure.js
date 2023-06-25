$(function() {
    initDisclosure();
});

function initDisclosure() {
    var content = $('.js-disclosure-body'),
        openButton = $('.js-disclosure-open');

    openButton.on('click', function() {
        var wrapper = $(this).closest('.js-disclosure-wrapper'),
            content = wrapper.find('.js-disclosure-body');
        
        content.slideToggle();

        // после открытия поменять aria-атрибут на противоположный
        var isExpanded = ( $(this).attr('aria-expanded') == 'true' ) ? true : false;
        $(this).attr('aria-expanded', !isExpanded);
    });

    // aria-атрибут, озвучивается скринридером как "закрыто"
    openButton.attr('aria-expanded', 'false');
    content.hide();
}
