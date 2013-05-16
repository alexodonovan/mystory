Ext.define('App.timeline.assets.image.FileDropZone', {
	extend : 'Ext.panel.Panel',
	
	border: false,
	
	layout: {
		type: 'hbox',
		align: 'stretch'
	},
	
	dragging: 0,
	
				
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
		
		dropBox.addEventListener("dragenter", Ext.bind(this.onDragEnter, this), false);
		dropBox.addEventListener("dragleave", Ext.bind(this.onDragLeave, this), false);
		dropBox.addEventListener("dragover", Ext.bind(this.onDragOver, this), false);
		dropBox.addEventListener("dragover", Ext.bind(this.noOperation, this), false);
		dropBox.addEventListener("drop", Ext.bind(this.onDrop, this), false);				
	},
	
	onDragOver: function(e) {	
	  return false;
	},
	
	noOperation: function(evt){
		evt.stopPropagation();
  		evt.preventDefault();
	},
	
	onDragEnter: function(){
		this.dragging++;
		this.dropZone.addClass('drop-zone-over');
	},
	
	onDragLeave: function(){
		this.dragging--;
		if (this.dragging === 0){
			this.dropZone.removeCls('drop-zone-over');
		}
		return false;
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
	
	createDropZoneTpl: function(){
		var html = 
		'<div class="drop-img"></div>'+
		'<div class="drop-msg">Drag photos here</div>';
		
		return  new Ext.XTemplate(html);
	},
	
	createDropZone: function(){
		var tpl = this.createDropZoneTpl();
		
		var p = Ext.panel.Panel.create({
			tpl: tpl,			
			data: {},
			cls: 'drop-zone',
			bodyCls: 'drop-body',
			width: 485,
			height: 300,
			border: false,
			layout: {
				type: 'vbox',
				align: 'stretch',
				pack: 'center'
			}
		});
		return p;
	}
	
	
        
});
