// get/set methods


function getCurrentState () {
//	myGame.generatePoints ();
	myGame.generateEvents();  		//check handlefiles line 322 (save game function)
	var analyticsOptions = null;
	var workspace1= getWorkospaceText(1);
	var workspace2 = addSlashes(getWorkospaceText(2));
	var workspace3 = addSlashes(getWorkospaceText(3));
	var mapSets = myGame.getMapSettings();
	//var mapImageData = myGame.getMapData ();
	var instructions = document.getElementsByClassName("jqte_editor")[0].innerHTML;

	var pointsString = JSON.stringify (myGame.points);
	if ((!usingGoogleMaps) && (myGame.mode !=0)){
	var layerString = JSON.stringify (myGame.myMap.getLayersToSave());}
	else
	var layerString = "";
	var variablesString = JSON.stringify(myGame.variables);
	var allvariablesString = JSON.stringify(myGame.fields);
	var initialCode = JSON.stringify(myGame.initCode);
		
	var code1  = addSlashes(myGame.checkCode);
	//var myJSONStfixring = JSON.stringify(myJSON);
	
	var code2  = addSlashes(myGame.endCode);
	if(myGame.mode !=0)
	var imgURI =myGame.myMap.imgData;
	else
	var imgURI = "";
	var otherSet =JSON.stringify(myGame.otherSettings);
	var mSet =JSON.stringify(mapSets);
	var stateJSON = {"code1": code1 , "code2": code2, "initialCode": initialCode, "instructions": instructions, "fields":allvariablesString, "layers": layerString, "mapSettings": mSet, "otherSettings": otherSet, "pointsDB": pointsString, "variables": variablesString, "workspace1": workspace1, "workspace2": workspace2, "workspace3": workspace3, "imgURI": imgURI, "logOptions" : analyticsOptions};
	//var stateJSON = {"fields":allvariablesString,"variables": variablesString};
	console.log (stateJSON)
	return stateJSON;
}
function escapeSpecialCharacters(inputString) {
	// Create a mapping of special characters to their escaped counterparts
	const specialCharacters = {
	  '"': '\\"',
	  "'": "\\'",
	  '\\': '\\\\',
	  '/': '\\/',
	  '\b': '\\b',
	  '\f': '\\f',
	  '\n': '\\n',
	  '\r': '\\r',
	  '\t': '\\t'
	  // Add more special characters if needed
	};
  
	// Use a regular expression to replace each special character with its escaped version
	return inputString.replace(/"/g, '\\"')
			.replace (/'/g , "\\'")
  }
  
 
function addSlashes (textToConvernt) {
	return textToConvernt.replace (/'/g , " ")
	
}

// called by setState
	//Create new game with the saved state
function handleState (jsonState, _callback) {
	if(jsonState.mapSettings != "{}" ){	//if not empty game
		//do nothing
	
	var imgURI =  "data:image/gif;base64,"  + jsonState.imgURI;
	var savedPoints = JSON.parse (jsonState.pointsDB);
	var savedVariables =  JSON.parse (jsonState.variables);
	var savedMapSets = JSON.parse (jsonState.mapSettings)
	if (jsonState.layers != ""){
	var savedLayers = JSON.parse (jsonState.layers)
	}
	else {
		var savedLayers = "";
	}
	var savedFields = JSON.parse (jsonState.fields)
	var savedOthers = JSON.parse (jsonState.otherSettings)
	var playGameSettings = {imgUrl : imgURI,  points: savedPoints, variables: savedVariables, initCode:jsonState.initialCode, code1: jsonState.code1, code2:jsonState.code2, w1: jsonState.workspace1, w2: jsonState.workspace2, w3: jsonState.workspace3 ,otherSettings: savedOthers, fields: savedFields, inst: jsonState.instructions, layers:savedLayers, mapSettings: savedMapSets}
 	if(!myGame.modeLoaded.play)	
	myGame.loadPlayMode(playGameSettings);
else
myGame.resetOnPlatform (playGameSettings)
	
	}
_callback();


}
