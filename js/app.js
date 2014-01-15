var start = moment("2014-01-14T07:00:00");

var timeStep = [start];
for (var i = 0; i < 67; i++){
	timeStep.push(moment(timeStep[i]).add('minutes',15));
}

$('#startTime').html('<strong>' + timeStep[0].format('h:mm A') + '</strong>');
$('#stopTime').html('<strong>' + timeStep[timeStep.length-1].format('h:mm A') + '</strong>');
$('#timeDisplay h1').html('<strong>' + timeStep[timeStep.length-1].format('h:mm A') + '</strong>');

$('#timeslider').slider({
	min:0,
	max:timeStep.length,
	value:timeStep.length,
	slide:function(event, ui){
		$('#timeDisplay h1').html('<strong>' + timeStep[ui.value].format('h:mm A') + '</strong>');
	},
	stop: function(event, ui){
		featureLayer.setFilter(filterTest);
		$('#timeDisplay h2').html('Reports: <strong>' + $('.leaflet-marker-pane img').length + '</strong>');
	}
});

var map = L.mapbox.map('map', 'examples.map-9ijuk24y')
	.setView([29.8608,30.7702], 6);

map.on('layeradd', function(e){
});

var featureLayer = L.mapbox.featureLayer()
    .addTo(map);

featureLayer.on('ready',function(){
	$('#timeDisplay h2').html('Reports: <strong>' + $('.leaflet-marker-pane img').length + '</strong>');
	this.eachLayer(function(layer){
		layer.feature.properties.timestamp = addMoment(layer.feature.properties.time);
	});
});

featureLayer.loadURL('observer-data.geojson');

var addMoment = function(timeString){
	return moment("2014-01-14T"+timeString);
};

var filterTest = function(feature){
	return feature.properties.timestamp.isBefore(timeStep[$('#timeslider').slider('value')]);
};

var addMinutes = function(date, minutes) {
    return new Date(date.getTime() + minutes*60000);
};

