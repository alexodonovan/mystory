Ext.define('App.timeline.assets.image.Image', {
	extend: 'Ext.data.Model',			
	
	fields: ['id', 'data', 'version'],
	
	autoLoad: false,
	
	
	bytes: function(){				
		return this.get('data');				
	},
	
	asDataUri: function(){
		var src = 'data:image/jpeg;base64,'+this.bytes();
		return src;
	}

	
});