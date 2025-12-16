
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
function loadXml (fileName) {
  return new Promise ((resolve,reject)=> {

    var jqxhr = $.get(fileName).done (function(result){
    var serializer = new XMLSerializer();
    console.log (fileName + ' loaded successfully')
    var xml = serializer.serializeToString(result);
    resolve (xml)
  })
  .fail (function(){console.log (fileName + ' failed to load'); reject('error')})
});
}
