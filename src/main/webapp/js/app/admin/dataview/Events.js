Ext.define('App.admin.dataview.Events', {

	extend	: 'Ext.data.Store',	
	
	model: 'App.admin.dataview.Event',
	autoLoad: false,
	id: 'eventsStore',
	
	constructor: function(){
		this.callParent(arguments);
		App.util.EventBus.subscribe('App.admin.dataview.Event.created', this.onEventCreated, this);
		App.util.EventBus.subscribe('App.admin.search.Family.selected', this.onFamilySelect, this);
	},
	
	onEventCreated: function(model){
		this.add(model);
	},
	
	onFamilySelect: function(family){
		if (Ext.isArray(family)) family = family[0];		
		this.load({
			callback: Ext.bind(this.onEventsLoaded, this, [family], false),	
			params: {family_id: family.get('id')} 
		});
		this.family = family;
	},
	
	onEventsLoaded: function(family){
		this.each(function(rec){ rec.family = family; }, this);
	}
			
});