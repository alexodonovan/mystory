Ext.define('App.timeline.assets.image.StepOne', {
	extend: 'Ext.panel.Panel',
	
	requires: ['App.timeline.assets.image.Uploader', 'App.timeline.assets.image.FileDropZone', 'App.timeline.assets.image.ProgressBar'],
	
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
		this.progressBar = this.createProgressBar();
		
		return [this.uploadField, this.dropZone];
	},
	
	createDropZone: function(){
		var field = App.timeline.assets.image.FileDropZone.create();
		field.on('dropped', this.onImageDropped, this);
		field.on('dropped', this.showProgressBar, this);		
		field.on('dropped', this.doUpload, this);
		return field;
	},
	
	onImageDropped: function(files){		
		var reader = new FileReader();
		reader.onload = Ext.bind(this.showBackgroundImage, this);
		reader.readAsDataURL(files[0]);
	},
	
	showBackgroundImage: function(evt){
		var src = evt.target.result,		
			p = Ext.panel.Panel.create({
				tpl: '<img src={src}>',
				data: {src: src},
				cls: 'upload-preview',
				border: false			
			});		
		this.insert(0, p);
	},
	
	createProgressBar: function(){
		return Ext.ProgressBar.create({animate:true, width: 200});
//		var bar = App.timeline.assets.image.ProgressBar.create();
//		return bar;
	},
	
	showProgressBar: function(){
		this.dropZone.hide();			
		this.insert(0, this.progressBar);		
	},
	
	doUpload: function(files){
		this.uploadField.doUpload(files);
	},
	
	createUploadField: function(){
		var field = App.timeline.assets.image.Uploader.create();
		field.on('progress', this.onUploadProgress, this);
		this.relayEvents(field, ['uploaded']);
		return field;
	},
	
	onUploadProgress: function(val){
		this.progressBar.updateProgress(val);
	}
		
});