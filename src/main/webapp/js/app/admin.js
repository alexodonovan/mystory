Ext.application({
    name: 'App',    
    appFolder: 'js/app',
    
    requires: ['App.maps.GoogleMap', 'App.timeline.Loader'],
     
    launch: function() {
    	var gm = App.maps.GoogleMap;
    	
    	this.timeline = this.createTimeline();    	    	    	 
    	gm.waitForReadyThen(gm.createAdmin);
    	    	    	
    	
    },
           
    createTimeline: function(json){
    	var loader = App.timeline.Loader.init();
    	loader.on('ready', this.onTimelineLoaded, this);
    	    		
    },
    
    onTimelineLoaded: function(loader){
    	this.createEditor();    	
    },
    
    createEditor: function(){
    	
    }
    
    
});