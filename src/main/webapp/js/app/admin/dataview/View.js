Ext.define('App.admin.dataview.View', {

    extend : 'Ext.view.View',   
    
    requires: ['App.admin.dataview.Events', 'App.admin.dataview.Draggable'],
    
    mixins: {
        draggable: 'App.admin.dataview.Draggable'
    },
    
    cls: 'data-view',
    itemSelector: 'div.story',
    emptyText: 'This story has no events',
    layout :'fit',          
    
    initComponent: function(){
        this.initMixins();
        this.tpl = this.createTpl();
        this.callParent(arguments);
        
        this.addEvents('editclicked');
        this.store.on('datachanged', this.attachBtnClicks, this);
    },
    
    afterRender: function(){
        this.callParent(arguments);
        
        this.initDropZones();
        this.attachBtnClicks();        
    },
    
    attachBtnClicks: function(){
        this.store.each(this.attachBtnClick, this);
    },
    
    attachBtnClick: function(rec){    	
        var index = this.indexOf(rec),
            el = Ext.get('edit-btn-'+(index+1));
        
        if(!el) {
            Ext.defer(this.attachBtnClick, 100, this, [rec], false);
            return true;
        }
        el.on('click', Ext.bind(this.onEditClick, this, [rec], false));               
    },
    
    onEditClick: function(rec){
    	this.fireEvent('editclicked', rec);        
    },
    
    initDropZones: function(){
        var nodes = this.getNodes();
        if (!nodes || nodes.length==0) {
            Ext.defer(this.initDropZones, 200 ,this);
            return;
        }
        Ext.each(nodes, this.initDropZone, this);
    },
    
    dragStarted: function(node){
        this.draggingNode = node;
        this.draggingRecord = this.getRecord(node);
    },
    
    onNodeDragOver: function(source, e, data, dropNode){
        if (data.ddel.id === dropNode.id) return;               
        return Ext.dd.DropTarget.prototype.dropAllowed;
    },
      
    onNodeDrop: function(source, e, data, dropNode){        
        if (data.ddel.id === dropNode.id) return;
                    
        var dropIndex   = this.indexOf(dropNode),           
            dragRec     = this.getRecord(data.ddel),
            dragIndex   = this.indexOf(dragRec),
            insertPos   = (dropIndex < dragIndex)? 0: 1; 
            clone       = App.admin.dataview.Event.create(dragRec.getData()); 
                       
        this.store.removeAt(dragIndex);                
        this.store.insert(dropIndex+insertPos, [clone]);        
        
        this.refresh();
        this.initDropZones();
        
        
        
    },
    
    initDropZone: function(node){
        new Ext.dd.DropTarget(node, {
            ddGroup: 'view-dd-group',
            notifyOver: Ext.bind(this.onNodeDragOver, this, [node], true),
            notifyDrop: Ext.bind(this.onNodeDrop, this, [node], true)
        });
    },
    
    initMixins: function(){
        this.mixins.draggable.init(this, {
            ddConfig: {
                ddGroup: 'view-dd-group'
            }
        });
    },
            
    createTpl: function(){
        var html = 
            '<tpl for=".">'+
                '<div class="story">'+
                    '<div class="img-container">' +
                        '<img src={url} />' +
                    '</div>' +
                    '<div class="index">{#}</div>' +
                    '<div class="content">'+
                      '<div class="title">{title}</div>' +                  
                      '<div id="edit-btn-{#}" class="edit-btn">Edit</div>'+
                    '</div>'+
                                    
                '</div>'+
            '</tpl>';           
        return new Ext.XTemplate(html);
    }
    
});