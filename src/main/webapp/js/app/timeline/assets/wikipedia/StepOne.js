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
		var val = field.getValue();
		if (Ext.String.startsWith(val, 'https')) val = val.replace('https', 'http');
		this.model.set('url', val);
		
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
		this.url.markInvalid(this.model.errors());
		var el = Ext.get(this.url.getEl().query('input'));
		el.highlight();
	}
		
});