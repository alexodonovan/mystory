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
	},
	
	isValid: function(){		
		if (this.isBlank()) return false;
		if (!this.isValidWikiUrl()) return false;
		return true;
	},
	
	isValidWikiUrl: function(){		
		return Ext.String.startsWith(this.get('url'), this.baseWikiUrl);
	},
	
	isBlank: function(){
		return Ext.isEmpty(this.get('url'));
	},
		
	isNotValid: function(){
		return !this.isValid();
	},
	
	errors: function(){
		var errors = [];
		if (this.isBlank()) errors.push('This field is required.');
		if (!this.isValidWikiUrl()) errors.push('Must be a valid wikipedia url such as "http://en.wikipedia.org/wiki/FEXCO"');		
		return errors;		
	}
	
});