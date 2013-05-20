Ext.define('App.admin.EventWindow', {

	extend : 'Ext.window.Window',
	
	requires: ['App.timeline.assets.image.StepOne'],
	
	cls: 'event-window',
	
	modal: true,
	closable: false,
	header: false,
	border: false,
	frame: true,
	plain: true,
	draggable: false,
	resizable: false,
	padding: 40,
	
	defaults: {
		margin: 10
	},
			
	initComponent: function(){		
		
		this.items = this.buildItems();
		
		this.callParent(arguments);			
	},
	
	buildItems: function(){
		var title = Ext.form.field.Text.create({
			emptyText: 'Title',		
			cls: 'story-default-textfield',
			width: 300
		});
		
		var desc = Ext.form.field.TextArea.create({
			emptyText: 'Description',
			cls: 'story-default-input',
			width: 300
		});
		
		var date = Ext.form.field.Date.create({
			emptyText: 'Event Date.',
			cls: 'story-default-date-field',
			width: 350
		});
		
		var credit = Ext.form.field.Text.create({
			emptyText: 'Credit',
			cls: 'story-default-textfield',
			width: 300
		});
		
		var caption = Ext.form.field.Text.create({
			emptyText: 'Caption',
			cls: 'story-default-textfield',
			width: 300
		});
		
		var btns = this.createBtns();							
		return [title, desc, date, this.media, credit, caption, btns];
	}, 
	
	createCancelBtn: function(){
		var btn = Ext.button.Button.create({
			text: 'Cancel',			
			cls: 'story-default-btn',
			handler: this.onCancelClick,
			scope: this
		});		
		return btn;	
	},
	
	onCancelClick: function(){
		this.close();
		this.destroy();
	},
	
	createSaveBtn: function(){
		var btn = Ext.button.Button.create({
			text: 'Save',
			cls: 'story-save-btn',
			scale: 'medium'
		});
		
		return btn;
	},
	
	
	createBtns: function(){
		this.saveBtn = this.createSaveBtn();		
		this.cancelBtn = this.createCancelBtn();		
		
		return Ext.panel.Panel.create({
				border: false, 
				items: [this.saveBtn, this.cancelBtn],
				layout: {type:'hbox', align: 'middle'}
		});
		
	}
		
});