Ext.define('App.util.PlainWindow', {

	extend : 'Ext.window.Window',

	cls : 'story-plain-window',
	bodyCls : 'story-plain-window-body',

	closable : false,
	header : false,
	border : false,
	frame : true,
	plain : true,
	draggable : false,
	resizable : false,
	modal : true,
	
	initEvents: function(){
		this.callParent(arguments);
		
		this.on('show', this.attachCloseListener, this);		
	},
	
	attachCloseListener: function(window, eOpts){		
		var mask = Ext.query('div.x-mask')[0];		
		Ext.get(mask).on('click', this.hide, this);	
	},
			
	animShow : function(animateTarget) {
		var me = this, x = animateTarget.getX(), y = animateTarget.getY() + 35, proxy;

		proxy = App.util.PlainWindow.create({
					width : 1, height : 1,
					x : x, y : y
				});
		proxy.showAt(x, y);		
		proxy.el.animate({
			from : { x : x, y : y},
			to : { x: x, y: y, width: this.width, height: this.height},
			duration : 350,
			easing : 'bounceOut',
			listeners : {
				afteranimate : function() {
					me.showAt(x, y);							
					proxy.destroy();
				}
			}
		});
	}

});