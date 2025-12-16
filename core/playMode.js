
/*
    This file is part of "ChoiCo" a web application for designing digital games, written by Marianthi Grizioti for the National and Kapodistrian University of Athens (Educational Technology Lab).
    Copyright (C) 2017-2018.
    ChoiCo is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    ChoiCo is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with Foobar.  If not, see <http://www.gnu.org/licenses/>.
*/
newGame = function () {

	this.initialValues = [];
	this.points = [];
	this.variables = [];
		this.fields = [];					//TO DO: Make a 2D table that combines fields[] with variabes[]
	this.initCode = "";
	this.checkCode = "";
	this.endCode = "";
	this.visitedPoints = 0;
	this.clickedPoints = 0;
	this.otherSettings = {};
	this.totalCode = "";
	this.workspace1 = null;
	this.workspace2 = null;
	this.workspace3 = null;
	this.gameOver = false;
	this.myMap = null;
	this.mode = 0;
	this.modeLoaded = {design: false, play: false}
	this.images =[];
	this.dataTable = document.getElementById("datatable")
	this.dataTableHeader = document.getElementById("datatableHeader")
	this.pointsLimit = false;
	this.timeLimit = false;
	this.instructions = "";
	this.playTimes = 0; //the times that the player plays the game again
	this.pointsHistory = []; //the points the player selects during a game
	// FOR LEARNING ANALYTICS logging	this.cameraId = "camera1";
	this.gameID = generateGameID ();
	this.mapID = "map1"
	this.databadeID = "database1"
	this.codespace1ID = "codespace1"
	this.codespace2ID = "codespace2"
	this.codespace3ID = "codespace3"
	this.state = null;
	this.idCounter = 0;
	//event counters
	this.errorsCount = 0;
	this.counters = {debugCounter: 0, switchCounter: 0, selectPointCounter: 0, changeLayerCount:0, gameOverCount:0, addPointCounter: 0, modifyPointEvent:0, addFieldCounter:0,  mapDesignActions: 0, modifyValueCounter:0, databaseDesignActions: 0, intialCodeActions:0, gameplayCodeActions: 0, endCodeActions:0}


	// LOGGING EVENTS !!!!! ///
	this.debugEvent =function () {
		if(!fromLauch && onplatform && !fromFileOpen){
		this.counters.debugCounter ++;
		var currentdate = new Date();
		var time = moment.utc().format("x");
		var code = this.initCode  + this.checkCode  + this.endCode
		var state = {'definition': {'code': code, 'number': 14}, 'value': this.errorsCount, 'event_count': 	this.counters.debugCounter};
		var feedbackMsg = { 'id': this.gameID, 'type': "codespace",  'event': "debug", 'state': state,  "timestamp" : time };
		this.errorsCount = 0;
		console.log ("sending event: ")
		console.log (feedbackMsg)
		sendEvent(feedbackMsg);
		}
		}

	this.selectPointEvent =function (point, values) {
		if(!fromLauch && onplatform && !fromFileOpen){
		this.counters.selectPointCounter ++;
		var currentdate = new Date();
		var time = moment.utc().format("x");
		var state = {'game_progress': {'fields': values, 'score': this.visitedPoints}, 'value': {'name': point.description, 'layer': point.layer, 'times': point.timesSelected}, 'event_count': this.counters.selectPointCounter};
		var feedbackMsg = { 'id': this.gameID, 'type': "playmode",  'event': "point_selection", 'state': state,  'timestamp' : time };
		console.log ("sending event: ")
		console.log (feedbackMsg)
		sendEvent(feedbackMsg);
		}
		}

		this.changeLayerEvent =function (layer, values) {
			if(!fromLauch && onplatform && !fromFileOpen) {
			this.counters.changeLayerCount ++;
			var currentdate = new Date();
			var time = moment.utc().format("x");
			var state = {'game_progress': {'fields': values, 'score': this.visitedPoints}, 'value': {'name': layer.name /*'times': layer.timesVisited*/}, 'event_count': this.counters.changeLayerCount};
			var feedbackMsg = { 'id': this.gameID, 'type': "playmode",  'event': "change_layer", 'state': state,  'timestamp' : time };
			console.log (feedbackMsg)
			sendEvent(feedbackMsg);
			}
			}
		this.gameOverEvent =function (point, values) {
			if(!fromLauch && onplatform && !fromFileOpen){
			this.counters.gameOverCount ++;
			var currentdate = new Date();
			var time = moment.utc().format("x");
			var state = {'game_progress': {'fields': values, 'score': this.visitedPoints},'value':point.description, 'event_count': this.counters.gameOverCount};
			var feedbackMsg = { 'id': this.gameID, 'type': "playmode",  'event': "game_over", 'state': state,  'timestamp' : time };
			console.log ("sending event: ")
			console.log (feedbackMsg)
			sendEvent(feedbackMsg);
			}
			}
		this.playerPerformanceEvent =function (type, values) {
			if(!fromLauch && onplatform && !fromFileOpen){
			var currentdate = new Date();
			var time = moment.utc().format("x");
			var state = {'game_progress': {'fields': values, 'score': this.visitedPoints},'value': type};
			var feedbackMsg = { 'id': this.gameID, 'type': "playmode",  'event': "player_performance", 'state': state,  'timestamp' : time };
			console.log ("sending event: ")
			console.log (feedbackMsg)
			sendEvent(feedbackMsg);
			}
			}
		this.playerActivityEvent =function (type, values) {
			if(!fromLauch && onplatform && !fromFileOpen) {
			var currentdate = new Date();
			var time = moment.utc().format("x");
			var state = {'game_progress': {'fields': values, 'score': this.visitedPoints},'value': type};
			var feedbackMsg = { 'id': this.gameID, 'type': "playmode",  'event': "player_activity", 'state': state,  'timestamp' : time };
			console.log ("sending event: ")
			console.log (feedbackMsg)
			sendEvent(feedbackMsg);
			}
			}
			this.switchEvent =function (type) {
				if(!fromLauch && onplatform && !fromFileOpen){
				this.counters.switchCounter ++;
				var currentdate = new Date();
				var time = moment.utc().format("x");
				var state = {'value': type, 'event_count': 	this.counters.switchCounter };
				var feedbackMsg = { 'id': this.gameID, 'type': "playmode",  'event': "switch_mode", 'state': state,  'timestamp' : time };
				console.log ("sending event: ")
				console.log (feedbackMsg)
				sendEvent(feedbackMsg);
				}
				}
			// MAP DESIGN EVENTS
			this.addPointEvent =function (newPoint, map) {
				if(!fromLauch && onplatform && !fromFileOpen) {
				this.counters.addPointCounter ++;
				var time = moment.utc().format("x");
				if (usingGoogleMaps){
					var latlng = {lat: newPoint.position.lat(), lng: newPoint.position.lng()}
					var state =  {'map_state': {'points': map.markers.length, 'layers':'Google Map'}, 'value': {'coordinates': latlng, 'id': newPoint.metadata.id}, 'event_count': this.counters.addPointCounter};
				}
				else{
					var state =  {'map_state': {'points': map.markers.length, 'layers':map.layers.length}, 'value': {'coordinates': newPoint.latlng, 'id': newPoint.id, 'layer': newPoint.layers}, 'event_count': this.counters.addPointCounter};
				}
				var feedbackMsg = { 'id': this.gameID, 'type': "map_editor",  'event': "new_point", 'state': state,  'timestamp' : time };
				console.log ("sending event: ")
				console.log (feedbackMsg)
				sendEvent(feedbackMsg);
				}
				}
			this.modifyPointEvent =function (point, map, type) {			//UNDER DISCUSSION
				if(!fromLauch && onplatform && !fromFileOpen){
				this.counters.modifyPointEvent ++;
				var time = moment.utc().format("x");
				if (usingGoogleMaps){
					var state =  {'map_state': {'points': map.markers.length, 'layers':'Google Map'}, 'value': { 'id': point.id, 'name': point.description, 'type': type}, 'event_count': this.counters.modifyPointEvent};
				}
				else{
					var state =  {'map_state': {'points': map.markers.length, 'layers':map.layers.length}, 'value': { 'id': point.id, 'name': point.description, 'type': type}, 'event_count': this.counters.modifyPointEvent};
				}
				var feedbackMsg = { 'id': this.gameID, 'type': "map_editor",  'event': "modify_point", 'state': state,  'timestamp' : time };
				console.log ("sending event: ")
				console.log (feedbackMsg)
				sendEvent(feedbackMsg);
				}
				}
			this.modifyGraphicsEvent =function (newLayer, map) {			//UNDER DISCUSSION
				if(!fromLauch && onplatform && !fromFileOpen){
				this.counters.modifyGraphicsCounter ++;
				var currentdate = new Date();
				var time = moment.utc().format("x");
				var state =  {'map_state': {'points': map.markers.length, 'layers':map.layers.length}, 'value': { 'id': point.id, 'name': point.description, 'type': type}, 'event_count': this.counters.modifyGraphicsCounter};
				var feedbackMsg = { 'id': this.gameID, 'type': "map_editor",  'event': "modify_grphics", 'state': state,  'timestamp' : time };
				console.log ("sending event: ")
				console.log (feedbackMsg)
				//sendEvent(feedbackMsg);
				}
				}
			this.mapActivityEvent =function (type, map) {
				if(!fromLauch && onplatform && !fromFileOpen){
				var currentdate = new Date();
				var time = moment.utc().format("x");
				var state =  {'map_state': {'points': map.markers.length, 'layers':map.layers.length}, 'value': type};
				var feedbackMsg = { 'id': this.gameID, 'type': "map_editor",  'event': "design_activity", 'state': state,  'timestamp' : time };
				console.log ("sending event: ")
				console.log (feedbackMsg)
				sendEvent(feedbackMsg);
				}
				}
				// DATABASE EVENTS
			this.modifyValueEvent =function (point, fieldName, newV, oldV) {
				if(!fromLauch && onplatform && !fromFileOpen){
				this.counters.modifyValueCounter ++;
				var currentdate = new Date();
				var time = moment.utc().format("x");
				var state =  {'info': {'fieldName': fieldName, 'id':point.id, 'name' :point.description}, 'value':{'old': oldV, 'new': newV, 'times' : point.timesModified, 'event_counter': this.counters.modifyValueCounter } };
				var feedbackMsg = { 'id': this.gameID, 'type': "database",  'event': "change_value", 'state': state,  'timestamp' : time };
				console.log ("sending event: ")
				console.log (feedbackMsg)
				sendEvent(feedbackMsg);
				}
				}
			this.addFieldEvent =function (fields, points) {
				if(!fromLauch && onplatform && !fromFileOpen){
				this.counters.addFieldCounter ++;
				var currentdate = new Date();
				var time = moment.utc().format("x");
				var state =  {'info': {'fields': fields, 'points': points}, 'value': '', 'event_count': this.counters.addFieldCounter};
				var feedbackMsg = { 'id': this.gameID, 'type': "database",  'event': "add_field", 'state': state,  'timestamp' : time };
				console.log (feedbackMsg)
				sendEvent(feedbackMsg);
				}
				}
			this.dataActivityEvent =function (type, fields, points) {
				if(!fromLauch && onplatform && !fromFileOpen){
				var currentdate = new Date();
				var time = moment.utc().format("x");
				var state =  {'info': {'fields': fields, 'points': points}, 'value': type};
				var feedbackMsg = { 'id': this.gameID, 'type': "database",  'event': "database_activity", 'state': state,  'timestamp' : time };
				console.log ("sending event: ")
				console.log (feedbackMsg)
				sendEvent(feedbackMsg);
				}
				}
									// CODE EVENTS
			this.initCodeActivityEvent =function (type, commands, code) {
				if(!fromLauch && onplatform && !fromFileOpen){
				var currentdate = new Date();
				var time = moment.utc().format("x");
				var state =  {'definition': {'code': code, 'commandsNo': commands}, 'value':  type };
				var feedbackMsg = { 'id': 1, 'type': "codespace",  'event': "initial_settings_activity", 'state': state,  'timestamp' : time };
				console.log ("sending event: ")
				console.log (feedbackMsg)
				sendEvent(feedbackMsg);
				}
				}
			this.gamePlayCodeActivityEvent =function (type, commands, code) {
				if(!fromLauch && onplatform && !fromFileOpen){
				var currentdate = new Date();
				var time = moment.utc().format("x");
				var state =  {'definition': {'code': code, 'commandsNo': commands}, 'value':  type };
				var feedbackMsg = { 'id': 2, 'type': "codespace",  'event': "gameplay_rules_activity", 'state': state,  'timestamp' : time };
				console.log ("sending event: ")
				console.log (feedbackMsg)
				sendEvent(feedbackMsg);
				}
				}
			this.endCodeActivityEvent =function (type, commands, code) {
				if(!fromLauch && onplatform && !fromFileOpen){
				var currentdate = new Date();
				var time = moment.utc().format("x");
				var state =  {'definition': {'code': code, 'commandsNo': commands}, 'value':  type };
				var feedbackMsg = { 'id': 3, 'type': "codespace",  'event': "end_rules_activity", 'state': state,  'timestamp' : time };
				console.log ("sending event: ")
				console.log (feedbackMsg)
				 sendEvent(feedbackMsg);
				}
				}

					// LOGGING EVENTS END ///


};
newGame.prototype.resetWorkspaces = function () {
	editor1_reloaded = false;
	editor2_reloaded = false;
	editor3_reloaded= false;
	this.initWorkspaces();
	this.initCode = "";
	this.code1 = "";
	this.code2 = "";
	this.totalCode = "";
}
newGame.prototype.resetDataTable = function () {
	var dt = document.getElementById ("datatable");
	var headerTable = document.getElementById ("datatableHeader");
	var tableRows = dt.rows.length;
		for (var i=tableRows-1; i>=0; i--){
			dt.deleteRow(i)
		}
	var tableCells = headerTable.rows[0].cells.length;
	for (var i = tableCells-1; i>3; i--){
			headerTable.rows[0].deleteCell(i)
		}
		headerTable.rows[0].cells[1].childNodes[0].value = "Description"
		headerTable.rows[0].cells[2].childNodes[0].value = "Field1"
		headerTable.rows[0].cells[3].childNodes[0].value = "Field2"
}
newGame.prototype.resetOnPlatform = async function (gameState) {
	this.idCounter = 0;
	platformReload = true;
	mode = 2;
	this.modeLoaded.design = false;
	this.otherSettings.version = null;
	if (this.modeLoaded.play){
	var body = this.displayTable.tBodies[0]
	var rowsNumber = body.rows.length
	for (var i =rowsNumber-1; i>=0; i--){
				body.deleteRow (i)
				//var rowsNumber = this.overallTable.rows.length
			}
			this.clearOverallTable ();
			previousPoint = null;
			myPoint = null;
			this.gameOver = false;
		}
		else {
			this.displayTable = document.getElementById("displayTable");
			this.overallTable = document.getElementById("overallTable")
		}
	this.resetDataTable();
	this.resetWorkspaces();
	designSettings = defaultDesignSettings;
	this.visitedPoints = 0;
	document.getElementById("map").style.visibility = "visible"
	$("#mainArea").show();
	$("#playBoard").show();
	this.variables = gameState.variables;
	this.otherSettings = gameState.otherSettings;
	this.initialValues = [];
		for (var i = 0 ; i< gameState.variables.length; i++){
			this.initialValues.push(gameState.variables[i].value)
		}
	this.fields = gameState.fields;
	this.points = [];
	for (i=0; i<gameState.points.length; i ++){
		if(gameState.points[i].layers === undefined){			//old version no layers option
				point = new Point (gameState.points[i].id, "Main")
		}
		else{
		point = new Point (gameState.points[i].id, gameState.points[i].layers)
		}
		point.setAll (gameState.points[i])
		this.points.push(point)	
	}
	playStyle();
	w1.updateWorkspaceXml(gameState.w1)
	w2.updateWorkspaceXml(gameState.w2)
	w3.updateWorkspaceXml(gameState.w3)
	this.instructions = gameState.inst;
	if(this.instructions=="  ")
		this.instructions = gameInstructionsDefault;
	this.fillGameInstructions(this.instructions );
	$("#gameInstructions").show();

	//handle the maps
	if (gameState.mapSettings.googleMaps){	//the game that loads uses Gmaps version
		
		if (usingGoogleMaps){	//the previous game also using Gmaps
			var mapSettings = gameState.mapSettings;
		
		this.myMap = googlemapMap;
		resetGoogleMap();		//RESET MAP
		googleMarkersCounter = mapSettings.googleMarkersCounter
		this.myMap.mapInstance.setZoom(mapSettings.zoom);
		this.myMap.mapInstance.setCenter(mapSettings.mapCenter);
		this.myMap.markers = [];
		this.myMap.points = [];
		this.myMap.points = loadSavedMakrers(gameState.points)
		setGoogleMapMode (2)
		document.getElementById("map").style.display = "none";
		document.getElementById("googlemap").style.display = "block";
		}
		else {  								// the previous game didn't use Gmaps 
				this.myMap.mapInstance.remove();    //remove map background
				initializeLayersList();
				this.myMap.markers = [];
				  googleMarkersCounter = gameState.mapSettings.googleMarkersCounter
				  await initGoogleMap (2, gameState);
				   usingGoogleMaps = true;
		} 
		leafletMapLoaded = false;
	}
	else{					//game that loads  doesn't use Gmaps version
		usingGoogleMaps = false;
		document.getElementById("map").style.display = "block";
		document.getElementById("googlemap").style.display = "none";
		if(leafletMapLoaded){
		this.myMap.mapInstance.remove();    //remove map background
		initializeLayersList();
		for (var i =layersElement.length; i >=0  ; i--){
			previousLayer = "Main"
		layersElement.remove(i);
	  layersList2.remove(i);
		}
		leafletMapLoaded = false;
		}
		this.myMap = null;
		var bounds = findBounds();
		var mapSettings = {zoom: gameState.mapSettings.zoom, img: gameState.imgUrl, imgData:gameState.imgData, mode: 2, bounds:bounds }
		this.myMap = new newGame.map (mapSettings);	
		this.myMap.markers = [];
		this.myMap.points = [];		
	if(gameState.layers != null) {
		loadedLayers = gameState.layers
	   for (var k =0; k < loadedLayers.length; k++){
		   if(loadedLayers[k].name == ""){
			   var tempName = "undefiend" + k
			   loadedLayers[k].name = tempName
		   }
		   this.myMap.addLayer(loadedLayers[k].imgUri, loadedLayers[k].name)
	   }
	   
	}
	this.initPlayMap(gameState);	
	this.initializePoints();
   }
   //this.initPlayMap(playGameSettings);
  
	this.importGameImages();
	this.initDisplayTable ();
	this.initProgressTable ();

		this.initPlayPoints ();
		this.closePopUp();
		document.getElementById("select").disabled = false;
		if(!usingGoogleMaps){
		this.myMap.layersDiv.style.visibility = 'hidden'
		this.myMap.setToPlayMode();
		}
		this.startGame();

}

newGame.prototype.loadPlayMode =  async function (playGameSettings) {
	var i, point;
	if (playGameSettings.mapSettings.googleMaps == true){
		usingGoogleMaps = true;
	}
	else usingGoogleMaps = false;
	if(!usingGoogleMaps)
	document.getElementById("map").style.visibility = "visible"
	$("#mainArea").show();
	$("#playBoard").show();
	//document.getElementById("openGame").style.visibility = "hidden"
	this.variables = playGameSettings.variables;
		this.otherSettings = playGameSettings.otherSettings;
	this.initialValues = [];
		for (var i = 0 ; i< playGameSettings.variables.length; i++){
			this.initialValues.push(playGameSettings.variables[i].value)
		}
	this.definitions = this.createDefinitionsCode();
	if (playGameSettings.otherSettings.version === undefined) {			//version before 02/2022
		if (playGameSettings.initCode != null){			//mid saved version
				this.otherSettings.version = 1;
		}
		else {
			this.otherSettings.version = 0;
	}
	}

		this.fields = playGameSettings.fields;

for (i=0; i<playGameSettings.points.length; i ++){
	if(playGameSettings.points[i].layers === undefined){			//old version no layers option
			point = new Point (playGameSettings.points[i].id, "Main")
	}
	else{
	point = new Point (playGameSettings.points[i].id, playGameSettings.points[i].layers, playGameSettings.points[i].latlng)
	}
	point.setAll (playGameSettings.points[i])
	this.points.push(point)


}

	correctOlderVersions(this, playGameSettings)
	playStyle();
	this.mode = 2;
	this.visitedPoints = 0;
	if (playGameSettings.code1 == '') {

	}
	w1.updateWorkspaceXml(playGameSettings.w1)
	w2.updateWorkspaceXml(playGameSettings.w2)
	w3.updateWorkspaceXml(playGameSettings.w3)
	this.otherSettings = playGameSettings.otherSettings;
	this.displayTable = document.getElementById("displayTable");
	this.overallTable = document.getElementById("overallTable")
	this.instructions = playGameSettings.inst;
	if(this.instructions=="  ")
		this.instructions = gameInstructionsDefault;
	this.fillGameInstructions(this.instructions );
	$("#gameInstructions").show();
	//$("#map").addClass('col-sm-8');

	if (usingGoogleMaps) {
		var mapSettings = playGameSettings.mapSettings;
		  googleMarkersCounter = playGameSettings.mapSettings.googleMarkersCounter
		  await initGoogleMap (2, playGameSettings);
	}
	else{
		var bounds = findBounds();
	var mapSettings = {img: playGameSettings.imgUrl, imgData:playGameSettings.imgData, mode: 2, bounds:bounds }
	this.myMap = new newGame.map (mapSettings);																												// NEW MAP
	if(playGameSettings.layers != null) {
		 loadedLayers = playGameSettings.layers
		for (var k =0; k < loadedLayers.length; k++){
			if(loadedLayers[k].name == ""){
				var tempName = "undefiend" + k
				loadedLayers[k].name = tempName
			}
			if( loadedLayers[k].imgUri.split("data:image/").length==1)
			var layerimgUrl = "data:image/gif;base64," + loadedLayers[k].imgUri;
		else
		var layerimgUrl = loadedLayers[k].imgUri
			this.myMap.addLayer(layerimgUrl, loadedLayers[k].name)
		}
	}
	this.initPlayMap(playGameSettings);	
	this.initializePoints();
	}

	this.importGameImages();
	this.initDisplayTable ();
	this.initProgressTable ();
	this.initPlayPoints ();
	this.modeLoaded.play = true;
	this.closePopUp();
	document.getElementById("select").disabled = false;
	if(!usingGoogleMaps){
	this.myMap.layersDiv.style.visibility = 'hidden'
	this.myMap.setToPlayMode();
	}
	this.startGame();
	this.modeLoaded.play = true;
}

newGame.prototype.createDefinitionsCode = function () {
	var definitions = "", newCommand = ""
	for (var i=0; i<this.variables.length; i++) {
		newCommand = this.variables[i].name + ' = ' + this.variables[i].value + ';\n'
		definitions += newCommand
	}
	definitions += 'movescounter = 0;\n'
	definitions += 'selectedChoice = {};'
	definitions += 'selectedChoice.name = null;'
	definitions += "selectedChoice.selections = 0;"
	definitions += "selectedChoice.airQuality = null;"
	definitions += "activeLayer = 'Main'"
	definitions += '\n'
	return definitions;
}
newGame.prototype.generatePlay = function(){ 			//Start playing the designed game


	this.generatePoints ();
	if(this.generateEvents()){
	//this.code += this.codeEnd;
	//this.totalCode += this.initCode+this.checkCode + this.endCode;
	myGame.changeToPlay();
}
}
newGame.prototype.changeToPlay= function (){			//change from Design mode to Play Mode i.e. when the user clicks "play" in design mode
	this.mode = 2
	this.definitions = this.createDefinitionsCode();
	this.code1 =  this.definitions  + this.checkCode ;
	this.code2 =  this.definitions  + this.endCode ;

	if (editor1_init){
	tbx1.style.visibility = "hidden"

	}
	if (editor2_init){
		tbx2.style.visibility = "hidden"
	}
	if (editor3_init)
	tbx3.style.visibility = "hidden"

	this.displayTable = document.getElementById("displayTable")
	this.overallTable = document.getElementById("overallTable");
	this.visitedPoints = 0;
//	this.points = myPoints;
//	this.chageMapToPlay();
	this.initDisplayTable ();
	this.initProgressTable ();
	this.initPlayPoints ();
	this.modeLoaded.play = true;
	//if(launchData==null)

		this.instructions = document.getElementsByClassName("jqte_editor")[0].innerHTML;
	if(this.instructions=="  ")
		this.instructions = gameInstructionsDefault
	this.fillGameInstructions(this.instructions );
	$("#gameInstructions").show();
	this.mode = 2;
	playStyle();
	if (!usingGoogleMaps){
	myGame.myMap.setToPlayMode();
	loadMapStyle(2);
	}
	else {
	setGoogleMapMode (2)
	}
	document.getElementById("select").disabled = false;
	document.getElementById("popUp").style.backgroundColor = gameStartColor
	this.closePopUp();
	this.startGame();
}
newGame.prototype.initPlayPoints = function(){
	playPoints = [];
 var gamePoints = this.points;
 for (var i =0; i<gamePoints.length; i++){
	if (airInfoActive){
	if (gamePoints[i].airQualityData.aqi == undefined){
		calcAirQuality (gamePoints[i]);
	}
	else
	 var aqi = gamePoints[i].airQualityData.aqi;
	}
	else {
	var aqi = 0;}
	playPoints.push ({id:gamePoints[i].id, description: gamePoints[i].description, timesSelected: 0, airQuality:aqi })
 }
}
newGame.prototype.chageMapToPlay = function () {


}

reCalculatePoints = function(oldBounds, newBounds, points) {
	var w = newBounds[1][1]
	var h= newBounds[1][0]
	var oldh = Math.abs(oldBounds._southWest.lat) + Math.abs(oldBounds._northEast.lat)
	var oldw = Math.abs(oldBounds._southWest.lng) + Math.abs(oldBounds._northEast.lng)
		for (var i =0; i<points.length; i++){
			var oldLat = points[i].latlng.lat;
			var distH = Math.abs(oldBounds._southWest.lat) + oldLat;
			var newLat = distH/oldh * h;
			var oldLng = points[i].latlng.lng;
			var distW = Math.abs(oldBounds._southWest.lng) + oldLng;
			var newLng = distW/oldw * w;
			points[i].latlng = {lat: newLat, lng:newLng};
		}
		return points;
}
newGame.prototype.initPlayMap = function(playGameSettings) {  		//called when a game is loaded (not created in design mode)


var bounds = findBounds();
if ((this.otherSettings.version == 0 )||(this.otherSettings.version == 1 )){
var newPoints = reCalculatePoints( playGameSettings.mapSettings.bounds, bounds,this.points)
this.points = newPoints;}
	for (var i =0; i<this.points.length; i++){
		var point = this.points[i]
		var m = L.marker(point.latlng,{icon: defaultIcon,  draggable: false});
		if (point.layers != undefined){			//if it is created by the layers version
			var baseLayer = getLayerByName(point.layers).layer
			if(baseLayer!=null)
			baseLayer.addLayer(m)			//	add point to the related layer
		}
		else {
			m.addTo(this.myMap.mapInstance)
		}
		this.points[i].id = m._leaflet_id;
		m.bindLabel(this.points[i].description, {noHide:true});
		m.showLabel();
		this.myMap.markers.push(m);
		m.on("click", playClick);
		//m.on("contextmenu", );
	}


}
newGame.prototype.initDisplayTable = function(){				//creates the Table with the Point Info
	var body = this.displayTable.tBodies[0]
	if(this.modeLoaded.play){
		var rowsNumber = body.rows.length
		for (var i =rowsNumber-1; i>=0; i--){
			body.deleteRow (i)
			//console.log (i)
		}
		//console.log (i)
	}
	var count = 0;
	for(var i=0; i< this.fields.length; i++){
		if((this.fields[i].visibility==null)   || (this.fields[i].visibility=="visible")){
		if(this.fields[i].type != "file"){
		var row = body.insertRow (count);
		var cel = row.insertCell(0);
		cel.innerHTML = this.fields[i].name;
		cel= row.insertCell(1);
		count ++;
		}
		else

		$("#pointImage").show();
		}

	}

}
newGame.prototype.initProgressTable = function (){				//creates the score Table
var row1 = this.overallTable.rows[0];
var row2 = this.overallTable.rows[1];

if(this.modeLoaded.play){
	this.clearOverallTable ();

	}
	var count = 0;
	this.initialValues = [];											//set game initial values to the table and to the array initialValues
	for(var i=0; i< this.variables.length; i++){
		myGame.initialValues.push(this.variables[i].value);
		var cel1 =row1.insertCell(count);
		cel1.innerHTML = this.variables[i].name;
		var cel2 = row2.insertCell(count);
		cel2.innerHTML = this.variables[i].value;
		var im = document.createElement("img");
		im.setAttribute("height", "20");
		im.setAttribute("width", "20");
		im.setAttribute("visibility", "visible");
		im.src = "media/imgs/stable.png"
		cel1.appendChild (im);
		count ++;

	}
		var cel = row1.insertCell(count);
		cel.innerHTML = pointsVisitedText;
		cel.id = "pointsVisited"
		cel.style.backgroundColor ="#115c3c"
		cel.style.borderRight ="3px solid gray";
		cel= row2.insertCell(count);
		cel.style.backgroundColor ="#bfff80"
		cel.style.borderRight ="3px solid gray";
		cel.innerHTML = "0";


}
newGame.prototype.selectPoint = async function() {				//What happens when the player selects a point during the game
	var popupEl = document.getElementById("popUp");
	var type, name, newValue, expr;
	var cells1 = this.overallTable.rows[0].cells;
	var cells2 = this.overallTable.rows[1].cells;
	var counter = 0;
	var messageValues = "";
	if (!usingGoogleMaps){
	var marker = this.myMap.markers.find(x=>x._leaflet_id===myPoint.id)
	}
	else {
			var marker = this.myMap.markers.find(x=>x.metadata.id===myPoint.id)
	}
	$("#popUp_text").html("");
			//first do the calculations
	for(var i=1; i< this.fields.length; i++){
		type = this.fields[i].type;
		name = this.fields[i].name;
		if((type == "formula")||(type== "number")||(type === "travelTime")){
		var old = this.variables[counter].name + " = " + this.variables[counter].value.toString() ;
		var oldValue = this.variables[counter].value;
		if (type === "formula") {
				newValue = 	evalFormula (myPoint, name, oldValue);
				this.variables[counter].value = Math.round((parseFloat(newValue)+Number.EPSILON)*100)/100
		}
		if (type == "number"){
			test = 	parseFloat(myPoint.values[name]) + this.variables[counter].value;
			this.variables[counter].value = Math.round(( test +Number.EPSILON)*100)/100
			newValue = Math.round((parseFloat(this.variables[counter].value )+Number.EPSILON)*100)/100

		}
		if (type=="travelTime"){
			var travel = myPoint.values[name].option;
			var origin;
			if (travel == "previous"){
				if(previousPoint == null) {
					var durMin = 0;
				}
				else{
				origin = this.myMap.markers.find(x=>x.metadata.id===previousPoint.id)
				directionsResult = await calcRoute (origin, marker)		//*Wait for calcRoute to return value
				duration =  directionsResult.routes[0].legs[0].duration.value;
				durMin = parseInt(Math.round(duration/60))  //calculate in minutes
			}
			}
			else {
				origin = this.myMap.markers.find(x=>x.metadata.id===parseInt(travel))
					directionsResult = await calcRoute (origin, marker)
					duration =  directionsResult.routes[0].legs[0].duration.value;
	 			 durMin =  parseInt(Math.round(duration/60))     //calculate in minut
			}
			if (myPoint.values[name].oper == 'minus') {
				durMin = -durMin;
			}

				newValue = this.variables[counter].value + durMin;
				this.variables[counter].value = newValue;
		}
		if (newValue > oldValue){
			cells1[counter].childNodes[1].src="media/imgs/up.png"
		}
		else if (newValue < oldValue){
			cells1[counter].childNodes[1].src="media/imgs/down.png"
		}
		else
			cells1[counter].childNodes[1].src="media/imgs/stable.png"


		cells2[counter].textContent = newValue;
		var newv = this.variables[counter].name + " = " + newValue.toString();
		this.code1 = this.code1.replace (old, newv);
		this.code2 = this.code2.replace (old, newv);
		messageValues +=  newv +" | "
		counter ++;
		}
	}
	if(!myPoint.isDummy){
	old = 'movescounter = ' + this.visitedPoints;
	this.visitedPoints ++;
	newv = 'movescounter = ' + this.visitedPoints;
	this.code1 = this.code1.replace (old, newv);
	this.code2 = this.code2.replace (old, newv);}
	if(previousPoint!=null){												//set previous point and current point
		var playPrevPoint = playPoints.find(x=>x.id === previousPoint.id);
	var old = 'selectedChoice.name = "' + previousPoint.description+'"';
	var old2 = 'selectedChoice.selections = ' + playPrevPoint.timesSelected;
	var old3 = 'selectedChoice.airQuality = ' + playPrevPoint.airQuality;
}	
	else{
	var old = 'selectedChoice.name = null' ;
	var old2 = 'selectedChoice.selections = 0';
	var old3 = 'selectedChoice.airQuality = null';
	}
	previousPoint = Object.assign ({}, myPoint)
	var playPoint = playPoints.find(x=>x.id === myPoint.id);
	playPoint.timesSelected++;
	var newv = 'selectedChoice.name = "' + previousPoint.description+'"';
	var newv2 = 'selectedChoice.selections = ' + playPoint.timesSelected;
	var newv3 = 'selectedChoice.airQuality = ' + playPoint.airQuality;
	this.code1 = this.code1.replace (old, newv);
	this.code2 = this.code2.replace (old, newv);
	this.code1 = this.code1.replace (old2, newv2);
	this.code2 = this.code2.replace (old2, newv2);
	this.code1 = this.code1.replace (old3, newv3);
	this.code2 = this.code2.replace (old3, newv3);
	if (!usingGoogleMaps){
	old = "activeLayer = '" + previousLayer+"'";
	previousLayer = getLayerById(  this.myMap.currentBaseLayer._leaflet_id).name;
	newv = "activeLayer = '" + previousLayer+"'";
	}
	this.code1 = this.code1.replace (old, newv);
	this.code2 = this.code2.replace (old, newv);
	this.myInterpreter = new Interpreter(this.code1, initApi);				//execute Initialize Code
		try {
			this.myInterpreter.run();
}
	catch(err) {
		console.log (err);
		alert (generalErrorMessage )
	}
		this.myInterpreter = new Interpreter(this.code2, initApi);  	//execute Gameplay + End rules Code
		try {
  		this.myInterpreter.run();
	}
	catch(err) {
		console.log (err);
  	alert (generalErrorMessage  )

	}
	 	var  prevMes = document.getElementById("messageArea").innerHTML
		var newMes = "<b> Choice "+ this.visitedPoints +": " + myPoint.description + "<br>Game Values: </b>" + messageValues + "<hr>" +prevMes;

		document.getElementById("messageArea").innerHTML =  newMes;
		updateScoreBoard(messageValues);

		if(!this.gameOver){
				cells2[counter].textContent = this.visitedPoints;
		}
		var percentage = 	Math.round((this.visitedPoints/this.points.length + Number.EPSILON) * 100) / 100
		if ((percentage >= analyticsOptions.playerPerformanceLow) && (!lowPerformaceSent)){
			this.playerPerformanceEvent('low', this.variables); lowPerformaceSent= true;
			}
		if ((percentage >= analyticsOptions.playerAtivityMedium) && (!mediumPerformaceSent)){
			this.playerPerformanceEvent('medium', this.variables); mediumPerformaceSent = true;
		}
		if ((percentage >= analyticsOptions.playerActivtyHigh) && (!highPerformanceSent)){
			this.playerPerformanceEvent('high', this.variables); highPerformanceSent = true;
		}
		this.selectPointEvent (playPoint, this.variables)
	
	}
newGame.prototype.backToEdit = function () {					//go to design mode from play mode
		var i;
		this.gameOver = false;
		if (!usingGoogleMaps){
			this.myMap.layersDiv.style.visibility = 'visible'
			//myGame.myMap.setToEditMode();
			//myGame.myMap.setActiveLayer("Main")
		
		
		}
		$("#mainArea").show();
		$("#designBoard").show();
		$("#playBoard").hide();
		$("#pointImage").hide();
		this.changeToDesign ();
		for ( i =0; i<this.variables.length; i++){
			this.variables[i].value = this.initialValues[i]
		}
		this.initializePoints();
		$("#gameEnds").hide();

}
newGame.prototype.gameIsOver = function() {
	this.gameOver = true;
	this.gameOverEvent(myPoint, this.variables)
	document.getElementById("select").disabled = true;
	$("#again").css('visibility','visible');
 }
newGame.prototype.clearDisplayTable = function (){
	var body = this.displayTable.tBodies[0]
	var length = body.rows.length;
	 for (i=0; i<length; i++){
	 body.rows[i].cells[1].innerHTML="";
 }
}
newGame.prototype.initializePoints = function (){

	this.clearDisplayTable();
	var markLength = this.myMap.markers.length;
	var marks =  this.myMap.markers
for (var i=0; i < markLength; i++){
	marks[i].isVisible = true;
}
if(myPoint!=null){
	if(!usingGoogleMaps)
this.myMap.unselectMarker (myPoint.id)
}
	previousPoint = null;
	myPoint = null;
	this.visitedPoints = 0;
	previousLayer = "Main"
}
newGame.prototype.playAgain = function() {
		var gameOverModal = document.getElementById("gameEnds");
		var i, rows,length, messages;
		messages = 	document.getElementById("messageArea");
		messages.innerHTML = gameStartedText + "\n";
		document.getElementById("select").disabled = false;
		document.getElementById("popUp").style.backgroundColor = gameStartColor;
		$("#popUp_text").html("");
		this.initializePoints();
		this.closePopUp();
		cells1 = this.overallTable.rows[0].cells;
		cells2 = this.overallTable.rows[1].cells;
		this.gameOver = false;
		length = this.variables.length;
		for( i=0; i< length; i++){
		this.variables[i].value = this.initialValues[i];
		cells2[i].textContent =  this.initialValues[i];
		cells1[i].childNodes[1].src="media/imgs/stable.png";
		this.playTimes ++;
		if(!usingGoogleMaps){
		myGame.myMap.setToPlayMode();
		}
		else {
			setGoogleMapMode (2)
		}
	}
	this.pointsHistory = [];
	cells2[i].textContent = 0
	if (this.myMap.mapImages.length > 0) {
		this.myMap.removeBackgrounds()
	}
	for (var i =0; i<playPoints.length; i ++){
		playPoints[i].timesSelected = 0;
	}
	this.startGame();
	if (this.otherSettings.version == 0){		//old version
		this.code1 = this.initCode;
		this.code2 = this.endCode;

	}
	else{
		this.code1 = this.definitions + this.checkCode;
		this.code2 = this.definitions + this.endCode;
	}
	$("#gameEnds").toggle();
 }
newGame.prototype.startGame = function () {
	if(this.otherSettings.version != 0){
		var fixInit = this.initCode.replace("var selectedChoice.name = ' ';" , "selectedChoice.name =null;")
		this.initCode = fixInit;
	this. myInterpreter = new Interpreter(fixInit, initApi);
	this.myInterpreter.run();
}
	var now = moment();
}
newGame.prototype.initWorkspaces = function (){
	if(editor1_init){
		w1.redrawWorkspace();
		tbx1.style.visibility = "hidden"
		//editor1_init = false;
	}
	if(editor2_init){
		w2.redrawWorkspace();
		tbx2.style.visibility = "hidden"
	//	editor2_init = false;

	}
	if(editor3_init){
	w3.redrawWorkspace();
		tbx3.style.visibility = "hidden"
	//	editor3_init = false;
	}

}

newGame.prototype.resetAll = function() {
	editor1_reloaded = false;
	editor2_reloaded = false;
	editor3_reloaded= false;
	fromFileOpen = false;
	if((this.modeLoaded.design)||(this.modeLoaded.play)){
		$("#gameInstructions").hide();
		if(!usingGoogleMaps){
	this.myMap.mapInstance.remove();    //remove map background
	initializeLayersList();
	this.myMap.markers = [];
		}
}

	if(this.modeLoaded.design){
	//if (myTabs!=undefined){
	//myTabs.goToTab(0);}
	$("#map").css('visibility','hidden');
		var dt = document.getElementById ("datatable");
	var headerTable = document.getElementById ("datatableHeader");
	var tableRows = dt.rows.length;
	for (var i=tableRows-1; i>=0; i--){
		dt.deleteRow(i)
	}
	var tableCells = headerTable.rows[0].cells.length;
	for (var i = tableCells-1; i>3; i--){
		headerTable.rows[0].deleteCell(i)
	}
	headerTable.rows[0].cells[1].childNodes[0].value = "Description"
	headerTable.rows[0].cells[2].childNodes[0].value = "Field1"
	headerTable.rows[0].cells[3].childNodes[0].value = "Field2"
	this.initWorkspaces();
	this.modeLoaded.design = false;
	}
	if(this.modeLoaded.play ){
	this.otherSettings.version = null;
		this.initCode = null;
		this.code1 = null;
		this.code2 = null;
		body = this.displayTable.tBodies[0]
		var rowsNumber = body.rows.length
		for (var i =rowsNumber-1; i>=0; i--){
			body.deleteRow (i)
			//var rowsNumber = this.overallTable.rows.length
		}
	this.clearOverallTable ();
	//	document.getElementById("messageArea").innerHTML = gameStartedText +"\n";
	//	document.getElementById("messageArea").style.backgroundColor = "#ccffcc";
	//	document.getElementById("popUp").style.backgroundColor = gameStartColor;
		this.fillGameInstructions ("Game Instruction: -----------------------------")
		$("#map").css('visibility','hidden');
		this.modeLoaded.play =false;
		if (!usingGoogleMaps)
		this.myMap.hideAllLayers();
	}

	previousPoint = null;

	myPoint = null;
	designSettings = defaultDesignSettings;
	playSettings = initialPlaySettings;
	if (!usingGoogleMaps){
	for (var i =layersElement.length; i >=0  ; i--){
		previousLayer = "Main"
	layersElement.remove(i);
  layersList2.remove(i);
}
	}
	this.initialValues = [];
	this.points = [];
	this.variables = [];
	this.initCode = "";
	this.checkCode = "";
	this.endCode = "";
	this.visitedPoints = 0;
	this.otherSettings = {maxTime: -1, maxPoints: -1, version: 2};
	this.totalCode = "";
	this.gameOver = false;
	this.fields = [];
	this.myMap = null;
	this.mode = 0;
	this.images =[];
	this.dataTable = document.getElementById("datatable")
	this.dataTableHeader = document.getElementById("datatableHeader")
	this.pointsLimit = false;
	this.timeLimit = false;
	this.instructions = "";
}

newGame.prototype.clearOverallTable = function () {
	var colNumber = this.overallTable.rows[0].cells.length
		for (var i =colNumber-1; i>=0;  i--){
			this.overallTable.rows[0].deleteCell(i)
			this.overallTable.rows[1].deleteCell(i)
			//console.log (i)
		}
}
newGame.prototype.timeLimitToggle = function() {
	if (this.timeLimit){
		this.timeLimit = false;
		$("#settingsB").css('color', '#8c8c8c')
		$( "#maxTime" ).prop( "disabled", true );

	}
	else
	{
		this.timeLimit = true;
		$("#settingsB").css('color', 'black')
		$( "#maxTime" ).prop( "disabled", false );

	}
}
newGame.prototype.deleteImage = function (imgId) {

	for (var j=0; j< this.images.length; j++){
		if (this.images[j].id == imgId)
			this.images.splice (j, 1);

	}

}
newGame.prototype.importGameImages = function (){
	for (var i =0; i<this.points.length; i++){
	if ((this.points[i].imguri!=="")&& (typeof this.points[i].imguri !== "undefined")){
		var newImg = {id: this.points[i].id, imguri: this.points[i].imguri}
		 this.images.push(newImg);
	}
	}
	if (this.images.length > 0){
		$("#pointImage").show();

	}
	else
		$("#pointImage").hide();
}
newGame.prototype.closePopUp = function () {
	$("#popUp").css('display', 'none');
	if(!this.gameOver)
	document.getElementById("select").disabled = false;

}
newGame.prototype.showPopUp = function () {
	$("#popUp").css('display', 'block');
	document.getElementById("select").disabled = true;

}
newGame.prototype.fillGameInstructions = function (val) {
	$("#instructions").html(val);

}
newGame.prototype.togglePlayInstructions = function () {
	$("#gameInstructions").toggle();

}
newGame.prototype.getPointbyID = function (id) {
	for (var i=0; i<this.points.length; i++){
		if (this.points[i].id == id){
			return this.points[i];
		}
	}
 return "ERROR NOT FOUND"
}
newGame.prototype.useGoogleMaps = function(){
	//alert ("Attention: Google Maps is still in trial mode.")
	//option 1 leaflet plug in. Static google MAP
	/*
  myGame.myMap.mapInstance.options.crs = L.CRS.EPSG3857
	this.myMap.mapInstance.removeLayer(this.myMap.background);*/
	//
	//option 2: Use different DIV for google map
	var gmapsmessage = "You are going to use the google maps version of ChoiCo map editor. Any design you have made with the Image-based version will be lost"
	if (confirm(gmapsmessage)){
	  this.resetAll ();
	 usingGoogleMaps=true;
	 	this.loadDesignMode (designSettings);
		initGoogleMap (1);
	}

}
newGame.prototype.useLegacy = function(){
	//alert ("Attention: Google Maps is still in trial mode.")
	//option 1 leaflet plug in. Static google MAP
	/*
  myGame.myMap.mapInstance.options.crs = L.CRS.EPSG3857
	this.myMap.mapInstance.removeLayer(this.myMap.background);*/
	//
	//option 2: Use different DIV for google map
	var legacyMessage = "You are going to use the legacy version of ChoiCo map editor (with static images as a background). Any design you have made with Google Maps will be lost"
	if(confirm (legacyMessage)){
		this.resetAll ();
		usingGoogleMaps=false;
		this.loadDesignMode (designSettings);
		   
	  }
	 

}
//// LEARNING ANALYTICS logging ////

newGame.prototype.getState = function () {
	var state = getCurrentState ();
	//console.log ("sending state:")
	//console.log (state)
	return state;
}

newGame.prototype.setState = function (data) {
fromLauch = true;
this.state = data;
try {
handleState(data, function() {
	fromLauch = false;
});     //READ JSON STATE AND SET NEW GAME
}
catch (error) {
	console.log (error + " Could not load state:" + data);
}

return "CHOICO SET STATE: OK";
}
/////////////////////



function evalFormula (point, name, oldValue) {
		var formulaExpression =point.values[name];
		var mathex = formulaExpression.replace (name, oldValue)
		const node1 = math.parse(mathex)
		const code1 = node1.compile()
		return code1.evaluate();
}



function closeVideo (){
	$("#videoPlayerWindow").hide()
}
function showVideo (){
	$("#videoPlayerWindow").show()
}

function updateScoreBoard(values) {
		var scoreBoard = document.getElementById("current-score");
		scoreBoard.innerHTML = values;
}

function correctOlderVersions  (game, playGameSettings) {
	var newText = 'selectedChoice.name'
	var newText2 = 'selectedChoice.name = null;'
	var tempCode, definitions;

if ((game.otherSettings.version === 1)|| (game.otherSettings.version === 2)){
game.initCode = playGameSettings.initCode;
game.checkCode = playGameSettings.code1;
game.endCode = playGameSettings.code2;
game.code1 = game.definitions + game.checkCode;
game.code2 = game.definitions + game.endCode
definitions = 'selectedChoice = {};selectedChoice.selections = 0;'
tempCode = game.initCode;
game.initCode = definitions;
game.initCode += tempCode;
}
else {
	game.initCode = playGameSettings.code1;
	game.checkCode = playGameSettings.code1;
game.endCode = playGameSettings.code2;
game.code1 = game.checkCode;
game.code2 =	game.endCode;
	 tempCode = game.initCode;
game.initCode = game.definitions;
game.initCode += tempCode;
 tempCode = game.checkCode;
game.checkCode  = game.definitions;
game.checkCode += tempCode;
 tempCode = game.endCode;
game.endCode =game.definitions;
game.endCode += tempCode;
}
game.initCode= game.initCode.replace (/var selectedPoint = null;/g, newText2)
game.initCode= game.initCode.replace (/selectedPoint/g, newText)
game.checkCode=	game.checkCode.replace (/selectedPoint/g, newText)
game.endCode=	game.endCode.replace (/selectedPoint/g, newText)
if ((game.otherSettings.version === 0)|| (game.otherSettings.version === 1)){
for (var i =0; i<game.fields.length; i++){
	if (game.fields[i].type === "formula") {
		var fName = game.fields[i].name;
		var points = game.points;
		game.points = updateOldFormulaField (fName, points)
	}
}
}

}

function updateOldFormulaField (formulaFieldName, pointsArray) {
	////TO DOOOO FIX THE SAVEDVERSION - WHERE TO BE CALLED
	var value, type, to;
	var expr;
	for (var i = 0; i<pointsArray.length; i++){
		type = pointsArray[i].values[formulaFieldName].type;
		switch (type) {
		  case "plus":
						value = pointsArray[i].values[formulaFieldName].num;
							delete pointsArray[i].values[formulaFieldName].num;
		      expr = formulaFieldName + "+ "+ value;
		    break;
		  case "minus":
						value = pointsArray[i].values[formulaFieldName].num;
							delete pointsArray[i].values[formulaFieldName].num;
		      expr = formulaFieldName + "- "+ value;
		    break;
		    case "dev":
						value = pointsArray[i].values[formulaFieldName].num;
							delete pointsArray[i].values[formulaFieldName].num;
		       expr = formulaFieldName + "/ "+ value;
		      break;
		      case "mul":
							value = pointsArray[i].values[formulaFieldName].num;
							delete pointsArray[i].values[formulaFieldName].num;
		         expr = formulaFieldName + "* "+ value;
		        break;
			case "rand" :
					value = pointsArray[i].values[formulaFieldName].from;
					to = pointsArray[i].values[formulaFieldName].to;
					delete pointsArray[i].values[formulaFieldName].to;
					delete pointsArray[i].values[formulaFieldName].from;

				expr = formulaFieldName + "+ rand ("+ value + ", " + to + ")";
				break;
		}
		pointsArray[i].values[formulaFieldName] = expr;
		//	pointsArray[i].values[formulaFieldName] = "formula"
	}
	return pointsArray;
}

	function generateGameID() {
		return Math.floor((1 + Math.random()) * 0x10000)
			.toString(16)
			.substring(1);
	  }
  
