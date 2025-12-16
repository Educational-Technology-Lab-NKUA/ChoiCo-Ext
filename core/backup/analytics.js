var analyticsOptions =      //default values
{an_duration : 30,
an_showHelp : true,
playerPerformanceLow : 0.15,
playerPerformanceMedium : 0.4,
playerPerformanceHigh : 0.6,
playerActivityLow : 0.3,
playerActivityMedium : 0.5,
playerActivtyHigh : 0.8,
mapDesignActivityLow: 10,
mapDesignActivityMedium : 20,
mapDesignActivityHigh : 30,
dataDesignActivityLow: 10,
dataDesignActivityMedium : 20,
dataDesignActivityHigh : 30,
intialCodeActivityLow: 5,
intialCodeActivityMedium : 10,
intialCodeActivityHigh : 15,
gameplayCodeActivityLow: 10,
gameplayCodeActivityMedium : 15,
gameplayCodeActivityHigh : 20,
endCodeActivityLow: 5,
endActivityMedium : 10,
endCodeActivityHigh : 15
}
lowPerformaceSent = false;
mediumPerformaceSent = false;
highPerformanceSent = false;
lowActivitySent = false;
mediumActivitySent = false;
highActivitySent = false;

function checkMapActivity (counter) {
  if (counter === analyticsOptions.mapDesignActivityLow){
		myGame.mapActivityEvent('low', myGame.myMap);
		}
	if (counter === analyticsOptions.mapDesignActivityMedium){
		myGame.mapActivityEvent('medium', myGame.myMap);
	}
	if (counter === analyticsOptions.mapDesignActivityHigh){
		myGame.mapActivityEvent('high', myGame.myMap);
	}
}
function checkDatabasepActivity (counter) {
  if (counter === analyticsOptions.dataDesignActivityLow){
		myGame.dataActivityEvent('low', myGame.fieldsCounter-2, myGame.points.length);
		}
	if (counter === analyticsOptions.dataDesignActivityMedium){
		myGame.dataActivityEvent('medium', myGame.fieldsCounter-2, myGame.points.length);
	}
	if (counter === analyticsOptions.dataDesignActivityHigh){
		myGame.dataActivityEvent('high', myGame.fieldsCounter-2, myGame.points.length);
	}
}

function chechInitialCodeActivity (event) {
  if ((event.type == "delete") || (event.type == "create") ||(event.type == "change")) {

    myGame.counters.intialCodeActions ++;
    var counter =   myGame.counters.intialCodeActions
    if ( counter === analyticsOptions.intialCodeActivityLow) {
      var allBlocks = w1.getBlocks();
      var initBlocks = allBlocks.filter(x => x.type == 'initialValue')
      var jsCode = w1.getJavascriptCode();
  		myGame.initCodeActivityEvent('low', initBlocks.length, jsCode);
  		}
  	if (  counter === analyticsOptions.intialCodeActivityMedium){
      var allBlocks = w1.getBlocks();
      var initBlocks = allBlocks.filter(x => x.type == 'initialValue')
      var jsCode = w1.getJavascriptCode();
  		myGame.initCodeActivityEvent('medium',initBlocks.length, jsCode );
  	}
  	if ( counter=== analyticsOptions.intialCodeActivityHigh ){
      var allBlocks = w1.getBlocks();
      var initBlocks = allBlocks.filter(x => x.type == 'initialValue')
      var jsCode = w1.getJavascriptCode();
  		myGame.initCodeActivityEvent('high', initBlocks.length, jsCode);
  	}
  }
  }
function chechGameplayCodeActivity (event) {
  if ((event.type == "delete") || (event.type == "create") ||(event.type == "change")) {

    myGame.counters.gameplayCodeActions ++;
    var counter =  myGame.counters.gameplayCodeActions
    if ( counter === analyticsOptions.gameplayCodeActivityLow) {
      var allBlocks = w2.getBlocks();
      var initBlocks = allBlocks.filter(x => x.type == 'controls_if')
      var jsCode = w2.getJavascriptCode();
  		myGame.gamePlayCodeActivityEvent('low', initBlocks.length, jsCode);
  		}
  	if (  counter === analyticsOptions.gameplayCodeActivityMedium){
      var allBlocks = w2.getBlocks();
      var initBlocks = allBlocks.filter(x => x.type == 'controls_if')
      var jsCode = w2.getJavascriptCode();
  		myGame.gamePlayCodeActivityEvent('medium',initBlocks.length, jsCode );
  	}
  	if ( counter=== analyticsOptions.gameplayCodeActivityHigh ){
      var allBlocks = w2.getBlocks();
      var initBlocks = allBlocks.filter(x => x.type == 'controls_if')
      var jsCode = w2.getJavascriptCode();
  		myGame.gamePlayCodeActivityEvent('high', initBlocks.length, jsCode);
  	}
  }
  }
function chechEndCodeActivity (event) {
  if ((event.type == "delete") || (event.type == "create") ||(event.type == "change")) {
    myGame.counters.endCodeActions ++;
    var counter =  myGame.counters.endCodeActions
    if ( counter === analyticsOptions.endCodeActivityLow) {
      var allBlocks = w3.getBlocks();
      var initBlocks = allBlocks.filter(x => x.type == 'controls_if')
      var jsCode = w3.getJavascriptCode();
  		myGame.endCodeActivityEvent('low', initBlocks.length, jsCode);
  		}
  	if (  counter === analyticsOptions.endCodeActivityMedium){
      var allBlocks = w3.getBlocks();
      var initBlocks = allBlocks.filter(x => x.type == 'controls_if')
      var jsCode = w3.getJavascriptCode();
  		myGame.endCodeActivityEvent('medium',initBlocks.length, jsCode );
  	}
  	if ( counter=== analyticsOptions.endCodeActivityHigh ){
      var allBlocks = w3.getBlocks();
      var initBlocks = allBlocks.filter(x => x.type == 'controls_if')
      var jsCode = w3.getJavascriptCode();
  		myGame.endCodeActivityEvent('high', initBlocks.length, jsCode);
  	}
  }
  }


function showAnalyticsWindow () {
  var analytics = document.getElementById("analytics_settings")
  analytics.style.visibility = "visible";
}

function saveAnalytics () {
   var analytics = document.getElementById("analytics_settings")
   analyticsOptions.an_duration =  $("#an_duration").val();
   analyticsOptions.an_showHelp   =  $("#an_checkHelp").is(":checked");
   analyticsOptions.playerPerformanceLow   =  parseInt($("#playerPerformanceLow").val());
   analyticsOptions.playerPerformanceMedium   =  parseInt($("#playerPerformanceMedium").val());
   analyticsOptions.playerPerformanceHigh   =  parseInt($("#playerPerformanceHigh").val());
   analyticsOptions.playerActivityLow   =  parseInt($("#playerActivityLow").val());
   analyticsOptions.playerAtivityMedium   =  parseInt($("#playerAtivityMedium").val());
   analyticsOptions.mapDesignActivityLow   =  parseInt($("#mapDesignActivityLow").val());
   analyticsOptions.mapDesignActivityMedium   =  parseInt($("#mapDesignActivityMedium").val());
   analyticsOptions.mapDesignActivityHigh   =  parseInt($("#mapDesignActivityHigh").val());
   analyticsOptions.dataDesignActivityLow   =  parseInt($("#dataDesignActivityLow").val());
   analyticsOptions.dataDesignActivityMedium   =  parseInt($("#dataDesignActivityMedium").val());
   analyticsOptions.dataDesignActivityHigh   =  parseInt($("#dataDesignActivityHigh").val());
   analyticsOptions.intialCodeActivityLow   =  parseInt($("#intialCodeActivityLow").val());
   analyticsOptions.intialCodeActivityMedium   =  parseInt($("#intialCodeActivityMedium").val());
   analyticsOptions.intialCodeActivityHigh   =  parseInt($("#intialCodeActivityHigh").val());
   analyticsOptions.gameplayCodeActivityLow   =  parseInt($("#gameplayCodeActivityLow").val());
   analyticsOptions.gameplayCodeActivityMedium   =  parseInt($("#gameplayCodeActivityMedium").val());
   analyticsOptions.gameplayCodeActivityHigh   =  parseInt($("#gameplayCodeActivityHigh").val());
   analyticsOptions.endCodeActivityLow   =  parseInt($("#endCodeActivityLow").val());
   analyticsOptions.endActivityMedium   =  parseInt($("#endActivityMedium").val());
   analyticsOptions.endCodeActivityHigh   =  parseInt($("#endCodeActivityHigh").val());
  analytics.style.visibility = "hidden";
  alert ("Learning Analytics for this activity have been saved!")
}

function loadAnalytics (loadedAnalytics) {   //fill the form with the retrieved/saved analytics
  var arrayToText = "";
  var keyWordsLength =analyticsOptions.an_code_keywords.length;
analyticsOptions = loadedAnalytics;
$("#an_duration").val(analyticsOptions.an_duration );

$("#playerPerformanceLow").val(analyticsOptions.playerPerformanceLow);
$("#playerPerformanceMedium").val(analyticsOptions.playerPerformanceMedium);
$("#playerPerformanceHigh").val(analyticsOptions.playerPerformanceHigh);
$("#playerActivityLow").val(analyticsOptions.playerActivityLow);
$("#playerAtivityMedium").val(analyticsOptions.playerAtivityMedium);

}
function cancelAnalytics () {
  //getValues
    var analytics = document.getElementById("analytics_settings")
  analytics.style.visibility = "hidden";

}
