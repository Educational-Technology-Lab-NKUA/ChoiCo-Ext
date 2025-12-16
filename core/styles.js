function designStyle () {
	if (!usingGoogleMaps){
	$("#map").show();
	}
	 closeVideo();
	$("#mainArea").show();
	//$("#mapBoard").show();
	$("#back").hide();
	$("#logButton").hide();
	$("#gameInfos").hide();
	$("#again").hide();
	$("#play").show();
	$("#save").show();
	$("#intro").hide();
	$("#console").show();
	$("#header").hide();
	$("#examplesTable").hide();
//  $("#designBoard").show();
	$("#bannerText").html(designModeText);
	$("#bannerText").show();
  $("#introT").hide();
  $("#introST").hide();
  //if(!onplatform)
  $("#home").show();
	$("#introArea").hide();
	$('[href="#gameInterface"]').tab('show');
 	$("#gameBoard").hide();
	$("#dataBoard").show();
	$("#scoreRow").css("display", "none");
 	$("#myTab").show();
	$("#sideCol").show();
	$("#uploadlbl").show();
		//	$("#map").addClass( 'col-sm-6');
		//	$("#map").removeClass( 'col-sm-8');
	/*$("#bodyContainer").height(	$("#mainRow").height() -  $("#myTab").height() -$("#datatableHeader").height() -	$("#data_bar").height())*/

}

function loadMapStyle (s) {
	var map = myGame.myMap;
	if ((myGame.modeLoaded.design )){
	if (s===1){			//design MODE
			map.bounds = findBounds();
		fitImageDimensions(map.imgUrl, map.bounds, map.mapInstance)
		var mapWidth = $('#map').width();
	//	map.mapInstance.setZoom(0);
	//	map.mapInstance.setView([mapWidth/2, 0]);
 	//map.setBounds();
	//TO DO : setZoom (0)
	//	fitImageDimensions(map.imgUrl, map.bounds, map.mapInstance)
	}
}
	 if (s===2)		{ 	//play mode
		//$("#map").addClass( 'col-sm-8');
	if((myGame.modeLoaded.play ) || (myGame.modeLoaded.design )){
		  var mapHeight = $('#map').height();
		map.bounds = findBounds();
		fitImageDimensions(map.imgUrl, map.bounds, map.mapInstance)
	//	map.mapInstance.setZoom(0.5);
//		map.mapInstance.setView([mapHeight, 0]);
		//	fitImageDimensions(map.imgUrl, map.bounds, map.mapInstance)
			//TO DO : setZoom (0.25)
	//	map.mapInstance.fitBounds (map.bounds);

	}
}

}
function playStyle () {
  closeVideo();
		$("#examplesTable").hide();
  	$("#bannerText").html(playModeText);
  	$("#bannerText").show();
	//	$("#introT").hide();
	//	$("#introST").hide();
  //	$("#designBoard").hide();
  //	$("#playBoard").show();
 // if(!onplatform)
  $("#home").show();
	$("#back").show();
	$("#logButton").show();
	$("#gameInfos").show();
	$("#again").hide();
	$("#play").hide();
		$("#console").hide();
	$("#save").hide();
	$("#intro").hide();
	$("#header").hide();
	$("#playModeIntro").hide();
	$("#introArea").hide();
	$("#gameBoard").show();
	$("#dataBoard").hide();
	$("#scoreRow").css("display", "block");
 $('[href="#gameInterface"]').tab('show');
	$("#myTab").hide();
	$("#sideCol").hide();
	

}
function restoreMap () {
map=myGame.myMap.mapInstance;
	if (firstTimeChangeTab){
		var mapHeight = $('#map').height();
		map.setView([mapHeight,-11]);
		map.setZoom(-1);
  for (var i=0; i<myGame.myMap.markers.length; i++){		//update marker's label position
		myGame.myMap.markers[i].label._update();
	}
		firstTimeChangeTab = false;
	}
}
function mapResize (map){

//	map.bounds = findBounds();

var mapWidth = $('#map').width();
var mapHeight = $('#map').height();
if ((mapHeight > 0) && (mapWidth > 0)){
map.setZoom(0);
map.setView([mapHeight/2, mapWidth/2]);

fitImageDimensions(map.imgUrl, map.bounds, map.mapInstance)
}
	//
}

function showTabOne () {
	goToTab(0);
}

function initializeStyles (){
	$("#instructionsEditor").jqte({placeholder: "You can write some instructions for the player", format: false});
	$("#mainArea").hide();
	$("#designInstructions").hide();
	$("#playBoard").hide();
	$("#designBoard").hide();
	$("#play").hide();
	$("#save").hide();
	$("#back").hide();
	$("#console").hide();
	$("#logButton").hide();
	$("#gameInfos").hide();


}
function showAboutText() {
	alert ("current version: " + version)
}
