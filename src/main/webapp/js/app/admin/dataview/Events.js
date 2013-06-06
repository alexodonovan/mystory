Ext.define('App.admin.dataview.Events', {

	extend	: 'Ext.data.Store',	
	
	model: 'App.admin.dataview.Event',
	autoLoad: false,
	id: 'eventsStore',
	
	constructor: function(){
		this.callParent(arguments);
		App.util.EventBus.subscribe('App.admin.dataview.Event.created', this.onEventCreated, this);
		App.util.EventBus.subscribe('App.admin.search.Family.selected', this.onFamilySelect, this);
		App.util.EventBus.subscribe('App.admin.dataview.Event.updated', this.doLoad, this);
	},
	
	onEventCreated: function(model){
		this.doLoad();
	},
	
	onFamilySelect: function(family){
		if (Ext.isArray(family)) family = family[0];				
		this.family = family;
		this.doLoad();
	},
	
	doLoad: function(){		
		this.load({
			callback: Ext.bind(this.onEventsLoaded, this, [this.family], false),	
			params: {family_id: this.family.get('id')} 
		});
	},	
	
	onEventsLoaded: function(family){		
		this.each(function(rec){ rec.family = family; }, this);
	}
			
});