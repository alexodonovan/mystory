Ext.define('App.maps.Story', {
	extend: 'Ext.util.Observable',
	
	requires: ['App.util.PlainWindow'],
	
	constructor: function(config){
		config = config || {};		
		Ext.apply(this, config);
		
		this.window = this.createWindow();
		this.callParent(config);
		
		this.addEvents('next_click');
	},
	
	createWindow: function(){				
		var g = google.maps.event,
			window = new google.maps.InfoWindow({
			    content: this.content(),
			    maxWidth: 350
			});
			
		g.addListener(window, 'domready', Ext.bind(this.onInfoWindowDomReady, this));
		g.addListener(window, 'content_changed', Ext.bind(this.onContentChanged, this));
		return window;
	},
	
	content: function(value){
		if (!value) value='';
		if (this.preview) return this.previewContent(value);
		return '<textarea id="info-window-input" class="info-window-popup">'+value+'</textarea>';		
	},
	
	previewContent: function(value){
		if (!this.model) return;
		var id = this.model.get('id'),
			content = 
				'<div id="info-window-input" class="info-window-popup">'+value+'</div>' +
				'<br/>' +
				'<div>' +
					'<a id="next-btn-'+id+'" class="next-btn">Next</a>' +
					'<span class="zoom-btn" id="zoom-btn-'+id+'">' +
							//'<span class="btn-text">Zoom</span>' +
							'<span id="icon-'+id+'" class="icon">&nbsp;</span>' +
							
					'</span>' +
				'</div>';
				
		return content;
	},
	
	show: function(){			
		this.window.open(this.map, this.marker);
		this.updateValue();		
	},
	
	close: function(){
		this.window.close();
	},
	
	
	onInfoWindowDomReady: function(model, marker){	
		if (this.preview) return;
		this.textarea().on('blur', this.onWindowBlur, this);		
	},
	
	textarea: function(){
		var el = Ext.get('info-window-input');
		el.resize = Ext.bind(this.resize, this, [el]);
		return el;
	},
	
	resize: function(el){
		el.setSize(450, 450);
	},
	
	updateValue: function(){
		this.window.setContent(this.content(this.model.get('narrative')));		
	},
	
	onWindowBlur: function(evt, t, eOpts){
		this.model.updateNarrative(t.value);		
		this.model.update();		
	},
	
	update: function(model, map, marker){
		this.model = model;
		this.map = map;
		this.marker = marker;		
	},
	
	onContentChanged: function(){
		if (!this.preview) return;
		
		var nextBtn = Ext.get('next-btn-'+this.model.get('id'));
		nextBtn.on('click', this.onNextClick, this);
		
		var zoomBtn = Ext.get('zoom-btn-'+this.model.get('id'));
		zoomBtn.on('click', this.onZoomClick, this);
	},
	
	onNextClick: function(){
		this.close();
		this.fireEvent('next_click');
	},
	
	onZoomClick: function(){		
		var icon = Ext.get('icon-'+this.model.get('id'));
		var scale = Math.pow(2, this.map.getZoom());
		var nw = new google.maps.LatLng(
		    this.map.getBounds().getNorthEast().lat(),
		    this.map.getBounds().getSouthWest().lng()
		);
		var worldCoordinateNW = this.map.getProjection().fromLatLngToPoint(nw);
		var worldCoordinate = this.map.getProjection().fromLatLngToPoint(this.marker.getPosition());
		var pixelOffset = new google.maps.Point(
		    Math.floor((worldCoordinate.x - worldCoordinateNW.x) * scale),
		    Math.floor((worldCoordinate.y - worldCoordinateNW.y) * scale)
		);
		
		
		var growFrom = {width: icon.getWidth(), height: icon.getHeight()}, 
			growTo = {width: 250, height: 250, x: pixelOffset.x, y: pixelOffset.y + 150},
			shrinkTo = {width: 0, height: 0, x: pixelOffset.x+200, y: pixelOffset.y + 50};
			
		var fn = Ext.Function.createDelayed(this.onAnimationComplete, 50, this); 
				
		Ext.get('fly-by')	//Tower, this is Ghost Rider requesting a flyby.
				.alignTo(icon, 'tl')
				.setStyle('display','block') //Negative, Ghost Rider, the pattern is full.
				.sequenceFx() 	// No. No, Mav, this is not a good idea.
					.animate({from: growFrom, to: growTo, easing: 'backOut', duration: 600}) //Sorry, Goose, but it's time to buzz the tower.
					.animate({from: growTo, to: shrinkTo, easing: 'backIn', duration: 350, callback: fn});	// WWWOooOOOOOSSSSSHHHHHH
					//Tower: Got damnit Maverick.
		
	},
	
	onAnimationComplete: function(){
		var lat = this.model.get('lat'), lng = this.model.get('lng'),
			street = new google.maps.LatLng(lat, lng),
			sv = new google.maps.StreetViewService(),
			panorama;
			
		var panoOptions = {
		  position: street,
		  addressControlOptions: {
		    position: google.maps.ControlPosition.BOTTOM
		  },
		  linksControl: true,
		  panControl: true,
		  zoomControlOptions: {
		    style: google.maps.ZoomControlStyle.SMALL
		  },
		  enableCloseButton: true,
		  visible:true
		};
		panorama = new google.maps.StreetViewPanorama(document.getElementById("map-canvas"), panoOptions);
		
		sv.getPanoramaByLocation(street, 50, function(data, status ){
			if (status != google.maps.StreetViewStatus.OK) return;
			 var markerPanoID = data.location.pano;
	      	// Set the Pano to use the passed panoID
	      	panorama.setPano(markerPanoID);
	      	panorama.setPov({
	        	heading: 90,
	        	pitch: 0
	      	});	      	
		});
	}
	
});