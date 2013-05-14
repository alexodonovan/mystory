Ext.define('App.timeline.assets.MediaBuilder', {
	extend: 'Ext.panel.Panel',
	
	requires: ['App.timeline.assets.wikipedia.Model', 
		'App.timeline.assets.wikipedia.Controller'
		],
	
	border: false,
	cls: 'media-builder',
	
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
		this.addEvents('cancel');
		this.callParent();						
		this.controller.on('dataloaded', this.onDataLoaded, this);
	},	
	
	onDataLoaded: function(){		
		
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
		if (this.wizard.active <=0) {
			this.fireEvent('cancel');
			return;
		};
		this.wizard.prevCard();
		this.toggleBtns();
	},
	
	onNextClick: function(){
		if (this.controller.isNotValid()) return;		
		this.model.load();
		this.wizard.nextCard();	
		this.toggleBtns();
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
	toggleBtns: function(){
		if (this.wizard.active == 0) {		
			this.nextBtn.show();
			this.saveBtn.hide();			
		}		
		if (this.wizard.active >= (this.wizard.items.length-1)){
			this.prevBtn.show();
			this.nextBtn.hide();
			this.saveBtn.show();			
		};		
		
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
			height: 80,			
			layout: {
				type: 'hbox',
				align: 'center',
				pack: 'center'
			}			
		});
		
		return tb;				
	},
	
	createBtn: function(txt, fn, scope, cls, hidden){				
		var btn = Ext.button.Button.create({
			text: txt,
			scale: 'medium',
			cls: cls || 'nav-btn',
			handler: fn,
			scope: scope,
			hidden: hidden
		});
		return btn;
	},
	
	createToolbar: function(){
		this.nextBtn = this.createBtn('Next', this.onNextClick, this); 
		this.prevBtn = this.createBtn('Prev', this.onPrevClick, this);
		this.saveBtn = this.createBtn('Save', this.model.save, this.model, 'story-save-btn', true);
		var tb = this.createNavBtns([this.prevBtn, this.nextBtn, this.saveBtn]);
			
		return tb;
	}
	
	
});