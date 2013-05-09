Ext.define('App.timeline.Editor', {

	extend : 'Ext.panel.Panel',
	
	requires: ['App.timeline.TitleDescription'],
	
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
		var upload = this.createImageUpload(),
			title = this.createTitlePanel();;
		
		return [upload, title];
	},		
	
	createImageUpload: function(){
		var p = Ext.panel.Panel.create({
			html: 'image upload here',
			flex: 1,
			border: false		
		});
		
		return p;
	},
	
	createTitlePanel: function(){
		return App.timeline.TitleDescription.create({
			flex: 1,
			model: this.model
		});		
	}
	
	
	
	
	
});