Ext.application({
    name: 'App',    
    appFolder: 'js/app',
    
    requires: ['App.maps.GoogleMap'],
     
    launch: function() {
    	this.createTimeline();
    	this.renderMap();    	    	
    },
           
    createTimeline: function(json){    		
    	var config = {
			width : "98%",
			height : "98%",
			source : 'rest/timeline/somesearchstring/data.jsonp'
//			source : 'example_jsonp.jsonp'
		};				
		createStoryJS(config);
    },
    
    renderMap: function(){
    	var el = Ext.get('map-canvas');
    	if (!el) {
    		Ext.defer(this.renderMap, 200, this);
    		return;
    	}    	
    	App.maps.GoogleMap.create({renderTo: 'map-canvas', preview:true});    	    
    }
    
    
});