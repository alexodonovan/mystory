Ext.define('App.admin.EventWindow', {

	extend : 'Ext.window.Window',
	
	requires: ['App.timeline.assets.image.StepOne', 'App.util.EventBus'],
	
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
	
	initEvents: function(){
		this.callParent(arguments);
		
		App.util.EventBus.subscribe('App.admin.dataview.Event.created', this.onEventCreated, this);
		this.media.on('uploaded', this.onUploaded, this);
		
		this.on('show', this.onWindowShow, this);
	},
	
	createTitleField: function(){
		var title = Ext.form.field.Text.create({
			emptyText: 'Title',		
			cls: 'story-default-textfield',
			width: 300,
			name: 'title'
		});
		
		return title;
	},
	
	createDescField: function(){
		var desc = Ext.form.field.TextArea.create({
			emptyText: 'Description',
			cls: 'story-default-input',
			width: 300			
		});
		return desc;
		
	},
	
	createCreditField: function(){
		var credit = Ext.form.field.Text.create({
			emptyText: 'Credit',
			cls: 'story-default-textfield',
			width: 300
		});
		return credit;		
	},
	
	createCaptionField: function(){
		var caption = Ext.form.field.Text.create({
			emptyText: 'Caption',
			cls: 'story-default-textfield',
			width: 300
		});
		
		return caption;
	},
	
	buildItems: function(){
		this.title = this.createTitleField();
		this.desc = this.createDescField();
		this.credit = this.createCreditField();
		this.caption = this.createCaptionField();
				
		var date = Ext.form.field.Date.create({
			emptyText: 'Event Date.',
			cls: 'story-default-date-field',
			width: 350
		});
		
		
		
		
		var btns = this.createBtns();							
		return [this.title, this.desc, date, this.media, this.credit, this.caption, btns];
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
			scale: 'medium',
			handler: this.onSaveClick, 
			scope: this			
		});
		
		return btn;
	},
	
	onSaveClick: function(){
		var event = App.admin.dataview.Event.create(this.dataObj());
		event.on('created', this.onCreated, this);
		event.save();
	},
	
	onEventCreated: function(){		
		this.close();
		this.destroy();		
	},
	
	dataObj: function(){
		var data = {};
		data.title = this.title.getValue();
		data.description = this.desc.getValue();
		data.caption = this.caption.getValue();
		data.credit = this.credit.getValue();		
		data.assetId = this.assetId;		
		debugger;
		data.familyId = this.family.get('id');
		return data;
	},
	
	
	createBtns: function(){
		this.saveBtn = this.createSaveBtn();		
		this.cancelBtn = this.createCancelBtn();		
		
		return Ext.panel.Panel.create({
				border: false, 
				items: [this.saveBtn, this.cancelBtn],
				layout: {type:'hbox', align: 'middle'}
		});
		
	},
	
	onUploaded: function(assetId){
		this.assetId = assetId;
	},
	
	updateFields: function(model){
		this.title.setValue(model.get('title'));
		this.desc.setValue(model.get('description'));
		this.credit.setValue(model.get('credit'));
		this.caption.setValue(model.get('caption'));
	},
	
	onWindowShow: function(){
		this.media.afterWindowShow();
	}
		
});