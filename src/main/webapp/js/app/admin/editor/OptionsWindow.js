Ext.define('App.admin.editor.OptionsWindow', {

	extend : 'App.util.PlainWindow',	
	requires: ['App.timeline.MediaChoice', 'App.util.PlainWindow'],
	
	height: 180,
	width: 350,
	
	closeAction: 'hide',
			
	initComponent: function(){		
		this.items = this.buildItems();
		this.callParent(arguments);						
	},
	
	initEvents: function(){
		this.on('choosen', this.hide, this);
		this.on('show', this.attachCloseClick, this);
		this.on('close', this.detachCloseClick, this);
		
		this.callParent(arguments);
		
		this.addEvents('choosen');		
    },
    
	detachCloseClick: function(){
		this.maskEl().un('click', this.close, this);
	},
    
   	attachCloseClick: function(){
   		this.maskEl().on('click', this.close, this);
   		Ext.getBody().addKeyListener(Ext.EventObject.ESC, this.close, this);
   	},
   
   	maskEl: function(){
   		var dom = Ext.query('.x-mask'),
   			el = Ext.get(dom);   			
   		return el;
   	},
	
	buildItems: function(){
		var choice = App.timeline.MediaChoice.create();		
		choice.on('btn_click', this.onChoiceSelect, this);
		return [choice];
	},				
    
    onChoiceSelect: function(media){
    	//temp if statement, remove when all media types supported
    	var allowedMedia = (media === 'Image')||(media === 'YouTube');
    	if (!allowedMedia) return;    	
    	
    	var ns = 'App.timeline.assets.'+media.toLowerCase()+'.StepOne', 
    		comp = Ext.create(ns);
    		
    	this.fireEvent('choosen', comp);
    }
    
    	
});