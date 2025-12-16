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
function createXml () {

var dt = document.getElementById("datatable");
var r = dt.rows[0];
var variables = r.getElementsByClassName("tableField");
var xmlString = "<xml></xml>";
var parser = new DOMParser();
var xmlDoc = parser.parseFromString(xmlString, "text/xml");
//first block
var node = xmlDoc.createElement("block");
var newAtt = xmlDoc.createAttribute("type");
newAtt.nodeValue = "variables_set";
node.setAttributeNode(newAtt);
var newAtt = xmlDoc.createAttribute("id");
newAtt.nodeValue = "id0"
node.setAttributeNode(newAtt);
var newAtt = xmlDoc.createAttribute("x");
newAtt.nodeValue = "188";
node.setAttributeNode(newAtt);
var newAtt = xmlDoc.createAttribute("y");
newAtt.nodeValue = "38";
node.setAttributeNode(newAtt);
var elements = xmlDoc.getElementsByTagName("xml");
elements[0].appendChild(node);
var field = xmlDoc.createElement("field");
var newAtt = xmlDoc.createAttribute("name");
newAtt.nodeValue = "VAR";
field.setAttributeNode(newAtt);
newText = xmlDoc.createTextNode(variables[1].value);  	// 1 because 0 is description field
field.appendChild(newText);
	var val = xmlDoc.createElement("value");
	var newAtt = xmlDoc.createAttribute("name");
	newAtt.nodeValue = "VALUE";
	val.setAttributeNode(newAtt);
	var blockMath =  xmlDoc.createElement("block");
	var newAtt = xmlDoc.createAttribute("type");
	newAtt.nodeValue = "math_number";
	blockMath.setAttributeNode(newAtt);
	var newAtt = xmlDoc.createAttribute("id");
	newAtt.nodeValue = "id0num"
	blockMath.setAttributeNode(newAtt);
	var field2 = xmlDoc.createElement("field");
	var newAtt = xmlDoc.createAttribute("name");
	newAtt.nodeValue = "NUM";
	field2.setAttributeNode(newAtt);
	newText = xmlDoc.createTextNode("0");  	// 1 because 0 is description field
	field2.appendChild(newText);
	blockMath.appendChild(field2)
	val.appendChild(blockMath)
var next = xmlDoc.createElement("next");
var elements = xmlDoc.getElementsByTagName("block");
elements[0].appendChild(field);
elements[0].appendChild(val);
elements[0].appendChild(next);
//next blocks
for (var i = 1; i < variables.length-1; i ++){
var node = xmlDoc.createElement("block");
var newAtt = xmlDoc.createAttribute("type");
newAtt.nodeValue = "variables_set";
node.setAttributeNode(newAtt);
var newAtt = xmlDoc.createAttribute("id");
newAtt.nodeValue = "id"+i;
node.setAttributeNode(newAtt);
var elements = xmlDoc.getElementsByTagName("next");
elements[i-1].appendChild(node);
var field = xmlDoc.createElement("field");
var newAtt = xmlDoc.createAttribute("name");
newAtt.nodeValue = "VAR";
field.setAttributeNode(newAtt);

newText = xmlDoc.createTextNode(variables[i+1].value);
field.appendChild(newText);
var val = xmlDoc.createElement("value");
	var newAtt = xmlDoc.createAttribute("name");
	newAtt.nodeValue = "VALUE";
	val.setAttributeNode(newAtt);
	var blockMath =  xmlDoc.createElement("block");
	var newAtt = xmlDoc.createAttribute("type");
	newAtt.nodeValue = "math_number";
	blockMath.setAttributeNode(newAtt);
	var newAtt = xmlDoc.createAttribute("id");
	newAtt.nodeValue = "idnum" + i;
	blockMath.setAttributeNode(newAtt);
	var field2 = xmlDoc.createElement("field");
	var newAtt = xmlDoc.createAttribute("name");
	newAtt.nodeValue = "NUM";
	field2.setAttributeNode(newAtt);
	newText = xmlDoc.createTextNode("0");  	// 1 because 0 is description field
	field2.appendChild(newText);
	blockMath.appendChild(field2)
	val.appendChild(blockMath)
var next = xmlDoc.createElement("next");
var elements = xmlDoc.getElementsByTagName("block");
elements[i+1].appendChild(field);
elements[i+1].appendChild(val);
elements[i+1].appendChild(next);
}

var serializer = new XMLSerializer();
xmlText = serializer.serializeToString(xmlDoc);
return xmlText;
}

function createWorkspace1Xml () {
var dt = document.getElementById("datatable");
var r = dt.rows[0];
var variables = r.getElementsByClassName("tableField");
 xmlString = "<xml>";

for (var i=1; i<variables.length; i++){
xmlString += ' <block type="initialValue" id = "id'+i+'">'
xmlString += '<field name="varName">' + variables[i].value + '</field>'
xmlString += '<value name="varVal"><block type="math_number" id="var' + i +'">'
xmlString += '<field name="NUM">0</field></block></value>'
if(i<variables.length-1)
	xmlString += '<next>'
}
for (var i=2; i<variables.length; i++){
xmlString += '</block></next>'

}
xmlString += '</block></xml>'
return xmlString;
}

function createWorkspace2Xml () {
var dt = document.getElementById("datatable");
var r = dt.rows[0];
var variables = r.getElementsByClassName("tableField");
 xmlString = '<xml><block id="oUgd{3K~U[F@#aF]}ygA" type="controls_if" x="140" y="27"> <value name="IF0"> <block id="~a@gT-aydG21O-1G.sjK" type="logic_compare"> <field name="OP">EQ</field><value name="A"><block id="RTuC:_mI#d@k69q|ly)+" type="singleVar"><field name="varName">'
 xmlString += variables[1].value;
 xmlString += ' </field></block> </value><value name="B"><block id="qIM#58w_X12vI;dXPueD" type="math_number"><field name="NUM">0</field></block></value></block></value><statement name="DO0"><block id="@t3)Xb+0RgcEmSS(%4Gj" type="text_print"><value name="TEXT">'
xmlString+= '<block id="cC=c[(;XRLZrToaN%K=_" type="text"><field name="TEXT">Game Over</field></block></value></block></statement></block></xml>'
return xmlString;
}
