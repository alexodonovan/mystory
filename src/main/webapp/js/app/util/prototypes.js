Array.prototype.on = function(evt, fn, scope){
	Ext.each(this, function(item){
		item.on(evt, fn, scope);
	});	
	return this;
};