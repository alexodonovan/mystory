Ext.define('App.timeline.assets.youtube.Model', {
	extend: 'App.timeline.assets.YouTube',		
	
	requires: ['App.timeline.assets.youtube.StepOne'],
	
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
			youtube = App.timeline.assets.youtube.Youtube.create(obj);		
		this.fireEvent('dataloaded', youtube);		
	},
	
	isValid: function(){
		
	},
	
	
	save: function(){
		alert('saving preview..');
	}
		
});
