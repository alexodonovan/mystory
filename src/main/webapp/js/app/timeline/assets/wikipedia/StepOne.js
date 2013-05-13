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
		
		var fnName = this.model.isValid()? 'clearInvalid': 'markInvalid';		
		this.url[fnName](this.model.errors());
	},
	
	buildItems: function(){
		this.url = Ext.form.field.Text.create({
			emptyText: 'Wikipedia URL',
			cls: 'default-textfield',
			height: 35,
			width: '70%',
			allowBlank: false
		});
		
		return [this.url];
	},
	
	accentuateInvalid: function(){
		this.url.markInvalid('This field is required.');
		var el = Ext.get(this.url.getEl().query('input'));
		el.highlight();
	}
		
});