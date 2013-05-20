Ext.define('App.timeline.assets.CreditCaption', {
	extend: 'Ext.panel.Panel',
	
	border: false,
	cls: 'credit-caption-container',
	layout: 'vbox',
	width: '90%',
	height: 75,
	padding: 10,
					
	
	initComponent: function(){
		this.items = this.buildItems();
		this.callParent();						
	},		
	
	initEvents: function(){
		this.callParent();		
	},
	
	buildItems: function(){
		this.credit = this.createCreditField(),
		this.caption = this.createCaptionField();			
		
		var credit = this.createLayoutPanel(this.credit, 'right'),
			caption = this.createLayoutPanel(this.caption, 'left');
		
		return  [credit, caption];
	},		
	
	createLayoutPanel: function(field, align){			
		var p = Ext.panel.Panel.create({
			items: [field], 
			cls: field.cls + '-container',
			border: false,
			width: '100%',			
			layout: { type: 'vbox', align: align}			
		});
		
		return p;
	},
	
	createCreditField: function(){
		var field = Ext.form.field.Text.create({
			emptyText: 'Credit',
			cls: 'credit',
			width: 150		
		});		
		field.on('blur', this.onFieldBlur, this);
		
		return field;
	},
	
	createCaptionField: function(){
		var field = Ext.form.field.Text.create({
			emptyText: 'Caption',
			cls: 'caption',
			width: 350
		});		
		field.on('blur', this.onFieldBlur, this);
		
		return field;
	},
	
	onFieldBlur: function(){
		this.model.set('caption', this.caption.getValue());
		this.model.set('credit', this.credit.getValue());
	}		
	
});