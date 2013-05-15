Ext.define('App.timeline.assets.image.Model', {
	extend: 'App.timeline.assets.Media',		
	
	requires: ['App.timeline.assets.image.Image'],
	
	load: function(){
//		var config={callback: this.loadCallback,scope: this, action: 'read'},    	
//	    	request = new Ext.data.proxy.Rest({
////			    url: 'rest/timelines/images/1',
////	    		url: 'uploader',
//			    reader: 'json',
//			    model: 'App.timeline.assets.image.Image'
//			    
//			});    	    	    		
//		request.read(new Ext.data.Operation(config), config.callback, config.scope);				
	},
	
	
	loadCallback: function(operation){
		var obj = Ext.JSON.decode(operation.response.responseText),
			image = App.timeline.assets.image.Image.create(obj);		
		this.fireEvent('dataloaded', image);		
	}
		
});