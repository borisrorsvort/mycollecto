Mycollecto.MapPoints = {

  setCurrentUserPosition:function() {
    navigator.geolocation.getCurrentPosition(function(position) {
      Mycollecto.MapPoints.currentUserPosition = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      console.log('Get currentUserPosition: '+ position.coords.latitude + ' ' + position.coords.longitude)

      // Realease Application init
      Mycollecto.advanceReadiness();
    });
  },

  initMap: function() {

    var mapOptions = {
      zoom: 16,
      minZoom: 14,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true
    };

    // Map init

    Mycollecto.MapPoints.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    var map = Mycollecto.MapPoints.map;

    // Adding Marker for your current Position
    var currentPosition = new google.maps.Marker({
      position: Mycollecto.MapPoints.currentUserPosition,
      map: map,
      title: "you're here",
      icon: 'http://maps.google.com/mapfiles/marker_green.png',
      // icon: 'http://google-maps-icons.googlecode.com/files/walking-tour.png',
      clickable: true
    });

    // Center the map
    if ($('#map-canvas:visible').length === 0) {
      $('#map-canvas').show();
    }
    google.maps.event.trigger(Mycollecto.MapPoints.map, 'resize');
    Mycollecto.MapPoints.map.setZoom( Mycollecto.MapPoints.map.getZoom() );
    Mycollecto.MapPoints.map.setCenter(Mycollecto.MapPoints.currentUserPosition);

    setTimeout(function() {
      Mycollecto.MapPoints.loadMarkers(map);
    }, 200);
  },

  loadMarkers: function(map) {
    var points = Mycollecto.Point.find();

    Mycollecto.markers = [];
    points.forEach(function(point){
      var pos    = new google.maps.LatLng(point.get('x'), point.get('y'));
      var marker = new google.maps.Marker({
        position: pos,
        title: point.get('name'),
        // animation: google.maps.Animation.DROP,
        icon: 'http://google-maps-icons.googlecode.com/files/taxi.png',
        // icon: 'http://maps.google.com/mapfiles/marker_green.png',
        map: map,
        id: point.get('id')
      });
      Mycollecto.markers.push(marker);
    }, this);
  },

  animateMarker: function(id) {
    markers = $.grep(Mycollecto.markers, function(n, i){
      return n.id == id;
    });
    $.each(markers, function(index, val) {
      this.setAnimation(google.maps.Animation.DROP);
    });
  }
}
