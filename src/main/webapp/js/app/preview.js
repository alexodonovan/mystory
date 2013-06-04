Ext.application({
    name: 'App',    
    appFolder: 'js/app',
    
    requires: ['App.maps.GoogleMap'],
     
    launch: function() {
//    	this.loadConfig()
//    		.then();

    	this.createTimeline();
    	
    	var gm = App.maps.GoogleMap;
    	gm.waitForReadyThen(gm.createPreview);
    },
    
    loadConfig: function(){
    	
    },
           
    createTimeline: function(json){
    	
    	
    	var config = {
			width : "98%",
			height : "98%",
			source : 'http://localhost:8081//storify-read-service/timelines/breen/data.jsonp'
		};				
		createStoryJS(config);
    }      
    
    
});