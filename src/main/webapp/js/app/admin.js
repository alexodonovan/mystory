Ext.application({
    name: 'App',    
    appFolder: 'js/app',
    
    requires: ['App.maps.GoogleMap', 
    		'App.timeline.Loader',
    		'App.timeline.Editor'
    		],
     
    launch: function() {    	
    	var loader = App.timeline.Loader.fetch('breen');
    	loader.on('ready', this.loadEditor, this);    	    	   	    	    	     	    	    	    	   
    },
    
    loadEditor: function(timeline){
    	App.timeline.Editor.create({renderTo: 'timeline-container', timeline: timeline});
    }
    
});