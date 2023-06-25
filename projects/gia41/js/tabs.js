jQuery(function() {
    $('.tabbed').each(function() {
        initTabs($(this));
    });
});

function initTabs(block) {
    var tabs = block.find('.ui-tab'),
        panels = block.find('[id*=tabpanel]'),
        index = 0;

    before(); // обнуление
    switchTab(index);

    tabs.click(function(e) {
        var tab = $(e.target);
        // если клик не по активной вкладке
        if (!tab.hasClass('active')) {
            index = tabs.index(tab);
            before();
            switchTab(index);
            tab.focus();
        }
    });

    // нажатие клавиш влева-вправо-вниз
    tabs.keydown(function(e) {
        // получаем код нажатой клавиши
        var dir = (e.which === 37) ? index - 1 // влево
            : (e.which === 39) ? index + 1 // вправо
            : (e.which === 40) ? 'down' 
            : null;

        // если нажали "вниз"
        if (dir == 'down') {
            e.preventDefault();
            var wantedPanel = $(e.target).attr('target');
            panels.filter('#' + wantedPanel).focus();
        } else  // если нажали "вверх" или "вниз"
        if (dir != null && tabs.eq(dir)) {
            index = dir;
            before();
            switchTab(index);
            tabs.eq(dir).focus();
        }
    });

    // "обнуление" - скрытие всех панелей, снятие признаков активной вкладки
    function before() {
        panels.attr('hidden', 'hidden');
        tabs.removeClass('active');
        tabs.removeAttr('aria-selected');
        tabs.attr('tabIndex', '-1');
    }

    // установка активной вкладки, показ ее панели
    function switchTab(index) {
        var tab = tabs.eq(index);

        tab.removeAttr('tabIndex');
        tab.addClass('active');
        tab.attr('aria-selected', true);
        
        // показ содержания вкладки, находится по id
        panels.filter('#' + tab.attr('target')).removeAttr('hidden');
    }
}
