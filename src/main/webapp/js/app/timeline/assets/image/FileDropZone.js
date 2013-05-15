Ext.define('App.timeline.assets.image.FileDropZone', {
	extend : 'Ext.panel.Panel',
	
	layout: {
		type: 'hbox',
		align: 'stretch'
	},
				
	initComponent: function(){	
		this.items = this.buildItems();
		this.callParent();			
	},	
	
	initEvents: function(){
		this.callParent();
		
		this.addEvents('dropped');
	},
	
	afterRender: function(){
		this.callParent();
		
		this.attachDropListeners();
	},
	
	attachDropListeners: function(){		
		var dropBox = this.dropZone.getEl().dom;
		if (!dropBox){
			Ext.defer(this.attachDropListeners, 50, this);
			return;
		}
		
		dropBox.addEventListener("dragenter", Ext.bind(this.noOperation, this), false);
		dropBox.addEventListener("dragexit", Ext.bind(this.noOperation, this), false);
		dropBox.addEventListener("dragover", Ext.bind(this.noOperation, this), false);
		dropBox.addEventListener("drop", Ext.bind(this.onDrop, this), false);				
	},
	
	noOperation: function(evt){
		evt.stopPropagation();
  		evt.preventDefault();
	},
		
	onDrop: function(evt){
		this.noOperation(evt);		
		var files = evt.dataTransfer.files;					
		if (files.length > 0) this.doFileUpload(files);		
	},	
	
	doFileUpload: function(files){
		this.fireEvent('dropped', files);
	},
	
	
	buildItems: function(){
		this.dropZone = this.createDropZone();
		return [this.dropZone];
	},
	
	createDropZone: function(){
		var p = Ext.panel.Panel.create({
			html: 'Drop Zone',
			width: 300,
			height: 300			
		});
		return p;
	}
	
	
        
});
