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
blocklyZoomParams = {controls: true,
 wheel: true,
 startScale: 1.0,
 maxScale: 3,
 minScale: 0.3,
scaleSpeed: 1.2}

function codingWorkspace (workspaceXml, toolboxXml, blocklyD) {
  this.isReady = false;
  this.workspace = null;
  this.workspaceXml = workspaceXml;
  var toolboxXml= toolboxXml;
  var blocklyXml = workspaceXml;
  var myblocklyDiv = blocklyD
  this.reloaded = false;
  this.initializeWorkspace = function(){
      this.workspace = Blockly.inject(myblocklyDiv,{toolbox: toolboxXml, zoom:blocklyZoomParams});

      var xml = Blockly.utils.xml.textToDom(blocklyXml);
      Blockly.Xml.domToWorkspace(xml, this.workspace);

      this.isReady = true;
  }
  this.redrawFromXml = function () {
    this.workspace.clear();
    var xml = Blockly.utils.xml.textToDom(blocklyXml);
    Blockly.Xml.domToWorkspace(xml, this.workspace);
  }
  this.updateWorkspaceXml = function (newXml){
    this.workspaceXml = newXml
    blocklyXml = newXml;
  }
  this.getBlocks = function (newXml){
  return  this.workspace.getAllBlocks();
  }
  this.redrawWorkspace = function () {
    var xml = Blockly.Xml.workspaceToDom(this.workspace);
  		this.workspace.clear();
  		Blockly.Xml.domToWorkspace(xml, this.workspace);}
}

codingWorkspace.prototype.getJavascriptCode = function (){
  return javascript.javascriptGenerator.workspaceToCode(this.workspace);
}
codingWorkspace.prototype.getWorkspace = function (){
  return  Blockly.Xml.workspaceToDom(this.workspace);
}
codingWorkspace.prototype.getToolbox = function (){
  return this.toolbox;
}
codingWorkspace.prototype.getCode = function (){
  return this.code;
}
