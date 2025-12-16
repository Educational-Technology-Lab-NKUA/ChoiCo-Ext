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
googleMarkersCounter = 1;
var addingGooglePoints = false;
var locationMarker = null;
var trafficLayer = null;
var trafficLayerActive = false;
var  directionsService, directionsRenderer;
newGame.googlemap = function (settings) {
  	this.mode = settings.mode;
    this.markers  = [];
    this.points = false;
    this.prevSelected = null;
    this.mapInstance = settings.map;
    this.mapImages = [];
    this.getMarkerLatLan = function (id) {
      var latlan = this.markers.find(x=>x.metadata.id === id ).getPosition();       //find the latlng of this point in markers[]
      return latlan;
    }
    this.getMarkerLatLan = function (id) {
      var latlan = this.markers.find(x=>x.metadata.id === id ).getPosition();       //find the latlng of this point in markers[]
      return latlan;
    }
}
newGame.googlemap.prototype
async function initGoogleMap (mode, playSettings) {
  const myLatLng = { lat: 47.595, lng: 17.376 }
  var savedZoom = 4
  if (playSettings != undefined) {
    const myLatLng = playSettings.mapSettings.mapCenter;
    var savedZoom = playSettings.mapSettings.zoom;
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
  document.getElementById("originalVersionButton").style.display = "none";
  /*if (mode == 2)  //load on play mode
  {   myLatLng = { lat: 47.595, lng: 17.376 };}  //saved center
  else {
   myLatLng = { lat: 47.595, lng: 17.376 };}*/
  map = new google.maps.Map(googlemap, {
  zoom: savedZoom,
  center: myLatLng,
});

initGeoLocation (map ,mode);
	var googlemapSettings = {mode: mode, map: map}
  myGame.myMap = new newGame.googlemap (googlemapSettings);
  if (mode == 2){
  myGame.myMap.points = loadSavedMakrers(playSettings.points)
 
  }
map.addListener("click", (mapsMouseEvent) => {
  if (addingGooglePoints){
  var options = {}
  var newM = createNewMarker(map, mapsMouseEvent.latLng.toJSON(), options);
        myGame.myMap.markers.push (newM);
      }
});
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
locationButton.innerHTML =  '<i class="fas fa-magnifying-glass-location"></i><span id="curLocText"> Current Location </span>'
if (mode ==2) {
  locationButton.style.display = "none"
}
const addToLocButton = document.createElement("button");
addToLocButton.className = "btn btn-dark gmButton";
addToLocButton.classList.add("custom-map-control-button");
addToLocButton.id = "addToLocButton";
addToLocButton.innerHTML =  '<i class="fas fa-thumbtack"></i><span id="addLocText"> Add Marker to Current Location </span>'
//<i class="fa-solid fa-thumbtack"></i>
if (mode ==2) {
  addToLocButton.style.display = "none"
}
const trafficButton = document.createElement("button");
trafficButton.className = "btn btn-dark gmButton";
trafficButton.innerHTML =  '<i class="fas fa-traffic-light"></i><span id="traffText"> Show live traffic </span>'
/*<i class="fa-solid fa-traffic-light"></i>*/
trafficButton.classList.add("custom-map-control-button");
gmMenuBar.appendChild(locationButton);
gmMenuBar.appendChild(addToLocButton);
gmMenuBar.appendChild(trafficButton);

//map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
map.controls[google.maps.ControlPosition.LEFT].push(gmMenuBar);
//map.controls[google.maps.ControlPosition.TOP_CENTER].push(addToLocButton);
//map.controls[google.maps.ControlPosition.TOP_CENTER].push(trafficButton);
infoWindow = new google.maps.InfoWindow();
 directionsService = new google.maps.DirectionsService();
 directionsRenderer = new google.maps.DirectionsRenderer();
directionsRenderer.setMap(map);
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
      addingGooglePoints == false;
      for(var i=0; i<myGame.myMap.markers.length; i++) {
          myGame.myMap.markers[i].setDraggable(false);
          myGame.myMap.markers[i].setIcon('media/imgs/marker.png');
          myGame.myMap.prevSelected = null;
      }
      showAllMarkers();
      document.getElementById("locationButton").style.display = "none";
      document.getElementById("addToLocButton").style.display = "none";
    }
    else{  // IF DESIGN MODE
      for(var i=0; i<myGame.myMap.markers.length; i++) {
          myGame.myMap.markers[i].setDraggable(true);
      }
      document.getElementById("locationButton").style.display = "block";
      document.getElementById("addToLocButton").style.display = "block";
    }
  }

  function getGMapMarkerLatLan (id){
    var marker = myGame.myMap.markers.find(x=>x.metadata.id === id )
    var lat = marker.getPosition().lat();
    var lng = marker.getPosition().lng();
    var latlng = {lat: lat, lng:lng};
    return latlng;
  }
function loadSavedMakrers (pointsArray) {
  for (var i =0; i<pointsArray.length; i++){
    var point = pointsArray[i]
    var options = {description: point.description, draggable: false, id:point.id, visible:true, values: point.values, mode: 2}
    var latlng = new google.maps.LatLng(point.latlng.lat, point.latlng.lng);  
    var m = createNewMarker (myGame.myMap.mapInstance, latlng, options)
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
   var newMarker = new google.maps.Marker({
      position: latlng,
      map: mapInstance,
      icon: 'media/imgs/marker.png',
    });
    newMarker.setDraggable(draggable);
    //add marker inforwindow as label
    newMarker._infowindow = new google.maps.InfoWindow({
        content: description,
        minWidth: 15,
      });
      google.maps.event.addListener(newMarker, 'click', function() {
        this._infowindow.open(map, this);
      });
      // open infowindow on load
      google.maps.event.trigger(newMarker, 'click');
      newMarker.metadata = {id: markid, isVisible: isvisible}
      if(mode===1){
      //create and add a new point to the table "points" of game object
      var newPoint = new Point (markid, "googleMapsMain", latlng);
      myGame.points.push(newPoint);
      
      }
      //adds a new Entry to the database  (datatable)
      myGame.newEntry (myGame.idCounter, newMarker, newMarker.metadata.id, description, values, )
      newMarker.addListener("click", () => {
        newMarker.setIcon('media/imgs/marker_select.png')
        if (this.prevSelected != null) {
          this.prevSelected.setIcon('media/imgs/marker.png')
        }
        this.prevSelected = newMarker;
      if(myGame.mode === 1)  {    //design mode click
        highlightDataEntry (newMarker.metadata.id)
      }
      else if(myGame.mode === 2)  {    //play mode click
        var clickedPoint =  myGame.points.find(x=>x.id === newMarker.metadata.id)
        updatePointInfo (clickedPoint)
      }
      });
      google.maps.event.addListener(newMarker,  'rightclick',  function() {
        if(myGame.mode === 1)  {    //if on design mode
          selectedPointId = newMarker.metadata.id;
          showRightClickWindow ();
        }
       });
       googleMarkersCounter ++;
       return newMarker;
     }
