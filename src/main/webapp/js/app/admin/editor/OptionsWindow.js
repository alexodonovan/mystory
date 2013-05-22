Ext.define('App.admin.editor.OptionsWindow', {

	extend : 'App.util.PlainWindow',	
	requires: ['App.timeline.MediaChoice', 'App.util.PlainWindow'],
	
	height: 180,
	width: 350,
			
	initComponent: function(){		
		this.items = this.buildItems();
		this.callParent(arguments);						
	},
	
	initEvents: function(){
		this.on('choosen', this.hide, this);
		
		this.callParent(arguments);
		
		this.addEvents('choosen');		
    },
	
	buildItems: function(){
		var choice = App.timeline.MediaChoice.create();		
		choice.on('btn_click', this.onChoiceSelect, this);
		return [choice];
	},			
    
    onChoiceSelect: function(media){
    	//temp if statement, remove when all media types supported
    	if (media !== 'Image') return;    	
    	var ns = 'App.timeline.assets.'+media.toLowerCase()+'.StepOne', 
    		comp = Ext.create(ns);
    		
    	this.fireEvent('choosen', comp);
    }
    
    	
});