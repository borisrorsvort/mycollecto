
Mycollecto.PointsController = Em.ArrayController.extend({
  sortProperties: ['distanceFromUser'],
  sortDescending: true,
  currentUserPosition: Ember.Object.create(),
  map: null,
  mapMarkers: [],
  panelVisible: true,

  init: function(){
    this._super();

    var controller          = this;
    var currentUserPosition = controller.get('currentUserPosition');

    // Map init
    var mapOptions = {
      zoom: 15,
      minZoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true
    };

    // Create map object
    controller.set("map", new google.maps.Map(document.getElementById('map-canvas'), mapOptions));
    var map = controller.get("map");

    navigator.geolocation.getCurrentPosition(function(position) {

      // Populate currentUserposition Object with Location data
      currentUserPosition.addObserver('latLng', function(){
        map.panTo(this.get('latLng'));
      });

      currentUserPosition.set('latLng', new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
      currentUserPosition.set('x', position.coords.latitude);
      currentUserPosition.set('y', position.coords.longitude);
      var mapLoaded = false;
      google.maps.event.addListener(controller.map, 'idle', function(){
      if(!mapLoaded){
          mapLoaded = true;
          // Create Markers
          controller.createMarkers(map);
        }
      });
    });



    // Refresh on resize
    google.maps.event.trigger(controller.map, 'resize');
    controller.map.setZoom(controller.map.getZoom());
  },

  createMarkers: function(map) {
    var controller = this;

    this.get("model").forEach(function(point){
      var marker = new google.maps.Marker({
        position:  new google.maps.LatLng(point.get("x"), point.get("y")),
        title: point.get('name'),
        icon: 'http://google-maps-icons.googlecode.com/files/taxi.png',
        map: map,
        id: point.get('id')
      });

      // Adding click action to marker
      google.maps.event.addListener(marker, 'click', function() {
        window.location = '/#/points/' + marker.id;
      });

      controller.mapMarkers.push(marker);
      point.recalculateDistanceFromUser(controller.get('currentUserPosition'));
    });

    var userMarker = new google.maps.Marker({
      position:  controller.currentUserPosition.latLng,
      icon: 'http://maps.google.com/mapfiles/marker_green.png',
      map: map
    });

    // Setup Sroller - Here we are alomost sure the points are sorted already
    controller.initScrollEvents();
  },

  showDetails: function(point) {
    this.transitionToRoute('point', point);
  },

  centerMap: function(model) {
    var x = model.get('x');
    var y = model.get('y');
    var pos = new google.maps.LatLng(x,y);
    this.map.panTo(pos);
    this.animateMarker(model.get('id'));
  },

  initScrollEvents: function() {
    setTimeout(function() {
      $('.point-list .point-list--item').waypoint( function(direction) {
        $(this).find('.point-list--center-map').click();
        console.log('test');
      },{
        context: '.point-list',
        continuous: false,
        offset: 2
      });
    }, 0);
  },

  animateMarker: function(id) {
    var controller = this;

    markers = $.grep(controller.mapMarkers, function(n, i){
      return n.id == id;
    });
    // Reset all icons
    // TODO add promises
    $.each(controller.mapMarkers, function(index, val) {
      this.setIcon('http://google-maps-icons.googlecode.com/files/taxi.png');
    });
    // Set Current current point new icon
    $.each(markers, function(index, val) {
      this.setIcon('http://google-maps-icons.googlecode.com/files/walking-tour.png');
    });
  },

  togglePanel: function() {
    this.toggleProperty('panelVisible');
  },

});
