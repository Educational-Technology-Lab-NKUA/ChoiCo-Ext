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
function Point (id,layer, coordinates) {
  this.id = id;
  this.description = "";
  this.values = {};
  this.imguri = "";
  this.layers = layer;
  this.isDummy = false;
  this.latlng = coordinates;
  this.timesModified = 0;
  this.updateLayer = function (layer) {
    this.layers = layer;
  }
  this.pushValue = function (name, value) {
    this.values[name] = value;
  }
  this.clearValues = function (name, value) {
    this.values = {};
  }
  this.setImguri = function (uri) {
    this.imguri = uri;
  }
  this.setDescription = function (descr) {
    this.description = descr;
  }
  this.setDummy = function (dummy) {
    this.isDummy = dummy;
  }
  this.setPosition = function (latlng){
    if (latlng!=undefined)
      this.latlng = latlng;
  }
  this.setAll = function (settings) {
    this.description = settings.description;
    this.imguri = settings.imguri;
    this.isDummy = settings.isDummy
    this.latlng = settings.latlng;
    if (settings.values.constructor == Array){      //oldest versions in which values is an array
      for (var i =1; i<myGame.fields.length; i ++) {                //for all fields starting from 1 because 0 is the description
        if(myGame.fields[i].type!="file")                //apart from images
        this.values[myGame.fields[i].name] = settings.values[i-1]         //create the property for this field and assign the value
      }
    }
    else {            //latest version
      this.values = settings.values;
      }
    }
}
document.getElementById('uploadImage').addEventListener('change', openImage, false)
document.getElementById('loadGame').addEventListener('change', readZipFile, false);
document.getElementById('addLayer').addEventListener('change', addNewImageLayer, false);
 function readZipFile(evt, handleLoaded) {

    var files = evt.target.files;
    for (var i = 0, f; f = files[i]; i++) {
        handleFile(f);
    }


  }
function handleFile(f) {
         $("#loadingModal").show();
      filesArray = []
      JSZip.loadAsync(f)
      .then(function(zip) {
        zip.forEach(function (relativePath, zipEntry) {
				filesArray.push(zipEntry)
        });

		handleLoaded(filesArray)
	}, function (e) {
        console.log( "Error reading " + f.name + " : " + e.message);
      });
    }

  function handleLoaded (filesAr){
    var initCode=null;
	 fromFileOpen = true;
		filesAr[0].async("base64")
	.then(function success(content) {
      imgUriLoaded = content.toString();
     imgUriLoaded = "data:image/gif;base64," + imgUriLoaded
  filesAr[1].async("string")
	.then(function success(content) {
    console.log ("imageLoaded");
  pointsLoaded = JSON.parse(content)
		filesAr[2].async("string")
	.then(function success(content) {
    console.log ("pointsLoaded");
   variablesLoaded =  JSON.parse(content)
   filesAr[3].async("string")
	.then(function success(content) {
    console.log ("code1Loaded");
   code1Loaded =  content;
    filesAr[4].async("string")
   .then(function success(content) {
     console.log ("code2Loaded");
   code2Loaded =  content;
	   filesAr[5].async("string")
	.then(function success(content) {
    console.log ("worskpace1Loaded");
   workspaceXml1 =  content;
     filesAr[6].async("string")
	.then(function success(content) {
   workspaceXml2 =  content;
     filesAr[7].async("string")
	 .then(function success(content) {
   workspaceXml3 =  content;
     filesAr[8].async("string")
	.then(function success(content) {

   otherSet =  JSON.parse(content);
    filesAr[9].async("string")
	.then(function success(content) {
    console.log ("otherSet");
     fieldsLoaded =  JSON.parse(content)
	 filesAr[10].async("string")
	.then(function success(content) {
          console.log ("fieldsLoaded");
     instructions =  content;
     if(filesAr.length > 11){
   filesAr[11].async("string")
   .then(function success(content) {
           console.log ("instructLoaded");
       mapsettings =  JSON.parse(content);
       if (filesAr.length > 12){
  filesAr[12].async("string")
   .then(function success(content) {
            console.log ("mapSett loadaed");
        initCode =  content;
      if(filesAr.length > 13){
        filesAr[13].async("string")
         .then(function success(content) {
          var  layers =  JSON.parse(content)
        var playGameSettings = {imgUrl : imgUriLoaded,  points: pointsLoaded, variables: variablesLoaded, initCode:initCode, code1: code1Loaded, code2:code2Loaded, w1: workspaceXml1, w2: workspaceXml2, w3: workspaceXml3,otherSettings: otherSet, fields: fieldsLoaded, inst: instructions, layers:layers, mapSettings: mapsettings}
       myGame.loadPlayMode(playGameSettings);
         console.log("game loaded")
         $("#loadingModal").hide();

     },
      function error(e) {
       console.log ("Error: Failed to load layers")
     });
    }
    else {
      var playGameSettings = {imgUrl : imgUriLoaded, points: pointsLoaded, variables: variablesLoaded, initCode:initCode, code1: code1Loaded, code2:code2Loaded, w1: workspaceXml1, w2: workspaceXml2, w3: workspaceXml3,otherSettings: otherSet, fields: fieldsLoaded, inst: instructions, mapSettings: mapsettings}
     myGame.loadPlayMode(playGameSettings);

    }
  },
     function error(e) {
      // handle the error
    });
   }
    else {
      var playGameSettings = {imgUrl : imgUriLoaded, points: pointsLoaded, variables: variablesLoaded, initCode:initCode, code1: code1Loaded, code2:code2Loaded, w1: workspaceXml1, w2: workspaceXml2, w3: workspaceXml3,otherSettings: otherSet, fields: fieldsLoaded, inst: instructions,  mapSettings: mapsettings}
     myGame.loadPlayMode(playGameSettings);
    }
  },
   function error(e) {
    // handle the error
  });
 }
    else{
   var playGameSettings = {imgUrl : imgUriLoaded, points: pointsLoaded, variables: variablesLoaded, initCode:initCode, code1: code1Loaded, code2:code2Loaded, w1: workspaceXml1, w2: workspaceXml2, w3: workspaceXml3,otherSettings: otherSet, fields: fieldsLoaded, inst: instructions,  mapSettings: mapsettings}
		//console.log (pointsLoaded);
		//console.log(playGameSettings.points)
	myGame.loadPlayMode(playGameSettings);
}
	$("body").css("cursor", "default");

	}, function error(e) {
    console.log ("error reading instructions file ")
	});


	}, function error(e) {
    console.log ("error reading fields file ")
	});

	}, function error(e) {
    console.log ("error reading other settings")
	});
	}, function error(e) {
    console.log ("error reading workspace3 ")
	});
	}, function error(e) {
    console.log ("error reading workspace2 ")
	});
	}, function error(e) {
    console.log ("error reading workspace1 ")
	});
	}, function error(e) {
    // handle the error
	});

	}, function error(e) {
    // handle the error
	});
	},
	 function error(e) {
    // handle the error
	});
	},
	function error(e) {
  // handle the error
});
}, function error(e) {
  // handle the error
});
  }

	newGame.prototype.generatePoints = function (){
	var i, id, tableRows, type, k, field, cel, j, point, uri, ftype, from, to, formula, latlng, img;
  tableRows = document.getElementById("datatable").rows;
	for (i=0; i<tableRows.length; i ++){             //for each row of the dataTable
        id = parseInt(tableRows[i].cells[0].textContent) ;     // get the id (1st column) and make it Integer
        point = myGame.points.find(x=>x.id === id);           // get the Point object with this id from the myGame.points array
        if(point!= undefined){
             point.clearValues ();
        point.setDescription (tableRows[i].cells[1].childNodes[0].value)  //set the description of the point object to the value of column 2
	for (j=1; j<this.fields.length; j++){              //for every field - rest of the rows
     field = this.fields[j]
     cel = tableRows[i].cells[j+1]

		if(field.type === "file"){                //if its an image type field
      img = myGame.images.find(x=>x.id === id);      //get the uri of the img with the id of this Point
      if (img!= undefined){
          point.setImguri(img.imguri)                //set the uri of the point object
      }

		}
   else if (field.type === "formula") {         //if its a formula type field
      var expr =cel.childNodes[0].value;        //get the type of the formula
      point.pushValue (field.name, expr)

    }
    else if (field.type === "travelTime") {         //if its a travelTime type field
       var oper = cel.childNodes[0].value  //get the operation option (minus or plus)
       var travelOption = cel.childNodes[2].value   //get selected option
       var val = {oper: oper, option: travelOption};
       point.pushValue (field.name, val)
     }
    else{                 //its a number,url,text type field
		  point.pushValue (field.name, cel.childNodes[0].value)         //push the value to point's values
  }
	}
  //set latlng of this point object
  if (!usingGoogleMaps)
  latlng = this.myMap.getMarkerLatLan(id)
  else
  {
    latlng = getGMapMarkerLatLan (id);
  }
  point.setPosition (latlng);
  }
	}
}

newGame.prototype.updatePoint = function (pointID, newValue, fieldID, origin, newMark,cel) {
  var point = this.points.find(x=>x.id === pointID);           // get the Point object with this id from the myGame.points array
  var field = this.fields [fieldID];
  var oldValue = point.values[field.name];
  if (oldValue == undefined) {oldValue = "";}
  if(point!= undefined){
      // point.clearValues ();
      if (fieldID == 0)
       point.setDescription (newValue)  //set the description of the point object to the value of column 2
       else if(field.type === "file"){                //if its an image type field
          img = myGame.images.find(x=>x.id === pointID);      //get the uri of the img with the id of this Point
            if (img!= undefined){
        point.setImguri(img.imguri)                //set the uri of the point object
        }
      }
      else if (field.type === "travelTime") {         //if its a travelTime type field
        var oper = cel.childNodes[0].value  //get the operation option (minus or plus)
        var travelOption = cel.childNodes[2].value   //get selected option
        var val = {oper: oper, option: travelOption};
        point.pushValue (field.name, val)
      }
       else {
        point.pushValue (field.name, newValue)
       }
       if (!usingGoogleMaps)
       latlng = this.myMap.getMarkerLatLan(pointID)
       else if (origin == "system") { //called by newEntry function
        if (newMark.latlang != undefined)
        latlng = newMark.latlang
        else if(newMark.position!=undefined) {
          var lat = newMark.position.lat;
          var lng = newMark.position.lng;
          latlng =  {lat, lng};
        }
        else {
          latlng = getGMapMarkerLatLan (pointID);
        } 
       }
        else   //called because user did some modification
        latlng = getGMapMarkerLatLan (pointID);
        
       point.setPosition (latlng);              //set latlng of this point object
}
if (origin === "user") {
  point.timesModified ++ //ANALYTICS
  this.modifyValueEvent(point, field,  newValue, oldValue) //ANALYTICS
}
myGame.counters.databaseDesignActions ++;   //ANALYTICS
checkDatabasepActivity (myGame.counters.databaseDesignActions)  //ANALYTICS
}

newGame.prototype.downloadScore = function(){
  var currentScore = document.getElementById ("current-score").textContent;
  var gamelogHTML = document.getElementById ("messageArea").innerHTML.split("<b>");
  var doc = new jsPDF('p', 'pt', 'a4');
  var maxHeight = 840;
  var d = new Date();
  var line;
  pageCounter =0;
  var datetime = "Last Sync: " + d.getDate() + "/"
                  +(d.getMonth()+1)  + "/"
                  + d.getFullYear() + " @ "
                  + d.getHours() + ":"
                  + d.getMinutes() + ":"
                  + d.getSeconds();

  doc.setFont('LiberationSerif-Regular');
  doc.setFontSize(22);
  doc.setTextColor (255, 153, 51)
  message = "ChoiCo Game"
  doc.text(20, 20,message);
  doc.setFontSize(12);
  doc.setTextColor (0, 0, 0)
  message=  "Your Progress on " + datetime;
  doc.text(20, 35, message);
  doc.setLineWidth(1);
  doc.line(20, 45, 220, 45);
  doc.setFontSize(11);
  message = "Your final score: " + currentScore
  message = doc.splitTextToSize(message, 550)
  doc.text(20, 60, message);
  //message = "Times you played the game (so far): " + myGame.playTimes;
  //doc.text(20, 80, message,);
  message = "Choices history (reversed oreder): "
  doc.text(20, 100, message);
  line = 115;
  for (var i=1; i<gamelogHTML.length; i++){
    var choiceLog = gamelogHTML[i].split("<br>");
    for (var j=0; j<choiceLog.length; j++){

      message = choiceLog[j].replace("</b>", " ");
    message =  message.replace("</hr>", " ");
    message =  message.replace("<hr>", " ");
    message =  message.replace("-", " ");
    if(message!=""){
    message = doc.splitTextToSize(message, 550)
    doc.text( message, 20, line);
    line = line+ 15*message.length;
     if (line >=maxHeight){
      doc.addPage();
      line = 10;
    }
  }
  }
  }
doc.save('ChoiCo_game_score.pdf');
}
newGame.prototype.saveGame = function(){
//this.generatePoints ();
	if(this.generateEvents()){
	//this.totalCode += this.initCode+this.checkCode + this.endCode;
	this.createZipFile (this.points);
	this.saveBlob ();}
}
newGame.prototype.getMapData = function () {
  if (this.myMap.imgUrl == "examples/city.jpg") {
    this.myMap.imgData = getBase64Image (this.myMap.imgUrl)
  }
  return this.myMap.imgData;
}
newGame.prototype.getMapSettings = function () {
  var mapSets = {};
  if(myGame.mode!=0){
  if(usingGoogleMaps){
      var mapSets = {zoom: this.myMap.mapInstance.getZoom(), googleMaps : true, googleMarkersCounter: googleMarkersCounter, mapCenter: myGame.myMap.mapInstance.center }
     
   }
   else{
    mapSets = {zoom: this.myMap.mapInstance.getZoom(),bounds:findSaveBounds(), googleMaps : false}
 }
}
 return mapSets;
}

newGame.prototype.createZipFile = function(myPoints) {
	  zip = new JSZip();
    var xml_text1 = getWorkospaceText(1);
    var xml_text2 = getWorkospaceText(2);
    var xml_text3 = getWorkospaceText(3);
    if (this.myMap.imgUrl == "examples/city.jpg") {
      this.myMap.imgData = getBase64Image (this.myMap.imgUrl)
    }
	// imgUrl = uri.replace("image/png", "image/octet-stream");
  if(!usingGoogleMaps){
  var mapImageData = this.getMapData()
  }
	var instructions = document.getElementsByClassName("jqte_editor")[0].innerHTML

  zip.file("background.png", this.myMap.imgData, {base64 :true});
 if(usingGoogleMaps){
    var mapSets = {zoom: this.myMap.mapInstance.getZoom(), googleMaps : true, googleMarkersCounter: googleMarkersCounter, mapCenter: myGame.myMap.mapInstance.center }
     layerString = JSON.stringify([]);
  }
  else{

     var mapSets = {zoom: this.myMap.mapInstance.getZoom(),bounds:findSaveBounds(), googleMaps : false}
    var layerString = JSON.stringify (this.myMap.getLayersToSave());
   }
	 var pointsString = JSON.stringify (this.points);
	 var variablesString = JSON.stringify (this.variables);
	 var allvariablesString = JSON.stringify (this.fields);
   var initialCode = this.initCode;
	var code1  = this.checkCode;
	var code2  = this.endCode;
	 var otherSet = JSON.stringify (this.otherSettings);
   var mSet = JSON.stringify (mapSets);
	 zip.file ("poitnsDB.json", pointsString);
	zip.file ("variables.json", variablesString);
	zip.file ("code1.txt", code1 );
	zip.file ("code2.txt", code2 );
	zip.file("workspace1.xml", xml_text1);
	zip.file ("workspace2.xml", xml_text2)
	zip.file ("workspace3.xml", xml_text3)
	zip.file ("otherSettings.json", otherSet );
zip.file ("fields.json", allvariablesString );
zip.file ("instructions.txt", instructions );
zip.file ("mapSettings.json", mSet)
 zip.file ("initialCode.txt", initialCode)
   zip.file ("layers.json", layerString);
 }

newGame.prototype.saveBlob = function () {
	 zip.generateAsync({type:"blob"})
.then(function (blob) {

	  link = document.createElement('a');
	  var fileName = prompt("Filename", "");
	  link.download = fileName+".choico";

		// Firefox requires the link to be added to the DOM
		// before it can be clicked.
		link.href = window.URL.createObjectURL(blob);
		link.onclick = destroyClickedElement;
		link.style.display = "none";
		document.body.appendChild(link);
	  link.click();

});
 }
 newGame.prototype.generateEvents = function (){  	//gets the code from workspaces and the database from datatable

 if(myGame.mode != 0)     //if not still in intro 
this.debugCode('auto');

if (!editor2_init){
	if(!fromFileOpen)
		this.checkCode = "";
}
else
	this.checkCode = w2.getJavascriptCode();
if (!editor3_init){
	if(!fromFileOpen)
		this.endCode = "";

}
else
	this.endCode = w3.getJavascriptCode();
return true;
}

newGame.prototype.checkBlocklyVar = function (varName) {
  var found = this.variables.find (x => x.name === varName);
  if (found === undefined) {

    return false;
  }
  return true;
}
newGame.prototype.debugCode = function (type) {
  var bugsFound = false;
  /*first modify the buttons in the modal based on the debug source*/ 
  if(type!='user') {
    $("#backToDesign").show();
    $("#continueToPlay").show();
    $("#closeConsoleModal").hide();
  }
  else {
    $("#backToDesign").hide();
    $("#continueToPlay").hide();
    $("#closeConsoleModal").show();
  }
  $("#errormessages").html (" ");
  if (this.checkIntialForBugs()) {
     bugsFound = true;
  }
  if (this.checkEndingRules()) {
    bugsFound = true;
 }
 if (this.checkGameplayRules()) {
  bugsFound = true;
}
  if(this.myMap.markers.length === 0)			//if the game has no points alert a message
  {
    var errormessage = {error: language.markersMessageA, effect: '', suggestion: ''}
     addConsoleMessage (errormessage, 'warning')
     bugsFound = true;
  }
  if (!bugsFound) {
      $("#errormessages").html ("No error messages :)");
  }
  else if (type!='user') {
    $("#consoleModal").toggle();
  }
  if (type === 'user')    //the user clicked the debug button
  this.debugEvent ();     //event logging
  
}
newGame.prototype.checkEndingRules = function () {
  bugsFound = false;
  if (!editor3_init) {
    var errormessage = {error: language.tab3MessageA, effect: language.tab3MessageB, suggestion: language.tab3MessageC}
       addConsoleMessage (errormessage, 'warning');
       bugsFound = true;
  }
  else {
   var codeVariables = w3.workspace.getBlocksByType('singleVar');
   for (var i = 0; i < codeVariables.length; i ++){
    found = false;
    var vname = codeVariables[i].getFieldValue('varName');
    if(this.checkBlocklyVar (vname))
      found = true;
    if (!found){
      var error1= "'" + vname + language.variableErrorMessageEndA ;
      var errormessage = {error: error1,effect: language.variableErrorMessageEndB, suggestion: language.variableErrorMessageEndC}
    addConsoleMessage (errormessage, 'error')
       bugsFound = true;
    }
   }
  }
  return bugsFound;
}
newGame.prototype.checkGameplayRules = function () {
  if(editor2_init) {
    var codeVariables = w2.workspace.getBlocksByType('singleVar');
    for (var i = 0; i < codeVariables.length; i ++){
     found = false;
     var vname = codeVariables[i].getFieldValue('varName');
     if(this.checkBlocklyVar (vname))
       found = true;
     if (!found){
       var error1= "'" + vname + language.variableErrorMessageGameplayA ;
       var errormessage = {error: error1,effect: language.variableErrorMessageGameplayB, suggestion: language.variableErrorMessageGameplayC}
     addConsoleMessage (errormessage, 'error')
        bugsFound = true;
     }
  }
  }
  return bugsFound;
}
newGame.prototype.checkIntialForBugs = function () {
   var numberVariables, xml, fieldName, curBlock,  value, v, found, name, w1Blocks, i, bugsFound;
   var curentValues = [];
   var currentVars = [];
   var blocklyVars = [];
   w1Blocks = [];
   bugsFound = false;
   //collect database fields and put them in this.variables array
      this.variables = [];
        for (var i = 0; i < this.fields.length; i ++){
          if (this.fields[i].type == "number"){
            this.variables.push({name: this.fields[i].name, type: this.fields[i].type})
          }
          if (this.fields[i].type == "formula"){
                this.variables.push({name: this.fields[i].name, type: this.fields[i].type})
              }
        if (this.fields[i].type == "travelTime"){
                  this.variables.push({name: this.fields[i].name, type: this.fields[i].type})
          }
        }
  if (!editor1_init){
    var errormessage = {error: language.tab1MessageA, effect: language.tab1MessageB, suggestion: language.tab1MessageC}
    addConsoleMessage (errormessage, 'error');
    bugsFound = true;
   this.initCode = "";
	}
  else {
     
    xml = w1.getWorkspace();
  w1Blocks = w1.getBlocks();
 this.initCode = w1.getJavascriptCode();

  found=false;
  for (i =0; i < w1Blocks.length; i ++){
    curBlock = w1Blocks[i];
  	if (curBlock.type== "initialValue" ){
       fieldName = curBlock.getFieldValue('varName');
      var varId = curBlock.id;
       if (curBlock.getChildren()[0].type != 'math_number'){
        var error1 = "'" + fieldName + language.notNumberMessageA ;
        var errormessage = {error: error1, effect: language.notNumberMessageB, suggestion: language.notNumberMessageC}

       addConsoleMessage (errormessage, 'error');
       bugsFound = true;
     }
     value = curBlock.getChildren()[0].getFieldValue('NUM')
     v = {name: fieldName, value: parseFloat(value), id: varId} ;
     blocklyVars.push(v) ;
  	}
  }
  for (i=0; i < this.variables.length; i++){
    found = false;
     name = this.variables[i].name.replace (' ', '_');
    for (j=0; j<blocklyVars.length; j++){
    if( name == blocklyVars[j].name){
      this.variables[i].value = blocklyVars[j].value;
      found = true;
    }
  }
    if (!found){
      var error1 =  "'" + this.variables[i].name + language.notInitialValueA;
      var errormessage = {error: error1, effect: language.notInitialValueB, suggestion: language.notInitialValueC}
    addConsoleMessage (errormessage, 'error');
       bugsFound = true;
    }
  }
  for (i=0; i < blocklyVars.length; i++){
    found = false;
    if(this.checkBlocklyVar (blocklyVars[i].name))
      found = true;
    if (!found){
      var error1= "'" + blocklyVars[i].name + language.variableErrorMessageA ;
      var errormessage = {error: error1,effect: language.variableErrorMessageB, suggestion: language.variableErrorMessageC}
    addConsoleMessage (errormessage, 'error')
       bugsFound = true;
    }
  }
}
  this.initCode += "var selectedPoint = null; \n var movescounter = 0;\n"
  this.definitions = this.createDefinitionsCode ();
  return bugsFound;
  }
function openImage(evt) {     //when user uploads an image to change the background in design mode
    var f = evt.target.files[0];
  if (!f) {
        alert("Failed to load file");
    }
	 else {

      var r = new FileReader();
      r.onload = function(e) {

	     uri = e.target.result;
		 myGame.myMap.setMainBackground (uri);

      }
     r.readAsDataURL(f);
    }
  }

  newGame.prototype.openInstance = function (fileName, source){
    var fpath;

        if (source!=3){
          fpath = 'examples/' +fileName +'.zip'
        }
        else    //digitalSchoolInstance
        fpath =  "loadgameinstantly/game.zip"
	  JSZipUtils.getBinaryContent(fpath, function(err, data) {
  if(err) {
      if (source!=3)
    alert ("Ooops! I couldn't open the game with the name: " + fileName)

    return 0;
  }
  if (source ===3){
    changeLanguage("Gr");
    document.getElementById("dSchoolInfo").style.visibility = 'visible';
  }

 handleFile(data)
 //$("#gameTitle").html (fileName);
});

}

function uploadIcon (evt) {
  var f = evt.target.files[0];
  if (!f) {
        alert("Failed to load file");
    }
	 else {
      var r = new FileReader();
      r.onload = function(e) {
	     var uri = e.target.result;
       $("#iconThumb").attr("src",uri);
      }
     r.readAsDataURL(f);
    }
  }
		$("#uploadIcon").on('change', uploadIcon)
  function loadImgFile(evt) {

    //Retrieve the first (and only!) File from the FileList object
    var f = evt.target.files[0];
	var rowNumber = this.parentNode.parentNode.rowIndex;
	var thumb = this.nextElementSibling;
  var fieldID = this.parentNode.cellIndex-1;

//	console.log (f.type);
  if (!f) {
        alert("Failed to load file");
    }
	 else {

      var r = new FileReader();
      r.onload = function(e) {

	     var uri = e.target.result;
       var id =   parseInt(myGame.dataTable.rows[rowNumber].cells[0].innerHTML)
		 var newImg = {id: id, imguri: uri}
     var img = myGame.images.find(x=>x.id === id)
     if (img!= undefined)  //image already uploaded for this
      img.imguri = uri;
      else
		 myGame.images.push(newImg);
		 thumb.src = uri
     myGame.updatePoint (id, uri,fieldID )
      }
     r.readAsDataURL(f);
    }  }

  addConsoleMessage = function (message, type) {
    myGame.errorsCount ++;
    var oldcontent = $("#errormessages").html();
    var spstyle = "<span style='color: black; font-weight: bold'> Info: </span> " 
    if (type == "error") {
      var spstyle = "<span style='color: red ; font-weight: bold'> Error: </span> "
    }
    else if (type == "warning") {
       var spstyle = "<span style='color: orange; font-weight: bold'> Warning: </span>"
    }
    var newcontent =  "<p>"+ spstyle + message.error 
    + "</br> <span style = 'font-weight: bold'> Effect: </span>"+
     message.effect +"</br> <span style = 'font-weight: bold'> Suggested Solution: </span>"+ message.suggestion
      + "</p> <hr> " + oldcontent;
     $("#errormessages").html (newcontent)
  }
  function getWorkospaceText (workspaceID){
    var xml_text ="";
    switch(workspaceID){
    case 1:
      if(!editor1_init){
       xml_text = w1.workspaceXml;
      }
      else {
         var xml1 = w1.getWorkspace();
         xml_text = Blockly.Xml.domToText(xml1);
      }
      break;
    case 2:
    if (!editor2_init) {
        xml_text = w2.workspaceXml;
     }
     else {
       var xml2 = w2.getWorkspace();
       xml_text = Blockly.Xml.domToText(xml2);
     }
     break;
    case 3:
     if (!editor3_init) {
      xml_text = w3.workspaceXml;
     }
    else {
      var xml3 = w3.getWorkspace();
      xml_text = Blockly.Xml.domToText(xml3);
    }
    break;
    default: console.log ("wrong workspace ID "); break;
  }
    return xml_text;
  }
