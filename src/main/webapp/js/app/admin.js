Ext.application({
    name: 'App',    
    appFolder: 'js/app',
    
    requires: ['App.maps.GoogleMap', 
    		'App.timeline.Loader',
    		'App.timeline.Editor',
    		'App.timeline.SimpleModel'
    		],
     
    launch: function() {    	    	
    	App.timeline.SimpleModel.load('breen', {
    		callback: this.onModelLoaded, scope: this
    	});    	    	    	   	    	    	     	    	    	    	  
    },
    
    onModelLoaded: function(operation){
		var model = operation.getResultSet().records[0];
    	App.timeline.Editor.create({renderTo: 'timeline-container', model: model});
    }
    
});