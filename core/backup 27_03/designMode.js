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
selectedRec = 0;
selectedRow = null;
rightClick = false;
var imgData = null;

function activateTab(tab){
  $('.nav-tabs a[href="#' + tab + '"]').tab('show');
};
newGame.prototype.loadDesignMode = function (designGameSettings){ 			//it is called when 'design game' is selected on the main screen
if (!usingGoogleMaps) {
	document.getElementById("googlemap").style.display = "none";
  document.getElementById("map").style.display = "block";
  document.getElementById("upload").style.display = "block";
  document.getElementById("layersButton").style.display = "block";
  document.getElementById("originalVersionButton").style.display = "none";
  document.getElementById("googleMapsButton").style.display = "block";
}
	designStyle();
fromPlay = false;
this.fields = designGameSettings.fields

this.idCounter = 0;
this.fieldsCounter = 4;

this.checkId = -1;
this.mode = 1;
this.modeLoaded.design = true;
this.otherSettings.version = 2;

for (var i = 0; i<designGameSettings.variables.length; i++){
	this.initialValues.push(designGameSettings.variables[i].value)
}
if (!usingGoogleMaps) {
  initLeafletMap (this, designGameSettings.imgUrl);
}

}
function initLeafletMap (game, imgUrl) {

  var bounds = findBounds();
   //mapDesignWidth =   $("#map").width();
   //mapDesignHeight =   $("#map").height();
  var mapSettings = {img: imgUrl, mode: 1, bounds: bounds}
  game.myMap = new newGame.map (mapSettings);
  game.myMap.setDesignMode();
  game.myMap.imgData = getBase64Image(imgUrl)
}
newGame.prototype.openLayersSettings = function(){
	  document.getElementById("mapLayersSettings").style.visibility = 'visible';
}
newGame.prototype.hideLayersSettings = function(){
	  document.getElementById("mapLayersSettings").style.visibility = 'hidden';
		document.getElementById("remove").style.visibility = "hidden";
		document.getElementById("rename").style.visibility = "hidden";
}
newGame.prototype.pointSettings = function() {

  for (var i=0; i<this.points.length; i++){
      if (this.points[i].id==selectedPoint.target._leaflet_id){
				this.currentPoint = this.points[i];
        document.getElementById("pointName").innerHTML = this.points[i].description;
				layersList2.value = this.points[i].layers
				if (this.currentPoint.isDummy){
					document.getElementById("dummy").checked = true
				}
				else {
					document.getElementById("dummy").checked = false
				}
        document.getElementById("pointSettings").style.visibility = "visible"

        break;
      }
    }
  $("#rclick").css('visibility','hidden');
  rightClick = false;
}
newGame.prototype.savePointSettings = function () {
		var oldLayer = getLayerByName (this.currentPoint.layers).layer
		var newLayer = getLayerByName (layersList2.value).layer
		oldLayer.removeLayer(selectedPoint.target)
	this.currentPoint.layers = layersList2.value;
	newLayer.addLayer(selectedPoint.target)
	if (document.getElementById("dummy").checked) {
		this.currentPoint.isDummy = true;
	}
	else {
		this.currentPoint.isDummy = false;
	}
	document.getElementById("pointSettings").style.visibility = "hidden"
}
newGame.prototype.changeToDesign = function (){     //Go from play mode to design mode.

	this.mode = 1
  //if it is the first time the design mode loads
	if(!this.modeLoaded.design){
		this.otherSettings.version = 2;
		fromPlay = true;
		
		this.dataTable = document.getElementById("datatable");
		this.modeLoaded.design = true;
		if (!usingGoogleMaps){
			this.idCounter = 0;
			this.fieldsCounter = this.fields.length;
			this.myMap.imgData = getBase64Image(this.myMap.imgUrl)
		}

		this.checkId = -1;
		this.importVariables ();
		$("#instructionsEditor").jqteVal (this.instructions)

		activateTab("initSet");
		activateTab("gameRules");
		activateTab("endRules");
		activateTab("gameInterface");
		fromPlay = false;
	}
  if (!usingGoogleMaps){
  this.myMap.layersDiv.style.visibility = 'visible'
  this.myMap.setToEditMode();
  this.myMap.setDesignMode();
  this.myMap.setActiveLayer("Main")
  showAllMarkers();
	loadMapStyle(1)
  }
  else {
    setGoogleMapMode (1)
  }
  designStyle ();
 this.switchEvent ('design');     //event logging ANALYTICS

}


 newGame.prototype.addInstructions = function(){
document.getElementById("designInstructions").style.display = "block";
 }



function destroyClickedElement(event)
{
	document.body.removeChild(event.target);
}

function showJavascript (ws){ //TODO}
var jsCode = Blockly.JavaScript.workspaceToCode(ws);
alert(jsCode)
}
function showPython (ws){ //TODO}
var pythonCode = Blockly.Python.workspaceToCode(ws);
alert(pythonCode)
}
function showInfo (){ //TODO}
}
function showLayerOptions() {

	if(layersElement.value != "Main"){
	document.getElementById("rename").style.visibility = "visible";
		document.getElementById("remove").style.visibility = "visible";
}
else {
	document.getElementById("rename").style.visibility = "hidden";
		document.getElementById("remove").style.visibility = "hidden";
}
}
function openRenameDialogue() {
	var selectedLayer = layersElement.value;
	if (selectedLayer == "Main") {
		alert ("You can not rename the Main Layer")
		return 0;
	}
	var message = "New name for layer: " +selectedLayer
	var newName = prompt(message, "");
	console.log (newName)
	if (newName == ""){
		alert ("You didn't gave a name!")
		return;
	}
	const noSpecialChars = newName.replace(/'\/|^/g, '');			//remove special characters from layer name
	var id = layersElement.selectedIndex;
	var points =  myGame.points
	for (var i = 0; i <points.length; i++){
		if (points[i].layers == selectedLayer){
			points[i].layers = noSpecialChars
		}
	}
	myGame.myMap.layers[id].name = noSpecialChars;
	layersElement.options[id].text = noSpecialChars;
	var radioButton = document.getElementById(selectedLayer)
	radioButton.innerHTML = noSpecialChars
  	radioButton.id = noSpecialChars
  	var newNameForControl = "<span id='" +noSpecialChars + "'>"+ noSpecialChars+"</span>"
	myGame.myMap.layersControl._layers[id].name = newNameForControl
}
