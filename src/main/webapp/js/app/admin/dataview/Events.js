Ext.define('App.admin.dataview.Events', {

	extend : 'Ext.data.Store',	
	
	model: 'App.admin.dataview.Event',
	autoLoad: true,
	id: 'eventsStore'	
			
});