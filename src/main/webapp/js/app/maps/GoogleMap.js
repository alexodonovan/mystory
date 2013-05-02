Ext.define('App.maps.GoogleMap', {

	extend : 'Ext.panel.Panel',
	
	requires: [ 'App.maps.Marker', 'App.maps.Markers', 'App.maps.Story'],
	
	cls: 'google-map-container',
	bodyCls: 'map-body',
	
	autoHeight: true,

	border : false,	
	
	mapOptions: {
		center : new google.maps.LatLng(53.2734, -7.77832031),
		zoom : 7,	
		draggable: true,
		mapTypeControlOptions: {
	      mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
	    },
		panControl : true,
		zoomControl : true,
		zoomControlOptions : {
			style : google.maps.ZoomControlStyle.LARGE
		},
		streetViewControl : false,
		mapTypeControl : false
	},

	initComponent : function() {
		this.html = '&nbsp';
		
		this.story = this.createStory();
		this.callParent();
	},	
	
	afterRender: function(){
		this.initialize();		
	},
	
	initEvents: function(){
		this.callParent(arguments);			
	},
	
	onMapsReady: function(){
		this.markers = this.createStore();
		this.markers.load({scope: this, callback: this.onStoreLoad});				
	},
	
	createStore: function(){
		var store = App.maps.Markers.create();					
		return store;				
	},	
	
	onStoreLoad: function(data){		
		this.markers.redraw(this.map);
		this.markers.anyOn('click', this.onMarkerClick, this);
	},	
	
	createMap: function(){					
		var map = new google.maps.Map(this.body.dom, this.mapOptions);
		//first load listener
		google.maps.event.addListenerOnce(map, 'idle', Ext.bind(this.onMapsReady, this));
		
		return map;
	},
	
	drawingOptions: function(){
		return {
			drawingMode : google.maps.drawing.OverlayType.MARKER,
			drawingControl : true,
			drawingControlOptions : {
				position : google.maps.ControlPosition.LEFT_TOP,
				drawingModes : [google.maps.drawing.OverlayType.MARKER]
			},			
			markerOptions: App.maps.Marker.options
		};
	},
	
	createDrawingManager: function(){						
		var drawingManager = new google.maps.drawing.DrawingManager(this.drawingOptions()),
			g = google.maps.event;
				
		g.addListener(drawingManager, 'markercomplete', Ext.bind(this.onMarkerSet, this));		
		return drawingManager;
	},
	
	onMarkerSet: function(marker){
		var model = this.createMarker(marker);
		model.save();
	},	
	
	createMarker: function(marker){
		var model = App.maps.Marker.createMarker(marker);	
		model.on('click', this.onMarkerClick, this);
		model.on('drag', this.onMarkerDrag, this);
		return model;
	},		
	
	createStory: function(){
		var story = App.maps.Story.create();
		return story;
	},	
	
	onMarkerClick: function(model, arg, marker){
		this.story.close();
		this.story.update(model, this.map, marker);
		this.story.show();									
	},
	
	onMarkerDrag: function(model){
		//    	var point = new Ext.util.Point(evt.pixel.x, evt.pixel.y);
//    	point.isContainedBy()
//		console.log(mouseEvent);
	},
	
	createStyleMap: function(){
		var styles = this.getStyles();		  	
		var styledMap = new google.maps.StyledMapType(styles,{name: "Styled Map"});		 		 
		return styledMap;		  	
	},	
	
	getStyles: function(){
		var styles = [{
		    "featureType": "road",
		    "stylers": [{ "visibility": "off" }]
		  },{
		    "featureType": "water",
		    "stylers":
		      [{ "visibility": "on" },
		      { "color": "#809494" }]
		  },{
		    "featureType": "administrative.country",
		    "stylers": [{ "visibility": "off" }]
		  },{
		    "featureType": "landscape.natural",
		    "stylers": [{ "visibility": "on" }]
		  }];
		return styles;
	},

	initialize : function() {	
		this.map = this.createMap(),
			drawingManager = this.createDrawingManager(),
			styleMap = this.createStyleMap();
			
		this.map.mapTypes.set( 'map_style', styleMap);
		this.map.setMapTypeId('map_style');
		
		drawingManager.setMap(this.map);
	}

});