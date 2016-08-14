var w; 
var h;

repositionScreen = function() {
	w = $(window).width();
	h = $(window).height();
	$("#wrapper").css('width', 'calc( ' + w + 'px - (' + w + 'px - var(--max-width)) / 3)');
	$("#wrapper").css('height', 'calc( ' + h + 'px - (' + h + 'px - var(--max-height)) / 3)');
	$("#wrapper").css('margin-left', 'calc( (' + w + 'px - var(--max-width)) / 3 )');
	$("#wrapper").css('margin-top', 'calc( (' + h + 'px - var(--max-height)) / 3 )');
}

repositionScreen();

$(window).resize( function(){
	repositionScreen();
});