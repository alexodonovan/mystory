Ext.define('App.timeline.assets.image.StepOne', {
	extend: 'Ext.panel.Panel',
	
	requires: ['App.timeline.assets.image.Uploader', 'App.timeline.assets.image.FileDropZone'],
	
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
	
	initEvents: function(){
		this.callParent();	
	},
	
		
	buildItems: function(){
		this.uploadField = this.createUploadField();
		this.dropZone = this.createDropZone();
		
		return [this.uploadField, this.dropZone];
	},
	
	createDropZone: function(){
		var field = App.timeline.assets.image.FileDropZone.create();
		field.on('dropped', this.doUpload, this);
		return field;
	},
	
	doUpload: function(files){
		this.uploadField.doUpload(files);
	},
	
	createUploadField: function(){
		var field = App.timeline.assets.image.Uploader.create();
		this.relayEvents(field, ['uploaded']);
		return field;
	}		
		
});