Ext.define('App.maps.Shape', {
	extend: 'Ext.data.Model',
	
	
	statics: {
		circleOptions: {
			fillColor : '#FF0000',
			strokeColor : "#FF0000",
			fillOpacity : 0.35,
			strokeWeight : 1,
			clickable : true,
			editable : true,
			zIndex : 1
		},
		
		createShape: function(circle){
			var shape = App.maps.Shape.create({
					radius: circle.getRadius(),
					centerX: circle.getCenter().lat(),
					centerY: circle.getCenter().lng()		
			});
			shape.circle = circle;
			
			return shape;
		}
	},	
	
	proxy: {
        type: 'rest',
        url : 'rest/shapes',
        appendId: false
    },
    
    save: function(){
    	this.callParent({
    		success: Ext.bind(this.onSaveSuccess, this)
    	});    	
    },
    
    onSaveSuccess: function(entity){
    	this.set('id', entity.id);
    },
	
	fields: [
		{name: 'id'},
		{name: 'centerX', type: 'float'},
		{name: 'centerY', type: 'float'},
		{name: 'radius', type: 'float'},
		{name: 'version', type: 'int'}
	],
	
	update: function(circle){
		this.circle = circle;
		this.set('radius', this.circle.getRadius());
		this.set('centerX', this.circle.getCenter().lat());
		this.set('centerY', this.circle.getCenter().lng());
	},	
	
	draw: function(map){	
		if (!this.get('radius')) return;
					
		var options = Ext.apply(App.maps.Shape.circleOptions, {
			center: new google.maps.LatLng(this.get('centerX'), this.get('centerY')),
    		radius: this.get('radius'),
    		map: map
		});					
		this.circle = new google.maps.Circle(options);				
	},
	
	onMapEvent: function(evt, fn, scope){
		google.maps.event.addListener(this.circle, evt, Ext.bind(fn, scope, [this.circle, this], false));
	}
	
	
	
});