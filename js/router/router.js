var app = app || {};

app.Router = Backbone.Router.extend({
	initialize: function(){
		_.bindAll(this, 'slideEvent', 'slideStopEvent','daySelect','teamSelect');
		console.log('router initialized');
		this.days = {};
		this.observerPoints = new app.ObsPoints;

		this.observerPoints.on('sync',this.initializeMapView, this);
		this.observerPoints.fetch({
			success: function(){
				console.log('fetch success!');

			},
			error: function(collection, response, options){
				console.log('fetch error!');
				//console.log(response.responseText);
			}
		});
		var start = moment("2014-01-14T07:00:00");
		this.timeStep = [start];
		for (var i = 0; i < 67; i++){
			this.timeStep.push(moment(this.timeStep[i]).add('minutes',15));
		}
		$('#startTime').html('<strong>' + this.timeStep[0].format('h:mm A') + '</strong>');
		$('#stopTime').html('<strong>' + this.timeStep[this.timeStep.length-1].format('h:mm A') + '</strong>');
		$('#timeDisplay h1').html('<strong>' + this.timeStep[this.timeStep.length-1].format('h:mm A') + '</strong>');

	},
// 	routes: {

// 	},
// 	index: function(){
// 		
// 	},
	initializeMapView: function(){
		this.mapView = new app.MapView({collection:this.observerPoints});
		$('#timeslider').slider({
			min:0,
			max:this.timeStep.length-1,
			value:this.timeStep.length-1,
			slide:this.slideEvent,
			stop: this.slideStopEvent,
			create: this.slideStopEvent
		});
		var $teamDropdown = $('#team-dropdown');
		var teams = this.observerPoints.getTeams();
		_.each(teams,function(team){
			var $teamSelect = $('<li><div class="radio"><label><input type="radio" name="teamOptions" value=' + team + '>Team ' + team + ' - ' + getLocation(team) + '</label></div></li>');
			//var $teamSelect = $('<li><a href="#" data-team='+ team + '>Team '+ team + ' - ' + getLocation(team) + '</a></li>');
			$teamSelect.appendTo($teamDropdown);
		});
		$('#day-toggle input').click(function(){
			$(this).parent().toggleClass('active');
		});
		$('#day-toggle input').change(this.daySelect);
		$('#team-dropdown input[type="radio"]').change(this.teamSelect);
	},
	slideEvent: function(event,ui){
		$('#timeDisplay h1').html('<strong>' + this.timeStep[ui.value].format('h:mm A') + '</strong>');
	},
	slideStopEvent: function(event,ui){
		console.log(this);
		console.log(event);
		console.log(ui);
		console.log('slideStop value');
		console.log(this.timeStep);
		console.log($('#timeslider').slider('value'));
		this.updateMap(); 
		
	},
	daySelect: function(event){
		console.log('button clicked!');
		console.log($(event.target));
		this.updateMap();
	},
	teamSelect: function(event){
		console.log('team selected!');
		console.log(event);
		console.log('Team ' + $(event.target).val());
		this.updateMap();
	},
	collectFilters: function(){
		// maybe boost performance by allowing arguments with filters? 
		return filters = {
			time: this.timeStep[$('#timeslider').slider('value')],
			days: {
				day1: $('#day1-button').prop('checked'),
				day2: $('#day2-button').prop('checked'),
			},
			team: parseInt($("#team-dropdown input:radio[name=teamOptions]:checked").val())
		};
	},
	updateMap: function(){
		this.mapView.render(this.collectFilters());
		var currentReports = this.mapView.activePoints.length;
		console.log('currentReports: ' + currentReports);
		console.log(this.mapView.activePoints);
		console.log(this.mapView.activeFeatures);
		$('#timeDisplay h2').html('Reports: <strong>' + currentReports + '</strong>');
	}
});

var router = new app.Router();
Backbone.history.start();