var w; 
var h;
var maxWidth = 1080;
var maxHeight = 500;

repositionScreen = function() {
	w = $(window).width();
	h = $(window).height();
	var wrapperMarginLeft = (w - maxWidth)/3;
	var wrapperMarginTop = (h - maxHeight)/3;
	var wrapperWidth = w - wrapperMarginLeft;
	var wrapperHeight = h - wrapperMarginTop;

	$("#wrapper").css('margin-left', wrapperMarginLeft + 'px');
	$("#wrapper").css('margin-top', wrapperMarginTop + 'px');
	$("#wrapper").css('width', wrapperWidth + 'px');
	$("#wrapper").css('height', wrapperHeight + 'px');
}

repositionScreen();

$(window).resize( function(){
	repositionScreen();
});