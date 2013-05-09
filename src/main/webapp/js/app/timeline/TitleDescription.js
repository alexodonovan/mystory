Ext.define('App.timeline.TitleDescription', {

	extend : 'Ext.panel.Panel',
	
	cls: 'title-desc',	
	border: false,	
	layout: 'form',	
	
	initComponent: function(){
		this.items = this.buildItems();		
		this.callParent();		
	},
	
	initEvents: function(){		
		this.callParent();
	},
	
	
	buildItems: function(){
		var title = this.createTitleField(),		
			desc = this.createDescField();
		
		return [title, desc];
	},		
	
	
	createDescField: function(){
		var desc = Ext.form.field.HtmlEditor.create({
			emptyText: 'Description',			
			cls: 'desc-field',
			value: this.timeline.text,
			enableColors: false,
//			enableFont: false,
			enableFontSize: false,
			enableAlignments: false
		});
		
		return desc;
	},
	
	createTitleField: function(){
		var title = Ext.form.field.Text.create({
			emptyText: 'Title',
			cls: 'title-field',
			value: this.timeline.headline			
		});
		
		return title;
	}
	
});