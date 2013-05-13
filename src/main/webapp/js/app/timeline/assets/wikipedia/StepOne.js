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
	
	initEvents: function(){
		this.callParent();
		
		this.url.on('blur', this.onFieldBlur, this);
	},
	
	onFieldBlur: function(field){
		this.model.set('url', field.getValue());
	},
	
	buildItems: function(){
		this.url = Ext.form.field.Text.create({
			emptyText: 'Wikipedia URL'
		});
		
		return [this.url];
	}	
		
});