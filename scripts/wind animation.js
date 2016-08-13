//wind animation on progress bars
var wind1Size = 2000;
var wind2Size = 4000;
var wind1Speed = 3;
var wind2Speed = 13;
var wind1_1 = Math.floor(Math.random() * wind1Size);
var wind2_1 = Math.floor(Math.random() * wind2Size);
var wind1_2 = Math.floor(Math.random() * wind1Size);
var wind2_2 = Math.floor(Math.random() * wind2Size);

setInterval(function(){
	wind1_1 = (wind1_1 + wind1Speed)%wind1Size;
	wind2_1 = (wind2_1 + wind2Speed)%wind2Size;
	wind1_2 = (wind1_2 + wind1Speed)%wind1Size;
	wind2_2 = (wind2_2 + wind2Speed)%wind2Size;

	$('#wind1-1').css('background-position', wind1_1 + 'px 0');
	$('#wind2-1').css('background-position', wind2_1 + 'px 0');
	$('#wind1-2').css('background-position', wind1_2 + 'px 0');
	$('#wind2-2').css('background-position', wind2_2 + 'px 0');
}, 20);