Ext.define('App.admin.search.SearchContainer', {
    extend: 'Ext.container.Container',
    
    requires: ['App.admin.search.Field'],
    
    layout: {
        type: 'hbox',
        align: 'middle'
    },
    
    initComponent: function(){
        this.items = this.buildItems();
        
        this.callParent(arguments);
    },
    
    
    buildItems: function(){
        this.field = this.createSearchField(),
            searchIcon = this.createSearchIcon();               
        return [this.field, searchIcon];
    },
    
    createSearchIcon: function(){
        var btn = Ext.button.Button.create({            
            cls: 'story-blue-btn search-btn',
            iconCls: 'search-icon',
            handler: this.onSearchClick,
            scale: 'medium',            
            height: 35,
            scope: this
        });     
        return btn;
    },
    
    onSearchClick: function(){
        if (!this.field.isValid()) return;
        document.location = 'admin.html?search='+this.field.getValue();
    },
    
    createSearchField: function(){
    	var field = App.admin.search.Field.create({width: 350});    	
//        var field = Ext.form.field.Text.create({
//            cls: 'story-default-textfield search-box',
//            emptyText: 'Search by surname',
//            width: 350,
//            allowBlank: false
//        });
        return field;       
    }
    
    
    
});