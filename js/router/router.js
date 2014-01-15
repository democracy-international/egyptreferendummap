var app = app || {};

app.Router = Backbone.Router.extend({
	initialize: function(){
		console.log('router initialized');
		var collection = new app.ObsPoints;

		//collection.on('sync',this.initializeHomeView, this);
		collection.fetch({
			success: function(){
				console.log('fetch success!');
			},
			error: function(collection, response, options){
				console.log('fetch error!');
				console.log(response.responseText);
			}
		});

	},
// 	routes: {
// 		'survey/:id':'survey',
// 		'survey1':'survey1',
// 		'survey2':'survey2',
// 		'survey3':'survey3',
// 		'main-findings':'mainFindings',
// 		'about':'about',
// 		'data':'data',
// 		'' : 'index' 
// 	},
// 	index: function(){
// 		//  initialize header-view or expand and update if it already exists, remove chart-section-view, map-section-view, and methodology-section-view if they exist
// 		console.log("Index route");
// 		this.headerView = new app.HeaderView;
// 		console.log(this.headerView);
// 		this.homeContent = new app.HomeContent;
// 		this.homeContent.on('sync',this.initializeHomeView, this);
// 		this.homeContent.fetch({
// 			success: function(){
// 				console.log('homeContent fetch success!');
// 			},
// 			error: function(){
// 				console.log('homeContent fetch error!');
// 			}
// 		});
// 		this.chartContent = new app.SurveyContent;
// 		this.chartContent.on('sync',this.initializeChartSectionView, this);
// 		this.chartContent.fetch({
// 			success: function(){
// 				console.log('chartContent fetch success!');
// 			},
// 			error: function(){
// 				console.log('chartContent fetch error!');
// 			}
// 		});
// 	},
// 	initializeHomeView: function(){
// 		this.homeView = new app.HomeView({collection: this.homeContent});
// 	},
// 	initializeChartSectionView: function(){
// 		this.chartView = new app.ChartView({collection: this.chartContent});
// 	},
// 	initializeMapSectionView: function(){

// 	},
// 	initializeMethodologySectionView: function(){

// 	},
// 	initializeAboutView: function(){

// 	},
// 	initializeDataView: function(){

// 	}
});

var router = new app.Router();
Backbone.history.start();