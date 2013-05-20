Ext.define('App.admin.Editor', {

	extend : 'Ext.util.Observable',
	
	requires: ['App.admin.dataview.View', 'App.admin.dataview.Events'],
			
	constructor: function(cfg){		
		this.store = this.createStore();
		this.view = this.createView();		 				
		this.callParent(arguments);
	},
		
	initEvents: function(){
		this.callParent();				
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