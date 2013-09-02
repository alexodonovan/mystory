Ext.define('App.timeline.assets.image.StepTwo', {
	extend: 'Ext.panel.Panel',
		
	border: false,
	
	layout: {
		type: 'vbox',
		align: 'center',
		pack: 'center'
	},
					
	initComponent: function(){
		this.tpl = this.createTpl();
		this.data = {src:'assets/timeline/compiled/css/loading.gif'};		
		this.callParent();				
	},	
	
	initEvents: function(){
		this.callParent();	
	},
	
	createTpl: function(){
		return new Ext.XTemplate('<img src="{src}" alt-text="uploaded image.">');
	},
	
	updateSrc: function(src){
		this.update({src: src});
	}
		
});