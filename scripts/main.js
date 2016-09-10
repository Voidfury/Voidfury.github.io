/* jshint devel:true */
(function () {
    'use strict';

    var LOAD = {};

    /**
     * Initialize the loading screen.
     */
    LOAD.init = function () {
        this.progress = 0.0;
        this.filesNeeded = 1000;
        this.filesTotal = 1;

        this.$ = {};

        // loading bar
        this.$.progressBar = document.getElementById('progress.visual');
        this.$.status = document.getElementById('progress.status');
        this.$.percentage = document.getElementById('progress.number');

        // server info
        this.$.mapPreview = document.getElementById('map.image');
        this.$.mapName = document.getElementById('map.name');
		this.$.gamemode = document.getElementById('gamemode');
        this.updateProgress();
    };

    /**
     * Set the total number of files to be downloaded. This will be called on
     * the `SetFilesTotal` loading screen event.
     */
    LOAD.setFilesTotal = function (numFiles) {
        this.filesTotal = Math.max(0, numFiles);
    };

    /**
     * Sets the number of files needed to be downloaded. This will be called on
     * the `SetFilesNeeded` loading screen event.
     */
    LOAD.setFilesNeeded = function (numFiles) {
        this.filesNeeded = Math.max(0, numFiles);
    };

    /**
     * Sets the server info data on the loading screen. This will be called on
     * the `GameDetails` loading screen event.
     */
    LOAD.setServerInfo = function (mapName, gamemode) {
		var link = loadMapData(mapName).link
        if (typeof(link) !== 'undefined') {
			this.$.mapPreview.src = link;
		} else {
			this.$.mapPreview.src = "images/mapPreviewFail.png";	
		}
        this.$.mapName.innerText = mapName;
		if (typeof(gamemode) !== 'undefined') {
			this.$.gamemode.src = "images/gamemodes/" + gamemode + ".png";
		} else {
			this.$.gamemode.src = "images/gamemodes/unknown.png";
		}
    };

    /**
     * Updates the progress bar on the loading screen.
     */
    LOAD.updateProgress = function () {
        //var filesRemaining = Math.max(0, this.filesTotal - this.filesNeeded),
		//	progress = (this.filesTotal > 0) ?
		//		(filesRemaining / this.filesTotal) : 0;

        progress = (this.filesTotal > 0) ? Math.round(100 - this.filesNeeded/this.filesTotal*100) : 0.0;

        this.$.percentage.innerText = Math.floor(progress) + '%';
        this.$.progressBar.style.width = progress + '%';
    };

    /**
     * Called on the `DownloadingFile` loading screen event.
     * Updates the loading progress and shows which file is currently being
     * downloaded.
     */
    LOAD.onFileDownloading = function (filePath) {
        this.filesNeeded = Math.max(0, this.filesNeeded - 1);
        this.updateProgress();

        var status = 'Downloading ' + filePath + '...';
        this.onStatusChanged(status);
    };

    /**
     * Called on the `SetStatusChanged` loading screen event.
     */
    LOAD.onStatusChanged = function (status) {
        // final status
        if (status === 'Sending client info...') {
            this.filesNeeded = 0;
            this.updateProgress();
        }

        this.$.status.innerText = status;
    };

    LOAD.init();
    window.LOAD = LOAD;

    /**
     * Called when the loading screen finishes loading all assets.
     *
     * @param {String} serverName Server name.
     * @param {String} serverUrl  Server loading screen URL.
     * @param {String} mapName    Map name.
     * @param {Number} maxPlayers Maximum players.
     * @param {String} steamid    64-bit Steam ID.
     * @param {String} gamemode   Gamemode folder name.
     */
    window.GameDetails = function (serverName, serverUrl, mapName, maxPlayers, steamid, gamemode) {
        LOAD.setServerInfo(mapName, gamemode);
    };

    /**
     * Called when a file starts downloading. The filename includes the entire
     * path of the file; for example "materials/models/bobsModels/car.mdl".
     *
     * @param {String} filePath Full file path.
     */
    window.DownloadingFile = function (filePath) {
        LOAD.onFileDownloading(filePath);
    };

    /**
     * Called when something happens. This might be "Initialising Game Data",
     * "Sending Client Info", etc.
     *
     * @param {String} status Loading status.
     */
    window.SetStatusChanged = function (status) {
        LOAD.onStatusChanged(status);
    };

    /**
     * Called at the start, tells us how many files need to be downloaded in
     * total.
     *
     * @param {String} total Total files to be downloaded.
     */
    window.SetFilesTotal = function (total) {
        LOAD.setFilesTotal(total);
    };

    /**
     * Called when the number of files to download changes.
     *
     * @param {String} needed Number of files needed to download.
     */
    window.SetFilesNeeded = function (needed) {
        LOAD.setFilesNeeded(needed);
    };
}());
