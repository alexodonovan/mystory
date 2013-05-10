Ext.define('App.timeline.assets.MediaBuilder', {
	extend: 'Ext.panel.Panel',
	
	requires: ['App.timeline.assets.Wikipedia'],
	
	border: false,
	layout: 'card',
	
	active: 0,
	
	initComponent: function(){		
		this.media = Ext.create(this.clz);		
		this.items = this.buildItems();
		
		this.bbar = this.createToolbar();
		
		this.callParent();
	},
	
	initEvents: function(){
		this.callParent();
	},
	
	buildItems: function(){		
		var items = this.media.steps();		
		return items;	
	},
	
	createToolbar: function(){
		var next = Ext.button.Button.create({
			text: 'Next',
			handler: function(){
				var layout = this.getLayout();
				layout.getActiveItem().load();
	            ++this.active;
	            layout.setActiveItem(this.active);
	            this.active = this.items.indexOf(layout.getActiveItem());
	            
			},
			scope: this
		});
		
		var prev = Ext.button.Button.create({
			text: 'Previous',
			handler: function(){
				var layout = this.getLayout();
	            --this.active;
	            layout.setActiveItem(this.active);
	            this.active = this.items.indexOf(layout.getActiveItem());
			},
			scope: this
		});
		
		return ['->',prev, next];
	}
	
	
});