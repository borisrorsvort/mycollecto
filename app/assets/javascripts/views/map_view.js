Mycollecto.MapView = Em.View.extend({

  didInsertElement: function() {
    this._super();
    this.loadMap();
  },

  initializeMap: function() {
    function initialize() {
      var mapOptions = {
        center: new google.maps.LatLng(-34.397, 150.644),
        zoom: 8,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      var map = new google.maps.Map(document.getElementById("map-canvas"),
          mapOptions);
    }
    google.maps.event.addDomListener(window, 'load', initialize);
  },

  loadMap: function() {
    var self = this;
    window.map_callback = function() {
      self.initializeMap();
    }
    $.getScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyBOmERV2C7zNuCtm4pSSoMfkGE8Rf-3wNM&sensor=true&callback=map_callback');
  }
});
