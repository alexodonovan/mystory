storify_read_service = {
	"host": "localhost",
	"port": "8081",
	"context": "storify-read-service",
	"root": "timelines",
	"file": "data",
	
	url: function(param){
		var source = 'http://' + storify_read_service.host + ':'	 
								+ storify_read_service.port + '/'
								+ storify_read_service.context + '/'
								+ storify_read_service.root + '/'
								+ param + '/' 
								+ storify_read_service.file + '.';
														
		return source;
	}		 
};