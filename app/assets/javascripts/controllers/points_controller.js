
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
      zoom    : 12
    };

    // Create map object
    controller.set("map", L.map('map', mapOptions));
    var map        = controller.get("map");
    var osmUrl     = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    var osm        = new L.TileLayer(osmUrl,{
      zoom         : 12,
      detectRetina : true,
      reuseTiles   : true
    });
    map.addLayer(osm);

    var attrib = new L.Control.Attribution({
      prefix: 'Map data © openstreetmap',
      position: 'topright'
    }).addTo(map);

    function onLocationFound(e) {

      var myIcon = L.divIcon({
        html: '<i class="icon-user"/>',
        className: 'marker-custom marker-custom-user'
      });

      var user = L.marker(e.latlng, {
        icon: myIcon
      }).addTo(map);

      currentUserPosition.set('latLng', e.latlng);
      currentUserPosition.set('x', e.latlng.latitude);
      currentUserPosition.set('y', e.latlng.longitude);

      map.setView( e.latlng, 16, {animate: true} );
      // Create Markers
      controller.createMarkers(map);
    }

    function onLocationError(e) {
      alert(e.message);

      // Create Markers
      controller.createMarkers(map);
    }

    map.on('locationfound', onLocationFound);
    map.on('locationerror', onLocationError);

    map.locate({maximumAge: 2000});
  },

  createMarkers: function(map) {
    var controller = this;

    controller.get("model").forEach(function(point){
      var pointId = point.get('id');

      var myIcon = L.divIcon({
        html: pointId,
        className: 'marker-custom'
      });

      var marker = L.marker(new L.LatLng(point.get("x"), point.get("y")), {
        id: pointId,
        icon: myIcon
      }).bindPopup(point.get("name_fr"), {closeButton: false}).addTo(map);

      // Adding click action to marker
      marker.on('click', function() {
        window.location = '/#/points/' + pointId;
        mixpanel.track("View point details", {'via' : 'map'});
      });

      controller.mapMarkers.push(marker);
      // point.recalculateDistanceFromUser(controller.get('currentUserPosition'));
    });

    // Setup Sroller - Here we are alomost sure the points are sorted already
    controller.initScrollEvents();
  },

  showDetails: function(point) {
    mixpanel.track("View point details", {'via' : 'list'});
    this.transitionToRoute('point', point);
  },

  centerMap: function(model) {
    var x = model.get('x');
    var y = model.get('y');
    var pos = new L.LatLng(x,y);
    this.map.panTo(pos);
    this.animateMarker(model.get('id'));
  },

  initScrollEvents: function() {
    setTimeout(function() {
      $('.point-list .point-list--item').waypoint( function(direction) {
        $(this).find('.point-list--center-map').click();
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
      return n.options.id == id;
    });

    // Reset all icons
    // TODO add promises
    $.each(controller.mapMarkers, function(index, val) {
      this.closePopup();
    });
    // Set Current current point new icon
    $.each(markers, function(index, val) {
      this.openPopup();
    });
  },

  togglePanel: function() {
    this.toggleProperty('panelVisible');
  },

});
