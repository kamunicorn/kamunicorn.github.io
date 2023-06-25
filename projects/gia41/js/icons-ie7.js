/* To avoid CSS expressions while still supporting IE 7 and IE 6, use this script */
/* The script tag referencing this file must be placed before the ending body tag. */

/* Use conditional comments in order to target IE 7 and older:
	<!--[if lt IE 8]><!-->
	<script src="ie7/ie7.js"></script>
	<!--<![endif]-->
*/

(function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'icomoon\'">' + entity + '</span>' + html;
	}
	var icons = {
		'icon__logout': '&#xe913;',
		'icon__download': '&#xe903;',
		'icon__checkmark': '&#xe910;',
		'icon__spinner': '&#xe912;',
		'icon__error': '&#xe911;',
		'icon__close': '&#xe908;',
		'icon__ham': '&#xe90c;',
		'icon__search': '&#xe90e;',
		'icon__archive': '&#xe90f;',
		'icon__filter': '&#xe90d;',
		'icon__document': '&#xe90a;',
		'icon__mail': '&#xe909;',
		'icon__contact-book': '&#xe902;',
		'icon__location': '&#xe904;',
		'icon__phone-call': '&#xe90b;',
		'icon__eye-plus': '&#xe901;',
		'icon__edit': '&#xe900;',
		'icon__look': '&#xe905;',
		'icon__arrow-right': '&#xe906;',
		'icon__arrow-left': '&#xe907;',
		'0': 0
		},
		els = document.getElementsByTagName('*'),
		i, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		c = el.className;
		c = c.match(/icon__[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
}());
