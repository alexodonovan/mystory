Ext.define('App.timeline.assets.image.Uploader', {
	extend : 'Ext.form.FormPanel',
			
	submitUrl: 'asset-images',

	hidden: true,	
	fileUpload: true,  
	autoHeight: true,
	bodyStyle: 'padding: 10px',
	border: false,
	height: 110,
	
	initComponent: function(){	
		this.items = this.buildItems();
		this.callParent();										
		
		this.addEvents('uploaded', 'progress');
	},	
		
	buildItems: function(){	
		this.fileUploadField = this.createFileUploadField();				
		this.employeeIdField = this.createHiddenEmployeeIdField();			
		
		return [this.fileUploadField, this.employeeIdField];
	},
	
	createFileUploadField: function(){
		var field = Ext.form.field.File.create({
			name: 'imageUploadField',
			id: 'image-id',
			fieldLabel: 'Choose File',
			anchor: '90%',
			buttonCfg: {
                text: '',
                iconCls: 'icon-upload-file'
            }
		});		
		return field;				
	},	
	
	onStateChange: function(req){		
		if (req.readyState != 4) return;
		var resp = Ext.JSON.decode(req.response);
		this.fireEvent('uploaded', resp.id);
	},
	
	progressUpdate: function(evt){		
		if (!evt.lengthComputable) return;
		var val = evt.loaded / evt.total;
		this.fireEvent('progress', val);		
	},
	
	doUpload: function(files){
		var formData = new FormData();
    	formData.append("file", files[0]);    	    	
    	var xhr = new XMLHttpRequest();
    	xhr.onreadystatechange = Ext.bind(this.onStateChange, this, [xhr]);
    	xhr.upload.addEventListener('progress', Ext.bind(this.progressUpdate, this), false);
    	xhr.open("POST", this.submitUrl);
    	xhr.send(formData);
	},
			
	click: function(rec){
		this.record = rec;		
		this.employeeIdField.setValue(rec.get('employeeId'));				
		this.fileUploadField.fileInput.dom.click();		
	},
	
	onWindowCloseEvt: function(){
		alert('window closed');
	},	
		
	onFileSelect: function(){				
		this.doSubmit();							
	},
	
	doSubmit: function(){				
		this.getForm().submit({
			url : this.submitUrl,
			waitMsg: 'Uploading...',
			success: this.onSuccessfulUpload.createDelegate(this),
			failure: this.onFailedUpload.createDelegate(this)
		});
		
	},
	
	onFailedUpload: function(){
		if (this.win) this.win.hide();
		this.showErrorMessage({msg: 'Upload Failed. Unrecognised Image Format.'});		
	},
	
	showErrorMessage: function(obj){
		Ext.Msg.alert('Problem', obj.msg);	
	},
	
	onSuccessfulUpload: function(fp, o){
		debugger;
		if (this.win) this.win.hide();
		this.fireEvent('uploaded', this.record);
		this.fileUploadField.clear();
	},	
	
	createHiddenEmployeeIdField: function(){
		var employee = Ext.form.field.Hidden.create({
					hideLabel : true,
					name : 'employeeId'					
				});
		return employee;
	}
        
});
