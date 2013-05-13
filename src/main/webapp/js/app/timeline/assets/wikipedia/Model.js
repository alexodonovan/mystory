Ext.define('App.timeline.assets.wikipedia.Model', {
	extend: 'App.timeline.assets.Media',
	
	baseWikiUrl: 'http://en.wikipedia.org/wiki/',
	callbackKey: 'App.timeline.assets.wikipedia.Model.onDataLoaded',
	
	requires: ['App.timeline.assets.wikipedia.StepOne',
		'App.timeline.assets.wikipedia.StepTwo'],
			
	_steps: [],
					
	constructor: function(){
		this.callParent();							
	},	
	
	load: function(){
		App.timeline.assets.wikipedia.Model.onDataLoaded = Ext.bind(this.onDataLoaded, this);
		var proxy = this.createProxy();				
		proxy.read(new Ext.data.Operation());		
	},
	
	createProxy: function(){
		var title = this.articleTitle(this.baseWikiUrl);
		return new Ext.data.proxy.JsonP({
				url: this.wikiApi(title),
				callbackKey: this.callbackKey,
				reader: 'json'
		});	
	}, 
	
	wikiApi: function(title){
		var url = 'http://en.wikipedia.org/w/api.php?action=query&prop=extracts&redirects=&titles=' +
					title +
					'&exintro=1&format=json' +
					'&callback='+this.callbackKey;
		return url;			
	},
	
	onDataLoaded: function(data){
		this.fireEvent('dataloaded', data);		
	},
	
	articleTitle: function(sub){
		return this.get('url').replace(sub, '');
	}
	
});