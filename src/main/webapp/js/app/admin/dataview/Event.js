Ext.define('App.admin.dataview.Event', {

	extend : 'Ext.data.Model',
	requires: ['App.util.EventBus'],
	
	autoLoad: false,
		
	fields: [		
		{name: 'id'},
		{name: 'credit', mapping: 'credit', type:'string'},
		{name: 'caption', mapping: 'caption', type:'string'},
		{name: 'title', type:'string'},
		{name: 'description', type:'string'},
		{name: 'assetId'},
		{name: 'familyId'}
	],
	
	proxy: {
        type: 'rest',       
        url: 'rest/events',				
		appendId: false
    },
    
    create: function(){    	
    	this.save();
    },
    
    update: function(){    	
    	this.save('updateCallback', 'update');    
    },
    
    save: function(fnName, act){
    	debugger;
    	var callback = this.createCallback, action = 'create';    	
    	if (fnName) callback = this[fnName];
    	if (act) action = act; 
    	    	 
    	var	origFn = Ext.bind(callback, this),
    		newFn = Ext.Function.createInterceptor(origFn, this.checkCallbackArgs, this); 
    	this.callParent([{callback: newFn, action: action}]);    	
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