Ext.define('App.admin.editor.NewButton', {

	extend : 'Ext.button.Button',
	
	scale : 'medium',
	cls : 'story-save-btn',	
	text: 'New',
	
				
	initComponent: function(){								
		this.callParent(arguments);
		this.toggle(this.model);
	},
	
	onAddClick: function(){
		this.fireEvent('addclick');
	},
	
	onNewClick: function(){
		this.fireEvent('newclick');
	},
	
	initEvents: function(){
		this.callParent(arguments);
    },
    
    toggle: function(model){
    	var txt = model ? 'Add': 'New',
    		fn = (model)? this.onAddClick: this.onNewClick;    	    	
    	this.setText(txt); 
		this.setHandler(fn);
    }
	   
});