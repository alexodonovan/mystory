Ext.define('App.admin.dataview.Events', {

	extend : 'Ext.data.Store',	
	
	model: 'App.admin.dataview.Event',
	autoLoad: true,
	id: 'eventsStore',
	
	data: [
		{ credit: 'credit1', caption: 'caption1', url: 'http://www.sencha.com/img/20110215-feat-html5.png', title: 'The Breen Family', description: 'test'},
		{ credit: 'credit2', caption: 'caption2', url: 'http://www.sencha.com/img/20110215-feat-data.png', title: 'Gary Patrick Breen', description: 'test'},
		{ credit: 'credit2', caption: 'caption2', url: 'http://www.sencha.com/img/20110215-feat-perf.png', title: 'test', description: 'test'}
	]
//	 data: [
//        { src:'http://www.sencha.com/img/20110215-feat-drawing.png', caption:'Drawing & Charts' },
//        { src:'http://www.sencha.com/img/20110215-feat-data.png', caption:'Advanced Data' },
//        { src:'http://www.sencha.com/img/20110215-feat-html5.png', caption:'Overhauled Theme' },
//        { src:'http://www.sencha.com/img/20110215-feat-perf.png', caption:'Performance Tuned' }
//    ]
		
			
});