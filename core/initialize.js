
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

$(document).ready(function () {
	// Get the modal


var logbtn = document.getElementById("logButton");
var span = document.getElementsByClassName("btn-close")[0];
var spanGameOver = document.getElementsByClassName("btn-close")[1];
var consoleSpan = document.getElementsByClassName("btn-close")[2];
var donloadSc = document.getElementById("downloadScore");
  var statsModal = document.getElementById("myModal");
var gameOverModal = document.getElementById("gameEnds");
var instructionModal = document.getElementById("gameInstructions");
var gameOverScorebtn = document.getElementById("show_score");
var backModalbtn = document.getElementById("backModalbtn");
var playBtn = document.getElementById("play");
var saveBtn = document.getElementById("save");
var homeBtn = document.getElementById("home");
var editBtn = document.getElementById("back");
var exampBtn = document.getElementById("examplesButton");
var closeStats = document.getElementById("closeStats");
var designBtn =  document.getElementById("designButton");
var infoBtn =  document.getElementById("gameInfos");
var backToDesignModal =  document.getElementById("backToDesign");
var continueModal = document.getElementById("continueToPlay");
var uploadBtn = document.getElementById("uploadBtn");
myGame = null;
fromFileOpen = false
homeBtn.onclick=  function () {
  //introStyle();
  window.onbeforeunload = null;
  	if(confirm (homeMessage)){
    location.reload();
  }
}

$("#uploadBtn").hide();
	$("#uploadlbl").hide();
homeBtn.style.display = "none";
//exampBtn.style.display = "none";
  $('[data-bs-toggle="popover"]').popover();
  $('.popover-dismiss').popover({
    trigger: 'focus'
  })
designBtn.onclick = function () {
  newDesignMode();
}
playBtn.onclick = function () {
  myGame.generatePlay();
}

editBtn.onclick = function () {
  myGame.backToEdit();
}
backToDesignModal.onclick = function () {
	myGame.backToEdit();
	$("#consoleModal").toggle();
	$("#gameInstructions").toggle();
  }
  continueModal.onclick = function () {
	$("#consoleModal").toggle();
  }
saveBtn.onclick = function () {
  myGame.saveGame();
}
logbtn.onclick = function() {
  statsModal.style.display = "block";
  closeStats.style.display = "block";
  backModalbtn.style.display = "none";
}
infoBtn.onclick = function() {
  instructionModal.style.display = "block";
}
gameOverScorebtn.onclick = function() {
  statsModal.style.display = "block";
  closeStats.style.display = "none";
  gameOverModal.style.display = "none";
  backModalbtn.style.display = "block";
}
backModalbtn.onclick = function() {
  statsModal.style.display = "none";
  gameOverModal.style.display = "block";
}
// When the user clicks on <span> (x), close the modal
span.onclick = function(e) {
  e.preventDefault();
	$("#gameInstructions").toggle();
}
spanGameOver.onclick = function(e) {
  e.preventDefault();
$("#myModal").toggle();
}

consoleSpan.onclick = function(e) {
  e.preventDefault();
$("#consoleModal").toggle();
}

$("#console").click(function() {
	myGame.debugCode ('user');
$("#consoleModal").toggle();
})



$("#closeConsoleModal").click(function() {
$("#consoleModal").toggle();
})



donloadSc.onclick = function () {
	myGame.downloadScore ();
}

$("#videoPlayerWindow").hide();
$("#rClick").hide();
document.getElementById('blocklyDiv').style.height = window.innerHeight*0.75 + "px";
document.getElementById('blocklyDiv2').style.height = window.innerHeight*0.75 + "px";
document.getElementById('blocklyDiv3').style.height = window.innerHeight*0.75 + "px";
document.getElementById('gameRow').style.height = window.innerHeight*0.75 + "px";
document.getElementById('gameBoard').style.height = window.innerHeight*0.75 + "px";

$('.nav-tabs a[href="#gameInterface"]').tab('show');
$('.nav-tabs a').on('shown.bs.tab', function(e){
  var tabID = e.target.id // newly activated tab
  switch (tabID) {
    case "tab1":
  //  myGame.myMap.findBounds();
  //  myGame.myMap.mapInstance.fitBounds (myGame.myMap.bounds)
  if (!usingGoogleMaps){
    if (myGame.myMap.markers.length > 0)
      showAllMarkers();
     myGame.myMap.layersDiv.style.visibility = 'visible'
    restoreMap();
   }
    if (editor1_init)
     tbx1.style.visibility = "hidden"
   if (editor2_init)
     tbx2.style.visibility = "hidden"
   if (editor3_init)
     tbx3.style.visibility = "hidden"


      break;
    case "tab2":

   		 myGame.initEditor1();
       if(!fromPlay)
       firstTimeChangeTab = true;
   		 activeTab = 2;

    break;
    case "tab3" :

     myGame.initEditor2();
     if(!fromPlay)
     firstTimeChangeTab = true;
    activeTab = 3


    break;
    case "tab4":

 		 myGame.initEditor3();
     if(!fromPlay)
     firstTimeChangeTab = true;
 	  activeTab = 4


    break;
    default: break;

  }
})
// When the user clicks anywhere outside of the modal, close it



//document.documentElement.style.transform = 'scale('+ 1 / window.devicePixelRatio +' )';
//document.documentElement.style.transformOrigin = 'top left';
//document.body.style.width = screen.width*window.devicePixelRatio + 'px';
//document.body.style.height = screen.height*window.devicePixelRatio + 'px';

	 mediaPlayer = new MediaElementPlayer('videoPlayer', {

			success: function(mediaElement, originalNode, instance) {
				t = mediaElement;
			}
		});

      $('[data-toggle="tooltip"]').tooltip();


	loadXml ('xmls/workspace1.xml').then (function(workspaceXml) {
		loadXml ( 'xmls/toolbox1.xml').then (function (toolboxXml){
				w1 = new codingWorkspace (workspaceXml, toolboxXml, document.getElementById('blocklyDiv'));
		})

});


loadXml ('xmls/workspace2.xml').then (function(workspaceXml) {
	loadXml ( 'xmls/toolbox2.xml').then (function (toolboxXml){
			w2 = new codingWorkspace (workspaceXml, toolboxXml, document.getElementById('blocklyDiv2'));
	})

});
loadXml ('xmls/workspace3.xml').then (function(workspaceXml) {
	loadXml ( 'xmls/toolbox3.xml').then (function (toolboxXml){
			w3 = new codingWorkspace (workspaceXml, toolboxXml, document.getElementById('blocklyDiv3'));

			initialize(
				function (){
			  setUpCommunication(myGame); //ANALYTICS
			  if (onplatform)
			sendReady ();//ANALYTICS
	  });
		//videoPlayer = new MediaElementPlayer('#videoPlayer');
		if(!checkDSchoolInstance () && !fromLauch && !onplatform){					//check if it has a microexperiment folder that should open instantly
		checkUrl ()
  //  document.getElementById("dSchoolInfo").style.dispaly = "none"
	}

		initializeStyles ();
	})


});
	usingGoogleMaps = false;

});

function checkUrl() {

    /*var greekLan = window.location.href.split( '#' );
  		if (greekLan.length > 1) {
  			if (greekLan[1]=="Gr")
  			 changeLanguage("Gr");
  		 }*/
	var filename = window.location.href.split( '?' );
if (filename.length>1){
lang = filename[1].split ('_');
fromFileOpen = true;
if (lang.length > 1){
     $("#loadingModal").show();
if (lang[1]=="Gr")
changeLanguage("Gr");
else {
	changeLanguage("Eng");
}
myGame.openInstance(filename[1], 2);
fromFileOpen = true;
}
else {
myGame.openInstance(filename[1], 2);
fromFileOpen = true;
}

}
}
function checkDSchoolInstance() {
	var filepath = "digitalSchoolInstance/game.zip"
							 try {
								if(!myGame.openInstance ('dSchoolgame',3))
								throw "error"

			 }
			 catch (e) {
				 	$("body").css("cursor", "default");
				 return 0;
			 }
return 1;

}

function initialize (_callback) {

	docWidth = $(document).width();
	docHeight =  $(document).height();
	previousPoint = null;
	previousLayer = "Main"
	myPoint = null;
	editor1_reloaded = true;
	editor2_reloaded = true;
	editor3_reloaded = true;
	activeTab = 0
	fromFileOpen = false;
	fromLauch = false;
  firstTimeChangeTab = false;
	//myGame.gameOver = false;
	if (docWidth > docHeight){
		wideScreen = true
	}
	else wideScreen = false;
	//$('#datatable> tbody').height($('#data').height()*0.8)
//	$('#container').height(docHeight -  docHeight*0.1)
	//$('#designBoard').height(docHeight - docHeight*0.1)
//	$('.b-content').height(docHeight - docHeight*0.1)
	designSettings = defaultDesignSettings
	playSettings = initialPlaySettings;

	myGame = new newGame ();

	if (launchData!= null)  {				//Open throught DME or other platform
	var playGameSettings = {imgUrl : launchImage, points: launchPoints, variables: launchVariables, code: launchCode, w1: launchXml1, w2: launchXml2, otherSettings: launchSettings, fields: launchFields}
		myGame.loadPlayMode(playGameSettings);
	  	$("#introT").html("Play Mode");
		$("#introST").html("");

		fromFileOpen = true;
		//$("#home").hide();

	}
	$("#1_sort").click(function() {
	sortCol (this);
	});
	$("#2_sort").click(function() {
			sortCol (this);
	});
	$("#d_sort").click(function() {
			sortCol (this);
	});
	$("#close").click (function() {
			$("#designInstructions").hide();
	});
//	$("#id_sort").click(function() {
		//	sortCol (this);
	//});
	editor1_init = false;
	tbx1=null;
	tbx2=null;
	tbx3=null;
	editor2_init = false;
	editor3_init = false;
		changeLanguage ("Eng")
//hideFormulaOptions();
_callback();

}

function newDesignMode (){
	usingGoogleMaps=true;
	initGoogleMap (1);
	myGame.loadDesignMode (designSettings);
}

function sortCol (colHead){
	var colNumber = colHead.parentNode.cellIndex
	var img = colHead.src
	if(img.indexOf('sort_des.png')!=-1){
	sortTable(myGame.dataTable, colHead.parentNode.cellIndex, myGame.fields[colNumber-1].type, 'des')
	colHead.src = "media/imgs/sort_up.png"
	}
	else {
		sortTable(myGame.dataTable, colHead.parentNode.cellIndex, myGame.fields[colNumber-1].type, 'asc')
		colHead.src = "media/imgs/sort_des.png"
	}
}


function showExamplesTable(){
	var examples = 	document.getElementById("examplesTable")
	if (examples.style.display === "none") {
			$("#examplesTable").show();
			//	document.getElementById("header").style.height = "100px";
					$("#introT").hide(1000);
					$("#introST").hide(1000);
					$("#intro_question").hide(1000);
	}
	else {
			$("#examplesTable").hide();
		//	document.getElementById("header").style.height = "200px";
				$("#introT").show(1000);
			$("#introST").show(1000);
			$("#intro_question").show(1000);

	}

  }

newGame.prototype.initEditor1 = function (){

	if(!editor1_init){
		generateBlocks();
		var blocklyArea = document.getElementById('editor1');
  var blocklyDiv = document.getElementById('blocklyDiv');
		w1.initializeWorkspace();
    //blocklyDiv.style.width = blocklyArea.offsetWidth + 'px';
    //blocklyDiv.style.height = blocklyArea.offsetHeight + 'px';
	tbxs = document.getElementsByClassName("blocklyToolboxDiv")
	tbx1 = 	tbxs[tbxs.length-1]
	editor1_init = true;
	w1.workspace.addChangeListener(chechInitialCodeActivity)
	}
	else {
		if ((!editor1_reloaded)&&(fromFileOpen)){
			w1.redrawFromXml();
			editor1_reloaded = true;
		}
		else {

			//w1.redrawWorkspace();
		}
		updateBlocks();

	}
  var blocklyDiv = document.getElementById('blocklyDiv');
  //blocklyDiv.children[0].style.height = "400px";
  tbx1.style.visibility = "visible";
//	tbx1.style.left = "72.98px";
//	tbx1.style.top = "98.316px";
//tbx1.style.height = "400px";
  if(!usingGoogleMaps){
		hideAllMarkers();
			this.myMap.layersDiv.style.visibility = 'hidden'
    }
	/*if(editor2_init)
		tbx2.style.visibility = "hidden";
	if(editor3_init)
		tbx2.style.visibility = "hidden";*/

}



newGame.prototype.initEditor2 = function () {

	if (editor2_init){
		if ((!editor2_reloaded )&&(fromFileOpen)){
			w2.redrawFromXml()

			editor2_reloaded = true;
		}
		else{

			//w2.redrawWorkspace();
		}
		updateBlocks();



	}
	else {
		generateBlocks();
		 var blocklyDiv = document.getElementById('blocklyDiv2');
		w2.initializeWorkspace();
		var blocklyArea = document.getElementById('editor2');
	//	blocklyDiv.style.width = blocklyArea.offsetWidth + 'px';
	//	blocklyDiv.style.height = blocklyArea.offsetHeight + 'px';
		tbxs = document.getElementsByClassName("blocklyToolboxDiv")
		tbx2 = 	tbxs[tbxs.length-1]
		editor2_init =true;

	}
  if(!usingGoogleMaps){
	hideAllMarkers();
	this.myMap.layersDiv.style.visibility = 'hidden'
  }
		if (editor3_init)
		tbx3.style.visibility = "hidden";

	/*	if (editor1_init)
		tbx1.style.visibility = "hidden";*/
    var blocklyDiv = document.getElementById('blocklyDiv2');
    // blocklyDiv.children[0].style.height = "400px";
     	tbx2.style.visibility = "visible";
 	//	tbx2.style.left = "72.98px";
 	//	tbx2.style.top = "98.316px";
 	//tbx2.style.height = "400px";
  }


newGame.prototype.initEditor3 = function () {
	if (editor3_init){
		if ((!editor3_reloaded)&&(fromFileOpen)){
		w3.redrawFromXml();
			editor3_reloaded = true;
		}
		else{
	//w3.redrawWorkspace();
		updateBlocks();


	}
}
	else {
		generateBlocks();
		 var blocklyDiv = document.getElementById('blocklyDiv3');
	w3.initializeWorkspace();
		var blocklyArea = document.getElementById('editor3');
//		blocklyDiv.style.width = blocklyArea.offsetWidth + 'px';
//		blocklyDiv.style.height = blocklyArea.offsetHeight + 'px';

		tbxs = document.getElementsByClassName("blocklyToolboxDiv")
		tbx3 = 	tbxs[tbxs.length-1]
		editor3_init = true;
		w3.workspace.addChangeListener(chechEndCodeActivity)

	}
    if(!usingGoogleMaps){
hideAllMarkers();
	this.myMap.layersDiv.style.visibility = 'hidden'
}
	/*if (activeTab == 2)
		tbx2.style.visibility = "hidden"
	if (activeTab == 1)
		tbx1.style.visibility = "hidden"*/
    var blocklyDiv = document.getElementById('blocklyDiv3');
    //blocklyDiv.children[0].style.height = "400px";
    tbx3.style.visibility = "visible";
  //		tbx3.style.left = "72.98px";
  //		tbx3.style.top = "98.316px";
  //  tbx3.height = "400px";
}

function getBase64Image(url) {	var img = document.createElement("img")
	img.width = $("#map").width();
	img.height = $("#map").height();
	img.src = url;
    // Create an empty canvas element
    var canvas = document.createElement("canvas");
    canvas.width = $("#map").width();
    canvas.height = $("#map").height();

    // Copy the image contents to the canvas
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, $("#map").width(), $("#map").height());

    // Get the data-URL formatted image
    // Firefox supports PNG and JPEG. You could check img.src to
    // guess the original format, but be aware the using "image/jpg"
    // will re-encode the image.
    var dataURL = canvas.toDataURL("image/png");

    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}



/*window.onbeforeunload = function (e) {
  console.log (e)
    e = e || window.event;

    // For IE and Firefox prior to version 4
    if (e) {
        e.returnValue = 'Are you sure you want to exit? All your data will be lost!';
    }

    // For Safari
    return 'Are you sure you want to exit? All your data will be lost!?';
};*/
