var maxWidth = 1080;
var maxHeight = 500;

var fullWidth = $(window).width();
var fullHeight = $(window).height();

var wrapperMarginLeft = (fullWidth - maxWidth)/3;
var wrapperMarginTop = (fullHeight - maxHeight)/3;
var wrapperWidth = fullWidth - wrapperMarginLeft;
var wrapperHeight = fullHeight - wrapperMarginTop;


$("#wrapper").css('margin-left', wrapperMarginLeft + 'px');
$("#wrapper").css('margin-top', wrapperMarginTop + 'px');
$("#wrapper").css('width', wrapperWidth + 'px');
$("#wrapper").css('height', wrapperHeight + 'px');