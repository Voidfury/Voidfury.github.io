/*Dependancies:
	settings.js
*/

var w; 
var h;

repositionScreen = function() {
	w = window.innerWidth;
	h = window.innerHeight;
	var wrapperMarginLeft = (w - maxWidth)/3;
	var wrapperMarginTop = (h - maxHeight)/3;
	var wrapperWidth = w - wrapperMarginLeft;
	var wrapperHeight = h - wrapperMarginTop;

	wrapper = document.getElementById('wrapper').style;
	
	wrapper.marginLeft = wrapperMarginLeft + 'px';
	wrapper.marginTop = wrapperMarginTop + 'px';
	wrapper.width = wrapperWidth + 'px';
	wrapper.height = wrapperHeight + 'px';
}

repositionScreen();
