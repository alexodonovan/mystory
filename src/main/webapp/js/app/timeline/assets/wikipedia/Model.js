Ext.define('App.timeline.assets.wikipedia.Model', {
	extend: 'App.timeline.assets.Media',
	
	baseWikiUrl: 'http://en.wikipedia.org/wiki/',
	callbackKey: 'App.timeline.assets.wikipedia.Model.onDataLoaded',
	
	requires: ['App.timeline.assets.wikipedia.StepOne',
		'App.timeline.assets.wikipedia.StepTwo'],
			
	_steps: [],
					
	constructor: function(){
		this.callParent();		
				
		this._steps = this.createSteps();		
	},	
	
	load: function(){
		App.timeline.assets.wikipedia.Model.onDataLoaded = Ext.bind(this.onDataLoaded, this);
		var proxy = this.createProxy();				
		proxy.read(new Ext.data.Operation());		
	},
	
	createProxy: function(){
		var title = this.step1.articleTitle(this.baseWikiUrl);
		return new Ext.data.proxy.JsonP({
				url: this.url(title),
				callbackKey: this.callbackKey,
				reader: 'json'
		});	
	}, 
	
	url: function(title){
		var url = 'http://en.wikipedia.org/w/api.php?action=query&prop=extracts&redirects=&titles=' +
					title +
					'&exintro=1&format=json' +
					'&callback='+this.callbackKey;
		return url;			
	},
	
	onDataLoaded: function(data){
		this.step2.showData(data);
	},
	
	steps: function(){
		return this._steps;
	},	
	
	createSteps: function(){
		this.step1 = this.createStepOne();
		this.step2 = this.createStepTwo();
			
		return [this.step1, this.step2];
	},
	
	createStepOne: function(){
		var view = App.timeline.assets.wikipedia.StepOne.create();
		return view;		
	},
	
	createStepTwo: function(){
		var view = App.timeline.assets.wikipedia.StepTwo.create();
		return view;		
	},	
	
	onDataLoad: function(data){
		this.step2.showData(data);			
	}
	
});