Ext.define('App.admin.dataview.View', {

    extend : 'Ext.view.View',   
    
    requires: ['App.admin.dataview.Events', 'App.admin.dataview.Draggable'],
    
//    mixins: {
//        draggable: 'App.admin.dataview.Draggable'
//    },
    
    cls: 'data-view',
    itemSelector: 'div.story',
    emptyText: 'This story has no events',  
    route: 'asset-images',
    
    initComponent: function(){
//        this.initMixins();
        this.tpl = this.createTpl();
        this.callParent(arguments);
        
        this.addEvents('editclicked', 'closeclicked');        
        this.store.on('load', this.attachBtnClicks, this);
		this.store.on('add', this.attachBtnClicks, this);
//		this.on('itemupdate', this.attachBtnClicks, this);
        },
    
    afterRender: function(){
        this.callParent(arguments);
        
        this.initDropZones();
        this.attachBtnClicks();  
        
//        this.on('itemmouseleave', this.onMouseLeaveNode, this);
//        this.on('itemmouseenter', this.onMouseEnterNode, this);               
    },           
    
    attachBtnClicks: function(){     
    	console.log('attachclicks ' + new Date());
        this.store.each(Ext.bind(this.attachBtnClick, this, ['edit-btn', this.onEditClick], true));
        this.store.each(Ext.bind(this.attachBtnClick, this, ['close-btn', this.onCloseClick], true));
        this.store.each(Ext.bind(this.attachBtnClick, this, ['img', this.onEditClick ], true));
    },             
    
    resetSequenceIndicator: function(id, node){
    	var el = Ext.get(id);
    	if (!el) return;
    	el.alignTo(node, 'tr?', [-20, 4], true);
    },
    
    shiftSequenceIndicator: function(id, node){    	
    	var el = Ext.get(id);
    	if (!el) return;
    	if (el.getActiveAnimation()) return;    	
    	el.alignTo(node, 'tr?', [-40, 4], true);
    },
    
    showCloseBtn: function(id, node){
    	var el = Ext.get(id);
    	if (!el) return;
    	if (el.getActiveAnimation()) return;
    	
    	el.syncFx()
			.alignTo(node, 'tr?', [-20, 4], false)
			.setOpacity(1, {duration: 200});
    },
        
    hideCloseBtn: function(id, node){
    	var closeEl = Ext.get(id);    		    
    	closeEl.sequenceFx()
    			.setOpacity(0, true)
    			.alignTo(node, 'tr?', [ -20, -20], true);
    },
    
    onMouseLeaveNode: function(view, record, node, index, e, eOpts){
    	if (node.contains(e.target)) return;
    	this.resetSequenceIndicator('event-sequence-'+(index+1), node);
    	this.hideCloseBtn('close-btn-'+(index+1), node);    	    		
    },
    
    onMouseEnterNode: function(view, record, node, index, e, eOpts){
    	this.shiftSequenceIndicator('event-sequence-'+(index+1), node);
    	this.showCloseBtn('close-btn-'+(index+1), node);
    },
    
    attachBtnClick: function(rec, index, count, id, fn){
        var index = this.indexOf(rec),
            el = Ext.get(id+'-'+(index+1));
        
        if(!el) {
            Ext.defer(this.attachBtnClick, 100, this, arguments, false);
            return true;
        }
        el.un('click', Ext.bind(fn, this, [rec], false));
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
    
//    dragStarted: function(node){
//        this.draggingNode = node;
//        this.draggingRecord = this.getRecord(node);
//    },
    
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
    
    templateFunctions: function(){
    	var cfg = {
    		assetUrl: Ext.bind(this.routeToAsset, this),
    		formatDate: Ext.bind(this.formatDate, this)
    	};
    	return cfg;
    },
    
    formatDate: function(date){
    	if (!date) return;    	
    	return Ext.Date.format(date, 'F j, Y');
    },
    
    routeToAsset : function(assetId, url) {	
		if (!url === null || url === "") {
			return this.route + '?imgId=' + assetId;
		}else if(url.length < 30){
			var vidId = this.youTubeGetID(url);
			return "http://img.youtube.com/vi/"
						+ vidId + "/2.jpg";
		}
		else{
			var obj = Ext.Object.fromQueryString(url);
			var vidId = obj.v;
			var vid = vidId.slice(0,11);
		return "http://img.youtube.com/vi/"
					+ vid + "/2.jpg";
		}					
	},
	
	youTubeGetID : function(url){
		
	    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
	    var match = url.match(regExp);
	    if (match&&match[7].length==11){
	        return match[7];
	    }else{
	        alert("Not a valid Url");
	        return false;					        
	    }
	},
//    routeToAsset: function(assetId){
//    	if (!assetId) assetId = 1;
//    	return this.route + '?imgId=' + assetId;
//    },
    
	templateHtml : function() {	
		var html = '<tpl for=".">'
					+ '<div class="story">'
						+ '<div id="img-{#}" class="img-container" style="cursor: pointer" title="Click to Edit" >'
							+ '<img src={[this.assetUrl(values.assetId, values.url)]} />'
						+ '</div>'
						+ '<div id="close-btn-{#}" class="close-btn"><img src="assets/img/close_icon.png"></div>'
							//+ '<div id="close-btn-{#}" class="close-btn">x</div>'    
							// 	'<div id="event-sequence-{#}"
							// class="index">{#}</div>'+
						+ '<div class="content">'
							+ '<div class="title">{title}</div>'
									//+ '<div class="date">{[this.formatDate(values.date)]}</div>' 
							+ '<div id="edit-btn-{#}" class="edit-btn">Edit</div>'
						+ '</div>' 
					+ '</div>' 
				+ '</tpl>';
		return html;
	},
            
    createTpl: function(){
    	var cfg = this.templateFunctions(), 
    		html = this.templateHtml();    	         
        return new Ext.XTemplate(html, cfg);
    }
    
});