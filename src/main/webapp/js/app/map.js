Ext.application({
    name: 'App',    
    appFolder: 'js/app',
    
    requires: ['App.maps.GoogleMap'],
     
    launch: function() {
    	App.maps.GoogleMap.create({renderTo: 'map-canvas'});
    }
});