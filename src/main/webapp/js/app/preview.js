Ext.application({
    name: 'App',    
    appFolder: 'js/app',
    
    requires: ['App.maps.GoogleMap'],
     
    launch: function() {
    	this.createTimeline();
    	var gm = App.maps.GoogleMap;
    	gm.waitForReadyThen(gm.createPreview);
    },
           
    createTimeline: function(json){    		
    	var config = {
			width : "98%",
			height : "98%",
			source : 'http://localhost:8081/storify-read-service/timelines/breen/data.jsonp'
		};				
		createStoryJS(config);
    }      
    
    
});