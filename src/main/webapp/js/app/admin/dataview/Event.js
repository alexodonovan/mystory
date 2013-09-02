Ext.define('App.admin.dataview.Event', {

	extend : 'Ext.data.Model',
	requires: ['App.util.EventBus'],
	
	autoLoad: false,
		
	fields: [		
		{name: 'id'},
//		{name: 'credit', mapping: 'credit', type:'string'},If the path expression is the same as the field name, the mapping may be omitted
//		{name: 'caption', mapping: 'caption', type:'string'},If the path expression is the same as the field name, the mapping may be omitted
		{name: 'credit', type:'string'},
		{name: 'caption', type:'string'},
		{name: 'date', type:'date', dateReadFormat: 'time', dateWriteFormat: 'm/d/y'},
		{name: 'title', type:'string'},
		{name: 'description', type:'string'},
		{name: 'assetId'},
		{name: 'url', type:'string'},
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
    	var callback = this.createCallback, action = 'create';    	
    	if (fnName) callback = this[fnName];
    	if (act) action = act; 
    	    	 
    	var	origFn = Ext.bind(callback, this),
    		newFn = Ext.Function.createInterceptor(origFn, this.checkCallbackArgs, this); 
    	this.callParent([{callback: newFn, action: action}]);    	
    },
    
/*    destroy: function(){
    	this.set('familyId', this.family.get('id'));
    	this.callParent(arguments);
    },*/
    
    checkCallbackArgs: function(record, operation){
    	if (!operation.success) throw new Error('Operation failed:' + operation.error.status+':'+operation.error.statusText);
    	if (!record) throw new Error('operation failed');
    },
    
    updateCallback: function(record, operation){
		this.set('version', record.get('version')+1);
		App.util.EventBus.publish('App.admin.dataview.Event.updated', this);
    },
    
    createCallback: function(record, operation){
    	this.set('id', record.get('id'));
    	App.util.EventBus.publish('App.admin.dataview.Event.created', this);    	
    }
						
});