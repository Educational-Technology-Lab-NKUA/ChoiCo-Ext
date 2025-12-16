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

//// TODO: Make datable stand alone js object/class with its functions and an API so that it can be used in other apps.

newGame.prototype.newTh = function(name){     //adds new th in the dataTableHeader
    var newField,th,checkbox,i;
  th = document.createElement('th');

newField= document.createElement("input")
newField.type = "text"
newField.style.fontSize ="0.8rem";
newField.value = name;
newField.className = "tableField"
newField.onchange = function (){myGame.updateField(this)}
th.appendChild (newField)
 checkbox = document.createElement('input');
  checkbox.type="checkbox";
  checkbox.setAttribute('id', this.fieldsCounter-1 +"_check");
  checkbox.onclick=function(){myGame.selectField(this);}
  th.appendChild (checkbox)
  var sortArrow =  document.createElement('input');
  sortArrow.type= "image";
  sortArrow.src = "media/imgs/sort_des.png"
  sortArrow.onclick = function () {sortCol(this)}
  sortArrow.title = "sort column"
  th.appendChild (sortArrow)
var spanEl = document.createElement('span')
var leftArrow =  document.createElement('input');
leftArrow.type= "image";
leftArrow.src = "media/imgs/left.png"
leftArrow.onclick = function () {moveColumnLeft(leftArrow.closest("th"))}
leftArrow.title = "move to the left"
  spanEl.appendChild (leftArrow)
  var rightArrow =  document.createElement('input');
  rightArrow.type= "image";
  rightArrow.src = "media/imgs/right.png"
  rightArrow.onclick = function () {moveColumnRight(rightArrow.closest("th"))}
  rightArrow.title = "move to the right"
    spanEl.appendChild (rightArrow)
    th.appendChild (spanEl);

return (this.dataTableHeader.rows[0].appendChild(th));
}

newGame.prototype.addField = function(){
var th;
var   newName = "Field" + this.fields.length
th = this.newTh (newName);
$(th).find("span").children("input").last().css("visibility", "hidden")
var elem2 = th.previousElementSibling;
$(elem2).find("span").children("input").last().css("visibility", "visible")
  this.insertNumberCol()
this.fieldsCounter++;
	fieldrec = {name: newName, type: "number", step: '.1'};
	this.fields.push(fieldrec);
  this.addFieldEvent (this.fieldsCounter-2, this.points.length)
  this.counters.databaseDesignActions ++;
  checkDatabasepActivity (this.counters.databaseDesignActions)
}
newGame.prototype.insertNumberCol = function () {
  for ( i=0; i<this.idCounter; i++){
		cel = this.dataTable.tBodies[0].rows[i].insertCell()
		var fieldBox = document.createElement("input")
			fieldBox.type = "number"
			fieldBox.style.width="98%" ;
			fieldBox.style.height="98%";
      fieldBox.step='.1'
    fieldBox.value  = 0;                //Default Value
			cel.appendChild (fieldBox)
      fieldBox.onchange = function (){
        var pointID = parseInt(this.parentNode.parentNode.childNodes[0].innerHTML);       //get the point ID
        myGame.updatePoint (pointID, this.value, this.parentNode.cellIndex-1, 'user')}
    }
	}

function replaceSpecialChars  (textValue) {

  var special = /[!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?]/g
  if (special.test(textValue)) {
      textValue =textValue.replace(special ,"");
    alert ('Parameter names cannot contain special characters (!@#$%^*,. etc). Any special character was removed from the name.')
  }
  textValue =textValue.replace(/ /g,"_");     //replace spaces
  return textValue;
}
function checkDoubleName (newName){
  for (var i=0; i<myGame.fields.length; i++){
    if(myGame.fields[i].name === newName){
      return 1;
    }
  }
  return 0;
}
newGame.prototype.updateFormulaField = function (f) {
  var c = f.parentElement.cellIndex;
  var newFormula = f.value;
  var fieldName = this.fields[c-1].name;
  if (!newFormula.includes(fieldName)) {
  var  message = "Create a function that includes the field's name. E.g. " + fieldName +"/2 or sqrt(" + fieldName + "). Click the help button to see the syntax of the availiable formulas)";
  alert (message)
    f.style.borderColor = "red";
    return false;
  }
  else {
f.style.borderColor = "black";
return true;
}

}
newGame.prototype.updateField = function (f){
  var c = f.parentElement.cellIndex;
  var oldName =this.fields[c-1].name; 
  var cleanName = replaceSpecialChars (f.value)
  if (checkDoubleName (cleanName)) {
    alert ('You cannot have two fields with the same name!')
    f.value = this.fields[c-1].name
  }
  else {
  f.value = cleanName;
	this.fields[c-1].name = f.value;
  for (var i=0; i<this.points.length; i++) {
    renameKey (this.points[i].values, oldName, cleanName);
    }
  this.counters.databaseDesignActions ++;
  checkDatabasepActivity (this.counters.databaseDesignActions)
}

}
function renameKey ( pnt, oldKey, newKey ) {
  pnt[newKey] = pnt[oldKey];
  delete pnt[oldKey];
}

newGame.prototype.selectField  = function (cbx){
	 var boxes = $(':checkbox:checked',this.dataTableHeader);
   var i;
   for (i=0; i<boxes.length; i ++){
     if (boxes[i]!=cbx)
      boxes[i].checked = false;
   }
	if(cbx.checked){
		 field = cbx.parentElement;
		//field.className = "selectedField";
		this.checkId = cbx.id;
			$("#deleteIco").css('visibility','visible');
	$("#settingsIco").css('visibility','visible');
		}
		else {
			this.checkId = -1 		//uncheck
			$("#deleteIco").css('visibility','hidden');
	$("#settingsIco").css('visibility','hidden');
		}
}

newGame.prototype.deleteField = function  (){

	var boxes = $(':checkbox:checked',this.dataTableHeader);
	var fieldNo = boxes[0].parentElement.cellIndex;
  var fieldName = this.fields[fieldNo-1].name;
	if (this.fields[fieldNo-1].type == "file"){
		this.images = [];
	}
	this.dataTableHeader.rows[0].deleteCell(fieldNo);
	for (i=0; i<this.idCounter; i++){
		this.dataTable.tBodies[0].rows[i].deleteCell(fieldNo)
    delete this.points[i].values[fieldName]
	}
	this.fieldsCounter --;
	this.fields.splice(fieldNo-1, 1);
  this.counters.databaseDesignActions ++;
  checkDatabasepActivity (this.counters.databaseDesignActions)
}

newGame.prototype.changeType  = function (newType) {
	var boxes = $(':checkbox:checked',this.dataTableHeader);
	var fieldNo = boxes[0].parentElement.cellIndex
  var fieldName = this.fields[fieldNo-1].name
  var oldType = this.fields[fieldNo-1].type ;
  var inputElement, oldValue, newInputElement;

	for (var i =0; i < this.myMap.markers.length; i++){        //for each table row
    inputElement = document.createElement("input");
		//console.log (this.dataTable.tBodies[0].rows[i].cells[fieldNo].children[0])
		var cel = this.dataTable.tBodies[0].rows[i].cells[fieldNo];       //get the cell
    /*if (oldType == "file"){
        cel.innerHTML = ""
        inputElement = document.createElement("input");
        cel.appendChild (inputElement)
    }
    else if (oldType == "formula") {    //was a formula
        //inputElement = cel.children[0]
        cel.innerHTML = ""
        cel.appendChild (inputElement)
    }
    else{
	     //inputElement = cel.children[0]
    }*/
	  // oldValue = inputElement.value;

	
    if (newType=="formula"){
      fieldBox = createFormulaField("");
      cel.innerHTML = "";
      cel.appendChild (fieldBox);
      $('[data-toggle="tooltip"]').tooltip({
      trigger : 'manual'});

    }
    else if (newType == "file"){
  
          cel.innerHTML = ""
          newElement = document.createElement("input");
          newElement.type = "file"
		    newElement.addEventListener('change', loadImgFile, false)
		      newElement.style.width="50px" ;
				newElement.style.float="right";
				var thumbnail = document.createElement("img");
				thumbnail.src = "";
				thumbnail.style.width = "50px"
				thumbnail.style.height = "50px"
				cel.appendChild (newElement);
				cel.appendChild (thumbnail);
        delete this.points[i].values[fieldName]
	}
  else if (newType == "travelTime"){
    cel.innerHTML = "";
    createTravelTimeField(null, cel, inputElement)
   // cel.appendChild (inputElement);
  /*  $('[data-toggle="tooltip"]').tooltip({
    trigger : 'manual'});*/
  }
	else {       //number, text, url, date
    cel.innerHTML = '';    //remove all elements from the cell
		inputElement.type = newType;	
    if (newType == "number") {
      inputElement.value = 0;
    }
    inputElement.style.width="90%" ;
    inputElement.onchange = function (){
      console.log (pointID, this.value)
      	var pointID = parseInt(this.parentNode.parentNode.childNodes[0].innerHTML);       //get the point ID
      myGame.updatePoint (pointID, this.value, this.parentNode.cellIndex-1, 'user')}
      cel.appendChild (inputElement);
	}
	}
  this.fields[fieldNo-1].type 	= newType;
  this.counters.databaseDesignActions ++;
  checkDatabasepActivity (this.counters.databaseDesignActions)
}
newGame.prototype.changeVisibility  = function (newType) {
	var boxes = $(':checkbox:checked',this.dataTableHeader);
	var fieldNo = boxes[0].parentElement.cellIndex;
	this.fields[fieldNo-1].visibility = newType;
}
function createTravelTimeField (value, celToAdd, inputElement){
  var selectList = document.createElement("select");
  var option = document.createElement("option");
  option.value = 'plus'
  option.text = '+'
  selectList.appendChild(option);
  var option2 = document.createElement("option");
  option2.value = 'minus'
  option2.text = '-'
  selectList.appendChild(option2);
  if (value !=null) {
    if(value.oper == "plus")
    selectList.selectedIndex = 0;
  else
  selectList.selectedIndex = 1;
  }
  celToAdd.appendChild (selectList);
    var text = "Travel Time from: "
    var spanEl = document.createElement('span')
    spanEl.innerHTML = text;
  var selectList2 = document.createElement("select");
  selectList2.id = "travelOptions";
  var option2 = document.createElement("option");
  option2.value = 'previous'
  option2.text = 'previous point'
  selectList2.appendChild(option2);
  //Create and append the options
for (var i = 0; i < myGame.points.length; i++) {
    var option = document.createElement("option");
    option.value =  myGame.points[i].id;
    option.text =  "point ID: " + myGame.points[i].id;
    selectList2.appendChild(option);
  }

  if (value !=null) {
    for(j = 0; j < selectList2.options.length; j++) {
      if((selectList2.options[j].value) == (value.option)) {
        selectList2.selectedIndex = j;
      break ;
      }
      }
  }

  celToAdd.appendChild (spanEl);
  celToAdd.appendChild (selectList2);
}
function createFormulaField (value) {
  fieldBox = document.createElement("textarea")
  fieldBox.type = "text"
  fieldBox.value = value;
  fieldBox.style.width="98%" ;
  //fieldBox.style.height="98%" ;
  fieldBox.setAttribute ( "data-bs-toggle", "popover" )
  fieldBox.setAttribute ( "data-bs-trigger", "focus" )
  fieldBox.setAttribute ( "data-bs-content", "Type a mathematical relation that includes this field name. \n For example, if the field is called Money some valid relations could be: Money^2 (sets the current value of Money to Money^2) \n cos(Money) (sets the current value of Money to Money^2) \n Money + Money/2 (it devides Money/2 and then adds it to the current value of Money) \n Money + rand(0,10) (adds a random number between 0 and 10 to the current number of Money) " )
  fieldBox.onchange = function (){var validity = myGame.updateFormulaField(this);
  if (!validity) {this.value = "";}
  var pointID = parseInt(this.parentNode.parentNode.childNodes[0].innerHTML);       //get the point ID
  myGame.updatePoint (pointID, this.value, this.parentNode.cellIndex-1, 'user')
}

  return fieldBox
}
newGame.prototype.settingsField  = function (){
	var boxes = $(':checkbox:checked',this.dataTableHeader);
	var fieldNo = boxes[0].parentElement.cellIndex;
	$("#selectBox").val( this.fields[fieldNo-1].type);
	$("#visibilityBox").val( this.fields[fieldNo-1].visibility);
	$("#fS").css('visibility','visible');

}

newGame.prototype.closeSettings  = function () {$("#fS").css('visibility','hidden');
 var boxes = $(':checkbox:checked',this.dataTableHeader);
 boxes[0].checked = false;
}
newGame.prototype.importVariables = function() {
	//fieldsCounter = this.variables.length;
  var markerId
	this.loadData();  //load fields' names
	var table = this.dataTable.tBodies[0]; 	//load the records of database
	for (var i = 0; i < this.points.length; i++){
    for (var k=0 ; k<myGame.myMap.markers.length; k++){
      if(!usingGoogleMaps) {
         markerId = myGame.myMap.markers[k]._leaflet_id;
       }
        else {
          markerId = myGame.myMap.markers[k].metadata.id;
        }
      if(markerId === this.points[i].id){
      marker = myGame.myMap.markers[k]
      }
    }
    if(!usingGoogleMaps){       //in google maps version the entry has already been created in createNewMarker function (googlemaps.js)
  this.newEntry (this.idCounter, marker, this.points[i].id, this.points[i].description, this.points[i].values, )
  }
	}

	for (var i =0; i<this.fields.length; i++){
			this.dataTableHeader.rows[0].cells[i+1].childNodes[0].value = this.fields[i].name;
	}

 }
newGame.prototype.newEntry = function (index, marker, id, description, values) {       //adds a new Entry (row) in position 'index' and sets each cell's value either to 'values' or to default if values are not passed. Index is a number values is an array of length the number of fields
var row, cel, fieldbox, j, thumbnail, formula, br, sel, table;

try{
if(description === undefined) {  description = "" }
//if(values === 'undefined') {values = []}
//TODO Check the first 3 args and throw errors
if(index === undefined) {index = this.idCounter}
//if(id === 'undefined') {throw "adding a new entry: id arguement must have a value"}
//if(marker === 'undefined') {throw "adding a new entry: marker arguement must have a value"}
}
catch (err) {
  console.log (err)
}
table = this.dataTable.tBodies[0];
row = table.insertRow (index);
cel = row.insertCell(0);              //id
cel.innerHTML = id;
fieldBox = document.createElement("input")  		//Description
fieldBox.type = "text"
fieldBox.style.width="100%" ;
fieldBox.style.height="auto" ;
fieldBox.value = description;
fieldBox.onchange = function (){
  if (!usingGoogleMaps){
  marker.label.setContent(this.value);
  myGame.counters.mapDesignActions ++;// ANALYTICS
  myGame.counters.modifyPointEvent ++;
  checkMapActivity (myGame.counters.mapDesignActions);
  var point = myGame.points.find(x=>x.id === id);           // get the Point object with this id from the myGame.points array
  myGame.modifyPointEvent(point, myGame.myMap, 'name')
  }
  else{
  marker._infowindow.setContent (this.value);
  myGame.updatePoint (id, this.value, 0)
  myGame.counters.mapDesignActions ++;// ANALYTICS
  myGame.counters.modifyPointEvent ++;
  checkMapActivity (myGame.counters.mapDesignActions);
  var point = myGame.points.find(x=>x.id === id);           // get the Point object with this id from the myGame.points array
  myGame.modifyPointEvent(point, myGame.myMap, 'name')
  }
}
cel = row.insertCell(1);
cel.appendChild (fieldBox);
for (j=1; j <this.fields.length; j ++){       //add cell for each column based on its type
  name = this.fields[j].name;
cel= row.insertCell(j+1);
fieldBox = document.createElement("input")
fieldBox.style.width="98%";
fieldBox.style.height="auto";
if(this.fields[j].type === "file"){
fieldBox.type =  "file"
fieldBox.style.width="60%" ;
fieldBox.style.height="auto";
fieldBox.style.float="right";
thumbnail = document.createElement("img");
thumbnail.src = this.points[index].imguri
thumbnail.style.width = "50px"
thumbnail.style.height = "50px"
fieldBox.value =  ""
cel.appendChild (fieldBox);
cel.appendChild (thumbnail);
//this.images.push (this.points[i].imguri)
fieldBox.addEventListener('change', loadImgFile, false)
}
else if (this.fields[j].type === "formula"){
  if (values != undefined &&  Object.keys(values).length >0){
    fieldBox = createFormulaField(values[this.fields[j].name]);
    if(!fromFileOpen|| usingGoogleMaps)
    myGame.updatePoint (this.points[index].id,values[this.fields[j].name], j, 'system', marker)
  }
  else {
  fieldBox = createFormulaField(" ");     //put the default value
  }

cel.appendChild (fieldBox);
  $('[data-bs-toggle="popover"]').popover();
  $('.popover-dismiss').popover({
    trigger: 'focus'
  })
  fieldBox.onchange = function (){
    if(!usingGoogleMaps)
    myGame.updatePoint (marker._leaflet_id, this.value, this.parentNode.cellIndex-1, 'user')
  else
  myGame.updatePoint (marker.metadata.id, this.value, this.parentNode.cellIndex-1, 'user')
  
}
}
else if (this.fields[j].type == "travelTime"){   
  if (values != undefined &&  Object.keys(values).length >0){
    createTravelTimeField(values[name], cel, null);
    if(!fromFileOpen|| usingGoogleMaps)
    myGame.updatePoint (this.points[index].id,values[this.fields[j].name], j, 'system', marker, cel)
  }
  else {
    createTravelTimeField(null, cel, null);   //TODO on change update point
    // myGame.updatePoint (this.points[index].id,values[this.fields[j].name], j, 'system', marker)
  }
     
  
  
}
else if (this.fields[j].type == "number"){
  fieldBox.style.height="auto";
  fieldBox.type = this.fields[j].type
  fieldBox.step =".1"
  if ((values != undefined &&  Object.keys(values).length >0)){
    fieldBox.value = values[name]
    if(!fromFileOpen ) {
      if (usingGoogleMaps)
      myGame.updatePoint (this.points[index].id, values[name], j, 'system', marker)
    }

  }
    else {
    fieldBox.value  = 0;      //put the default value
    //myGame.updatePoint (this.points[index].id, 0, j, 'system', marker)
  }
  cel.appendChild (fieldBox);
  fieldBox.onchange = function (){
    if(!usingGoogleMaps)
    myGame.updatePoint (marker._leaflet_id, this.value, this.parentNode.cellIndex-1, 'user')
  else
  myGame.updatePoint (marker.metadata.id, this.value, this.parentNode.cellIndex-1, 'user')
  }
}
else{
  fieldBox.style.height="auto";
fieldBox.type = this.fields[j].type
if (values != undefined &&  Object.keys(values).length >0){
fieldBox.value = values[name] 
if(!fromFileOpen || usingGoogleMaps) 
myGame.updatePoint (this.points[index].id, values[name] ,j, 'system', marker)}
cel.appendChild (fieldBox);
fieldBox.onchange = function (){
  if(!usingGoogleMaps )
  myGame.updatePoint (marker._leaflet_id, this.value, this.parentNode.cellIndex-1, 'user')
else
myGame.updatePoint (marker.metadata.id, this.value, this.parentNode.cellIndex-1, 'user')}
}
}
this.idCounter ++;
}
newGame.prototype.loadData = function() {       //loads data to the datatable header
  var th;
  this.dataTableHeader.rows[0].deleteCell(3)
	this.dataTableHeader.rows[0].deleteCell(2)
	this.dataTableHeader.rows[0].deleteCell(1)
	for (var i =0; i < this.fields.length ; i++){
		th= this.newTh(this.fields[i].name)
  }
$(th).find("span").children("input").last().css("visibility", "hidden")   //hide right arrow for last field

}
moveColumnRight= function (elem) {
//  var elem = arrow.closest("th");
  var cellIndex = elem.cellIndex;
   var elem2 = elem.nextElementSibling;
   var parent = elem.parentNode;
   var i,cell1, cell2, cellparent,temp;
   if(elem2==null){
     return;
   }
   if (cellIndex == myGame.fields.length-1) {      // if it was the second last column hide right arrow and show right arrow for the swaped one
     $(elem).find("span").children("input").last().css("visibility", "hidden")
     $(elem2).find("span").children("input").last().css("visibility", "visible")
   }
   if (cellIndex == 2) {      // if it was the  first column show left arrow and hide left arrow for the swaped one
     $(elem).find("span").children("input").first().css("visibility", "visible")
     $(elem2).find("span").children("input").first().css("visibility", "hidden")
   }
    parent.insertBefore (elem2, elem)
   for (i=0; i<myGame.dataTable.rows.length; i++){
     cell1 = myGame.dataTable.rows[i].cells[cellIndex];
  //   console.log(cell1)
     cell2 = cell1.nextElementSibling;
  //   console.log(cell2)
     cellparent = cell1.parentNode;
    cellparent.insertBefore (cell2, cell1)

   }
   myGame.fields.swapItems(cellIndex-1, cellIndex)
}
Array.prototype.swapItems = function (a, b) {
  this[a] = this.splice(b, 1, this[a])[0];
 return this;
}
moveColumnLeft= function (elem) {
//  var elem = arrow.closest("th");
  var cellIndex = elem.cellIndex;
  var elem2 = elem.previousElementSibling;
  var parent = elem.parentNode;
  var i,cell1, cell2, cellparent;
  if(cellIndex===2)
    return;
   parent.insertBefore (elem, elem2)
   if (cellIndex == myGame.fields.length) {      // if it was the last column show right arrow and hide right arrow for the swaped one
     $(elem).find("span").children("input").last().css("visibility", "visible")
     $(elem2).find("span").children("input").last().css("visibility", "hidden")
   }
   if (cellIndex == 3) {      // if it was the second first column hide left arrow and show left arrow for the swaped one
     $(elem).find("span").children("input").first().css("visibility", "hidden")
     $(elem2).find("span").children("input").first().css("visibility", "visible")
   }
   for (i=0; i<myGame.dataTable.rows.length; i++){
     cell1 = myGame.dataTable.rows[i].cells[cellIndex];
     //console.log(cell1)
     cell2 = cell1.previousElementSibling;
  //   console.log(cell2)
     cellparent = cell1.parentNode;
    cellparent.insertBefore (cell1, cell2)

   }
    myGame.fields.swapItems(cellIndex-1, cellIndex-2)
}
 $("#bodyContainer").scroll(function ()
    {
        $("#headerContainer").css('left', -1*this.scrollLeft );
    });

function sortTable(table,column,type, dir) {
  var table, rows, switching, i, x, y, shouldSwitch;
  switching = true;
  /*Make a loop that will continue until
  no switching has been done:*/
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /*Loop through all table rows (except the
    first, which contains table headers):*/
    for (i = 0; i < (rows.length - 1); i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
      one from current row and one from the next:*/
      x = rows[i].getElementsByTagName("TD")[column];
      y = rows[i + 1].getElementsByTagName("TD")[column];
      //check if the two rows should switch place:
      if(type === "number"){
        if(dir === "asc") {   //small to big
          if (Number(x.children[0].value) > Number(y.children[0].value)) {
            shouldSwitch = true;
            break;
          }
        }
      else {    //big to small
        if (Number(x.children[0].value) < Number(y.children[0].value)) {
          shouldSwitch = true;
          break;
        }
      }
    }
    else {        //alphabetical order
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      }
      else if (dir == "des") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
        }
      }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}

function resetTable () {
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
