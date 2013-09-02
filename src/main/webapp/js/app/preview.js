Ext.application({
    name: 'App',    
    appFolder: 'js/app',
    
    requires: ['App.maps.GoogleMap', 'App.util.Config'],
     
    launch: function() {  	
    	var config = this.createConfigLoader();
    	config.load('readservice');

    	var gm = App.maps.GoogleMap;
    	gm.waitForReadyThen(gm.createPreview);
    },
    
    onLoaded: function(config){
    	var params = this.parseUrl(), url;
    	if (Ext.isEmpty(params)) return;    	
    	
    	url = 'rest/timelines/'+ params.q + '/data.jsonp';
//    	live site will use something like the following - preview should use previous
//    	url = config.url + '/timelines/'+ params.q + '/data.jsonp';    	
    	this.createTimeline(url);    	
    },
    
    parseUrl: function(){
    	var queryString = window.location.search;
    	if (!Ext.isEmpty(queryString)) return Ext.Object.fromQueryString(queryString);
    	
		Ext.MessageBox.alert('Error', 'Unknown family name');
		return false;
    },
   
    createConfigLoader: function(){
    	var config = App.util.Config.create();
    	config.on('loaded', this.onLoaded, this);
    	return config;
    },             
           
    createTimeline: function(url){
		createStoryJS({width: "98%", height: "98%", source: url});
    }      
});
