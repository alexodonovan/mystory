Ext.define('App.admin.search.Field', {
   	extend   : 'Ext.form.field.ComboBox',
   	   	   
   	name: 'name-search',
   	
   	requires: ['App.admin.search.Families'],
   
	cls: 'story-default-textfield search-box',
	emptyText: 'Search by surname',	
	allowBlank: false,
	minChars: 3,        
    queryCaching: false,
    
    displayField: 'name',
    typeAhead: false,
    hideLabel: true,
	hideTrigger:true,    
	
	listConfig: {
		loadingText: 'Searching...',
        loadMask: false,
        deferEmptyText: false, 
        emptyText: '<span class="no-results">No matching results.</span>',
        maxHeight: 550,
        minHeight: 50,
        cls: 'search-box-list',
        width: 500        
	},
    
	initComponent: function(){		
		this.store = this.createStore();	
		this.listConfig.itemTpl = this.createTpl();		
		
        this.callParent(arguments);
    },
    
    initEvents: function(){
    	this.callParent(arguments);    	
    	this.on('select', this.onItemClick, this);
    },
    
    onItemClick: function(combo, record, eOpts){
    	App.util.EventBus.publish('App.admin.search.Family.selected', record);
    },
    
    createTpl: function(){
    	var html = 
    		'<div class="search-box-list-item">' +
    			'<span class="surname">{surname} </span>' +
    			'</span class="alt-surnames">{altSurnames}</span>' +
    		'</div>';
    		
    	return html;
    },
    
    createStore: function(){    	    
    	var store = App.admin.search.Families.create();
    	return store;
    }
    
      
    
    
    
});