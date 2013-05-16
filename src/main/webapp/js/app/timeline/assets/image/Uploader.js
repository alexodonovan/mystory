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
						
		this.buttonAlign =  'right';
		this.buttons = this.createBtns();			
		
		this.addEvents({'uploaded': true});
	},	
	
	createBtns: function(){
		var btn = Ext.button.Button.create({
			text: 'Upload',
			handler: this.doSubmit,
			scope: this
		});
		
		 return [btn];
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
		this.fireEvent('uploaded');
	},
	
	doUpload: function(files){
//		var file = files[0];		
		var formData = new FormData();
    	formData.append("file", files[0]);

    	var xhr = new XMLHttpRequest();
    	xhr.onreadystatechange = Ext.bind(this.onStateChange, this, [xhr]);
    	xhr.open("POST", this.submitUrl);
    	xhr.send(formData);
		
//		var formData = new FormData();
//    	formData.append("file", files[0]);
//		
//		//Uploading - for Firefox, Google Chrome and Safari			
//		xhr = new XMLHttpRequest();		
//		xhr.onreadystatechange = Ext.bind(this.onStateChange, this, [xhr]);		
//		xhr.open("POST", this.submitUrl);
//		xhr.setRequestHeader("Content-type","multipart/form-data");
//		xhr.setRequestHeader("X-File-Name", file.name);
//		xhr.setRequestHeader("X-File-Size", file.size);
//		xhr.setRequestHeader("X-File-Type", file.type);
//		xhr.send(formData);		
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
