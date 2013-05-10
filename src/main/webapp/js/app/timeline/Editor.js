Ext.define('App.timeline.Editor', {

	extend : 'Ext.panel.Panel',
	
	requires: ['App.timeline.TitleDescription', 'App.timeline.MediaChoice'],
	
	cls: 'editor-container',
	
	border: false,
	
	layout: {
		type: 'hbox',
		align: 'stretch'
	},
		
	
	initComponent: function(){	
		this.items = this.buildItems();		
		this.callParent();		
	},
		
	initEvents: function(){		
		this.callParent();
	},
	
	
	buildItems: function(){
		this.choice = this.createMediaChoice();
		this.titlePanel = this.createTitlePanel();;
		
		return [this.choice, this.titlePanel];
	},		
	
	createMediaChoice: function(){
		var choice = App.timeline.MediaChoice.create({flex: 1});		
		choice.on('btn_click', this.onMediaChoice);
		return choice;				
	},
	
	onMediaChoice: function(type){
		var p = Ext.panel.Panel.create({
			html: 'this is a test'
		});
		this.remove(this.choice);
		this.add(p);		
	},
	
	createTitlePanel: function(){
		return App.timeline.TitleDescription.create({
			flex: 1,
			model: this.model
		});		
	}
	
	
	
	
	
});