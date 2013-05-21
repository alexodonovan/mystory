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
    
    mouseEntered: false,
    
    initComponent: function(){
        this.initMixins();
        this.tpl = this.createTpl();
        this.callParent(arguments);
        
        this.addEvents('editclicked', 'closeclicked');
        this.store.on('datachanged', this.attachBtnClicks, this);
    },
    
    afterRender: function(){
        this.callParent(arguments);
        
        this.initDropZones();
        this.attachBtnClicks();  
        
        this.on('itemmouseleave', this.onMouseLeaveNode, this);
        this.on('itemmouseenter', this.onMouseEnterNode, this);               
    },    
    
    attachBtnClicks: function(){
        this.store.each(Ext.bind(this.attachBtnClick, this, ['edit-btn', this.onEditClick], true));
        this.store.each(Ext.bind(this.attachBtnClick, this, ['close-btn', this.onCloseClick], true));
    },
    
    onMouseLeaveNode: function(view, record, node, index, e, eOpts){
    	if (node.contains(e.target)) return;
    	var seqEl = Ext.get('event-sequence-'+(index+1)),
    		closeEl = Ext.get('close-btn-'+(index+1));
    		
    	seqEl.alignTo(node, 'tr?', [-20, 4], true);
    	closeEl.sequenceFx()
    			.setOpacity(0, true)
    			.alignTo(node, 'tr?', [ -20, -20], true);    			
    	this.mouseEntered=false;
    },
    
    onMouseEnterNode: function(view, record, node, index, e, eOpts){
    	if (this.mouseEntered) return;
    	var seqEl = Ext.get('event-sequence-'+(index+1)),
    		closeEl = Ext.get('close-btn-'+(index+1));    
    	
    	if (seqEl.getActiveAnimation() || closeEl.getActiveAnimation()) return;
    	
    	seqEl.alignTo(node, 'tr?', [-40, 4], true);
    	closeEl.syncFx()
    			.alignTo(node, 'tr?', [-20, 4], false)
    			.setOpacity(1, true);
    	
    	this.mouseEntered=true;
    },
    
    attachBtnClick: function(rec, index, count, id, fn){
        var index = this.indexOf(rec),
            el = Ext.get(id+'-'+(index+1));
        
        if(!el) {
            Ext.defer(this.attachBtnClick, 100, this, arguments, false);
            return true;
        }
        el.on('click', Ext.bind(fn, this, [rec], false));               
    },
    
    onEditClick: function(rec){
    	this.fireEvent('editclicked', rec);        
    },
    
    onCloseClick: function(rec){    
    	Ext.Msg.confirm('Delete this event?', 
    			'You have chosen to delete this event. Do you wish to continue?',
    			Ext.bind(this.onCloseConfirm, this, [rec], true));    	

    },
    
    onCloseConfirm: function(buttonId, unknown, button, rec){	
    	if (buttonId!=='yes') return;
   		this.fireEvent('closeclicked', rec);
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
                    '<div id="close-btn-{#}" class="close-btn">x</div>' +
                    '<div id="event-sequence-{#}" class="index">{#}</div>' +                    
                    '<div class="content">'+
                      '<div class="title">{title}</div>' +                  
                      '<div id="edit-btn-{#}" class="edit-btn">Edit</div>'+
                    '</div>'+
                                    
                '</div>'+
            '</tpl>';           
        return new Ext.XTemplate(html);
    }
    
});