
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
$("#language").on({
	'click' : function () {
		if ($("#languageImg").attr('src') == "media/imgs/english.png"){
			changeLanguage ("Eng");

		}
		else {

			changeLanguage ("Gr");
		}
	}

});
refreshLanguage = function () {
//	introText = language.introText
	introSubText = language.introSubText
introQuestion = language.introQuestion;
	//$("#designMode").attr("src", language.designButtonSrc)
	$("#dbText").html(language.designButtonText)
	$("#pbText").html(language.playButtonText)
	$("#lbText").html( language.loadButtonText)
//	$("#playMode").attr("src", language.playButtonSrc)
	//$("#openYourFile").html(language.openYourFile)
	//$("#onlineExamples").html(language.onlineExamples)
	$("#tab1").html(language.tab1)
	$("#tab2").html(language.tab2)
	$("#tab3").html(language.tab3)
	$("#tab4").html(language.tab4)
	$("#uploadImage").attr("title", language.uploadImgDisc)
	$("#addPointIcon").attr("title", language.addPointDisc)
	$("#addInstructions").attr("title", language.addInstructionsDisc)
	$("#deleteIco").attr("title", language.deleteIcoDisc)
	$("#settingsIco").attr("title", language.settingsIcoDisc)
	$("#addAttribute").attr("title", language.addAttributeDisc)
	$("#home").attr("title", language.homeDisc)
	$("#layersButton").attr("title", language.layersText)
	$("#pointsLimit").html(language.pointsLimitTxt)
	 $("#valuesText").html(language.gameValues);
		 $("#valuesText").html(language.gameValues);
	$("#manual").html(language.manualDisc)
	$("#manual").attr("href", language.manualUrl)
	$("#contact").html(language.contactDisc)
	$("#deletePointText").html(language.deletePointText)
	$("#pointSettingsText").html(language.settingsPoint)
	$("#pointSettingsTitle").html(language.pointSettingsTitle)
	$("#appearOnLayer").html(language.appearOnLayer)
	$("#affectScore").html(language.affectScore)
	$("#typeLabel").html(language.typeLabel)
	$("#visibilityLabel").html(language.visibilityLabel)
	$("#pointInfo").html(language.pointInfoText)
	$("#select").html(language.selectButton)
	$("#gameStatus").html(language.gameStatusText)
	$("#homeText").html(language.home)
	$("#saveText").html(language.download)
	$("#playText").html(language.play)
	$("#editText").html(language.edit)
	$("#statsText").html(language.stats)
	$("#infoText").html(language.info)
		$("#help").html(language.help)
	$("#instructionTitle1").html(language.instructions)
	$("#instructions2").html(language.instructions)
	$("#layersTitle").html(language.layersTitle)
	$("#newlayer").html(language.newLayer)


generalErrorMessage = language.generalErrorMessage;
 designModeText = language.designModeText;
 playModeText = language.playModeText;
 tab1Message = language.tab1Message;
 tab3Message = language.tab3Message;
 markersMessage = language.markersMessage;
 homeMessage = language.homeMessage;
 popUpMessage = language.popUpMessage;
 layersRemoveMessage = language.layersRemoveMessage;
 gameInstructionsDefault = language.gameInstructionsDefault;
/* $("#badiText").html(language.badiText)
 $("#mpText").html(language.mpText)
 //$("#pcText").html(language.pcText)
 $("#composteText").html(language.composteText)
 $("#supermarketText").html(language.supermarketText)
 $("#ethicsText").html(language.ethicsText)
 $("#eatingText").html(language.eatingText)
 $("#eatingTextHB").html(language.eatingTextHB)
 $("#chefText").html(language.chefText)
 $("#envyText").html(language.envyText)
 $("#covidText").html(language.covidText)
 //$("#perfectVilleText").html(language.perfectVilleText)
 $("#womanityText").html(language.womanityText)
 //$("#perfectVilleGame").attr("onclick", language.perfectVilleGame);
$("#shoppingGame").attr("onclick", language.shoppingGame);
 $("#chefGame").attr("onclick",language.chefGame);
   $("#eatingOutGame").attr("onclick",language.eatingOutGame);
   $("#eatingOutHBGame").attr("onclick",language.eatingOutHBGame);
   $("#envyCityGame").attr("onclick",language.envyGame);
   $("#covidGame").attr("onclick",language.covidGame);
   $("#sustTextiles").attr("onclick",language.sustTextiles);
   $("#smartJacket").attr("onclick",language.smartJacket);
   $("#ancientGreek").attr("onclick",language.ancientGreek);
   $("#nayplioGame").attr("onclick",language.nayplioGame);
   $("#composte").attr("onclick",language.composte);
   $("#womanity").attr("onclick",language.womanity);
  
   $("#school").attr("onclick",language.school);
   $("#europe").attr("onclick",language.europe);
  // $("#ethics").attr("onclick",language.ethics);
   $("#sustTextilesText").html(language.sustTextilesText);
   $("#sustTextilesText").html(language.smartJacketText);*/
 $("#livingInAthens").attr("onclick",language.livingInAthens);
 $("#theBeeKeeper").attr("onclick",language.theBeeKeeper);
 
 /*(if (language.name === "English") {
$("#nayplioGame").hide()	 																				//hide games that are only availiable in Greek
$("#ancientGreek").hide()
$("#smartJacket").show()
$("#school").show()
$("#europe").show()
$("#composte").show()
$("#balloonGame").show()

 }
 if (language.name === "Greek") {
$("#nayplioGame").show()	 																				//show games that are only availiable in Greek																			//show games that are only availiable in Greek
$("#ancientGreek").show()
$("#smartJacket").hide()
$("#composte").show()
$("#school").hide()
$("#europe").hide()
$("#composte").hide()
$("#balloonGame").hide()

 }*/


 //PLAYMODE
 pointsVisitedText = language.pointsVisited;
var pVisit = $("#pointsVisited");
if (pVisit.length>0){
 pVisit.html(pointsVisitedText)
}
$("#gameOverTitle").html(language.gameOverText);
$("#gameOverQuest").html(language.gameOverQuestion);
$("#playAgainText").html(language.playAgainText);
$("#editGameText").html(language.editText);
$("#gameEnded").html(language.gameEnded);
$("#gameEndedQuestion").html(language.gameEndedQuestion);
$("#gameProgressText").html(language.gameProgressText);
$("#currentValuesText").html(language.currentValuesText);
$("#choiceHistoryText").html(language.choiceHistoryText);
$("#downloadScoreText").html(language.downloadScoreText);
$("#backBtnText").html(language.backBtnText);
$("#loadingMessage").html(language.loadingMessage);
$("#show_score").html('<i class="fa fa-bar-chart"></i>' +language.scoreText);
$("#letsPlayBtn").html(language.letsPlayText);
$("#instructionsTitle").html(language.instructionsText);
$('#selectBox option[value=text]').text(language.selBoxText);
$('#selectBox option[value=number]').text(language.selBoxNum);
$('#selectBox option[value=url]').text(language.selBoxUrl);
$('#selectBox option[value=date]').text(language.selBoxDate);
$('#selectBox option[value=file]').text(language.selBoxImage);
$('#visibilityBox option[value=visible]').text(language.visBoxVisible);
$('#visibilityBox option[value=hidden]').text(language.visBoxHidden);
		gameStartedText = language.gameStartedText;


//	 $("#introT").html(introText);
	 $("#intro_question").html(introQuestion);
	 if(	$("#introST").html() != ""){
	 $("#introST").html(introSubText);


}

}
changeLanguage = function (lang){
	 if (lang === "Eng"){
		  $("#languageImg").attr("src", "media/imgs/greek.png")
		language = english;


	 }
	 else if (lang === "Gr"){
		 	  $("#languageImg").attr("src", "media/imgs/english.png")
		 	 language = greek;

 }
 refreshLanguage();
}
