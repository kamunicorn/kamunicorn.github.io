
$(function() {
    initSoundSwitchers();
    initBookmarks();

    initComboboxes('.ui-filter', '.ui-filter__control');
    initComboboxes('.ui-sorting', '.ui-sorting__control');

    initCheckboxes();
    initTablist();
    initSubjectsMore();
});

// вкладки с категориями
function initTablist() {
    $('.ui-subjects').on('click', '.ui-subjects__item:not(.has-dropdown) .ui-subjects__btn', function(e) {
        let $target = $(e.target),
            $tab = ($target.hasClass('.ui-subjects__btn')) ? $target : $target.closest('.ui-subjects__btn'),
            $currentTab = $('.ui-subjects__btn.is-active');

        if ($tab && !$tab.hasClass('is-active')) {
            $currentTab.removeClass('is-active');
            $tab.addClass('is-active');

            refreshContent();
        }
    });
}

// кнопки Еще... и Смотреть все категории (на мобилках)
function initSubjectsMore() {
    let $subjectsMoreWrappers = $('.js-subjects-more'),
        $options = $subjectsMoreWrappers.find('.ui-dropdown__item');
    console.log($subjectsMoreWrappers);
    console.log($options);

    $subjectsMoreWrappers.each( function(i, elem) {
        let $wrapper = $(elem),
            $dropdown = $wrapper.find('.ui-dropdown');

        $dropdown.on('click', '.ui-dropdown__item', function(e) {
            let $target = $(e.target),
                $option = ( $target.hasClass('ui-dropdown__item') ) ? $target : $target.closest('.ui-dropdown__item');
            
            if ($option) {
                let $currentTab = $('.ui-subjects__btn.is-active'),
                    old = {
                        'id': $currentTab.data('id'),
                        'innerHTML': $currentTab.html()
                    },
                    selected = {
                        'id': $option.data('id'),
                        'innerHTML': $option.html()
                    };
                $currentTab.data('id', selected.id);
                $currentTab.html(selected.innerHTML);

                $options.filter(`[data-id="${selected.id}"]`).data('id', old.id);
                $options.filter(`[data-id="${selected.id}"]`).html(old.innerHTML);
                
                refreshContent();                
            }
        });
    });
}

function initCheckboxes() {
    $('#control-content input:checkbox').change( function() {
        refreshContent();
    });
}

// кнопки Добавить в закладки ()
// ajax
function initBookmarks() {
    $('.js-add-bookmark').each( function(i, elem) {
        let $bookmark = $(elem);

        $bookmark.click(function() {
            let projectId = $bookmark.data('project'),
                // action = ($bookmark.hasClass('is-filled')) ? 'delete' : 'add',
                action = ($bookmark.hasClass('is-filled')) ? 'delete-bookmark' : 'add-bookmark',
                request = {
                    'action': action,
                    'projectId': projectId
                };
            // console.log(request);
            
            // $.ajax('api/manage-bookmark.php', {
            $.ajax('api/add-bookmark.json', {
                method: 'GET',
                data: request,
                success: function(response) {
                    // console.log(response);
                    // let processedProjectId = response.projectId,
                    let processedProject = projectId,
                        // $processedBookmark = $bookmark,
                        $processedBookmark = $(`.js-add-bookmark[data-project="${processedProject}"]`);
                    
                    // console.log($processedBookmark);
                    $processedBookmark.toggleClass('is-filled');
                }
            });

        });
    });
}

// кнопки включения/отключения звука
function initSoundSwitchers() {
    $('.js-switch-sound').each( function(i, elem) {
        let $switcher = $(elem);
        
        $switcher.click(function() {
            let videoElem = $('#' + $switcher.data('video'))[0];
            videoElem.muted = !videoElem.muted;
            $switcher.toggleClass('is-sound-off is-sound-on');
        });
    });
}

// выпадающие списки для сортировки и фильтрации
function initComboboxes(comboboxWrapper, comboboxControl) {
    $(comboboxWrapper).each( function(i, elem) {
        let $combobox = $(elem),
            $control = $combobox.find( comboboxControl ),
            $dropdown = $combobox.find('.ui-dropdown');

        $control.click( function() {
            $combobox.toggleClass('is-open');
        });

        $dropdown.on('click', '.ui-dropdown__item', function(e) {
            let $target = $(e.target),
                $currentOption = $dropdown.find('.ui-dropdown__item.is-active'),
                $option = ( $target.hasClass('ui-dropdown__item') ) ? $target : $target.closest('.ui-dropdown__item');
            
            if ($option && !$option.hasClass('is-active')) {
                $currentOption.removeClass('is-active');
                $option.addClass('is-active');
                let selected = {
                    'id': $option.data('id'),
                    'innerHTML': $option.html()
                };
                $control.find('.js-selected').html(selected.innerHTML);
                $control.data('selected', selected.id);
                $combobox.removeClass('is-open');
                
                refreshContent();
                // console.log(selected);
                // console.log($control.data('selected'));
            }
        });
    });
}

// "рендер" контента (рендер на сервере, я просто вставляю)
// ajax
function refreshContent() {
    let formData = collectData();
    console.log(formData);

    $.ajax({
        url: 'api/insert-content.html',
        method: 'GET',
        data: formData,
        success: function(response) {
            console.log(response);
            $('#js-render-container').html(response);

            initSoundSwitchers();
            initBookmarks();
        }
    });
}

function collectData() {
    return {
        'subject': $('[data-name="subject"].is-active').data('id'),
        'statusCollecting': $('input:checkbox[name="status-collecting"]')[0].checked,
        'statusFinished': $('input:checkbox[name="status-finished"]')[0].checked,
        'sortBy': $('[data-name="sorting"]').data('selected'),
        'filterByArea': $('[data-name="area"]').data('selected'),
        'filterByOwner': $('[data-name="owner"]').data('selected')
    };
}
