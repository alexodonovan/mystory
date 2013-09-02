Ext.define('App.timeline.assets.youtube.StepOne', {
	extend : 'Ext.panel.Panel',

	requires : [  'App.timeline.assets.YouTube' ],
	
	border : false,

	layout : {
		type : 'vbox',
		pack : 'center'
	},

	initComponent : function() {
		this.items = this.buildItems();
		this.callParent();
	},

	afterRender: function(){
		this.callParent(arguments);			
	},
	
	afterWindowShow: function(){
		//edit mode
		if (this.event) this.attachRemoveBtn();
	},
	
	attachRemoveBtn: function(){	
		var remove = Ext.Component.create({
			html: 'Remove',
			width: 100,
			height: 35,
			hidden: true,		
			floating: true,
			renderTo: Ext.getBody()
		});
		remove.alignTo(Ext.get('image-preview'), 'tr?');
		remove.show();
	},

	initEvents : function() {
		this.callParent();
	},

	createYoutubeField : function() {
		var youtubeUrl = Ext.form.field.Text.create({
			fieldLabel: 'Share This Video URL',
			emptyText : 'URL',
			cls : 'story-default-textfield',
			width : 500,
			allowBlank : false
		});

		return youtubeUrl;
	},
	
	buildItems : function() {
		this.url = this.createYoutubeField();	
		if (this.event){ img = this.createBackgroundImage();
		return [ img, this.url ];}	
		return [ this.url ];

	},

	createBackgroundImage : function() {
		var youtube = this.event.get('url');
		
	    if(youtube.length < 30 ) {
			var vidId = this.YouTubeGetID(youtube);
			this.videoContainer = this.createVideoContainer("http://www.youtube.com/embed/" + vidId + "?feature=player_detailpage");
			return this.videoContainer;
	    }else{
			var obj = Ext.Object.fromQueryString(youtube);
			var vidId = obj.v;
			var vid = vidId.slice(0,11);
	    	this.videoContainer = this.createVideoContainer("http://www.youtube.com/embed/" + vid + "?feature=player_detailpage");
	    	return this.videoContainer;
	    }
	},

	YouTubeGetID : function(url){
		  var ID = '';
		  url = url.replace(/(>|<)/gi,'').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
		  if(url[2] !== undefined) {
		    ID = url[2].split(/[^0-9a-z_]/i);
		    ID = ID[0];
		  }
		  else {
		    ID = url;
		  }
		    return ID;
		},
		
	createVideoContainer : function(src) {
		var p = Ext.panel.Panel.create({
			tpl : '<iframe width="600" height="360" src={src} frameborder="0" allowfullscreen></iframe>', //src
			data : {
				src : src,
			//	id : 'Youtube-SnapShot'
			},
			cls : 'upload-preview',
			border : false
		});
		return p;
	},

	type : function() {
		return 'youtube';
	}
	
});
