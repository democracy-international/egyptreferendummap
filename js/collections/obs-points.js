var app = app || {};

app.ObsPoints = Backbone.Collection.extend({
	model: app.ObserverPoint,
	url: 'js/data/obs-final-data.json',
	filterPoints: function(filters){
		var filteredCollection = this.filterByTeam(this,filters.team);
		filteredCollection = this.filterByDay(filteredCollection,filters.days);
		filteredCollection = this.filterByTime(filteredCollection,filters.time);
		return filteredCollection.models;
	},
	filterByTime: function(collection, filterMoment){
		var filterStartTime = filterMoment.hours() + filterMoment.minutes()/60;
		return new Backbone.Collection(collection.filter(function(point){
			var pointStart = point.get('start_time'),
				pointStartTime = pointStart.hours() + pointStart.minutes()/60;
			return pointStartTime < filterStartTime;
		}));
	},
	filterByTeam: function(collection,teamNum){
		return teamNum === 0 ? collection : new Backbone.Collection(collection.filter(function(point){return point.get('team_num') === teamNum}));
	},
	filterByDay: function(collection,days){
		if(!days.day1 && !days.day2){
			console.log('both days off');
			var empty = [];
			return new Backbone.Collection(empty);
		}
		else if(days.day1 && days.day2){
			console.log('both days on');
			return collection;
		}
		else if(days.day1){
			console.log('day1 on, day 2 off');
			return new Backbone.Collection(collection.filter(function(point){return point.get('date_clean') === '1/14/2014'}));
		}
		else{
			console.log('day1 off, day 2 on');
			return new Backbone.Collection(collection.filter(function(point){return point.get('date_clean') === '1/15/2014'}));
		}
	},
	getTeams: function(){
		return _.chain(this.pluck('team_num')).uniq().compact().sortBy(function(num){return parseInt(num)}).value();
	}
});
