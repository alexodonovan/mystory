Ext.define('App.timeline.assets.wikipedia.StepTwo', {
	extend: 'Ext.panel.Panel',
	
	border: false,
	layout: {
		type: 'vbox',
		align: 'center',
		pack: 'center'
	},
					
	
	initComponent: function(){
		this.items = this.buildItems();
		
		this.callParent();				
	},		
	
	buildItems: function(){
		this.wikiViewer = this.createWikiViewer();
		
		var credit = Ext.form.field.Text.create({
			emptyText: 'Credit'
		});
		
		var caption = Ext.form.field.Text.create({
			emptyText: 'Caption'
		});	
		
		return  [this.wikiViewer, credit, caption];
	},		
	
	showData: function(data){
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
	}
	
	
});