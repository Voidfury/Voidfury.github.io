/*Dependancies:
	map list.js
*/


var mapData = {};

function loadMapData(mapName) {
	mapData = {};
	for (var i = 0; i < maps.length; i++) {
		if (maps[i].mapName == mapName) {
			mapData = maps[i];
		};
	};
	return mapData;
}