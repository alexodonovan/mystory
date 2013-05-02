Ext.define('App.maps.Story', {
	extend: 'Ext.util.Observable',
	
	constructor: function(config){
		config = config || {};		
		Ext.apply(this, config);
		
		this.window = this.createWindow();
		this.callParent(config);
	},
	
	createWindow: function(){				
			var g = google.maps.event,
			window = new google.maps.InfoWindow({
			    content: this.content()			    
			});
			
		g.addListener(window, 'domready', Ext.bind(this.onInfoWindowShow, this));
		return window;
	},
	
	content: function(){
		var	content = '<textarea id="info-window-input" class="info-window-popup"></textarea>';
		return content;
	},
	
	show: function(){		
		this.window.open(this.map, this.marker);		
	},
	
	close: function(){
		this.window.close();
	},
	
	
	onInfoWindowShow: function(model, marker){		
		this.textarea().on('blur', this.onWindowBlur, this);
		this.textarea().updateValue();
	},
	
	textarea: function(){
		var el = Ext.get('info-window-input');
		el.updateValue = Ext.bind(this.updateValue, this);
		return el;
	},
	
	updateValue: function(){
		this.textarea().dom.value = this.model.get('narrative');
	},
	
	onWindowBlur: function(evt, t, eOpts){
		this.model.updateNarrative(t.value);		
		this.model.save();		
	},
	
	update: function(model, map, marker){
		this.model = model;
		this.map = map;
		this.marker = marker;		
	}
	
});