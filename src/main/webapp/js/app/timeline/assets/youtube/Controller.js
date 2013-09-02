Ext.define('App.timeline.assets.youtube.Controller', {
	extend: 'Ext.util.Observable',
	
	requires: ['App.timeline.assets.youtube.StepOne'],
			
	_steps: [],
	
	successfulUpload: false,
					
	constructor: function(cfg){
		Ext.apply(this, cfg);
		this.callParent(cfg);
		
		this._steps = this.createSteps();				
		this.model.on('dataloaded', this.onDataLoaded, this);
	},			
	
	steps: function(){
		return this._steps;
	},
	
	createSteps: function(){
		this.stepOne = this.createStepOne();						
		return [this.stepOne];
	},	
	
	createStepOne: function(){
		var one = App.timeline.assets.youtube.StepOne.create({model: this.model});	
		one.on('uploaded', this.onUploaded, this);	
		return one;
	},
	
	onUploaded: function(){
		this.successfulUpload = true;		
	},
	
	onDataLoaded: Ext.emptyFn,
	
	isValid: function(){
		return this.uploadSuccessful;
	},
	
	isNotValid: function(){
		return !this.isValid();
	},
	
	
});