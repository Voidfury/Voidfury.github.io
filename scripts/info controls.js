/*Dependancies:
	map controls.js	
*/


// Create general storage
var info = {};



// Create storage for external variables
info.extVars = {};
// Define default values for external variables
info.extVars.filesTotal = 0;
info.extVars.filesNeeded = 0;
info.extVars.gamemode = "";
info.extVars.mapName = "";



// Create storage for progress bar and information
info.progress = {}; info.progress.value = {}; info.progress.handle = {};
// Define some variables to be referenced when populating elements
info.progress.value.number = 0.0;
info.progress.value.status = "Getting list of missing files...";
info.progress.alive = false;
// Define function for when the element first loads
info.progress.load = function() {
	info.progress.handle.status = document.getElementById('progress.status'); //.innerText
	info.progress.handle.number = document.getElementById('progress.number'); //.innerText
	info.progress.handle.visual = document.getElementById('progress.visual').style; //.width
	info.progress.alive = true;
	info.progress.update();
};
// Define function for when information is updated
info.progress.update = function() {
	info.progress.value.number = (info.extVars.filesTotal > 0) ? 100*(1-(info.extVars.filesNeeded/info.extVars.filesTotal)) : 0.0;
	if (info.progress.alive) {
		info.progress.handle.status.innerText = info.progress.value.status;
		info.progress.handle.number.innerText = Math.floor(info.progress.value.number) + '%';
		info.progress.handle.visual.width = Math.floor(info.progress.value.number) + '%';
	}
};
// Check for Sending client info
info.progress.onStatusChanged = function(status) {
	if (status === 'Sending client info...') {
		info.extVars.filesNeeded = 0;
	}
	info.progress.value.status = status;
	info.progress.update();
};



// Create storage for server information
info.server = {}; info.server.value = {}; info.server.handle = {};
// Define some variables to be referenced when populating elements
info.server.value.mapImage = "images/blank.png";
info.server.value.mapName = "Checking map name...";
info.server.value.gamemode = "images/blank.png";
info.server.alive = false;
// Define function for when the elements finish loading
info.server.load = function() {
	info.server.handle.mapImage = document.getElementById('map.image');
	info.server.handle.mapName = document.getElementById('map.name');
	info.server.handle.gamemode = document.getElementById('gamemode');
	info.server.alive = true;
	info.server.update();
};
// Define function for when information is updated
info.server.update = function() {
	if (info.server.alive) {
		info.server.handle.mapImage.src = info.server.value.mapImage;
		info.server.handle.mapName.innerText = info.server.value.mapName;
		info.server.handle.gamemode.src = info.server.value.gamemode;
	}
};



// Receive basic information about what gamemode and map the server is running
GameDetails = function (serverName, serverUrl, mapName, maxPlayers, steamid, gamemode) {
	var link = {};
	link.map = loadMapData(mapName).link
	link.gamemode = "images/gamemodes/" + gamemode + ".png"

	if (typeof(link.map) !== 'undefined') {
		info.server.value.mapImage = link.map;
	} else {
		info.server.value.mapImage = "images/mapPreviewFail.png";
	}

	info.server.value.mapName = mapName;
	info.server.value.gamemode = link.gamemode;
	info.server.update();
};
// Total number of files is unneeded
SetFilesTotal = function (total) {};
// Number of files needed is recorded as the total and the current.
// The recorded total will not change, and will serve to calculate the progress.
SetFilesNeeded = function (needed) {
	info.extVars.filesNeeded = Math.max(0, needed);
	info.extVars.filesTotal = Math.max(0, needed);
	info.progress.update();
};
// When an item finishes downloading, update corresponding info
DownloadingFile = function (filePath) {
	info.extVars.filesNeeded = Math.max(0, info.extVars.filesNeeded - 1);
	var status = 'Downloading ' + filePath + '...';
	info.progress.onStatusChanged(status);
};
// Channel status change updates to proper functions
SetStatusChanged = function (status) {
	info.progress.onStatusChanged(status);
};
