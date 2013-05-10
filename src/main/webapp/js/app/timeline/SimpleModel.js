Ext.define('App.timeline.SimpleModel', {
		
	extend: 'Ext.data.Model',		
	requires: ['App.timeline.Family'],
	
	fields: ['data', 'id', 'version', 'family_Id'],
	
	autoLoad: false,
	
	statics: {
		load: function(surname, config){									
			var proxy = new Ext.data.proxy.JsonP({
				url: storify_read_service.url(surname) + 'jsonpp',
				reader: 'json',
				writer: 'json',
				model: 'App.timeline.SimpleModel'				
			});
			
			proxy.read(new Ext.data.Operation(config), config.callback, config.scope);								
		}
	
	},
	
	 proxy: {
        type: 'rest',       
        url: 'rest/timelines',				
		appendId: false
    },
	
	associations: [{
		type: 'hasOne',
		model: 'App.timeline.Family',
		associationKey: 'family',
		name: 'family',
		getterName: 'getFamily',
        setterName: 'setFamily' 		
	}],
	
	save: function(fnName){
    	var callback = this.createCallback;
    	if (fnName) callback = this[fnName];
    	    	 
    	var	origFn = Ext.bind(callback, this),
    		newFn = Ext.Function.createInterceptor(origFn, this.checkCallbackArgs, this); 
    	this.callParent([{callback: newFn}]);    	
    },
    
	update: function(){
    	this.save('updateCallback');    
    },
    
    checkCallbackArgs: function(record, operation){
    	if (!operation.success) throw new Error('Operation failed:' + operation.error.status+':'+operation.error.statusText);
    	if (!record) throw new Error('operation failed');
    },
    
    updateCallback: function(record, operation){
		this.set('version', record.get('version')+1);
    },
    
    createCallback: function(record, operation){
    	this.set('id', record.get('id'));
    },
	
	jsonData: function(){
		return JSON.parse(this.get('data'));
	},
	
	timeline: function(){
		return this.jsonData().timeline;
	},
	
	headline: function(){
		return this.timeline().headline;
	},
	
	text: function(){
		return this.timeline().text;
	},
	
	updateTitle: function(title){
		var obj = this.jsonData();
		obj.timeline.headline = title;
		this.set('data', JSON.stringify(obj));
		return this;
	}
	
});