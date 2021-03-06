Ext.define('App.admin.Editor', {

			extend : 'Ext.util.Observable',

			requires : [
					'App.admin.dataview.View', 
					'App.admin.dataview.Events',
					'App.admin.EventWindow',
					'App.admin.search.SearchContainer',
					'App.admin.editor.OptionsWindow',
					'App.admin.editor.NewButton'
				],

			constructor : function(cfg) {
				this.store = this.createStore();
				this.view = this.createView();

				this.tb1 = this.createToolbar1();
				this.tb2 = this.createToolbar2();
				this.tb3 = this.createToolbar3();

				this.optionsWindow = this.createOptionsWindow();
				this.layoutContainer = this.createLayoutContainer();

				this.callParent(arguments);

				this.initEvents();
			},

			initEvents : function() {
				this.view.on('editclicked', this.showEditWindow, this);
				this.view.on('closeclicked', this.onCloseClicked, this);
				
				App.util.EventBus.subscribe('App.admin.search.Family.selected', this.onFamilySelect, this);
			},
			
			onFamilySelect: function(family){
				if (Ext.isArray(family)) family = family[0];			
				this.family = family;					
				this.addBtn.toggle(family);
			},

			onCloseClicked : function(rec) {				
				rec.destroy();
				this.store.remove(rec);
			},

			showEventWindow : function(comp) {
				var win = this.createEventWindow(null, comp);
				win.show();

			},

			showEditWindow : function(rec) {
				var win = this.createEventWindow(rec);
				win.updateFields(rec);
				win.show();
			},

			createEventWindow : function(model, comp) {	
				if(model === null){
				comp = comp || App.timeline.assets.image.StepOne.create({event : model});				
				var win = App.admin.EventWindow.create({
							family: this.family,
							model: model,
							media : comp
						});
				return win; 
				}
				else if(model.get("assetId") === null || model.get("assetId") === 0){
				comp = comp || App.timeline.assets.youtube.StepOne.create({event : model});				
				var win = App.admin.EventWindow.create({
							family: this.family,
							model: model,
							media : comp
						});
				return win; 
				}
				comp = comp || App.timeline.assets.image.StepOne.create({event : model});				
				var win = App.admin.EventWindow.create({
							family: this.family,
							model: model,
							media : comp
						});
				return win; 
			},

			createStore : function() {
				var store = App.admin.dataview.Events.create();
				return store;
			},

			onStoreLoad : function() {
				this.view.attachBtnClicks();
			},

			createLayoutContainer : function() {
				var p = Ext.container.Container.create({
							items : [this.tb1, this.tb2, this.tb3, this.view],
							border : false,
							renderTo : 'timeline-container',
							layout : {
								type : 'vbox',
								align : 'stretch'
							}
						});

				return p;
			},

			createToolbar1 : function() {
				var tb = Ext.toolbar.Toolbar.create({
							border : false,
							cls : 'top-toolbar-1',
							height : 15
						});

				return tb;
			},

			createPublishBtn : function() {
				var btn = Ext.button.Button.create({
							text : 'Publish',
							scale : 'large',
							cls : 'story-red-btn',
							handler : this.onPublishClick,
							scope : this
						});
				return btn;
			},

			onPublishClick : function() {
				alert('This must be coded yet.........');
				return;

			},

			createPreviewBtn : function() {
				var btn = Ext.button.Button.create({
							text : 'Preview',
							scale : 'medium',
							cls : 'story-blue-btn',
							handler : this.onPreviewClick,
							scope : this
						});
				return btn;
			},

			onPreviewClick : function() {
				if (!this.family) return;	
				var params = {q: this.family.get('id')};
				document.location = 'preview.html?' + Ext.Object.toQueryString(params);
			},

			createToolbar2 : function() {
				var search = App.admin.search.SearchContainer.create(), 
						preview = this.createPreviewBtn(), publish = this.createPublishBtn();
				var tb = Ext.toolbar.Toolbar.create({
							items : [' ', search, '->', preview, publish],
							border : false,
							cls : 'top-toolbar-2',
							height : 70
						});

				return tb;
			},

			createAddBtn : function() {
				var btn = App.admin.editor.NewButton.create({model: this.family});
				btn.on('addclick', this.onAddClick, this);
				btn.on('newclick', this.onNewClick, this);
				return btn;				
			},
			
			onNewClick: function(){
				//show the new surname window here.
				alert('This must be coded yet.........');
			},

			onAddClick : function() {
				if (this.optionsWindow.isVisible()) return;					
				this.optionsWindow.animShow(this.addBtn);
			},

			createOptionsWindow : function() {
				var options = App.admin.editor.OptionsWindow.create();
				options.on('choosen', this.showEventWindow, this);
				return options;
			},

			createToolbar3 : function() {
				this.addBtn = this.createAddBtn();

				var tb = Ext.toolbar.Toolbar.create({
							items : ['  ', this.addBtn],
							border : false,
							cls : 'top-toolbar-3',
							height : 44
						});

				return tb;
			},

			createView : function() {
				var view = App.admin.dataview.View.create({
							store : this.store,
							flex : 1
						});
				return view;
			}

		});