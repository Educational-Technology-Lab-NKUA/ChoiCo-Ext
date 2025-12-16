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
function destroyClickedElement(event)
{
	document.body.removeChild(event.target);
}

function nextStep() {
  if (myInterpreter.step()) {
    window.setTimeout(nextStep, 10);
  }
}

function initApi(interpreter, scope) {
  // Add an API function for the alert() block.
 var wrapper = function(text) {

    text = text ? text.toString() : '';

	var prevMes = document.getElementById("messageArea").innerHTML
	document.getElementById("messageArea").innerHTML = text +  "<br>--------------------------------<br>" + prevMes;
    return interpreter.createPrimitive(console.log (text));
  };
  interpreter.setProperty(scope, 'alert',
      interpreter.createNativeFunction(wrapper));



var wrapper1 = function(text) {
    text = text ? text.toString() : '';

	document.getElementById("popUp_text").innerHTML += "<br>" + text ;

	myGame.showPopUp();
  //  return interpreter.createPrimitive(console.log (text));

  };
  var wrapper2= function(text) {  						//endGame function
   var prevText= document.getElementById("popUp_text").innerHTML ;
   var messages = prevText.split("<br>");
	 var gameOverModal =  document.getElementById("gameEnds")
   if(messages.length>1){
	   prevText = messages[messages.length-1]
   }
  document.getElementById("endGameMessage").innerHTML = prevText ;
	myGame.closePopUp();
  gameOverModal.style.display = "block";
		myGame.gameIsOver();
  //return interpreter.createPrimitive(console.log (text));
  };
  var sound_wrapper= function(fileName) {  						//play sound function
	  var audio = new Audio(fileName);
	audio.play();
  //  return interpreter.createPrimitive(console.log (fileName));
  };
	var video_wrapper = function (videoUrl){
		//myGame.changeVideoSrc (videoUrl.data);
	 	mediaPlayer.setSrc (videoUrl.data);
		showVideo();
	//	return interpreter.createPrimitive(console.log (videoUrl));
	}
	var background_wrapper = function (backgroundUrl, time){
		//myGame.changeVideoSrc (videoUrl.data);
		if (time.data == null)
	 	myGame.myMap.setMainBackground (backgroundUrl.data);
		else {
			if (time.data > 0){
			var ms = time.data*1000

			setTimeout(function(){ 	myGame.myMap.removeBackgrounds(); }, ms);
			myGame.myMap.setMainBackground (backgroundUrl.data);
		}
	}
	}
	var points_wrapper = function (point, action){
		if (action == 1){ 		//hide
			if ((point == "all points")||(point ==0))
			hideAllMarkers();
			else
			hideMarker (point.data)
			myGame.clearDisplayTable ()
		}
		else if (action == 2){
			if ((point == "all points")||(point ==0))
			showAllMarkers();
			else
				showMarker (point.data)
		}
	}
	var layer_wrapper = function (layerName){
		//myGame.changeVideoSrc (videoUrl.data);

		myGame.myMap.setActiveLayer(layerName)

	}
  interpreter.setProperty(scope, 'popup',
      interpreter.createNativeFunction(wrapper1));
	interpreter.setProperty(scope, 'endGame',
      interpreter.createNativeFunction(wrapper2));
	  interpreter.setProperty(scope, 'playSound',
      interpreter.createNativeFunction(sound_wrapper));
	interpreter.setProperty(scope, 'playVideo',
				interpreter.createNativeFunction(video_wrapper));
		interpreter.setProperty(scope, 'changeBackground',
				interpreter.createNativeFunction(background_wrapper ));
	interpreter.setProperty(scope, 'changePointVisibility',
				interpreter.createNativeFunction(points_wrapper));
				interpreter.setProperty(scope, 'changeLayer',
							interpreter.createNativeFunction(layer_wrapper));
}

function generateBlocks(){

Blockly.Blocks['initialvalues'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("On game start");
    this.appendStatementInput("Initial Values")
        .setCheck(null);
    this.setColour(290);
    this.setTooltip('In this block you should define the initial values of your fields');
    this.setHelpUrl('blocksEn.html#gameStartBlock');
  }
};
/*Blockly.JavaScript['initialvalues'] = function(block) {
  var statements_initial_values = Blockly.JavaScript.statementToCode(block, 'Initial Values');
  // TODO: Assemble JavaScript into code variable.
 console.log (statements_initial_values);
  var code = statements_initial_values;
  return code;
};*/

javascript.javascriptGenerator.forBlock['initialvalues'] = function(block, generator) {
  // Collect argument strings.
 // const fieldValue = block.getFieldValue('MY_FIELD');
  const statements_initial_values  = generator.statementToCode(block, 'Initial Values');
 // console.log (statements_initial_values);
  var code = statements_initial_values;
  // Return code.
  return code;
}

Blockly.Blocks['gameover'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Game Over");
    this.setPreviousStatement(true, null);
    this.setColour(345);
    this.setTooltip('Ends the game');
    this.setHelpUrl('blocksEn.html#gameoverBlock');
  }
};
javascript.javascriptGenerator.forBlock['gameover'] = function(block, generator) {
 var code = 'endGame();\n';
  // Return code.
  return code;
}

Blockly.Blocks['popup'] = {
  init: function() {
    this.appendDummyInput()
         .appendField("PopUp window with: \"")
        .appendField(new Blockly.FieldTextInput("default"), "popuptext")
        .appendField("\"");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(165);
    this.setTooltip('Appear a popup window with text');
    this.setHelpUrl('blocksEn.html#popUpBlock');
  }
};

javascript.javascriptGenerator.forBlock['popup'] = function(block, generator) {
  var text_popuptext = block.getFieldValue('popuptext');
  var text_popuptext = text_popuptext.replace (/"/g,"")
  var code = 'popup("'+text_popuptext +'");\n';
  return code;
};
/*Blockly.Blocks['possibility'] = {
  init: function() {
    this.appendValueInput("action")
        .setCheck(null)
        .appendField("possibility")
				.appendField(new Blockly.FieldNumber(0, 1, 100), "percentage")
        .appendField("%");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};*/

updateBlocks();
}

function updateBlocks () {
	var dt = document.getElementById("datatable");
//var r = dt.rows[0];
var variables = myGame.fields;
var options =[];
var pointsDiscr = [["", ""]];
var layersNames = [["", ""]];

for (var i=1; i<variables.length; i++){

	if((variables[i].type == "number")|| (variables[i].type === "formula") ||(variables[i].type === "travelTime")  ){
	var replaced = variables[i].name.split(' ').join('_');
	options.push([replaced, replaced]);
	}
}

if (options.length == 0)
options.push([" "])


var curPoints = myGame.myMap.markers;
if (curPoints.length > 0){
	pointsDiscr = [];
for (var i=0; i<curPoints.length; i++){
	if(!usingGoogleMaps)
		var opt = curPoints[i].label._content;
	else {
		var opt = curPoints[i].metadata.infoW.getContent();
	}
	pointsDiscr.push([opt, opt]);
}
//console.log (pointsDiscr);
}
if (!usingGoogleMaps){
var allLayers = myGame.myMap.layers
if ( allLayers.length > 0){
	layersNames = [];
	for (var i=0; i<allLayers.length; i++){

		var opt = allLayers[i].name
		layersNames.push([opt, opt]);
	}
}
}
Blockly.Blocks['initialValue'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Set Field")
        .appendField(new Blockly.FieldDropdown(options), "varName")
        .appendField("to")
         this.appendValueInput("varVal")
        .setCheck("Number");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
	this.setNextStatement(true, null);
    this.setColour(330);
    this.setTooltip('Sets a value to a variable');
    this.setHelpUrl('blocksEn.html#setFieldBlock');
  }
};
javascript.javascriptGenerator.forBlock['initialValue'] = function(block, generator) {
  var dropdown_name = block.getFieldValue('varName');
  var value_varval = generator.valueToCode(block, 'varVal', javascript.Order.ATOMIC);
  var code = 'var ' + dropdown_name + ' = ' + value_varval +'; \n';
  // Return code.
  return code;
}
/*Blockly.JavaScript['initialValue'] = function(block) {
  var dropdown_name = block.getFieldValue('varName');
 var value_varval = Blockly.JavaScript.valueToCode(block, 'varVal', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = 'var ' + dropdown_name + ' = ' + value_varval +'; \n';
  return code;
};*/
Blockly.Blocks['singleVar'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown(options), "varName")
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(330);
    this.setTooltip('Returns the value of the selected variable');
    this.setHelpUrl('blocksEn.html#fieldBlock');
  }
}
javascript.javascriptGenerator.forBlock['singleVar'] = function(block, generator) {
  var dropdown_name = block.getFieldValue('varName');
  var code =  dropdown_name  ;
  var block_workspace = block.workspace.id;
  var workspaceText = "";
  if (block_workspace === w1.workspace.id) {
		workspaceText = language.tab2;
	}
	else if (block_workspace === w2.workspace.id) {
		workspaceText = language.tab3;
	}
	else {		workspaceText = language.tab4; }
  if (!myGame.checkBlocklyVar (code)){
	   // addConsoleMessage (language.variableErrorMessageA + code + language.variableErrorMessageB)
			return "";
		}
		else {
				return [code, javascript.Order.NONE];
		}

}
/*Blockly.JavaScript['singleVar'] = function(block) {
  var dropdown_name = block.getFieldValue('varName');
  var code =  dropdown_name  ;
	var block_workspace = block.workspace.id;
	var workspaceText = "";
	if (block_workspace === w1.workspace.id) {
		workspaceText = language.tab2;
	}
	else if (block_workspace === w2.workspace.id) {
		workspaceText = language.tab3;
	}
	else {		workspaceText = language.tab4; }
  if (!myGame.checkBlocklyVar (code)){
	   // addConsoleMessage (language.variableErrorMessageA + code + language.variableErrorMessageB)
			return "";
		}
		else {
				return [code, Blockly.JavaScript.ORDER_NONE];
		}


};*/
Blockly.Blocks['hide_point'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Hide point")
  			.appendField(new Blockly.FieldDropdown(pointsDiscr), "pointsNames");
	   this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(45);
		this.setTooltip("Makes the selected point invisible on map");
 this.setHelpUrl('blocksEn.html#hidePointBlock');
  }
};
javascript.javascriptGenerator.forBlock['hide_point'] = function(block, generator) {
  var dropdown_name = block.getFieldValue('pointsNames');
  var code = 'changePointVisibility("'+dropdown_name+'",1);\n'
  return code;
}

Blockly.Blocks['show_point'] = {
  init: function() {
    var input = this.appendDummyInput()
        .appendField("Show Point")
				.appendField(new Blockly.FieldDropdown(pointsDiscr), "pointsNames");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(45);
 this.setTooltip("Makes the selected point visible on map");
 this.setHelpUrl('blocksEn.html#showPointBlock');
  }
}

javascript.javascriptGenerator.forBlock['show_point'] = function(block, generator) {
	var dropdown_name = block.getFieldValue('pointsNames');
	var code ='changePointVisibility("'+dropdown_name+'",2);\n'
	  return code;
	};
  
 Blockly.Blocks['airQuality'] = {
	init: function() {
	    this.appendDummyInput()
	        .appendField("selectedChoice.airQuality");
	    this.setOutput(true, "Number");
	    this.setColour(210);
	 this.setTooltip("check the real time data for the air quality AQI of the selected choice");
	 this.setHelpUrl("");
   if(!usingGoogleMaps)
    this.setEnabled(false);
  else this.setEnabled(true);
    }
	  
 };
 javascript.javascriptGenerator.forBlock['airQuality'] = function(block) {
  var code = ' selectedChoice.airQuality';
  return [code, javascript.Order.NONE];
};
Blockly.Blocks['current_point_check'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("selectedChoice.name  == ")
        .appendField(new Blockly.FieldDropdown(pointsDiscr), "pointsNames");
    this.setOutput(true, null);
    this.setColour(210);
    this.setTooltip('Conditional statement for checking the currently selected point');
    this.setHelpUrl('blocksEn.html#selectedPointBlock');
  }
}

javascript.javascriptGenerator.forBlock['current_point_check'] = function(block, generator) {
  var dropdown_name = block.getFieldValue('pointsNames');
  var code = ' selectedChoice.name == "' + dropdown_name + '"' ;
  return [code, javascript.Order.NONE];
};

Blockly.Blocks['times_selected_check'] = {
	init: function() {
	    this.appendDummyInput()
	        .appendField("selectedChoice.selections");
	    this.setOutput(true, "Number");
	    this.setColour(210);
	 this.setTooltip("");
	 this.setHelpUrl("");
	  }
 };


 javascript.javascriptGenerator.forBlock['times_selected_check'] = function(block) {
  var code = ' selectedChoice.selections';
  return [code,  javascript.Order.NONE];
};

Blockly.Blocks['current_layer_check'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("active Layer == ")
        .appendField(new Blockly.FieldDropdown(layersNames), "layersNames");
    this.setOutput(true, null);
    this.setColour(210);
    this.setTooltip('Conditional statement for checking the currently active layer');
    //this.setHelpUrl('blocksEn.html#selectedPointBlock');
  }
}

javascript.javascriptGenerator.forBlock['current_layer_check'] = function(block) {
  var dropdown_name = block.getFieldValue('layersNames');
  var code = ' activeLayer == "' + dropdown_name + '"' ;
  return [code,  javascript.Order.NONE];
};

Blockly.Blocks['background'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Set Background to")
        .appendField(new Blockly.FieldTextInput("Image_Url"), "background");
				this.setPreviousStatement(true, null);
	 this.setNextStatement(true, null);
    this.setColour(45);
 this.setTooltip("Change the background of the current layer");
 this.setHelpUrl('blocksEn.html#setBackgroundBlock');
 if(usingGoogleMaps)
  this.setEnabled(false);
else this.setEnabled(true);
  }
};


javascript.javascriptGenerator.forBlock['background'] = function(block) {
  var backgroundUrl= block.getFieldValue('background');
  var code = 'changeBackground("'+backgroundUrl +'", null);\n';
  return code;
};
Blockly.Blocks['change_layer'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Set Active Layer: ")
        .appendField(new Blockly.FieldDropdown(layersNames), "layersNames");
				this.setPreviousStatement(true, null);
	 this.setNextStatement(true, null);
    this.setColour(45);
 this.setTooltip("Change the layer");
 this.setHelpUrl('blocksEn.html#setLayerBlock');
 if(usingGoogleMaps)
  this.setEnabled(false);
else this.setEnabled(true);
  }
  
};


javascript.javascriptGenerator.forBlock['change_layer'] = function(block) {
	var dropdown_name = block.getFieldValue('layersNames');
  var code = 'changeLayer("'+dropdown_name  +'");\n';
  return code;
};
Blockly.Blocks['reset_background'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Reset background")
				this.setPreviousStatement(true, null);
	 this.setNextStatement(true, null);
    this.setColour(45);
 this.setTooltip("Sets the background to its initial image");
 this.setHelpUrl("");
 if(usingGoogleMaps)
  this.setEnabled(false);
else this.setEnabled(true);
  }
  
};
javascript.javascriptGenerator.forBlock['reset_background'] = function(block) {
  var code = 'resetBackground();\n';
  return code;
};
Blockly.Blocks['set_temporary_background'] = {
  init: function() {
    this.appendValueInput("time")
        .setCheck("Number")
        .appendField("set background to")
        .appendField(new Blockly.FieldTextInput("image_url"), "url")
        .appendField("for");
    this.appendDummyInput()
        .appendField("seconds");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(45);
 this.setTooltip("changes the background for a number of seconds. Then restores previous background");
 this.setHelpUrl('blocksEn.html#setBackgroundSecBlock');
 if(usingGoogleMaps)
  this.setEnabled(false);
else this.setEnabled(true);
  }
  
}
  javascript.javascriptGenerator.forBlock['set_temporary_background'] = function(block, generator) {
  var backgroundUrl = block.getFieldValue('url');
  var sec= generator.valueToCode(block, 'time', javascript.Order.ATOMIC);
  var code = 'changeBackground("'+backgroundUrl +'", '+sec+');\n';
  return code;
};

Blockly.Blocks['video'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Play Video")
        .appendField(new Blockly.FieldTextInput("youtube_url"), "url");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(160);
 this.setTooltip("Insert a youtube video url");
 this.setHelpUrl('blocksEn.html#playVideoBlock');
  }
};

javascript.javascriptGenerator.forBlock['video'] = function(block) {
  var video_url = block.getFieldValue('url');
 	var code = 'playVideo("'+video_url +'");\n';
  return code;
};


Blockly.Blocks['sound'] = {
  init: function() {
    var input=this.appendDummyInput()
        input.appendField("Play Sound")
	var options = [
		["beep","beep"],
		["coin","coin"],
		["heal","heal"],
		["correct","correct"],
		["space","space"],
		["drums","drums"],
		["comedy whistle","comedic_whistle"],
		["applause","applause"],
		["cheering","cheering"],
		["fail","fail"],
		["game over","lose"],
		["game over2","lose2"],
		["doorbell","doorbell"],
		["door opens","door_open"],
		["shop bell","shop_bell"],
		["hello (man)","hello"],
		["goodbye (woman)","goodbye"],
		["intro","intro"],
		["water","water"],
		["water2","water2"],
		["dog","dog"],
		["rooster","rooster"],
		["chewing","chewing"]
		]
       input.appendField(new Blockly.FieldDropdown(options), "NAME");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(165);
    this.setTooltip('blocksEn.html#playSoundBlock');
    this.setHelpUrl('Plays the selected sound');

  },
  onchange: function(changeEvent) {
	  if(changeEvent.oldValue != changeEvent.newValue){
     var val = changeEvent.newValue;
	 var path = "media/sounds/"+val+".wav"
	  var audio = new Audio(path);
	audio.play();
	  }
    }
};

javascript.javascriptGenerator.forBlock['sound'] = function(block) {
  var dropdown_name = block.getFieldValue('NAME');
  var fileName = dropdown_name +'.wav'

  var code = 'playSound("media/sounds/'+fileName +'");\n';
  return code;
};
Blockly.Blocks['movescounter'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("moves counter");
    this.setOutput(true, "Number");
    this.setColour(345);
    this.setTooltip("Returns the number of player's current move (i.e. 2 if it is the second move)");
    this.setHelpUrl('blocksEn.html#movesCounterBlock');
  }
};
javascript.javascriptGenerator.forBlock['movescounter'] = function(block) {
  var code = "movescounter";
  return [code, javascript.Order.NONE];
};
javascript.javascriptGenerator.forBlock['possibility'] = function(block) {
  var number_percentage = block.getFieldValue('percentage');
  var value_action = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
	var r = Math.floor((Math.random() * 100) + 1);
	if(r< number_percentage){
	var code = value_action;
  return code;
	}
};
Blockly.Blocks['hide_all'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Hide All Points");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(45);
 this.setTooltip("Hides all points");
 this.setHelpUrl("blocksEn.html#hideAllBlock");
  }
};
javascript.javascriptGenerator.forBlock['hide_all'] = function(block) {
  var code = "changePointVisibility(0,1);\n"
  return code;
};
Blockly.Blocks['show_all'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Show All Points");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(45);
 this.setTooltip("Displays all points");
 this.setHelpUrl("blocksEn.html#showAllBlock");
  }
};
javascript.javascriptGenerator.forBlock['show_all'] = function(block) {
  var code = "changePointVisibility(0,2);\n"
  return code;
};
}


function updateWorkspace () {
	var allBlocks = workspace1.getAllBlocks();
	for (var i=0; i<allBlocks.length; i++){
		var inputs = workspace1.getAllBlocks()[0].inputList;

	}

}

function myUpdateFunction(event) {
	if (Blockly.Events.CHANGE ){
  //console.log (event)
}
}

