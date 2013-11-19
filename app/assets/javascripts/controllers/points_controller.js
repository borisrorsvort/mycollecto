
Mycollecto.PointsController = Em.ArrayController.extend({
  sortProperties: ['distanceFromUser'],
  sortDescending: true,
  mapMarkers: [],
  mapCreated: null,
  needs: ['point', 'path', 'application', 'map'],

  initMap: function(){

    var controller = this;
    var userPosition = controller.get('controllers.application.userPosition');

    controller.get("controllers.map.tileLayer").addTo(controller.get("controllers.map.map")).redraw();

    controller.set('mapCreated', true);
    $('body').spin(false);

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
    var userPosition = controller.get('controllers.application.userPosition');
    Mycollecto.Point.find({latitude: userPosition.get('latitude'), longitude: userPosition.get('longitude'), size: 50}).then(function(points){
      // Feed the content prop with the points
      controller.set('content', points);
      // prevent redreict twice
      var closest_point = points.objectAt(0);
      if (controller.get('controllers.point.content.id') !== closest_point.get('id')) {
        // And Redirect to closest point
        controller.transitionToRoute('point', closest_point);
      }
    });

  }.observes('controllers.application.geoLocationDone'),

  invalidateMapSize: function() {
    var controller = this;
    controller.get('controllers.map.map').invalidateSize(true);
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
  }

});
