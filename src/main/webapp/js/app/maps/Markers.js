Ext.define('App.maps.Markers', {
	extend: 'Ext.data.Store',	
	
	model: 'App.maps.Marker',
	
	autoLoad: false,
	
	constructor: function(){
		this.callParent(arguments);
		
		this.addEvents('redrawn');
	},
	
	redraw: function(map){
		this.each(function(marker){
			marker.draw(map);
			marker.initEvents();
		}, this);
		this.fireEvent('redrawn', this);		
	},	
	
	attachListeners: function(config, scope){
		Ext.Object.each(config, function(evt, fn, me){			
			this.attachListenerToAll(evt, fn, scope);
		}, this);			
	},	
	
	wrapEvent: function(evt){
		this.each(function(marker){
			marker.wrapEvent(evt);	
		}, this);
	},
	
	attachListenerToAll: function(evt, fn, scope){
		this.each(function(marker){			
			shape.onMapEvent(evt, fn, scope);
		}, this);
	},
	
	anyOn: function(evt, fn, scope){			
		this.each(function(marker){			
			marker.on(evt, fn, scope);
		}, this);
	}
		
});