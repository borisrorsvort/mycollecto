
Mycollecto.PointsController = Em.ArrayController.extend({
  sortProperties: ['distanceFromUser'],
  sortDescending: true,
  mapMarkers: [],
  mapCreated: null,
  needs: ['point', 'path', 'application', 'map'],

  initMap: function(){
    var controller = this;
    var userPosition = controller.get('controllers.application.userPosition');

    controller.get("controllers.map.tileLayer").addTo(controller.get("controllers.map.map"));

    controller.set('mapCreated', true);

  }.observes('content.isLoaded'),

  addUserPositionMarker: function() {

    var map = this.get("controllers.map.map");

    var myIcon = L.divIcon({
      html: '<i class="icon-user"/>',
      className: 'marker-custom marker-custom-user'
    });

    var userMarker = L.marker(this.get('controllers.application.userPosition.latLng'), {
      icon: myIcon
    }).addTo(map);

    // Assign marker and icon to UserPosition
    this.get('controllers.application.userPosition').setProperties({
      marker: userMarker,
      markerIcon: myIcon
    });

  }.observes('mapCreated'),

  updateUserMarkerPosition: function() {
    var userPos = this.get('controllers.application.userPosition');
    if (userPos.get('marker')) {
      userPos.get('marker').setLatLng(userPos.get('latLng'));
    }

  }.observes('controllers.application.userPosition.latLng'),

  loadPoints: function() {
    var controller = this;
    var userPosition = this.get('controllers.application.userPosition');
    Mycollecto.Point.find({latitude: userPosition.get('latitude'), longitude: userPosition.get('longitude'), size: 50}).then(function(points){
      // Feed the content prop with the points
      controller.set('content', points);
      // And Redirect to closest point
      controller.transitionToRoute('point', points.objectAt(0));
    });

  }.observes('controllers.application.geoLocationDone'),

  invalidateMapSize: function() {
    var controller = this;
    setTimeout(function() {
      controller.get('controllers.map.map').invalidateSize(true);
    }, 150);
  }.observes('mapCreated'),

  createMarkers: function() {
    var controller = this;
    var map        = this.get('controllers.map.map');

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

      var name      = point.get("nameFr")
      var popupHtml = "<a href='/#/"+pointId+"'>"+name+"</a>"

      marker.bindPopup(popupHtml, {closeButton: false}).addTo(map);

      // Adding click action to marker
      marker.on('click', function() {
        window.location = '/#/' + pointId;
        mixpanel.track("View point details", {'via' : 'map'});
        mixpanel.people.increment("point lookup", 1);
      });

      controller.mapMarkers.push(marker);
    });

  }.observes('mapCreated', 'content.@each'),

  showDetails: function(point) {
    mixpanel.track("View point details", {'via' : 'list'});
    this.transitionToRoute('point', point);
  },

  centerMap: function(model) {
    var controller = this;
    var x          = model.get('latitude');
    var y          = model.get('longitude');
    var pos        = new L.LatLng(x,y);
    controller.get('controllers.map.map').panTo(pos);
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
