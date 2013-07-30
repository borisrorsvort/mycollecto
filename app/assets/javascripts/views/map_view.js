Mycollecto.MapView = Em.View.extend({

  didInsertElement: function() {
    this._super();
    this.loadMap();
  },

  mapSetup: function() {
    var map;
    var self = this;

    function initialize() {
      var mapOptions = {
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      // Map init
      map = new google.maps.Map(document.getElementById('map-canvas'),
          mapOptions);

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
            clickable: true
          });

          // Center the map
          map.setCenter(pos);

          self.loadMarkers(map);

        }, function() {
          handleNoGeolocation(true);
        });

      } else {
        // Browser doesn't support Geolocation
        handleNoGeolocation(false);
      }
    }

    function handleNoGeolocation(errorFlag) {
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
        icon: 'http://maps.google.com/mapfiles/marker_green.png',
        clickable: true
      });
      map.setCenter(options.position);
    }

    google.maps.event.addDomListener(window, 'load', initialize);

    // load Markers
  },

  loadMap: function() {
    var self = this;
    window.map_callback = function() {
      self.mapSetup();
      console.log('V3 script Load');
    }
    $.getScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyBOmERV2C7zNuCtm4pSSoMfkGE8Rf-3wNM&sensor=true&callback=map_callback');
  },

  loadMarkers: function(map) {
    var points = Mycollecto.Point.find();

    points.forEach(function(point){
      var pos   = new google.maps.LatLng(point.get('x'), point.get('y'));

      var marker = new google.maps.Marker({
        position: pos,
        title: point.get('name'),
        animation: google.maps.Animation.DROP,
        icon: 'http://maps.google.com/mapfiles/marker.png',
        map: map
      });

      console.dir(marker);
    }, this);
  }

});
