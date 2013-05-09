Ext.define('App.timeline.Loader', {

	extend : 'Ext.util.Observable',
	
	requires: ['App.timeline.SimpleModel'],
	
	statics: {
		
		init: function(){
			var loader = App.timeline.Loader.create();
			loader.createStoryJS();
			loader.pollForReady();
			return loader;
		},
		
		fetch: function(surname){
			var loader = App.timeline.Loader.create();
			loader.createFetchRequest(surname)
					.execute();			
			return loader;
		}
	
	},
	
	constructor: function(){
		this.callParent();			
	},
	
	initEvents: function(){
		this.addEvents('ready');
		this.callParent();
	},
	
	pollForReady: function(){				
		if(window['VMM'] == undefined)  {
			Ext.defer(this.pollForReady, 200, this);
			return;
		}		
		this.fireEvent('ready', this);				
	},	
	
	createStoryJS: function(){
		if (!storify_read_service) alert('configuration not loaded!!');			
		var config = {
			width : "98%",
			height : "98%",
			debug : true,
			source : storify_read_service.url('breen') + 'jsonp'
		};		
		createStoryJS(config);		
	},
	
	createFetchRequest: function(surname){
		var me = this, 
			operation = new Ext.data.Operation({
				action: 'read', 
				callback: this.loadCallback, 
				scope: this}),		
			proxy = new Ext.data.proxy.JsonP({
				url: storify_read_service.url(surname) + 'jsonpp',
				reader: 'json',
				model: 'App.timeline.SimpleModel'
				
			}),
			request = {
				execute: function(){								
					proxy.read(operation, Ext.bind(me.loadCallback, me));
				}
			};			
			return request;
	},	
	
	loadCallback: function(operation){
		var timeline = operation.response.timeline;
		this.fireEvent('ready', timeline);
	}	
	
	
});