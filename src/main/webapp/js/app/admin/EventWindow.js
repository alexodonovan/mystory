Ext.define('App.admin.EventWindow', {

	extend : 'Ext.window.Window',
	
	requires: ['App.timeline.assets.image.StepOne', 'App.util.EventBus', 'App.timeline.assets.youtube.StepOne' ],
	
	cls: 'event-window',
	
	modal : true,
	closable : false,
	header : false,
	border : false,
	frame : true,
	minHeight: 550,
	minWidth: 500,
	shadow: 'frame',
	shadowOffset: 35,
	plain : true,             
	  y: 30,
	autoScroll: true,
	draggable : false,
	resizable : false,
	resizeHandles : 'n',
	padding : 40,

	
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
		App.util.EventBus.subscribe('App.admin.dataview.Event.updated', this.onEventUpdated, this);
		this.media.on('uploaded', this.onUploaded, this);
		
		this.on('show', this.onWindowShow, this);
	},
	
	onEventUpdated: function(){
		this.close();		
	},
	
	createTitleField: function(){
		var title = Ext.form.field.Text.create({
			fieldLabel: 'Title',
			emptyText: 'Title',		
			cls: 'story-default-textfield',
			width: 500,
			name: 'title',
			allowBlank : false,
	        blankText : 'Please find in Title'
		});
		
		return title;
	},
	
	createDescField: function(){
		var desc = Ext.form.field.TextArea.create({
			fieldLabel: 'Description',
			emptyText: 'Description',
			cls: 'story-default-input',
			width: 500,
			allowBlank : false,
	        blankText : 'Please find in Description'
		});
		return desc;
		
	},
	
	createCreditField: function(){
		var credit = Ext.form.field.Text.create({
			fieldLabel: 'Credit',
			emptyText: 'Credit',
			cls: 'story-default-textfield',
			width: 500
		});
		return credit;		
	},
	
	createCaptionField: function(){
		var caption = Ext.form.field.Text.create({
			fieldLabel: 'Caption',
			emptyText: 'Caption',
			cls: 'story-default-textfield',
			width: 500
		});
		
		return caption;
	},
	
	buildItems: function(){
		this.title = this.createTitleField();
		this.desc = this.createDescField();
		this.credit = this.createCreditField();
		this.caption = this.createCaptionField();
		
		this.date = this.createDateField();
							
		var btns = this.createBtns();							
		return [this.title, this.desc, this.date, this.media, this.credit, this.caption, btns];
	},
	
	createDateField: function(){
		var field = Ext.form.field.Date.create({
			fieldLabel: 'Event Date',
			emptyText: 'Event Date.',
			cls: 'story-default-date-field',
			width: 500,
			allowBlank : false,
	        blankText : 'Please select date of Event',
	        maxValue: new Date()
		});
		
		return field;
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
		if (!this.date.isValid()) return;
		if (!this.title.isValid()) return;
		if (!this.desc.isValid()) return;
		
		var event = this._model();		
		event.on('created', this.onCreated, this);
		event.on('updated', this.onUpdated, this);		
		var fn = (event.get('id')) ? 'update': 'create';
		event[fn]();
	},
	
	_model: function(){		
		var event = this.model || App.admin.dataview.Event.create();		
		event.set('title', this.title.getValue());		 
		event.set('description', this.desc.getValue());
		event.set('caption', this.caption.getValue());
		event.set('credit', this.credit.getValue());		
		event.set('assetId', this.assetId);			
		event.set('familyId', this.family.get('id'));
		if(this.media.url){
			event.set('url', this.media.url.getValue());
		}
		event.set('date', this.date.getValue());
		return event;
	},
	
	onEventCreated: function(){		
		this.close();
		this.destroy();		
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
		this.assetId = model.get('assetId');
		if(model.get('url')){
			this.media.url.setValue(model.get('url'));
		}
		this.date.setValue(model.get('date'));
	},
	
	onWindowShow: function(){
		this.media.afterWindowShow();
	}
		
});

