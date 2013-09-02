Ext.application({
    name: 'App',    
    appFolder: 'js/app',
    
    requires: ['App.maps.GoogleMap', 
    		'App.timeline.Loader',
    		'App.timeline.Editor',
    		'App.timeline.SimpleModel',
    		'App.admin.Editor',
    		'App.util.Config'
    		],
     
    launch: function() { 
    	this.initTooltips();    	
    	var config = this.createConfigLoader();
    	config.load('readservice');    	    	    
//    	App.timeline.SimpleModel.load('breen', {
//    		callback: this.onModelLoaded, scope: this
//    	});    	    	    	   	    	    	     	    	    	    	  
    },
    
    onLoaded: function(){    	
    	App.admin.Editor.create();
    },
    
    createConfigLoader: function(){
    	var config = App.util.Config.create();
    	config.on('loaded', this.onLoaded);
    	return config;
    },
    
    initTooltips: function(){
    	//initialize tooltips and workaround bug fix.    	
    	Ext.QuickTips.init();
    	Ext.tip.Tip.prototype.minWidth = 'auto';    	
    },
    
    onModelLoaded: function(operation){
		var model = operation.getResultSet().records[0];		
		App.admin.Editor.create({renderTo: Ext.getBody(), model: model});		
//    	App.timeline.Editor.create({renderTo: 'timeline-container', model: model});
    }
    
});