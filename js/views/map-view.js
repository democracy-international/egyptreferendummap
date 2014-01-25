var app = app || {};

app.MapView = Backbone.View.extend({
	el: '#map',
	initialize: function(){
		console.log('mapView initializing');
		this.activeFeatures = [];
		this.render();
	},
	render: function(){
		console.log('mapView rendering');
		this.map = L.mapbox.map('map', 'examples.map-9ijuk24y').setView([29.8608,30.7702], 7);
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
	updateActiveFeatures: function(moment){
		// determine enter, update, exit sets
		var pointsStartingBefore = this.collection.filterByDate(moment); // pluck feature
		var requestedFeatures = _.map(pointsStartingBefore,function(point){
			return point.attributes.feature;
		});
		var enter = _.difference(requestedFeatures,this.activeFeatures);
		var exit = _.difference(this.activeFeatures,requestedFeatures);

		this.activeFeatures = requestedFeatures;
		
		// remove exit set from map
		_.each(exit,this.removeLayer,this);
		// add enter set from map
		_.each(enter,this.addLayer,this);
	},
	addLayer: function(layer){
		this.map.addLayer(layer);
	},
	removeLayer: function(layer){
		this.map.removeLayer(layer);
	},
	mapHasLayer: function(pointModel){
		if(this.map.hasLayer(pointModel.get('feature'))){
			return pointModel.get('feature');
		}
	}
});