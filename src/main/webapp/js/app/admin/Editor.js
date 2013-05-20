Ext.define('App.admin.Editor', {

	extend : 'Ext.util.Observable',
	
	requires: ['App.admin.dataview.View', 
		'App.admin.dataview.Events',
		'App.admin.EventWindow'],
			
	constructor: function(cfg){		
		this.store = this.createStore();
		this.view = this.createView();	
						
		this.callParent(arguments);
		
		this.initEvents();
	},
		
	initEvents: function(){	
		this.view.on('editclicked', this.showEditWindow, this);
    },   
    
    showEditWindow: function(rec){
    	var win = App.admin.EventWindow.create({
    		media: App.timeline.assets.image.StepOne.create()    		
    	});
    	win.show();    	
    },
    
    createEditWindow: function(){
    	
    },
    
    createStore: function(){
    	return App.admin.dataview.Events.create();
    },
	
	createView: function(){			
		var view = App.admin.dataview.View.create({
			flex: 1, 
			renderTo: 'timeline-container',
			store: this.store
			
		});
			
		return [view];		
	}	
	
});