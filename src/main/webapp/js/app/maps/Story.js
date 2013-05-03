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
			    content: this.content(),
			    maxWidth: 450
			});
			
		g.addListener(window, 'domready', Ext.bind(this.onInfoWindowDomReady, this));
		return window;
	},
	
	content: function(value){
		if (!value) value='';
		if (this.preview) return '<div id="info-window-input" class="info-window-popup">'+value+'</div>';
		return '<textarea id="info-window-input" class="info-window-popup">'+value+'</textarea>';		
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
	}
	
});