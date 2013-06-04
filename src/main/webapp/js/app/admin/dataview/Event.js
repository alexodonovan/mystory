Ext.define('App.admin.dataview.Event', {

	extend : 'Ext.data.Model',
	requires: ['App.util.EventBus'],
	
	autoLoad: false,
		
	fields: [				
		{name: 'credit', mapping: 'credit', type:'string'},
		{name: 'caption', mapping: 'caption', type:'string'},
		{name: 'title', type:'string'},
		{name: 'description', type:'string'},
		{name: 'assetId'}
	],
	
	proxy: {
        type: 'rest',       
        url: 'rest/events',				
		appendId: false
    },    
    
    update: function(){
    	this.save('updateCallback');    
    },
    
    save: function(fnName){
    	var callback = this.createCallback;
    	if (fnName) callback = this[fnName];
    	    	 
    	var	origFn = Ext.bind(callback, this),
    		newFn = Ext.Function.createInterceptor(origFn, this.checkCallbackArgs, this); 
    	this.callParent([{callback: newFn}]);    	
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
    	App.util.EventBus.publish('App.admin.dataview.Event.created', this);    	
    }
						
});