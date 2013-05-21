Ext.define('App.admin.Editor', {

	extend : 'Ext.util.Observable',
	
	requires: ['App.admin.dataview.View', 
		'App.admin.dataview.Events',
		'App.admin.EventWindow'],
			
	constructor: function(cfg){		
		this.store = this.createStore();
		this.view = this.createView();
		
		this.tb1 = this.createToolbar1();
		this.tb2 = this.createToolbar2();
		this.tb3 = this.createToolbar3();
		
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
    
    showEventWindow: function(){
    	var win = this.createEditWindow();
    	win.show();
    	
    },
    
    showEditWindow: function(rec){
    	var win = this.createEditWindow();
    	win.show();    	
    },
    
    createEditWindow: function(){
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
    
     createToolbar2: function(){
     	var search = Ext.form.field.Text.create({
     		cls: 'story-default-textfield',
     		emptyText: 'Search by surname',
     		width: 350
     	});
     	
    	var tb = Ext.toolbar.Toolbar.create({
    		items: [' ',search, '->', {text: 'Preview', scale: 'large', cls: 'story-blue-btn'}],
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
    	this.showEventWindow();
    },
    
    createToolbar3: function(){
    	var addBtn = this.createAddBtn();
    	
    	var tb = Ext.toolbar.Toolbar.create({
    		items: ['  ',  addBtn],
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