$(function() {
    $('.js-accordion').each(initAccordion);
});

function initAccordion() {
    var $accordion = $(this),
        $open = $accordion.find('.js-accordion-open'),
        $wrapper = $accordion.find('.js-accordion-block'),
        $content = $accordion.find('.js-accordion-body'),

        oneOpenedBlock = true; // сворачивать ли остальные блоки после того, как откроется другой блок

    $open.attr('aria-expanded', 'false');
    $content.hide();
    toggleOpennes(0);

    $open.on('click', function() {
        var indexThis = $open.index($(this)),
            indexOpenedBlock = $wrapper.filter('.is-open').index();

        if (oneOpenedBlock && indexOpenedBlock >= 0 && indexOpenedBlock != indexThis) {
            toggleOpennes(indexOpenedBlock);
        }
        toggleOpennes(indexThis);
    });

    function toggleOpennes(index) {
        var isOpened = ( $wrapper.eq(index).hasClass('is-open') ) ? true : false;
            
        $wrapper.eq(index).toggleClass('is-open');
        $open.eq(index).attr('aria-expanded', !isOpened);
        $content.eq(index).slideToggle();
    }
}
