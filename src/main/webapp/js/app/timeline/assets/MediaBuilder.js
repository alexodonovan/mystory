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
		this.wizard = this.createWizard();		
		this.navBtns = this.createToolbar();
		
		return [this.wizard, this.navBtns];	
	},
	
	createModel: function(){
		return Ext.create(this.pkg + '.Model');		
	},
	
	createController: function(model){
		return Ext.create(this.pkg + '.Controller', {model: model});		
	},
	
	onPrevClick: function(){		
		if (this.model.isNotValid()) return;
		this.wizard.prevCard();
	},
	
	onNextClick: function(){
		if (this.model.isNotValid()) return;		
		this.model.load();
		this.wizard.nextCard();				
	},
	
	createBtn: function(txt, fn, scope){
		var btn = Ext.button.Button.create({
			text: txt,
			scale: 'medium',
			cls: 'nav-btn',
			handler: fn,
			scope: scope
		});
		return btn;
	},
	
	createWizard: function(){
		var p = Ext.panel.Panel.create({
			border: false,
			layout: 'card',
			active: 0,
			flex: 1,
			items: this.controller.steps() 
		});	
		p.nextCard = Ext.bind(this.doNav, p, [+1]);
		p.prevCard = Ext.bind(this.doNav, p, [-1]);				
		return p;				
	},
	
	//in scope of this.wizard 
	doNav: function(increment){
		var layout = this.getLayout();		
        this.active += increment;
        layout.setActiveItem(this.active);
        this.active = this.items.indexOf(layout.getActiveItem());
	},
	
	createNavBtns: function(btns){
		var tb = Ext.panel.Panel.create({
			border: false,
			cls: 'wizard-ctrls',
			items: btns,
			autoHeight: true,
			flex: 1,			
			layout: {
				type: 'hbox',
				align: 'center',
				pack: 'center'
			}			
		});
		
		return tb;				
	},
	
	createToolbar: function(){
		var next = this.createBtn('Next', this.onNextClick, this), 
			prev = this.createBtn('Prev', this.onPrevClick, this),
			tb = this.createNavBtns([prev, next]);
			
		return tb;
	}
	
	
});