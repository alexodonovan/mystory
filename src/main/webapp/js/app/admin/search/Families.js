Ext.define('App.admin.search.Families', {

	extend	: 'Ext.data.Store',	
	
	model: 'App.admin.search.Family',
	autoLoad: false,
	id: 'familiesStore',
	pageSize: 8,   	
   	autoLoad: false,
	
	constructor: function(){
		this.callParent(arguments);	
	},
	
	load: function(options){				
		var config = {callback: this.loadCallback, scope: this},		
			url = window.readService.url + '/search.jsonp/' + options.params.query,
			proxy = new Ext.data.proxy.JsonP({
				url: url, model: this.model,
				reader: 'json', writer: 'json'
			});
			
		proxy.read(new Ext.data.Operation(config), config.callback, config.scope);			
	},
	
	loadCallback: function(request){
		this.loadData(request.response.families);
	}

			
});