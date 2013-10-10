
Mycollecto.PointsController = Em.ArrayController.extend({
  sortProperties: ['distanceFromUser'],
  sortDescending: true,
  currentUserPosition: Ember.Object.create(),
  map: null,
  mapMarkers: [],
  panelVisible: true,
  handleOpen: false,
  mapLoaded: false,
  path: undefined,
  needs: ['point'],
  initMap: function(){

    var controller          = this;

    controller.set("map", L.map('map'));
    var currentUserPosition = controller.get('currentUserPosition');
    var map                 = controller.get('map');

    var layer = L.tileLayer('http://{s}.tile.cloudmade.com/{key}/110494/256/{z}/{x}/{y}.png', {
      key: '92e5866dcc9e47179553d1c6ae09d4c9',
      detectRetina: true,
      maxZoom: 18,
      reuseTiles: true,
      updateWhenIdle: true
    }).addTo(map);

    path =  Mycollecto.Path.create();
    path.set("map", map);
    path.set("pointController", this.get("controllers.point"));
    map.on('locationfound', onLocationFound);
    map.on('locationerror', onLocationError);
    controller.set("path",path);
    controller.set("map", map);

    map.locate({maximumAge: 2000}).on('locationfound', function(e) {
      controller.setupUserPosition(e, currentUserPosition, map)
      controller.setupMapWithPoints(e, map, controller);
    })
    .on('locationerror', function() {
      console.log("Location error");
      controller.set('content', Mycollecto.Point.find({size: 204}));
    });
  },

  setupUserPosition: function(e, currentUserPosition, map) {
    var myIcon = L.divIcon({
      html: '<i class="icon-user"/>',
      className: 'marker-custom marker-custom-user'
    });

    var userMarker = L.marker(e.latlng, {
      icon: myIcon
    }).addTo(map);

    this.get('currentUserPosition').setProperties({
      marker: userMarker,
      markerIcon: myIcon,
      latLng: e.latlng,
      latitude: e.latlng.lat,
      longitude: e.latlng.lng
    });
  },

  setupMapWithPoints: function(e, map, controller) {
    map.setView( e.latlng, 17, {animate: true} );
    Mycollecto.Point.find({latitude: e.latlng.lat, longitude: e.latlng.lng, size: 204}).then(function(points){
      // Feed the content prop with the points
      controller.set('content', points);
      // And Redirect to closest point
      controller.transitionToRoute('point', points.objectAt(0));
    });
  },

  invalidateMapSize: function() {
    var controller = this;
    setTimeout(function() {
      controller.map.invalidateSize(true);
    }, 150);
  }.observes('mapLoaded'),


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

  }.observes('content.isLoaded'),

  showDetails: function(point) {
    mixpanel.track("View point details", {'via' : 'list'});
    mixpanel.people.increment("point lookup", 1);
    this.transitionToRoute('point', point);
  },

  centerMap: function(model) {
    var controller = this;

    var x          = model.get('latitude');
    var y          = model.get('longitude');
    var pos        = new L.LatLng(x,y);
    controller.map.panTo(pos);
    controller.animateMarker(model.get('id'));
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
  }

});
