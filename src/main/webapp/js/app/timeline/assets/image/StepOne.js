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
				tpl: '<img id="image-preview" src={src}>',
				data: {src: src},
				cls: 'upload-preview',
				border: false			
			});		
		this.insert(0, p);
		Ext.get('image-preview').fadeIn({opacity: 0.45, duration: 500});
	},
	
	createProgressBar: function(){
		return Ext.ProgressBar.create({
			animate:true, width: 200, height: 10, cls: 'progress-bar', 
			hidden: true, renderTo: Ext.getBody()
		});
	},
	
	showProgressBar: function(){
		this.dropZone.hide();
		this.progressBar.show();
		this.progressBar.alignTo(this.getEl(), 'c?', [-90, 0]);	
	},
	
	doUpload: function(files){
		this.uploadField.doUpload(files);
	},
	
	createUploadField: function(){
		var field = App.timeline.assets.image.Uploader.create();
		field.on('progress', this.onUploadProgress, this);
		field.on('uploaded', this.hideProgressBar, this);
		field.on('uploaded', this.onUploaded, this);
		this.relayEvents(field, ['uploaded']);
		return field;
	},
	
	hideProgressBar: function(){
		Ext.defer(this.progressBar.hide, 500, this.progressBar);
	},
	
	onUploaded: function(){
		var el = Ext.get('image-preview');
		Ext.defer(el.setStyle, 1000, el, ['opacity', 1]);
	},
	
	onUploadProgress: function(val){
		this.progressBar.updateProgress(val);
	}
		
});