var player;

function getRandomID() {
	return music[Math.floor(Math.random()*music.length)];
};

var videoToShow = getRandomID();

function onYouTubeIframeAPIReady() {
    player = new YT.Player('music-sound', {
        width: 480,
        height: 270,
        videoId: videoToShow.url,
        events: {
            onReady: initializeVideo,
			onStateChange: onPlayerStateChange
        }
    });
}

function initializeVideo() {
	var volume = defaultVolume;
	if (typeof(videoToShow.volume) !== 'undefined') {
		volume = videoToShow.volume;
	}

	$('#music-image').css('background-image','url(https://i.ytimg.com/vi/' + videoToShow.url + '/hqdefault.jpg?custom=true&w=480&360&stc=true&jpg444=true&jpgq=90&sp=68&sigh=K8R2TEuvBlqMg0HCR4Txtf_ZMSs)');
	document.getElementById('music-title').innerHTML = videoToShow.title;

	player.setPlaybackQuality('small');
	player.setVolume( volume );
	player.playVideo();
};



function onPlayerStateChange(event) {        
	if(event.data === 0) {
		videoToShow = getRandomID();
		player.cueVideoById(videoToShow.url);
		initializeVideo();
	}
};