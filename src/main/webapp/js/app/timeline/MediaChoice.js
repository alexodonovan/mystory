Ext.define('App.timeline.MediaChoice', {

	extend : 'Ext.panel.Panel',
	
	cls: 'media-choice',
	bodyCls: 'media-choice-body',
	border: false,	
	
	layout: {
		type: 'vbox',
		align: 'center',
		pack: 'center'
	},
	
	
	initComponent: function(){
		this.items = this.buildItems();		
		this.callParent();		
	},
	
	initEvents: function(){		
		this.addEvents('btn_click');
		
		this.callParent();
	},
	
	
	buildItems: function(){
		var image = this.createBtn('Image', 'icon-image', 'image'),
			map= this.createBtn('Custom Map', 'icon-map', 'map'),
			youtube = this.createBtn('Youtube', 'icon-youtube','youtube'),
			quote = this.createBtn('Quote', 'icon-quote','quote'),
			wikipedia = this.createBtn('Wikipedia', 'icon-wiki','wikipedia');
			
		var p = Ext.panel.Panel.create({
			border: false,
			layout: 'column',
			defaults: {border: false, columnWidth: 0.5, layout: 'vbox'},		
			items: [
				{items: [image, quote, youtube]},
				{ items: [map, wikipedia]}
			]								
		});
			
		return [p];
	},			
	
	createBtn: function(title, iconCls, type){
		var btn = Ext.button.Button.create({
			text: title ||'Save',
			scale: 'large',
			cls: 'media-btn',
			iconCls: iconCls || 'default-icon',
			handler: this.onBtnClick,
			width: 150,
			scope: this,
			
		});
		return btn;
	},
	
	onBtnClick: function(btn){
		this.fireEvent('btn_click', btn.type);
	}	
	
});