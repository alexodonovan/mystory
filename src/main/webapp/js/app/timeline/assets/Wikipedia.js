Ext.define('App.timeline.assets.Wikipedia', {
	extend: 'App.timeline.assets.Media',
	
	requires: ['App.timeline.assets.WikipediaExtract'],
			
	_steps: [],
	
	constructor: function(){
		this.callParent();		
		this._steps = this.createSteps();		
	},
	
	steps: function(){
		return this._steps;
	},
	
	
	createSteps: function(){
		var step1 = this.createStep1(),
			step2 = this.createStep2();
			
		return [step1, step2];
	},
	
	createStep1: function(){
		var url = Ext.form.field.Text.create({
			emptyText: 'Wikipedia URL'
		});
		
		var p = Ext.panel.Panel.create({
			layout: {
				type: 'vbox',
				align: 'center',
				pack: 'center'
			},
			border: false,
			items: [url],
			load: Ext.bind(this.loadWikiArticle, this)
		});
		
		return p;
	},
	
	loadWikiArticle: function(){
		//url in json data
		//"http://en.wikipedia.org/wiki/O%27Donovan_family"		
		var callbackKey = 'App.timeline.assets.Wikipedia.onDataLoad';		
		var url = 'http://en.wikipedia.org/w/api.php?action=query&prop=extracts&redirects=&titles=O%27Donovan%20family&exintro=1&format=json&callback='+callbackKey;		
		var proxy = new Ext.data.proxy.JsonP({
				url: url,
				callbackKey: callbackKey,
				reader: 'json'
		});	
		App.timeline.assets.Wikipedia.onDataLoad = Ext.bind(this.onDataLoad, this);		
		proxy.read(new Ext.data.Operation());
	},
	
	onDataLoad: function(data){
		var objName = Object.getOwnPropertyNames(data.query.pages)[0],
			obj = data.query.pages[objName];
				
		var el = document.createElement( 'div' );
		el.innerHTML = obj.extract;		
		obj.extract = el.firstElementChild.innerHTML;		
		obj.url = 'http://en.wikipedia.org/wiki/O%27Donovan_family';
		this.wikiViewer.update(obj);
		this.wikiViewer.setWidth(this.wikiViewer.up().getWidth() -60);		
	},
	
	createWikiViewer: function(){
		var template = 	'<div class="wikipedia">'+
							'<h4><a href="{url}" target="_blank">{title}</a></h4>'+
							'<span class="wiki-source">From Wikipedia, the free encyclopedia</span>'+
							'<p>{extract}</p>'+
						'</div>';
		
		var p = Ext.panel.Panel.create({
			tpl: template,
			cls: 'wiki-viewer',
			data: {
				extract: 'loading..'
			},
			border: false		
		});
		
		return p;
	},
	
	createStep2: function(){
		this.wikiViewer = this.createWikiViewer();
		
		var credit = Ext.form.field.Text.create({
			emptyText: 'Credit'
		});
		
		var caption = Ext.form.field.Text.create({
			emptyText: 'Caption'
		});
		
		var p = Ext.panel.Panel.create({
			layout: {
				type: 'vbox',
				align: 'center',
				pack: 'center'
			},
			border: false,
			items: [this.wikiViewer, credit, caption]
		});
		
		return p;
	}
	
	
});