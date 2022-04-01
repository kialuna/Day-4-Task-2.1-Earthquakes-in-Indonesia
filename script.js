

// Javascript for Day 4 Task 2.1
// Student number: 201578549


// Create map variable
var map;
// magnification with which the map will start
var zoom = 4;
// co-ordinates to center map on
var lat = -1.0241735073594869;
var lng = 117.29; 
// Layer groups to add markers to
var	monthMarkers=L.layerGroup()
var	weekMarkers=L.layerGroup()
var	dayMarkers=L.layerGroup()

// Function to create coloured marker created by Grzegorz Tomicki
// Citation: https://tomik23.github.io/leaflet-examples/#13.svg-markers-width-legends
function colorMarker(color) {   
	const svgTemplate = `
	  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" class="marker">
		<path fill-opacity=".25" d="M16 32s1.427-9.585 3.761-12.025c4.595-4.805 8.685-.99 8.685-.99s4.044 3.964-.526 8.743C25.514 30.245 16 32 16 32z"/>
		<path stroke="#fff" fill="${color}" d="M15.938 32S6 17.938 6 11.938C6 .125 15.938 0 15.938 0S26 .125 26 11.875C26 18.062 15.938 32 15.938 32zM16 6a4 4 0 100 8 4 4 0 000-8z"/>
	  </svg>`;
  
	const icon = L.divIcon({
	  className: "marker",
	  html: svgTemplate,
	  iconSize: [20, 20],
	});
  
	return icon;
}


// Function which takes a row of JSON data and creates a marker coloured by magnitude and adds it a to a marker group
function pushData(rawData,markerGroup){
	// Get lat long from data
	var markerLocation = new L.LatLng(rawData.lat, rawData.lon);

	var iconOptions={}
	// Loop through and colour marker by mag
	if (rawData.magnitude<=4.2){
		iconOptions.icon=colorMarker('#FFE45E');
	} else if (rawData.magnitude<=4.6){
		iconOptions.icon=colorMarker('#FFCC33');
	} else if (rawData.magnitude<=5.2){
		iconOptions.icon=colorMarker('#FF8C03');
	} else if (rawData.magnitude<=5.6){
		iconOptions.icon=colorMarker('#E60000');
	} else {iconOptions.icon=colorMarker('#9C0000')}
	
	// Create marker from location and icon opts
	var marker = new L.marker(markerLocation,iconOptions)
	// Create popup window with info 
	.bindPopup("<div id='popup'><b>Magnitude:</b> "+rawData.magnitude+"<br><b>Date:</b>"+rawData.date+"</div>")
	// Add marker to layer group
	markerGroup.addLayer(marker);

}


function initialise()	{
	
  	// calling map
  	const map = L.map("map").setView([lat, lng], zoom);
	
	//Load tiles from open street map (you maybe have mapbox tiles here- this is fine) 
	L.tileLayer('http://tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution:'Map data ©OpenStreetMap contributors, CC-BY-SA, Imagery ©CloudMade',
	//add the basetiles to the map object	
	}).addTo(map);


	$.getJSON("fetchData.php", function(results)	{ 
		// Populate layer group with markers according to number of days since earthquake
		for (var i = 0; i < results.length; i++ ){
			pushData(results[i],monthMarkers)
			if (Number(results[i].days) <=7){
				pushData(results[i],weekMarkers)
			}
			if (results[i].days<=1){
				pushData(results[i],dayMarkers)
			}
		}
		
	});


	// Add layers to map
	monthMarkers.addTo(map)
	weekMarkers.addTo(map)
	dayMarkers.addTo(map)
	
	// Give layers proper names
	var layers={
		"Last 30 Days":monthMarkers,
		"Last 7 Days":weekMarkers,
		"Last Day":dayMarkers
	}
	// Add layer control
	L.control.layers(layers ).addTo(map);

}
	
	
	