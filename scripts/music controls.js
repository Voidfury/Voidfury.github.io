/*Dependancies:
	music list.js
	settings.js
	youtube api
*/

var defaultVolume = 5;
var player;

var _volume;
var _start;
var _imageId;

function getRandomID() {
	return music[Math.floor(Math.random()*music.length)];
};

var videoToShow = getRandomID();

function onYouTubeIframeAPIReady() {
    player = new YT.Player('music.sound', {
        width: 480,
        height: 270,
        videoId: videoToShow.url,
        events: {
            onReady: initializeVideo,
			onStateChange: onPlayerStateChange
        }
    });
}

function prepareVideo() {
	_volume = defaultVolume;
	if (typeof(videoToShow.volume) !== 'undefined') {
		_volume = videoToShow.volume;
	}
	_volume *= volumeScale;

	_start = 0;
	if (typeof(videoToShow.start) !== 'undefined') {
		_start = videoToShow.start;
	}

	_imageId = videoToShow.url;
	if (typeof(videoToShow.image) !== 'undefined') {
		_imageId = videoToShow.image;
	}
};

function updateVisuals() {
	document.getElementById('music.image').style.backgroundImage = 'url(https://i.ytimg.com/vi/' + _imageId + '/hqdefault.jpg?custom=true&w=480&360&stc=true&jpg444=true&jpgq=90&sp=68&sigh=K8R2TEuvBlqMg0HCR4Txtf_ZMSs)';
	document.getElementById('music.title').innerHTML = videoToShow.title;
};

function initializeVideo() {
	player.setPlaybackQuality('small');
	player.setVolume(_volume);
	player.seekTo(_start,true);
	player.playVideo();
};

function onPlayerStateChange(event) {        
	if(event.data === 0) {
		videoToShow = getRandomID();
		prepareVideo();
		player.cueVideoById(videoToShow.url);
		initializeVideo();
		updateVisuals();
	}
};

prepareVideo();
updateVisuals();