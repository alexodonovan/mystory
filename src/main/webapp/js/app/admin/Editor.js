Ext.define('App.admin.Editor', {

	extend : 'Ext.util.Observable',
	
	requires: ['App.admin.dataview.View', 
		'App.admin.dataview.Events',
		'App.admin.EventWindow',
		'App.admin.search.SearchBox',
		'App.admin.editor.OptionsWindow'],
			
	constructor: function(cfg){		
		this.store = this.createStore();
		this.view = this.createView();
		
		this.tb1 = this.createToolbar1();
		this.tb2 = this.createToolbar2();
		this.tb3 = this.createToolbar3();
		
		this.optionsWindow = this.createOptionsWindow();		
		this.layoutContainer = this.createLayoutContainer();
		
		this.callParent(arguments);
		
		this.initEvents();
	},
		
	initEvents: function(){	
		this.view.on('editclicked', this.showEditWindow, this);
		this.view.on('closeclicked', this.onCloseClicked, this);
    },   
    
    onCloseClicked: function(rec){
    	this.store.remove(rec);
    	this.view.refresh();
    },
    
    showEventWindow: function(comp){
    	var win = this.createEventWindow();
    	win.show();
    	
    },
    
    showEditWindow: function(rec){
    	var win = this.createEventWindow();
    	win.show();    	
    },
    
    createEventWindow: function(){
    	var win = App.admin.EventWindow.create({
    		media: App.timeline.assets.image.StepOne.create()    		
    	});
    	return win;
    },
    
    createStore: function(){
    	return App.admin.dataview.Events.create();
    },
    
    
    createLayoutContainer: function(){    	    	
    	var p = Ext.container.Container.create({
    		items: [this.tb1, this.tb2, this.tb3, this.view],
    		border: false,
    		renderTo: 'timeline-container'
    	});
    	
    	return p;
    },
           
     createToolbar1: function(){
    	var tb = Ext.toolbar.Toolbar.create({    		
    		border: false,
    		cls: 'top-toolbar-1',
    		height: 15
    	});
    	
    	return tb;
    },
    
    createPublishBtn: function(){
    	var btn = Ext.button.Button.create({
    		text	: 'Publish', 
    		scale	: 'large', 
    		cls		: 'story-red-btn',
    		handler	: this.onPublishClick,
    		scope	: this    		
    	});
    	return btn;
    },
    
    onPublishClick: function(){
    	
    },
    
    createPreviewBtn: function(){
    	var btn = Ext.button.Button.create({
    		text	: 'Preview', 
    		scale	: 'medium', 
    		cls		: 'story-blue-btn',
    		handler	: this.onPreviewClick,
    		scope	: this    		
    	});
    	return btn;
    },
    
    onPreviewClick: function(){
    	document.location = 'preview.html';
    },
    
    createToolbar2: function(){
     	var search = App.admin.search.SearchBox.create(),
     		preview = this.createPreviewBtn(),
     		publish = this.createPublishBtn();     		
    	var tb = Ext.toolbar.Toolbar.create({
    		items: [' ',search, '->', preview, publish ],
    		border: false,
    		cls: 'top-toolbar-2',
    		height: 70
    	});
    	
    	return tb;
    },
    
    createAddBtn: function(){
    	var btn = Ext.button.Button.create({
    		text: 'Add', scale: 'medium', cls: 'story-save-btn', 
    		handler: this.onAddClick, scope: this});
    		
    	return btn;
    },
    
    onAddClick: function(){
    	if (this.optionsWindow.isVisible()) return;
    	this.optionsWindow.animShow(this.addBtn);    	
    },
    
    createOptionsWindow: function(){
    	var options = App.admin.editor.OptionsWindow.create();
    	options.on('choosen', this.showEventWindow, this);
    	return options;
    },
    
    createToolbar3: function(){
    	this.addBtn = this.createAddBtn();
    	
    	var tb = Ext.toolbar.Toolbar.create({
    		items: ['  ',  this.addBtn],
    		border: false,
    		cls: 'top-toolbar-3'
    	});
    	
    	return tb;
    },
    
	createView: function(){			
		var view = App.admin.dataview.View.create({store: this.store});			
		return view;		
	}	
	
});