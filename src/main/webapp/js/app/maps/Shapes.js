Ext.define('App.maps.Shapes', {
	extend: 'Ext.data.Store',	
	
	model: 'App.maps.Shape',
	
	autoLoad: false,
	
	constructor: function(){
		this.callParent(arguments);
		
		this.addEvents('redrawn');
	},
	
	redraw: function(map){
		this.each(function(shape){
			shape.draw(map);
		}, this);
		this.fireEvent('redrawn', this);
	},
	
	attachListeners: function(config, scope){
		Ext.Object.each(config, function(evt, fn, me){			
			this.attachListenerToAll(evt, fn, scope);
		}, this);			
	},	
	
	attachListenerToAll: function(evt, fn, scope){
		this.each(function(shape){
			shape.onMapEvent(evt, fn, scope);
		}, this);
	}
		
});