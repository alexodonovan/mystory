Ext.define('App.timeline.assets.image.Controller', {
	extend: 'Ext.util.Observable',
	
	requires: ['App.timeline.assets.image.StepOne', 'App.timeline.assets.image.StepTwo'],
			
	_steps: [],
					
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
		this.stepTwo = this.createStepTwo();
		
		return [this.stepOne, this.stepTwo];
	},
	
	createStepTwo: function(){
		var two = App.timeline.assets.image.StepTwo.create();
		return two;
	},
	
	createStepOne: function(){
		var one = App.timeline.assets.image.StepOne.create();	
		one.on('uploaded', this.onUploaded, this);	
		return one;
	},
	
	onUploaded: function(){
		
		this.stepTwo.updateSrc('asset-images?imgId='+1);
	},	
	
	isValid: function(){
		return true;
	},
	
	isNotValid: function(){
		return !this.isValid();
	},
	
	onDataLoaded: function(model){		
		this.stepTwo.update({src: model.asDataUri()});
	}

});