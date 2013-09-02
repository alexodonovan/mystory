Ext.define('App.util.EventBus', {
	
	singleton: true,	
	
	bus: Ext.util.Observable.create(),	
    	
	subscribe: function(eventName, fn, scope, o) {
		var bus = App.util.EventBus.bus;		
        bus.addEvents(eventName);
        bus.on(eventName, fn, scope, o);
    },
    	    	
	publish : function() { 
		var bus = App.util.EventBus.bus;
        if(bus.eventsSuspended !== true){
            var ce = bus.events ? bus.events[arguments[0].toLowerCase()] : false;
            if(typeof ce == "object"){
                return ce.fire.apply(ce, Array.prototype.slice.call(arguments, 1));
            }
        }
        return true;
    }

});