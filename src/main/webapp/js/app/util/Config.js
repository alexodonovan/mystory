Ext.define('App.util.Config', {
	
	extend: 'Ext.util.Observable',
	
	load: function(service){		
		Ext.Ajax.request({
		    url: 'rest/config/' +service+'.json',		    
		    success: Ext.bind(this.onLoadSuccess, this)
		});
	},
	
	onLoadSuccess: function(response, request){		
		var config = Ext.JSON.decode(response.responseText);
		window.readService = config;
		this.fireEvent('loaded', config);
	}

	
});	