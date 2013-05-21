Ext.application({
    name: 'App',    
    appFolder: 'js/app',
    
    requires: ['App.maps.GoogleMap', 
    		'App.timeline.Loader',
    		'App.timeline.Editor',
    		'App.timeline.SimpleModel',
    		'App.admin.Editor'
    		],
     
    launch: function() {   
    	//initialize tooltips and workaround bug fix.
    	Ext.QuickTips.init();
    	Ext.tip.Tip.prototype.minWidth = 'auto';    	
    	App.admin.Editor.create();    	    	
//    	App.timeline.SimpleModel.load('breen', {
//    		callback: this.onModelLoaded, scope: this
//    	});    	    	    	   	    	    	     	    	    	    	  
    },
    
    onModelLoaded: function(operation){
		var model = operation.getResultSet().records[0];		
		App.admin.Editor.create({renderTo: Ext.getBody(), model: model});		
//    	App.timeline.Editor.create({renderTo: 'timeline-container', model: model});
    }
    
});