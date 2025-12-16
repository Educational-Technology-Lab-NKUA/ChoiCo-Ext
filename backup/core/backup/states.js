// get/set methods


function getCurrentState () {
//	myGame.generatePoints ();
	myGame.generateEvents();  		//check handlefiles line 322 (save game function)
	var analyticsOptions = null;
	var workspace1= getWorkospaceText(1);
	var workspace2 = getWorkospaceText(2);
	var workspace3 = getWorkospaceText(3);
	var mapSets = myGame.getMapSettings();
	 var mapImageData = myGame.getMapData ();
	var instructions = document.getElementsByClassName("jqte_editor")[0].innerHTML;
	var pointsString = JSON.stringify (myGame.points);
	var layerString = JSON.stringify (myGame.myMap.getLayersToSave());
	var variablesString = JSON.stringify(myGame.variables);
	var allvariablesString = JSON.stringify(myGame.fields);
	var initialCode = JSON.stringify(addSlashes(myGame.initCode));
 var code1  = JSON.stringify(addSlashes(myGame.checkCode));
 var code2  = JSON.stringify(addSlashes(myGame.endCode));
	var otherSet =JSON.stringify(myGame.otherSettings);
	var imgURI =myGame.myMap.imgData;
	var mSet =JSON.stringify(mapSets);
	var stateJSON = {"code1": code1 , "code2": code2, "initialCode": initialCode, "instructions": instructions, "fields":allvariablesString, "layers": layerString, "mapSettings": mSet, "otherSettings": otherSet, "pointsDB": pointsString, "variables": variablesString, "workspace1": workspace1, "workspace2": workspace2, "workspace3": workspace3, "imgURI": imgURI, "logOptions" : analyticsOptions};
	//var stateJSON = {"fields":allvariablesString,"variables": variablesString};
	console.log (stateJSON)
	return stateJSON;
}
function addSlashes (textToConvernt) {
	return textToConvernt.replace(/\\/g, '\\\\').
	replace(/\u0008/g, '\\b').
	replace(/'/g, '\\\'').
	replace(/"/g, '\\"');
}

// called by setState
	//Create new game with the saved state
function handleState (jsonState) {
	var imgURI =  "data:image/gif;base64,"  + jsonState.imgURI;
	var savedPoints = JSON.parse (jsonState.pointsDB);
	var savedVariables =  JSON.parse (jsonState.variables);
	var savedMapSets = JSON.parse (jsonState.mapSettings)
	var savedLayers = JSON.parse (jsonState.layers)
	var savedFields = JSON.parse (jsonState.fields)
	var savedOthers = JSON.parse (jsonState.otherSettings)
	var playGameSettings = {imgUrl : imgURI,  points: savedPoints, variables: savedVariables, initCode:jsonState.initialCode, code1: jsonState.code1, code2:jsonState.code2, w1: jsonState.workspace1, w2: jsonState.workspace2, w3: jsonState.workspace3 ,otherSettings: savedOthers, fields: savedFields, inst: jsonState.instructions, layers:savedLayers, mapSettings: savedMapSets}
 		myGame.loadPlayMode(playGameSettings);

}
