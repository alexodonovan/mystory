Ext.define('App.timeline.assets.image.ProgressBar', {
	extend: 'Ext.panel.Panel',
			
	border: false,	
	
	cls: 'progress-bar-panel',
					
	initComponent: function(){
//		this.items = this.buildItems();
		
		this.tpl = this.createTpl();
		this.html = 'progress bar here';
		
		this.callParent();				
	},	
	
	initEvents: function(){
		this.callParent();	
	},
	
	createTpl: function(){
		var html = 
				'<div class="progress-bar-container">' +
					'<div class="progress-bar"></div>' +
				'</div>';
		
		return new Ext.XTemplate(html); 
	},
	
		
	buildItems: function(){	
	}
	
			
		
});