
Mycollecto.PointsController = Em.ArrayController.extend({
  sortProperties: ['distanceFromUser'],
  sortDescending: true,
  currentUserPosition: Ember.Object.create(),
  map: null,
  mapMarkers: [],
  panelVisible: true,
  handleOpen: false,

  init: function(){
    // Create map object
    var map =  L.mapbox.map('map', 'borisrorsvort.map-frkowyyy', {
      detectRetina: true
    });

    map.on('locationfound', onLocationFound);
    map.on('locationerror', onLocationError);

    var controller          = this;
    var currentUserPosition = controller.get('currentUserPosition');

    controller.set("map", map);

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

      map.setView( e.latlng, 17, {animate: true} );

      controller.set('content', Mycollecto.Point.find({latitude: e.latlng.lat, longitude: e.latlng.lng, size: 40}));
    }

    function onLocationError(e) {
      controller.set('content', Mycollecto.Point.find());
    }

    map.locate({maximumAge: 2000});
    this._super();

  },


  invalidateMapSize: function() {
    var controller = this;
    setTimeout(function() {
      controller.map.invalidateSize(true);
    }, 150);
  }.observes('handleOpen'),


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
      });

      var name = point.get("nameFr")
      popupHtml = "<a href='/#/"+pointId+"'>"+name+"</a><a href='/#/"+pointId+"'><i class='icon-circled-right' style:'margin-left: 10px'/></a>"

      marker.bindPopup(popupHtml, {closeButton: false}).addTo(map);

      // Adding click action to marker
      marker.on('click', function() {
        window.location = '/#/' + pointId;
        mixpanel.track("View point details", {'via' : 'map'});
        mixpanel.people.increment("point lookup", 1);
      });

      controller.mapMarkers.push(marker);

    });

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
        offset: 1
      });
    }, 10);
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
