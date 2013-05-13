Ext.define('App.timeline.assets.wikipedia.StepOne', {
	extend: 'Ext.panel.Panel',
	
	border: false,
	
	layout: {
		type: 'vbox',
		align: 'center',
		pack: 'center'
	},
					
	
	initComponent: function(){
		this.items = this.buildItems();
		
		this.callParent();				
	},		
	
	buildItems: function(){
		this.url = Ext.form.field.Text.create({
			emptyText: 'Wikipedia URL'
		});
		
		return [this.url];
	},
	
	articleTitle: function(sub){
		return this.url.getValue()
					.replace(sub, '');
	}
		
});