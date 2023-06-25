var FontDetector = function() {
    // a font will be compared against all the three default fonts.
    // and if it doesn't match all 3 then that font is not available.
    var baseFonts = ['monospace', 'sans-serif', 'serif'];

    //we use m or w because these two characters take up the maximum width.
    // And we use a LLi so that the same matching fonts can get separated
    var testString = "mmmmmmmmmmlli";

    //we test using 72px font size, we may use any size. I guess larger the better.
    var testSize = '72px';

    var h = document.getElementsByTagName("body")[0];

    // create a SPAN in the document to get the width of the text we use to test
    var s = document.createElement("span");
    s.style.fontSize = testSize;
    s.innerHTML = testString;
    var defaultWidth = {};
    var defaultHeight = {};
    for (var index in baseFonts) {
        //get the default width for the three base fonts
				setFontFamily(s, baseFonts[index]);
				s.style.width = '300px';
        h.appendChild(s);
        defaultWidth[baseFonts[index]] = s.scrollWidth || s.offsetWidth; //width for the default font
        defaultHeight[baseFonts[index]] = s.offsetHeight; //height for the defualt font
        h.removeChild(s);
    }
		
		function setFontFamily(s, f)
		{
			if ( document.all ) // IE
					s.style.setAttribute( 'cssText', 'font-family: ' + f + ' !important' );					
			else // Modern browser
				s.setAttribute( 'style', 'font-family: ' + f + ' !important' );				
		}

    function detect(font) {
        var detected = false;
        for (var index in baseFonts) {
            setFontFamily(s, font + ',' + baseFonts[index]);
            h.appendChild(s);
						let w = s.scrollWidth || s.offsetWidth;
            var matched = (w != defaultWidth[baseFonts[index]] || s.offsetHeight != defaultHeight[baseFonts[index]]);
            h.removeChild(s);
            detected = detected || matched;
        }
        return detected;
    }
		
		function wait(font, time) {
			return new Promise(function(resolve, reject) {
				let interval = setInterval(function()
				{
					if ( detect(font) )
					{
						clearTimeout(timeout);
						clearInterval(interval);
						resolve();
					}
				}, 300);			
				let timeout = setTimeout(function()
				{
					clearInterval(interval);
					reject();
				}, time || 10000);
			})
			
		}

    this.detect = detect;
		this.wait = wait;
};