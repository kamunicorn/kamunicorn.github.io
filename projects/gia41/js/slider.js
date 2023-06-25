'use strict';

$(function($) {
    initSlider({
        steps: 'max',
        block: '.js-slider',
        viewport: '.js-translate-row',
        // viewport: '.js-slider-viewport',
        row: '.js-translate-row',
        left: '.js-left-slide',
        right: '.js-right-slide',
        dotsList: '.ui-dotslist',
        dot: '.ui-dot'
    });
        // step: 1 // сколько слайдов прокручивать за раз
        // step: 'max' // максимальное количество слайдов (сколько влезает в контейнер, столько и прокручивать)
});
function initSlider(opts) {
    // step - сколько блоков прокручивать за раз, 
    $( opts.block ).each(function() {
        let $slider = $(this),
            $row = $slider.find( opts.row ),
            $left = $slider.find( opts.left ),
            $right = $slider.find( opts.right),

            iShift = 0, // смещение сейчас (сколько итемов смещено)
            params = _calcParams($slider, opts.steps);
            
        $left.click(function() {
            if (iShift > 0) {
                iShift -= params.iShiftStep;
                iShift = (iShift > 0) ? iShift : 0;
                _shift($row, iShift, params);
                $right.removeAttr('disabled');
                if (iShift <= 0) { // конец слайдера слева
                    $left.attr('disabled', 'disabled');
                }
            }
        });

        $right.click(function() {
            if (iShift < params.iShiftMax) {
                iShift += params.iShiftStep;
                iShift = (iShift < params.iShiftMax) ? iShift : params.iShiftMax;
                _shift($row, iShift, params);
                $left.removeAttr('disabled');
                if (iShift >= params.iShiftMax) { // конец слайдера справа
                    $right.attr('disabled', 'disabled');
                }
            }
        });
        
        $(window).resize(function() {
            params = _calcParams($slider, opts.steps);
        });
    });

    // параметры трансляции в px и единицах
    function _calcParams($slider, steps) {
        let $row = $slider.find( opts.row ),
            $items = $row.children();
        
        let params = {
            pxWidthWrapper: $row.closest( opts.viewport ).width(), // ширина зоны просмотра, в которой находятся элементы слайдера
            pxWidthItem: $items.first().outerWidth() // ширина элемента слайдера в px
        };
        params.pxGap = parseInt($row.css('column-gap'));
        params.pxGap = ( isNaN(params.pxGap) ) ? 0 : params.pxGap;
        params.pxTranslateStep = params.pxWidthItem + params.pxGap; // минимальная величина translateX для смещения
        params.pxWidthRow = params.pxTranslateStep * $items.length - params.pxGap; // ширина всей строки со слайдами, без padding
        params.pxTranslateMax = params.pxWidthRow - params.pxWidthWrapper; // максимальная величина translateX для смещения

        params.iShiftStep = 1; // на сколько слайдов смещать за раз
        if (steps == 'max') {  // сколько слайдов влезает в окно просмотре, столько и мотать
            params.iShiftStep = Math.floor( (params.pxWidthWrapper + params.pxGap) / params.pxTranslateStep );
        }
        params.iShiftMax = Math.ceil(params.pxTranslateMax / params.pxTranslateStep); // максимальное количество слайдов для смещения
        console.log(params);
        return params;
    }
    // сдвиг с помощью translate строки $row со слайдами
    function _shift($row, iShift, params) { // iShift - на сколько элементов слайдера сместить
        let pxTranslateNow = iShift * params.pxTranslateStep;
        if (iShift >= params.iShiftMax || pxTranslateNow >= params.pxTranslateMax) {
            pxTranslateNow = params.pxTranslateMax;
        }
        $row.css('transform', `translateX(-${pxTranslateNow}px)`);
    }
}
