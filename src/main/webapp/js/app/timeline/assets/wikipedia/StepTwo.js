Ext.define('App.timeline.assets.wikipedia.StepTwo', {
	extend: 'Ext.panel.Panel',
	
	requires: ['App.timeline.assets.CreditCaption'],
	
	border: false,
	cls: 'step-two',
	layout: {
		type: 'vbox',
		align: 'center',
		pack: 'center'
	},
					
	
	initComponent: function(){
		this.items = this.buildItems();
		this.callParent();						
	},		
	
	initEvents: function(){
		this.callParent();		
		this.addEvents('dataloaded');
	},
	
	buildItems: function(){	
		this.creditCaption = this.createCreditCaption();		
		this.wikiViewer = this.createWikiViewer();	
		return  [this.wikiViewer, this.creditCaption];
	},		
	
	createCreditCaption: function(){
		var container = App.timeline.assets.CreditCaption.create({model: this.model});
		return container;
	},	
	
	showData: function(data){
		var objName = Object.getOwnPropertyNames(data.query.pages)[0],
			obj = data.query.pages[objName],
			el = document.createElement( 'div' );
				
		el.innerHTML = obj.extract;		
		obj.extract = el.firstElementChild.innerHTML;		
		obj.url = this.model.get('url');
		this.wikiViewer.update(obj);
		this.wikiViewer.setWidth(this.wikiViewer.up().getWidth() -60);		
		this.fireEvent('dataloaded');		
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