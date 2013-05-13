Ext.define('App.timeline.assets.MediaBuilder', {
	extend: 'Ext.panel.Panel',
	
	requires: ['App.timeline.assets.wikipedia.Model', 'App.timeline.assets.wikipedia.Controller'],
	
	border: false,	
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	
	initComponent: function(){		
		this.model = this.createModel();	
		this.controller = this.createController(this.model);
		this.items = this.buildItems();								
		
		this.callParent();
	},
	
	initEvents: function(){
		this.callParent();
	},
	
	buildItems: function(){				
		this.wizard = Ext.panel.Panel.create({
			border: false,
			layout: 'card',
			active: 0,
			flex: 1,
			items: this.controller.steps() 
		});		
		
		this.navBtns = this.createToolbar();
		
		return [this.wizard, this.navBtns];	
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
			scale: 'medium',
			cls: 'nav-btn',
			handler: function(){
				var layout = this.wizard.getLayout();
				this.model.load();
	            ++this.wizard.active;
	            layout.setActiveItem(this.wizard.active);
	            this.wizard.active = this.wizard.items.indexOf(layout.getActiveItem());
	            
			},
			scope: this
		});
		
		var prev = Ext.button.Button.create({
			text: 'Previous',
			scale: 'medium',
			cls: 'nav-btn',
			handler: function(){
				var layout = this.wizard.getLayout();
	            --this.wizard.active;
	            layout.setActiveItem(this.wizard.active);
	            this.wizard.active = this.wizard.items.indexOf(layout.getActiveItem());
			},
			scope: this
		});
		
		var tb = Ext.panel.Panel.create({
			border: false,
			cls: 'wizard-ctrls',
			items: [prev, next],
			autoHeight: true,
			flex: 1,			
			layout: {
				type: 'hbox',
				align: 'center',
				pack: 'center'
			}
		});
		
		return tb;
	}
	
	
});