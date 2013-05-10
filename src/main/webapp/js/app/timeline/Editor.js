Ext.define('App.timeline.Editor', {

	extend : 'Ext.panel.Panel',
	
	requires: ['App.timeline.TitleDescription', 
		'App.timeline.MediaChoice',
		'App.timeline.assets.MediaBuilder'],
	
	cls: 'editor-container',
	
	border: false,
	
	layout: {
		type: 'hbox',
		align: 'stretch'
	},
		
	
	initComponent: function(){	
		this.items = this.buildItems();		
		this.callParent();		
	},
		
	initEvents: function(){		
		this.callParent();
	},
	
	
	buildItems: function(){
		this.choice = this.createMediaChoice();
		this.titlePanel = this.createTitlePanel();;
		
		return [this.choice, this.titlePanel];
	},		
	
	createMediaChoice: function(){
		var choice = App.timeline.MediaChoice.create({flex: 1});		
		choice.on('btn_click', this.onMediaChoice, this);
		return choice;				
	},
	
	onMediaChoice: function(type){
		var clz = 'App.timeline.assets.'+type,
			builder = App.timeline.assets.MediaBuilder.create({flex: 1, clz: clz});
						
		this.choice.getEl().fadeOut({
			   easing: 'easeOut',
			    duration: 500,
			    remove: false,
			    useDisplay: false,
			    callback: function(){
			    	this.choice.hide();
					this.insert(0, builder);    	
			    },
			    scope: this
		});
						
	},
	
	youtubeBuilder: function(){
		return Ext.panel.Panel.create({
			html: 'youtube',
			flex: 1
		});
	},
	
	createTitlePanel: function(){
		return App.timeline.TitleDescription.create({
			flex: 1,
			model: this.model
		});		
	}
	
	
	
	
	
});