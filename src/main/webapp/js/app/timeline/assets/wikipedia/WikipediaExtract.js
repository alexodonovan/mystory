Ext.define('App.timeline.assets.WikipediaExtract', {
		
	extend: 'Ext.data.Model',			
	
	fields: [{name: 'extract', mapping: 'query.extract'} ],
	
	autoLoad: false		
});