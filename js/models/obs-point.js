var app = app || {};

app.ObserverPoint = Backbone.Model.extend({
	initialize: function(){
		var latLng = [this.get('_GPS_latitude'),this.get('_GPS_longitude')];
		var date = this.get('date_clean');
		var startTime = moment(this.get('start_no_zone'));
		var endTime = moment(this.get('end_no_zone'));
		var popupContent = '<h2><strong><em>#' + this.get('_index') + '</em></strong></h2><div><strong>Start:</strong> ' + startTime.format('h:mm A, MMM, Do') + '</div><div><strong>Team:</strong> DI-' + this.get('team_num') + '</div><div><strong>Location: </strong>' + getLocation(this.get('team_num')) + '</div>';

		this.set('feature',L.circleMarker(latLng,{radius:5}).bindPopup(popupContent).setStyle({
			color:this.getColor(date),
			fillColor:this.getColor(date)
		}));
		this.set('start_time',startTime);
		this.set('end_time',endTime);
		this.set('submission_time',moment(this.get('_submission_time')));
	},
	getColor: function(date){
		switch (date){
			case '1/14/2014':
				return "#03f";
				break;
			case '1/15/2014':
				return "#f00";
				break; 
			default:
				console.log('color match error');
				console.log(date);
				return '#fff';
		}
	},
	getLocation: function(teamNum){
		switch (teamNum){
			case 1 : return 'Suhaj';
			case 2 : return 'Quena';
			case 3 : return 'Minya';
			case 4 : return 'Ghurdaqah';
			case 5 : return 'Aswan';
			case 6 : return 'Damietta';
			case 7 : return 'Assiut';
			case 8 : return 'Assiut';
			case 9 : return 'Luxor';
			case 11 : return 'Sharm El Shiekh';
			case 12 : return 'Banha';
			case 13 : return 'Shibin Al Kawm';
			case 14 : return 'Beni Suef';
			case 15 : return 'Zagazig';
			case 16 : return 'Fayyum';
			case 17 : return 'Tanta';
			case 18 : return 'Tanta';
			case 19 : return 'Suez';
			case 20 : return 'Suez';
			case 22 : return 'Qafr El Sheikh';
			case 23 : return 'Damanhur';
			case 24 : return 'Mansura';
			case 25 : return 'Mansura';
			case 26 : return 'Port Said';
			case 27 : return 'Port Said';
			case 28 : return 'Alexandria';
			case 29 : return 'Alexandria';
			case 30 : return 'Alexandria';
			case 31 : return 'Alexandria';
			case 32 : return 'Giza';
			case 33 : return 'Giza';
			case 34 : return 'Giza';
			case 35 : return 'Cairo';
			case 36 : return 'Cairo';
			case 37 : return 'Cairo';
			case 38 : return 'Cairo';
			case 39 : return 'Cairo';
			case 40 : return 'Cairo';
			case 41 : return 'Cairo';
			case 42 : return 'Cairo';
			case 43 : return 'Cairo';
			case 44 : return 'Cairo';
			default : return 'Error - Team Not Found';
		}
	}
});