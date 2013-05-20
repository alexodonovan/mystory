Ext.define('App.admin.dataview.Event', {

	extend : 'Ext.data.Model',	
		
	fields: [		
		{name: 'url', type:'string'},
		{name: 'credit', mapping: 'credit', type:'string'},
		{name: 'caption', mapping: 'caption', type:'string'},
		{name: 'title', type:'string'},
		{name: 'description', type:'string'}			
	]	 
						
});