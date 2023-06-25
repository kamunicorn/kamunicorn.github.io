/* NOTES:
 * нажатие клавиш на $dropdown воспринимается как click! и событие 'click' срабатывает после нажатия клавиш, причем 2 раза
 * почему-то при первичной загрузке при фокусе на контроле не срабатывают события клавиш вверх-вниз
*/

$(function() {
    $('.ui-select_custom').each(initSelectCustom);
});

function initSelectCustom() {
    var $select = $(this),
        $control = $select.find('.ui-select__control'),
        // $notification = $select.find('.js-notification'),
        $dropdown = $select.find('.ui-select__options-box'), // dropdown box with list of options
        $options = $dropdown.find('.ui-select__option input:radio'),

        isSelectOpen = false,
        count = $options.length, // count of options in this select
        selected; // index of selected value in list of options
    
    // init
    $control.attr('aria-expanded', false);
    if ($options.filter(':checked')) {
        $control.attr('data-value', $options.filter(':checked').attr('value'));
    }
    
    // закрытие кликом мышкой
    // открытие - кликом мышкой, клавишей пробел или Enter
    $control.click(function() {
        (isSelectOpen) ? close() : open();
    });

    // здесь проверяется количество option, если оно изменилось с момента инициализации
    // и тогда пересчитывается $options, count
    $control.focus(function() {
        if ($dropdown.children().length != count) {
            $options = $dropdown.find('.ui-select__option input:radio');
            count = $options.length;
        }
    });

    // нажатие клавиш вверх-вниз, влево-вправо на кнопке открытия селекта $control
    // переключение значения селекта, не раскрывая список
    $control.keydown(function(e) {
        var old = selected,
            // 40 - arrow down, 39 - arrow right
            // 38 - arrow up, 37 - arrow left
            dir =   (e.which == 40 || e.which == 39) ? 'down' :
                    (e.which == 38 || e.which == 37) ? 'up' : // TODO
                    null;
        if (dir) e.preventDefault();

        if (dir == 'down' && selected < count - 1) { // не последний option в списке
            selected++;
        } else if (dir == 'up' && selected > 0) { // не первый option в списке
            selected--;
        } else return;
        if (old == selected) return;

        $options.eq(old).removeAttr('checked');
        $options.eq(selected).attr('checked', 'checked');
        refreshControl(selected);
    });
    
    // делегирование через $dropdown события change их радиокнопкам с немедленным обновлением $control
    $dropdown.on('change', 'input[type="radio"]', function(e) {
        selected = $options.index(e.target);
        refreshControl(selected);
    });

    // закрытие $dropdown с помощью клавиш enter, esc, tab, shift tab
    // при этом значение селекта уже выбрано и записано в $control
    $dropdown.keydown(function(e) {
        // 13 = enter, 9 = tab, 27 = esc
        if (e.which == 13) {
            $dropdown.change();
        }
        if (e.which == 13 || e.which == 9 || e.which == 27) {
            e.preventDefault();
            close();
        }
    });

    // клик мышью по option (делегирование через $dropdown) с последующим закрытием
    /* NOTE: нажатие клавиш (выбор radio-кнопок) он также воспринимает как click! и событие 'click' срабатывает после нажатия клавиш, причем 2 раза (поэтому тут mouseup) */
    $dropdown.on('mouseup', function(e) {
        $dropdown.change();
        close();
    });

    
    /* Functions */

    // обновление данных в $control, атрибуты value="Математика", data-value="math"
    function refreshControl(index) {
        var $option = $options.eq(index),
            optionData = {
                'id': $option.val(),
                'text': $option.parent().find('.ui-radio__text').text()
            };
        $control.attr('data-value', optionData.id);
        $control.val(optionData.text);
    }

    // вставка текста в скрытое поле, доступное только для скринридеров (уведомление о выборе для незрячих)
    /* function notify(selected) {
        var optionData = getOptionData(selected);
        $notification.text('Выбрано значение: ' + optionData.text);
        setTimeout(function() {
            $notification.text('');
        }, 1000);
    } */

    // открытие селекта
    function open() {
        $dropdown.show();
        var $selectedOption = $options.filter(':checked');
        if ($selectedOption.length > 0) {
            $selectedOption.focus();
        } else {
            $options.first().focus();
        }
        isSelectOpen = true;
        $control.attr('aria-expanded', true);
    }
    // закрытие селекта
    function close() {
        $dropdown.hide();
        $control.focus();
        isSelectOpen = false;
        $control.attr('aria-expanded', false);
    }
}
