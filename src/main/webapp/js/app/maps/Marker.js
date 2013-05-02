Ext.define('App.maps.Marker', {
	extend: 'Ext.data.Model',
	
	fields: [
		{name: 'id'},
		{name: 'lat', type: 'float'},
		{name: 'lng', type: 'float'},
		{name: 'narrative'},
		{name: 'version', type: 'int', defaultValue: 0}
	],	
	
	statics: {
		options: {
			clickable : true,
			draggable : true,
			zIndex: 1
		},
		
		createMarker: function(marker){
			var model = App.maps.Marker.create({					
					lat: marker.getPosition().lat(),
					lng: marker.getPosition().lng()					
			});
			model.marker = marker;
			model.initEvents();
			return model;
		}
	},	
	
	proxy: {
        type: 'rest',
        url : 'rest/markers',
        appendId: false
    },
            
    initEvents: function(){
    	//dragend: when the marker is moved
    	this.wrapEvents('dragend', 'click', 'drag', 'rightclick');
    	this.on('dragend', this.onDragEnd, this);
    	this.on('rightclick', this.onRightClick, this);
//    	this.on('drag', this.onDrag, this);
    },  
    
    onRightClick: function(){
    	Ext.Msg.show({
		     title:'Remove Marker?',
		     msg: 'You are about to remove this marker and any associated narrative. Would you like to continue?',
		     buttons: Ext.Msg.YESNO,
		     icon: Ext.Msg.QUESTION,
		     fn: function(){
				this.marker.setMap(null);
    			this.doDelete();     
		     },
		     scope: this
		});
    	
    },
    
    wrapEvents: function(){
    	Ext.each(arguments, function(evt) {
    		this.wrapEvent(evt);    		
    	}, this);
    },
    
    wrapEvent: function(evt){
    	this.addEvents(evt);
    	
    	var fireEvent = Ext.bind(function(arg){ 
    	    this.fireEvent(evt, this, arg, this.marker); 
    	}, this); 
    	google.maps.event.addListener(this.marker, evt, fireEvent);    	
    },
    
    onDrag: function(model, evt){    	
//    	var point = new Ext.util.Point(evt.pixel.x, evt.pixel.y);
//    	point.isContainedBy()
//		console.log(mouseEvent);    	
    },
    
    onDragEnd: function(model, mouseEvent){
    	this.update(mouseEvent.latLng);
    	this.save('updateCallback');    
    },       
    
    doDelete: function(){
    	var config={callback: this.deleteCallback,scope: this, action: 'destroy'};    	
    	request = new Ext.data.proxy.Rest({
		    url: 'rest/markers/'+this.get('id'),
		    format: 'json',
		    model: 'App.maps.Marker'
		});    	    	    		
		request.destroy(new Ext.data.Operation(config), config.callback, config.scope);				
    },
    
    deleteCallback: function(){
    	alert('done');
    },
    
    save: function(fnName){
    	var callback = this.createCallback;
    	if (fnName) callback = this[fnName];
    	    	 
    	var	origFn = Ext.bind(callback, this),
    		newFn = Ext.Function.createInterceptor(origFn, this.checkCallbackArgs, this); 
    	this.callParent([{callback: newFn}]);    	
    },
    
    checkCallbackArgs: function(record, operation){
    	if (!operation.success) throw new Error('Operation failed:' + operation.error.status+':'+operation.error.statusText);
    	if (!record) throw new Error('operation failed');
    },
    
    updateCallback: function(record, operation){
		this.set('version', record.get('version')+1);
    },
    
    createCallback: function(record, operation){
    	this.set('id', record.get('id'));
    },
			
	update: function(latLng){		
		this.set('lat', latLng.lat());
		this.set('lng', latLng.lng());		
	},	
	
	updateNarrative: function(value){
		this.set('narrative', value);	
	},
	
	draw: function(map){			
		if (!map) throw new Error('map not initialized');
		var options = Ext.apply(App.maps.Marker.options, {
			position: new google.maps.LatLng(this.get('lat'), this.get('lng')),    		
    		map: map    		
		});					
		this.marker = new google.maps.Marker(options);				
	},
	
	onMapEvent: function(evt, fn, scope){
		google.maps.event.addListener(this.marker, evt, Ext.bind(fn, scope, [this.marker, this], false));
	}
	
	
	
});