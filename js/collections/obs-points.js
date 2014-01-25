var app = app || {};

app.ObsPoints = Backbone.Collection.extend({
	model: app.ObserverPoint,
	url: 'js/data/obs-final-data.json',
	filterByDate: function(filterMoment){
		//console.log('filter Zone: ' + filterMoment.zone());
		var filterStartTime = filterMoment.hours() + filterMoment.minutes()/60;
		//console.log('filterStartTime: ' + filterStartTime);
		var pointsStartingBefore = this.filter(function(point){
			var pointStart = point.get('start_time');
			
			var pointStartTime = pointStart.hours() + pointStart.minutes()/60;
			// if(pointStartTime < filterStartTime){
			// 	console.log('pointStartTime: ' + pointStartTime);
			// 	console.log('point Zone: ' + pointStart.zone());
			// 	console.log(point);
			// }

			return pointStartTime < filterStartTime;

			// console.log('filterMoment: ' + filterMoment.date());
			// console.log('modifiedMoment: ' + modifiedMoment.date());
			// console.log(point.get('start_time').date());
			// if(dateNum === 14){
			// 	return point.get('start_time').isBefore(filterMoment);
			// }
			// else if(dateNum === 15){
			// 	return point.get('start_time').isBefore(modifiedMoment);
			// }

			//return point.get('start_time').isBefore(filterMoment);
		});
		//console.log("pointsStartingBefore.length: " + pointsStartingBefore.length);
		console.log(pointsStartingBefore);
		return pointsStartingBefore;
	},
	getTeams: function(){
		return _.chain(this.pluck('team_num')).uniq().compact().sortBy(function(num){return parseInt(num)}).value();
	}
});
