Mycollecto.MapPoints = {
  init: function() {
    window.map_callback = function() {
      Mycollecto.MapPoints.mapSetup();
      console.log('GM V3 script Loaded');
    }
    $.getScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyBOmERV2C7zNuCtm4pSSoMfkGE8Rf-3wNM&sensor=true&callback=map_callback');
  },

  mapSetup: function() {
    google.maps.event.addDomListener(window, 'load', Mycollecto.MapPoints.initMap());
  },

  initMap: function() {

    var mapOptions = {
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true
    };

    // Map init
    Mycollecto.MapPoints.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    var map = Mycollecto.MapPoints.map;

    // Try HTML5 geolocation
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = new google.maps.LatLng(position.coords.latitude,
                                         position.coords.longitude);

        // Adding Marker for your current Position
        var currentPosition = new google.maps.Marker({
          position: pos,
          map: map,
          title: "you're here",
          icon: 'http://maps.google.com/mapfiles/marker_green.png',
          // icon: 'http://google-maps-icons.googlecode.com/files/walking-tour.png',
          clickable: true
        });

        // Center the map
        map.setCenter(pos);

        Mycollecto.MapPoints.loadMarkers(map);

      }, function() {
        Mycollecto.MapPoints.handleNoGeolocation(true);
      });

    } else {
      // Browser doesn't support Geolocation
      Mycollecto.MapPoints.handleNoGeolocation(false);
    }
  },

  handleNoGeolocation: function(errorFlag) {
    if (errorFlag) {
      var content = 'Error: The Geolocation service failed.';
    } else {
      var content = 'Error: Your browser doesn\'t support geolocation.';
    }

    var options = {
      map: map,
      position: new google.maps.LatLng(60, 105),
      content: content
    };

    var currentPosition = new google.maps.Marker({
      position: pos,
      map: map,
      title: "You're here",
      // icon: 'http://maps.google.com/mapfiles/marker_green.png',
      icon: 'http://google-maps-icons.googlecode.com/files/expert.png',
      clickable: true
    });
    map.setCenter(options.position);
  },

  loadMarkers: function(map) {
    var points = Mycollecto.Point.find();

    points.forEach(function(point){
      var pos   = new google.maps.LatLng(point.get('x'), point.get('y'));

      var marker = new google.maps.Marker({
        position: pos,
        title: point.get('name'),
        animation: google.maps.Animation.DROP,
        icon: 'http://google-maps-icons.googlecode.com/files/taxi.png',
        map: map
      });

      // console.dir(marker);
    }, this);
  }

}
