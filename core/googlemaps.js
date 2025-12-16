//option 1 leaflet plug in. Static google MAP
/*
myGame.myMap.mapInstance.options.crs = L.CRS.EPSG3857
/*  roads = L.gridLayer.googleMutant({
type: 'roadmap' // valid values are 'roadmap', 'satellite', 'terrain' and 'hybrid'
})
L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
maxZoom: 20,
subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
}).addTo(gameMap);
//roads.addTo(gameMap)
gameMap.setView([-128,128],2);
gameMap.setMaxBounds([-256,-256],[256,256])
*/
//

let map;
googlemapMap = null;
googleMarkersCounter = 1;
var addingGooglePoints = false;
var locationMarker = null;
var trafficLayer = null;
var trafficLayerActive = false;
var airInfoActive = false;
var  directionsService, directionsRenderer;
newGame.googlemap = function (settings) {
  	this.mode = settings.mode;
    this.markers  = [];
    this.points = false;
    this.prevSelected = null;
    this.mapInstance = settings.map;
    this.mapImages = [];

    /*this.getMarkerLatLan = function (id) {
      var mark = this.markers.find(x=>x.metadata.id === id )
      var lat = marker.getAttribute("position").split(",")[0];       //find the latlng of this point in markers[]
     var lng = marker.getAttribute("position").split(",")[1]; 
     var latlan = new google.maps.LatLng(lat, lng)
      return latlan;
    }*/
  
}
newGame.googlemap.prototype
async function initGoogleMap (mode, playSettings) {
  var myLatLng = { lat: 47.595, lng: 17.376 }
  var savedZoom = 3
  if (playSettings != undefined) {
    if(playSettings.mapSettings.mapCenter != undefined){
     myLatLng = playSettings.mapSettings.mapCenter;
    var savedZoom = playSettings.mapSettings.zoom;
    }
  }
  	//option 2: Use different DIV for google map
  
     const { Map } = await google.maps.importLibrary("maps");
    const googlemap = document.getElementById("googlemap");
    googlemap.addEventListener("contextmenu", e => e.preventDefault());
  document.getElementById("map").style.display = "none";
  document.getElementById("googlemap").style.display = "block";
  document.getElementById("upload").style.display = "none";
  document.getElementById("googleMapsButton").style.display = "none";
  document.getElementById("layersButton").style.display = "none";
 document.getElementById("originalVersionButton").style.display = "block";
  /*if (mode == 2)  //load on play mode
  {   myLatLng = { lat: 47.595, lng: 17.376 };}  //saved center
  else {
   myLatLng = { lat: 47.595, lng: 17.376 };}*/
  map = new google.maps.Map(googlemap, {
  zoom: savedZoom,
  center: myLatLng,
  mapId: "845b1a03e659b669"
});

initGeoLocation (map ,mode);
	var googlemapSettings = {mode: mode, map: map}
  googlemapMap = new newGame.googlemap (googlemapSettings);
  myGame.myMap = googlemapMap
 
map.addListener("click", (mapsMouseEvent) => {
  if (addingGooglePoints){
  var options = {}
  var newM = createNewMarker(map, mapsMouseEvent.latLng.toJSON(), options);
        myGame.myMap.markers.push (newM);

        myGame.counters.mapDesignActions ++;	//ANALYTICS
        checkMapActivity(	myGame.counters.mapDesignActions);
        myGame.addPointEvent (newM, myGame.myMap);
        newM.element.addEventListener ("contextmenu",  function() {
          if(myGame.mode === 1)  {    //if on design mode
            selectedPointId = newM.metadata.id;
            showRightClickWindow ();
          }
         });
      }

});
/*map.addListener("zoom_changed", () => {
  // 3 seconds after the center of the map has changed, pan back to the
  // marker.
  window.setTimeout(() => {
    for (var i=0; i<myGame.myMap.markers.length; i++) {
      var mark = myGame.myMap.markers[i];
      mark.metadata.infoW.setPosition({})
    }
  }, 1000);
});*/
setGoogleMapMode (mode)

}


// GEO Location
async function initGeoLocation (map, mode) {
/*const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary(
"marker"
);*/
//Add location button on the map
const gmMenuBar = document.createElement("span");
gmMenuBar.className = "gmMenu"

const locationButton = document.createElement("button");
//<i class="fa-solid fa-location-crosshairs"></i>
locationButton.className = "btn btn-dark gmButton";
locationButton.classList.add("custom-map-control-button");
locationButton.id = "locationButton";
locationButton.innerHTML =  '<i class="bi bi-crosshair"></i><span id="curLocText"> Current Location </span>'

const addToLocButton = document.createElement("button");
addToLocButton.className = "btn btn-dark gmButton";
addToLocButton.classList.add("custom-map-control-button");
addToLocButton.id = "addToLocButton";
addToLocButton.innerHTML =  '<i class="bi bi-pin"></i><span id="addLocText"> Add Marker to Current Location </span>'
 addToLocButton.style.display = "none"
//<i class="fa-solid fa-thumbtack"></i>
if (mode ==2) {
  addToLocButton.style.display = "none"
}
const trafficButton = document.createElement("button");
trafficButton.className = "btn btn-dark gmButton";
trafficButton.innerHTML =  '<i class="fas fa-traffic-light"></i><span id="traffText"> Show live traffic </span>'
/*<i class="fa-solid fa-traffic-light"></i>*/
trafficButton.classList.add("custom-map-control-button");
const airButton = document.createElement("button");
airButton.className = "btn btn-dark gmButton";
airButton.innerHTML =  '<i class="bi bi-wind"></i><span id="airQText"> Show Air Quality </span>'
/*<i class="fa-solid fa-traffic-light"></i>*/
airButton.classList.add("custom-map-control-button");
gmMenuBar.appendChild(locationButton);
gmMenuBar.appendChild(addToLocButton);
gmMenuBar.appendChild(trafficButton);
gmMenuBar.appendChild(airButton);
map.controls[google.maps.ControlPosition.LEFT].push(gmMenuBar);
await google.maps.importLibrary("places");
const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker");
const searchCard = document.createElement("div");
//<i class="fa-solid fa-location-crosshairs"></i>
searchCard.className = "place-autocomplete-card";
searchCard.id = "place-autocomplete-card";
const placeAutocomplete = new google.maps.places.PlaceAutocompleteElement();
placeAutocomplete.id = "place-autocomplete-input";
searchCard.appendChild(placeAutocomplete);
map.controls[google.maps.ControlPosition.TOP].push(searchCard);
/*var placeMarker = new google.maps.Marker({
  map: map
})*/

var placeInfoWindow = new google.maps.InfoWindow();
placeAutocomplete.addEventListener("gmp-placeselect", async ({ place }) => {
  await place.fetchFields({
    fields: ["displayName", "formattedAddress", "location"],
  });

    // If the place has a geometry, then present it on a map.
   /* if (place.viewport) {
      map.fitBounds(place.viewport);
    } else {
      map.setCenter(place.location);
      map.setZoom(10);
    }*/

    placesSearch(placeInfoWindow, place); 
});

infoWindow = new google.maps.InfoWindow();
 selectPinBackground = new PinElement({
  background: "pink",
});
defaultPinBackground = new PinElement({
  background: "blue",
});
 directionsService = new google.maps.DirectionsService();
 directionsRenderer = new google.maps.DirectionsRenderer();
directionsRenderer.setMap(map);
if(mode==2)
  loadSavedMakrers(myGame.points)
locationButton.addEventListener("click", () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              };
              // To Do: Use Advance Marker
              var iconBase = 'media/imgs/dot.png';
              if (locationMarker===undefined){
              var locationMarker = new google.maps.Marker({
                position: pos,
                icon: iconBase,
                map: map
              });
            }
            else {
              locationMarker.setPosition(pos);
            }
             map.setCenter(pos);
            map.setZoom(15)
            window.setTimeout(() => {
              resetMarkersInfoW ();
            }, 500);
            },
            () => {
              handleLocationError(true, infoWindow, map.getCenter());
            }
          );
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
      });
addToLocButton.addEventListener("click", () => {
              if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                  (position) => {
                    const pos = {
                      lat: position.coords.latitude,
                      lng: position.coords.longitude,
                    };
                    // To Do: Use Advance Marker
                    var options = {draggable: true,  visible:true,  mode: 1}
                    var m = createNewMarker(myGame.myMap.mapInstance, pos, options)
                    myGame.myMap.markers.push(m);
                  },
                  () => {
                    handleLocationError(true, infoWindow, map.getCenter());
                  }
                );
              } else {
                // Browser doesn't support Geolocation
                handleLocationError(false, infoWindow, map.getCenter());
              }
            });
trafficButton.addEventListener("click", () => {
            if (!trafficLayerActive){
             trafficLayer = new google.maps.TrafficLayer();
            trafficLayer.setMap(map);
            trafficLayerActive= true;
            trafficButton.textContent = "Hide live traffic";
          }
          else {
            trafficLayer.setMap(null);
            trafficLayerActive= false;
              trafficButton.textContent = "Show live traffic";
          }
                  });
  airButton.addEventListener("click", () => {
            if (!airInfoActive){
              airInfoActive= true;
              for (var i=0; i<myGame.points.length; i++){
                if(myGame.points[i].airQualityData == null){
                  calcAirQuality (myGame.points[i]);
                }
                else {
                  createLebelContent (myGame.points[i]);
                }
            
              }
             
              airButton.textContent = "Hide Air Quality";
          }
          else {
            hideAirQuality ();
            airInfoActive= false;
            airButton.textContent = "Show Air Quality";
          }
                  });

    }
function resetMarkersInfoW () {
  for (var i=0; i<myGame.myMap.markers.length; i++) {
    var mark = myGame.myMap.markers[i];
    mark.setMap(null)
    mark.setMap(map)
   
  }
}
   async function calcAirQuality (point) {
    
      const url =  `https://airquality.googleapis.com/v1/currentConditions:lookup?key=AIzaSyBn3w3bIV_shdMULol4MbrFpGClcskM31M`;
      
        var latlngPoint = point.latlng;
        if(typeof(latlngPoint.lat) =='function'){
          var lat = latlngPoint.lat();
          var lng = latlngPoint.lng();
        }
        else {
          var lat = latlngPoint.lat;
          var lng = latlngPoint.lng;
        } 
       const requestData = {
        location: {
          latitude: lat,
          longitude: lng
        }
        
      };
      try {
        const response = await fetch (url, {
          
          method: "post",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(requestData)});
        const data = await response.json();
       point.airQualityData = {color: data.indexes[0].color, aqi: data.indexes[0].aqi, category: data.indexes[0].category};
       console.log (data)
       if (airInfoActive) {
        createLebelContent (point);
       }
      }catch (error) {
        console.error ("Error: ", error);
      }

    }

    
    function componentToHex(c) {
      var hex = c.toString(16);
      return hex.length == 1 ? "0" + hex : hex;
    }
    
    function rgbToHex(r, g, b) {
      return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    }
function createLebelContent (point, newDesc) {
  var red = parseInt(point.airQualityData.color.red*255)|| 1;
  var green = parseInt(point.airQualityData.color.green*255)|| 1;
  var blue = parseInt(point.airQualityData.color.blue*255)|| 1; 
  var color = rgbToHex (red, green, blue)
  var airText = point.airQualityData.category;
  var aqi = point.airQualityData.aqi;
  if(newDesc!= undefined)
  var descriptio = newDesc
else
  var description =point.description
  var content =  ` <div class="labelText">${description}</div><span class="dot" style="background-color: ${color} "></span><span class="aqiText"> ${aqi}</span>`;
  var marker = myGame.myMap.markers.find(x=>x.metadata.id === point.id ) 
  marker.metadata.infoW.setContent(content)
}
function hideAirQuality () {
  for (var i = 0 ; i<myGame.points.length; i++){
    var marker = myGame.myMap.markers.find(x=>x.metadata.id === myGame.points[i].id )
     var descr = myGame.points[i].description; 
    var content =  `<div class="labelText">${descr}</div>`;
    marker.metadata.infoW.setContent(content);
  }
}
    async function airMapTile (pointLocation) {
      var API = "AIzaSyBn3w3bIV_shdMULol4MbrFpGClcskM31M"
      const url =  `https://airquality.googleapis.com/v1/mapTypes/US_AQI/heatmapTiles/2/0/1?key=AIzaSyBn3w3bIV_shdMULol4MbrFpGClcskM31M`;
     
      try {
        const response = await fetch (url, {
         
          method: "get",
          headers: {
              "Content-Type": "application/json"
          },
         });
        const data = await response.arrayBuffer();
        console.log (data)
       return data;
      }catch (error) {
        console.error ("Error: ", error);
      }

    }

async function airTile (zoom){
 /* const url = `https://airquality.googleapis.com/v1/mapTypes/UAQI_RED_GREEN/heatmapTiles/2/0/1?key=AIzaSyBn3w3bIV_shdMULol4MbrFpGClcskM31M`
  try {
    const response = await fetch (url, {
      mode: 'no-cors',
      method: "get",
      responseType: 'arraybuffer'});
  //  const data = await response.json();
    console.log (response)
  }catch (error) {
    console.error ("Error: ", error);
  }*/
  const apiKey = 'AIzaSyBn3w3bIV_shdMULol4MbrFpGClcskM31M';
  const airqualityType = 'UAQI_RED_GREEN' // AirQuality API heatmap type
   const deckOverlay = new GoogleMapsOverlay({
     layers: [
        // Heatmap Tiles layer
 new TileLayer({
     id: 'heatmap-tiles',
     data: 'https://airquality.googleapis.com/v1/mapTypes/'+ airqualityType + +'/heatmapTiles/{z}/{x}/{y}?key=' + apiKey,
  })
     ],
   });
 
   deckOverlay.setMap(map);
 
}
  
async function placesSearch (pinfoW,  place){
 
  let content =
  '<div id="infowindow-content">' +
  '<span id="place-displayname" class="title">' +
  place.displayName +
  "</span><br />" +
  '<span id="place-address">' +
  place.formattedAddress +
  "</span>" +
  "</div>";
  pinfoW.setContent(content);
  pinfoW.setPosition(place.location);
  pinfoW.open({
    map: map,
  });
  map.setCenter(place.location);
  map.setZoom(16);
  window.setTimeout(() => {
    resetMarkersInfoW ();
  }, 300);

}
    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
      infoWindow.setPosition(pos);
      infoWindow.setContent(
        browserHasGeolocation
          ? "Error: The Geolocation service failed."
          : "Error: Your browser doesn't support geolocation."
      );
      infoWindow.open(map);
    }

async function calcRoute(pointA, pointB) {  //points :  marker from myGame.myMap.markers
  var start = new google.maps.LatLng(pointA.position);
  var end = new google.maps.LatLng(pointB.position);
   const directionsService = new google.maps.DirectionsService();
      const request = {
        origin: start,
        destination: end,
        travelMode: 'DRIVING'
      };
      return new Promise(resolve => directionsService.route(request,
    function(result, status) {
      if (status === "OK") {
        resolve(result)
      } else {
        window.alert("Directions request failed due to " + status);
      }
    })
    );
  }
function resetGoogleMap (){
  for(var i=0; i<myGame.myMap.markers.length; i++){
      myGame.myMap.markers[i].setMap(null);
  }
  this.markers  = [];
  this.points = false;
  this.prevSelected = null;
  this.mapImages = [];
}
function setGoogleMapMode (mode) {

    if (mode === 2) {       // IF PLAY MODE
      addingGooglePoints = false;
      for(var i=0; i<myGame.myMap.markers.length; i++) {
          //myGame.myMap.markers[i].setDraggable(false);
          myGame.myMap.markers[i].gmpDraggable = false;
         // myGame.myMap.markers[i].setIcon('media/imgs/marker.png');
          myGame.myMap.prevSelected = null;
      }
      showAllMarkers();
     // document.getElementById("addToLocButton").style.display = "none";
    }
    else{  // IF DESIGN MODE
      for(var i=0; i<myGame.myMap.markers.length; i++) {
          //myGame.myMap.markers[i].setDraggable(true);
          myGame.myMap.markers[i].gmpDraggable = true;
      }
      if (myGame.myMap.addingPoints)
      addingGooglePoints = true;
      document.getElementById("addToLocButton").style.display = "block";
    }
  }

  function getGMapMarkerLatLan (id){
   /* var marker = myGame.myMap.markers.find(x=>x.metadata.id === id )
    var lat = marker.getPosition().lat();
    var lng = marker.getPosition().lng();
    var latlng = {lat: lat, lng:lng};
    return latlng;*/
    var marker = myGame.myMap.markers.find(x=>x.metadata.id === id )
    var lat = marker.getAttribute("position").split(",")[0];       //find the latlng of this point in markers[]
   var lng = marker.getAttribute("position").split(",")[1]; 
   var latlng = new google.maps.LatLng(lat, lng)
   return latlng;
  }
function loadSavedMakrers (pointsArray) {
  for (var i =0; i<pointsArray.length; i++){
    var point = pointsArray[i]
    var options = {description: point.description, draggable: false, id:point.id, visible:true, values: point.values, mode: 2}
    var latlng = new google.maps.LatLng(point.latlng.lat, point.latlng.lng);  
    var m = createNewMarker (myGame.myMap.mapInstance, latlng, options)
   m.element.addEventListener("contextmenu", function(evnt){
      if(myGame.mode === 1)  {    //if on design mode
        for (let j =0; j < myGame.myMap.markers.length; j ++ ) {
          if (myGame.myMap.markers[j].element == evnt.srcElement) {
             selectedPointId = myGame.myMap.markers[j].metadata.id;
          showRightClickWindow ();
            break;}
          }
    
       
    
      }
  });
    //point.id = m.metadata.id;
    myGame.myMap.markers.push(m);
  }
  return pointsArray;
}
function createNewMarker (mapInstance, latlng, options) {
  var description =   options.description ?? "";
  var mode =   options.mode ?? 1;   //1: point is added in design mode, 2:point is added in play mode when game file loads
  var draggable =  options.draggable ?? true;
  var markid =  options.id ?? googleMarkersCounter;
  var isvisible = options.visible ?? true;
  var values = options.values ?? [];
  // Create a new marker at mouse latlng position
   const admarker = new google.maps.marker.AdvancedMarkerElement({
    map,
    position: latlng,
    gmpDraggable: draggable,
   gmpClickable: true,
    title: description,
  });
  const markerInfoWindow =  new google.maps.InfoWindow({
    content: admarker.title,
      disableAutoPan: true,
    headerDisabled: true,

  });

     markerInfoWindow.open({
       map: map,
       anchor: admarker,
     });
      admarker.metadata = {id: markid, isVisible: isvisible, infoW: markerInfoWindow}
      if(mode===1){
      //create and add a new point to the table "points" of game object
      var newPoint = new Point (markid, "googleMapsMain", latlng);
      myGame.points.push(newPoint);
      if (airInfoActive){
        calcAirQuality (newPoint);
      }
      }
      //adds a new Entry to the database  (datatable)
      myGame.newEntry (myGame.idCounter, admarker, admarker.metadata.id, description, values, )
      admarker.addListener("click", (evt) => {
        
       // admarker.content = selectPinBackground.element;
        if (this.prevSelected != null) {
       //   this.prevSelected.content = defaultPinBackground.element;
        }
        this.prevSelected = admarker;
      if(myGame.mode === 1)  {    //design mode click
        highlightDataEntry (admarker.metadata.id)
      }
      else if(myGame.mode === 2)  {    //play mode click
        var clickedPoint =  myGame.points.find(x=>x.id === admarker.metadata.id)
        updatePointInfo (clickedPoint)
      }
      });
     /* google.maps.event.addListener(admarker.element,  'rightclick',  function() {
        if(myGame.mode === 1)  {    //if on design mode
          selectedPointId = admarker.metadata.id;
          showRightClickWindow ();
        }
       });*/

       googleMarkersCounter ++;
       return admarker;
     }
