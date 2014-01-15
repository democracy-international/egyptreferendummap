var app = app || {};

app.ObsPoints = Backbone.Collection.extend({
	model: app.ObserverPoint,
	url: 'js/data/obs-day1-data.json'
});
