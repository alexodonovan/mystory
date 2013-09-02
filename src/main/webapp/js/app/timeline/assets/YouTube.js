Ext.define('App.timeline.assets.YouTube', {
	extend: 'Ext.panel.Panel',
	
	border: false,
	cls: 'credit-caption-container',
	layout: 'vbox',
	width: '90%',
	height: 75,
	padding: 10,
	
	
	initComponent: function(){
		this.items = this.buildItems();
		this.callParent();						
	},		
	
	initEvents: function(){
		this.callParent();		
	},
	
	buildItems: function(){
		this.youtube = this.createYoutubeField();

		
		var youtube = this.createLayoutPanel(this.youtube, 'right');
		
		return  [youtube];
	},	
	
	createLayoutPanel: function(field, align){			
		var p = Ext.panel.Panel.create({
			items: [field], 
			cls: field.cls + '-container',
			border: false,
			width: '100%',			
			layout: { type: 'vbox', align: align}			
		});
		
		return p;
	},
	
	createYoutubeField: function(){
		var field = Ext.form.field.Text.create({
			emptyText: 'Youtube',
			cls: 'youtube',
			width: 350
		});		
		field.on('blur', this.onFieldBlur, this);
		
		return field;
	},
	
	onFieldBlur: function(){
		this.model.set('youtube', this.caption.getValue());
	}	

	
});