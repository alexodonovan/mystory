Ext.define('App.timeline.assets.MediaBuilder', {
	extend: 'Ext.panel.Panel',
	
	requires: ['App.timeline.assets.wikipedia.Model', 'App.timeline.assets.wikipedia.Controller'],
	
	border: false,
	layout: 'card',
	
	active: 0,
	
	initComponent: function(){		
		this.model = this.createModel();	
		this.controller = this.createController(this.model);
		this.items = this.buildItems();
		
		this.bbar = this.createToolbar();
		
		this.callParent();
	},
	
	initEvents: function(){
		this.callParent();
	},
	
	buildItems: function(){		
		var items = this.controller.steps();		
		return items;	
	},
	
	createModel: function(){
		return Ext.create(this.pkg + '.Model');		
	},
	
	createController: function(model){
		return Ext.create(this.pkg + '.Controller', {model: model});		
	},		
	
	createToolbar: function(){
		var next = Ext.button.Button.create({
			text: 'Next',
			handler: function(){
				var layout = this.getLayout();
				this.model.load();
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