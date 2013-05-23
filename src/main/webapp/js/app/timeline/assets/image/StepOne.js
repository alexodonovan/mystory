Ext.define('App.timeline.assets.image.StepOne', {
	extend: 'Ext.panel.Panel',
	
	requires: ['App.timeline.assets.image.Uploader', 
		'App.timeline.assets.image.FileDropZone',
		'App.timeline.assets.CreditCaption'],
	
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
		this.creditCaption = this.createCreditCaption();
		
		return [this.uploadField, this.dropZone];
	},
	
	createCreditCaption: function(){
		var fields = App.timeline.assets.CreditCaption.create({model: this.model, width: 600});				
		return fields;
	},
	
	createDropZone: function(){
		var field = App.timeline.assets.image.FileDropZone.create();					
		field.on('dropped', this.onImageDropped, this);			
		field.on('dropped', this.doUpload, this);
		return field;
	},
	
	onImageDropped: function(files){		
		var reader = new FileReader(),
			fn = Ext.Function.createSequence(this.showBackgroundImage, this.showProgressBar, this);			
		reader.onload = Ext.bind(fn, this);
		reader.readAsDataURL(files[0]);
	},
	
	showBackgroundImage: function(evt){
		var src = evt.target.result;		
		this.imageContainer = Ext.panel.Panel.create({
				tpl: '<img id="{id}" src={src}>',
				data: {src: src, id: 'image-preview'},
				cls: 'upload-preview',
				border: false			
		});		
		this.insert(0, this.imageContainer);
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
		this.progressBar.alignTo(this.getEl(), 'c?', [0, 0]);	
	},
	
	doUpload: function(files){
		this.uploadField.doUpload(files);
	},
	
	createUploadField: function(){
		var field = App.timeline.assets.image.Uploader.create();
		field.on('progress', this.onUploadProgress, this);			
		field.on('uploaded', Ext.Function.createDelayed(this.onUploaded, 500, this));
		this.relayEvents(field, ['uploaded']);
		return field;
	},	
	
	onUploaded: function(){
		this.makeImageOpaque();
		this.progressBar.hide();	
		this.showCropper();
	},
	
	showCropper: function(){				
		$('#image-preview').Jcrop({                                    
            setSelect:   [ 250, 250, 100, 100],
            maxSize: [647, 400]
        });
	},
	
	showCreditCaptionFields: function(){
		this.insert(this.items.length-1, this.creditCaption);
	},
	
	makeImageOpaque: function(){
		var el = Ext.get('image-preview');
		el.setStyle('opacity', 1);
	},
	
	onUploadProgress: function(val){
		this.progressBar.updateProgress(val);
	}
		
});