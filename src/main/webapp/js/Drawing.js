function initialize() {
  var mapOptions = {
    center: new google.maps.LatLng(53.2734, -7.77832031),
    zoom: 8,
    mapTypeId: google.maps.MapTypeId.TERRAIN,
    panControl: true,
    zoomControl: true,
    zoomControlOptions: {
  	  style: google.maps.ZoomControlStyle.LARGE
    },
    streetViewControl: false,
    mapTypeControl: false   
  };

  var map = new google.maps.Map(document.getElementById('map-canvas'),
    mapOptions);

  var drawingManager = new google.maps.drawing.DrawingManager({
    drawingMode: google.maps.drawing.OverlayType.CIRCLE,
    drawingControl: true,   
    drawingControlOptions: {
      position: google.maps.ControlPosition.LEFT_TOP,
      drawingModes: [
        google.maps.drawing.OverlayType.MARKER,
        google.maps.drawing.OverlayType.CIRCLE,        
      ]     
    },   
    circleOptions: {
      fillColor: '#FF0000',
      strokeColor: "#FF0000",
      fillOpacity: 0.35,
      strokeWeight: 1,
      clickable: false,
      editable: true,
      zIndex: 1
    }
  });
  
  
  drawingManager.setMap(map);
  
  google.maps.event.addListener(drawingManager, 'circlecomplete', function(circle) {
	  google.maps.event.addListener(circle, 'center_changed', function(){
		  circle.setMap(null);	  
	  	});
  });
}

google.maps.event.addDomListener(window, 'load', initialize);

