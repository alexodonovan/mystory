Ext.application({
    name: 'App',    
    appFolder: 'js/app',
    
    requires: ['App.maps.GoogleMap'],
     
    launch: function() {
    	this.renderMap();
    	
    },
    
    renderMap: function(){
    	var el = Ext.get('map-canvas');
    	if (!el) {
    		Ext.defer(this.renderMap, 200, this);
    		return;
    	}    	
    	App.maps.GoogleMap.create({renderTo: 'map-canvas', preview: false});    	
    }
});