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
		this.titleField = this.createTitleField();		
		this.desc = this.createDescField();
		this.btn = this.createSaveBtn();
		
		return [this.titleField, this.desc, this.btn];
	},			
	
	createSaveBtn: function(){
		var btn = Ext.button.Button.create({
			text:'Save',
			handler: this.onSaveClick,
			scope: this
		});
		return btn;
	},
	
	onSaveClick: function(){
		alert('saved');
	},
	
	createDescField: function(){
		var desc = Ext.form.field.HtmlEditor.create({
			emptyText: 'Description',			
			cls: 'desc-field',
			value: this.model.text(),
			enableColors: false,
//			enableFont: false, //bug in extjs4.2
			enableFontSize: false,
			enableAlignments: false
		});		
		
		return desc;
	},
	
	onEditorChange: function(){
		alert('editor change');
	},
	
	onTitleBlur: function(){
		var title = this.titleField.getValue();		
		this.model.updateTitle(title)
			.save();		
	},
	
	createTitleField: function(){		
		
		var title = Ext.form.field.Text.create({
			emptyText: 'Title',
			cls: 'title-field',
			value: this.model.headline()			
		});
		title.on('blur', this.onTitleBlur, this);
		
		return title;
	}
	
});