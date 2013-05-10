Ext.define('App.timeline.assets.Media', {
		
	extend: 'Ext.data.Model',			
	
	fields: ['url', 'credit', 'caption'],
	
	autoLoad: false,	
	
	steps: function(){
		var step1 = Ext.panel.Panel.create({html: 'step1'});
		var step2 = Ext.panel.Panel.create({html: 'step2'});
		    
		return [step1, step2];
    	
    }
    
		
});