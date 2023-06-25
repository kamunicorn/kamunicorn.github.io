var lowVisionPanel = new Vue({
	el: '#low-vision-panel',
	data: {
		step: 'coloring',
		steps: [
			{name: 'coloring', caption: 'Настройка цветовой схемы'},
			{name: 'font-family', caption: 'Выбор шрифта'},
			{name: 'font-size', caption: 'Размер основного текста'},
			{name: 'font-effects', caption: 'Опции типографики'},
			{name: 'graphics', caption: 'Графика и картинки'}
		],

		color: {
			light_version: true,
			color_background: false,
			monochrome: false,
			high_contrast: false,

			hue1: 210, // данные значения должны передаваться извне (из текущих настроек)
			hue2: 350
		},

		fonts: fontsList,

		fontSizes: [
			{name: 'Мельче', size: 0.8},
			{name: 'Обычный', size: 1.0},
			{name: 'Крупнее', size: 1.2},
			{name: 'Большой', size: 1.5},
			{name: 'Гигантский', size: 1.8}
		],

		fontWeights: [
			{caption: 'Ультра-тонкий', value: 100},
			{caption: 'Тонкий', value: 300},
			{caption: 'Обычный', value: 400},
		],

		samples: [sample_1, sample_2, sample_3],

		font: { // данные для этих значений передаются скрипту извне (из текущих настроек)
			family: undefined,// семейство шрифта
			weight: 400, // толщина шрифта для regular
			size: 1, // повышающий коэффициент размера шрифта
			line: 1, // интерльяж (расстояние между строками)
			spacing: 0 // трекинг и разрядка (межбуквенный и межсловесный интервал)
		},

		loader: {
			state: 'done', //none, done, wait, fail
			status: '' // message
		},

		images: { // данные для этих значений передаются скрипту извне
			shading: false, //уменьшить яркость и контраст для темной темы
			important: false // оставить только важные изображения
		}

	},
	created: function() {
		let detector = new FontDetector();
		for (let i in this.fonts ) {
			this.fonts[i].visible = !(this.fonts[i].local && !detector.detect( this.fonts[i].family ));
		}
		//this.restore();
	},
	mounted: function() {
		this.restore();
	},
	computed: {
		getFontStyle: function() {
			let font = this.font;
			return {
				'font-size': font.size*100 + '%',
				'font-family': font.family,
				'font-weight': font.weight,
				'line-height': font.line,
				'letter-spacing': font.spacing + 'ch',
				'word-spacing': font.spacing * 1.5 + 'em'
			}
		},
		isStepFirst: function() {
			return this.getStepIndex() == 1;
		},
		isStepLast: function() {
			return this.getStepIndex() == this.steps.length;
		},
		previewPage: function() {
			//TODO: reference
			return '/main.htm?' + this.getColorParams() + '&' + this.getFontParams() + '&' + this.getImageParams() + '&' + this.getFontNameParams();
		}
	},
	methods: {
		cancel: function()
		{
			this.step = '';
		},
		apply: function()
		{
			let time = '; path=/; max-age=2592000';
			this.store(time);
			window.location.href = '/main.htm';//TODO
		},
		reset: function()
		{
			let time = '; path=/; max-age=0';
			this.store(time);
			window.location.href = '/main.htm';
		},
		store: function(time)
		{
			document.cookie = this.getColorParams() + time;
			document.cookie = this.getFontParams() + time;
			document.cookie = this.getImageParams() + time;
			document.cookie = this.getFontNameParams() + time;
		},
		restore: function()
		{
			function getCookie(name) 
			{
				let matches = document.cookie.match(new RegExp(
					"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
				));
				return matches ? decodeURIComponent(matches[1]) : undefined;
			}
			
			let param = getCookie('font');
			if ( param ) 
			{
				let font = param.split('-');				
				this.font.family = font[0];
				this.font.size = 1*font[1];
				this.font.weight = 1*font[2];
				this.font.line = 1*font[3];
				this.font.spacing = 1*font[4];
			}

			param = getCookie('graphic');
			if ( param )
			{
				let graphic = parseInt(param);
				this.images.shading = !!(graphic & 1);
				this.images.important = !!(graphic & 2);
			}
			
			param = getCookie('colors');
			if ( param )
			{
				let colors = param.split('-');
				this.color.hue1 = 1*colors[0];
				this.color.hue2 = (this.color.hue1 + 1*colors[1])%360;
				
				let opts = parseInt(colors[2]);
				
				this.color.light_version = !!(opts & 1);
				this.color.color_background = !!(opts & 2);
				this.color.monochrome = !!(opts & 4);
				this.color.high_contrast = !!(opts & 8);
			}				
		},

		getStepIndex: function()
		{
			for (let i = 0; i < this.steps.length; i++)
				if ( this.steps[i].name == this.step ) return i+1;
			return -1;
		},
		stepBackward: function()
		{
			let idx = this.getStepIndex();
			if ( idx > 1 ) this.step = this.steps[idx-2].name;
		},
		stepForward: function()
		{
			let idx = this.getStepIndex();
			if ( idx < this.steps.length ) this.step = this.steps[idx].name;
		},


		getFont: function( family )
		{
			for (let i = 0; i < this.fonts.length; i++ )
			{
				if ( this.fonts[i].family == family ) return this.fonts[i];
			}
		},
		isFontLoaded: function( id )
		{
			return document.getElementById(id);
		},
		isFontHasWeight: function(size)
		{
			let family = this.font.family;
			let font = this.getFont( family );

			return font && !font.local && !!font.options.match( new RegExp(size) );
		},
		isFontHasSomeWeights: function()
		{
			let c = 0;
			for (let w = 0; w < this.fontWeights.length; w++)
				if ( this.isFontHasWeight(this.fontWeights[w].value) ) c++;
			return c > 1;
		},
		getExtFontUrl: function(font)
		{
			let name = font.family.replace(/ /g, '+');
			let opts = font.options;
			return 'https://fonts.googleapis.com/css?family='+name+opts+'&display=swap&subset=cyrillic';
		},
		changeFont: function( event ) {
			let family = this.font.family;
			let font = this.getFont( family );

			if ( !font.local )
			{
				let name = family.replace(/ /g, '+');
				let id = family.replace(/ /g, '_');
				if ( this.isFontLoaded(id) ) return;

				let url = this.getExtFontUrl(font);

				let link = document.createElement('link');
				link.type = 'text/css';
				link.rel = 'stylesheet';
				link.href = url;
				link.id = id;
				document.head.appendChild( link );

				let detector = new FontDetector();
				let that = this;

				that.loader.state = 'wait';
				that.loader.status = 'Подождите, идет загрузка...';

				detector.wait(family)
					.then(() => that.loader.state = 'done')
					.catch(() => {
						that.loader.state = 'fail';
						that.loader.status = 'Не удалось загрузить шрифт. Сетевая ошибка.'
					})
			}
			else
				this.loader.state = 'done';
		},



		colorChanged: function(event)
		{
			this.color.hue1 = event.hue1;
			this.color.hue2 = event.hue2;
		},
		getAngle: function()
		{
			return (360 + this.color.hue2 - this.color.hue1)%360;
		},
		getColorOptions: function()
		{
			let o = 0;
			if ( this.color.light_version ) o |= 1;
			if ( this.color.color_background ) o |= 2;
			if ( this.color.monochrome ) o |= 4;
			if ( this.color.high_contrast ) o |= 8;
			return o;
		},
		getColorParams: function()
		{
			let hue = this.color.hue1;
			let angle = this.getAngle();
			let opts = this.getColorOptions();
			return 'colors=' + hue + '-' + angle + '-' + opts;
		},
		getFontParams: function()
		{
			let f = this.getFont(this.font.family);

			return 'font=' + [
				f ? encodeURI(this.font.family) : '',
				//f.local ? 'loc' : 'ext',
				this.font.size,
				this.font.weight,
				this.font.line,
				this.font.spacing
			].join('-');
		},
		getFontNameParams: function()
		{
			let f = this.getFont(this.font.family);
			if ( !f || f.local ) return 'fntsrc='; 
			return 'fntsrc=' + encodeURIComponent(this.getExtFontUrl(f));
		},
		getImageParams: function()
		{
			let o = 0;
			if ( this.images.shading ) o |= 1;
			if ( this.images.important ) o |= 2;

			return 'graphic=' + o;
		},
	}
});