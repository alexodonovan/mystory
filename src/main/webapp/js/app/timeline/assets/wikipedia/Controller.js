Ext.define('App.timeline.assets.wikipedia.Controller', {
	extend: 'Ext.util.Observable',
	
	baseWikiUrl: 'http://en.wikipedia.org/wiki/',	
	
	requires: ['App.timeline.assets.wikipedia.StepOne',
				'App.timeline.assets.wikipedia.StepTwo'],
			
	_steps: [],
					
	constructor: function(cfg){
		Ext.apply(this, cfg);
		this.callParent(cfg);						
		this._steps = this.createSteps();
		
		this.model.on('dataloaded', this.onDataLoaded, this);
	},			
	
	onDataLoaded: function(data){
		this.step2.showData(data);
	},
	
	steps: function(){
		return this._steps;
	},	
	
	createSteps: function(){
		this.step1 = this.createStepOne();
		this.step2 = this.createStepTwo();
			
		return [this.step1, this.step2];
	},
	
	createStepOne: function(){
		var view = App.timeline.assets.wikipedia.StepOne.create({model: this.model});
		return view;		
	},
	
	createStepTwo: function(){
		var view = App.timeline.assets.wikipedia.StepTwo.create({model: this.model});
		return view;		
	},	
	
	onDataLoad: function(data){
		this.step2.showData(data);			
	},
	
	isValid: function(){
		var valid = this.model.isValid();
		if (!valid) this.step1.accentuateInvalid();				
		return valid;
	},
	
	
	isNotValid: function(){
		return !this.isValid();
	}
	
	
});