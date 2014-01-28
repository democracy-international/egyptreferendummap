var app = app || {};

app.MapView = Backbone.View.extend({
	el: '#map',
	initialize: function(){
		console.log('mapView initializing');
		this.activeFeatures = []; // remove
		this.activeFeaturesNew = L.featureGroup();
		this.activePoints = [];
		this.map = L.mapbox.map('map', 'examples.map-9ijuk24y').setView([29.8608,30.7702], 7).addLayer(this.activeFeaturesNew);
		var miniMap = new L.Control.MiniMap(L.mapbox.tileLayer('examples.map-9ijuk24y'),{zoomLevelFixed: 4}).addTo(this.map);
	},
	render: function(filters){
		console.log('mapView rendering');
		var mapBounds = this.updateActiveFeatures(filters);
		console.log('mapbounds');
		console.log(mapBounds);
		console.log('mapBounds valid? ' + mapBounds.isValid());
		if (mapBounds.isValid() && filters.team !== 0) {this.map.fitBounds(mapBounds,{animate: true});}
	},
	addAll:function(pointModel){
		this.collection.each(this.addPoint, this);
	},
	addPoint: function(pointModel){
		//console.log('mapView addPoint called');
		pointModel.get('feature').addTo(this.map);
	},
	removeAll: function(){
		this.collection.each(this.removePoint, this);
	},
	removePoint: function(pointModel){
		this.map.removeLayer(pointModel.get('feature'));
	},
	updateActiveFeatures: function(filters){
		// determine enter, update, exit sets
		var requestedPoints = this.collection.filterPoints(filters);
		var requestedFeatures = _.map(requestedPoints,function(point){
			return point.attributes.feature;
		});
		var enter = _.difference(requestedFeatures,this.activeFeatures);
		var exit = _.difference(this.activeFeatures,requestedFeatures);

		this.activeFeatures = requestedFeatures;
		this.activePoints = requestedPoints;

		// remove exit set from map
		_.each(exit,this.removeLayer,this);
		// add enter set from map
		_.each(enter,this.addLayer,this);

		return this.activeFeaturesNew.getBounds();
	},
	addLayer: function(layer){
		this.activeFeaturesNew.addLayer(layer);
	},
	removeLayer: function(layer){
		this.activeFeaturesNew.removeLayer(layer);
	},
	mapHasLayer: function(pointModel){
		if(this.map.hasLayer(pointModel.get('feature'))){
			return pointModel.get('feature');
		}
	}
});