$(function($)
{
	$('.slider').each(function()
	{
		var $block = $(this);
		
		makeSlider($block, {
			width: $block.data('width'), // ширина одной колонки
			//cols: $block.data('cols'),
			onslide: $block.attr('onslide'), // обработчик события прокрутки
			autoplay: $block.data('autoplay'), // проигрывать автоматически
			delay: $block.data('delay'), // время показа одного кадра
			shift: $block.data('shift') // кол-во колонок, прокручиваемое за один раз
		});
	})
	
	
	function makeSlider($block, opts)
	{
	var
		// ??? значения по умолчанию
		opts = $.extend({width: 100, shift: 1/*, cols: 1*/}, opts),
		
		index = 0,		
		count = $('.slider__item', $block).length,

		$controls = $('.slider__controls', $block),
		$left = $('.left', $controls),
		$right = $('.right', $controls),
		
		disable = !!$left.attr('disabled'), // нужно ли деактивировать кнопки при достижении границ списка слайдов?
		// если нет - то слайдер будет зациклен
		
		cols = Math.round(100 / opts.width), //кол-во колонок в видимой часте слайдера
		
		DUMMY;
		


		
		$left.click(function() {rotate(-opts.shift)});
		$right.click(function() {rotate(opts.shift)});
		$('.js-dot', $controls).click(locate)
		update();
		
		function locate()
		{
			before();
			index = $(this).index();
			nofity();
			after();
			update();
		}
		
		function rotate(shift)
		{
			before();
			
			if ( disable )
				// сложение с насыщением
				index = Math.min( Math.max(0, index + shift), count-cols );
			else
				// сложение по модулю count
				index = (count + index + shift) % count;
			
			nofity();
			after();
			update();
		}
		
		function before()
		{
			$('.ui-dot', $controls).eq(index).removeClass('active');
		}
		function after()
		{
			$('.slider__row', $block).css('transform', 'translate(-' + (opts.width * index) + '%)');
			$('.ui-dot', $controls).eq(index).addClass('active');
		}
		function nofity()
		{
			if ( opts.onslide ) count = window[opts.onslide]( index, count ) || count;
		}
		function update()
		{
			if ( disable )
			{
				if ( index <= 0 ) $left.attr('disabled', ''); else $left.removeAttr('disabled');
				if ( index >= count-cols ) $right.attr('disabled', ''); else $right.removeAttr('disabled');
			}
		}
	}
})



function onSlideNews(index, count)
{
	//alert(index);
}