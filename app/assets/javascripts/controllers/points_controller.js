
Mycollecto.PointsController = Em.ArrayController.extend({
  sortProperties: ['distanceFromUser'],
  sortDescending: true,
  currentUserPosition: Ember.Object.create(),
  map: null,
  mapMarkers: [],
  panelVisible: true,

  init: function(){
    // Create map object
    var map        =  L.map('map',{zoom: 12});
    var osmUrl     = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    var osm        = new L.TileLayer(osmUrl,{
      zoom         : 12,
      detectRetina : true,
      reuseTiles   : true
    });
    map.addLayer(osm);
    map.on('locationfound', onLocationFound);
    map.on('locationerror', onLocationError);

    var controller          = this;
    var currentUserPosition = controller.get('currentUserPosition');

    controller.set("map", map);

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
      currentUserPosition.set('latitude', e.latlng.lat);
      currentUserPosition.set('longitude', e.latlng.lng);

      map.setView( e.latlng, 16, {animate: true} );

      controller.set('content', Mycollecto.Point.find({latitude: e.latlng.lat, longitude: e.latlng.lng, size: 40}));
    }

    function onLocationError(e) {
      controller.set('content', Mycollecto.Point.find());
    }

    map.locate({maximumAge: 2000});
    this._super();

  },

  createMarkers: function() {

    var controller = this;
    var map = controller.get('map');

    controller.get("model").forEach(function(point){
      var pointId = point.get('id');

      var myIcon = L.divIcon({
        html: pointId,
        className: 'marker-custom'
      });

      var marker = L.marker(new L.LatLng(point.get("latitude"), point.get("longitude")), {
        id: pointId,
        icon: myIcon
      }).bindPopup(point.get("nameFr"), {closeButton: false}).addTo(map);

      // Adding click action to marker
      marker.on('click', function() {
        window.location = '/#/points/' + pointId;
        mixpanel.track("View point details", {'via' : 'map'});
        mixpanel.people.increment("point lookup", 1);
      });

      controller.mapMarkers.push(marker);
      // point.recalculateDistanceFromUser(controller.get('currentUserPosition'));
    });

    // Setup Sroller - Here we are alomost sure the points are sorted already
    controller.initScrollEvents();
  }.observes('content.isLoaded'),

  showDetails: function(point) {
    mixpanel.track("View point details", {'via' : 'list'});
    mixpanel.people.increment("point lookup", 1);
    this.transitionToRoute('point', point);
  },

  centerMap: function(model) {
    var controller = this;
    //#TODO invert again when Oli fix the server
    var x          = model.get('latitude');
    var y          = model.get('longitude');
    var pos        = new L.LatLng(x,y);
    controller.map.panTo(pos);
    controller.animateMarker(model.get('id'));
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
