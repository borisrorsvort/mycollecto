Mycollecto.PointsController = Em.ArrayController.extend({
  sortProperties: ['distanceFromUser'],
  sortDescending: true,

  limitedContent: function() {
    // in this case '2' is the limit parameter
    return this.get('content');
  }.property('content'),

  centerMap: function(model) {
    var x = model.get('x');
    var y = model.get('y');
    var pos = new google.maps.LatLng(x,y);
    // bounds = new google.maps.LatLngBounds(pos, Mycollecto.MapPoints.currentUserPosition)

    // Mycollecto.MapPoints.map.fitBounds(bounds);
    Mycollecto.MapPoints.map.panTo(pos);
    Mycollecto.MapPoints.animateMarker(model.get('id'));
    // Mycollecto.MapPoints.map.panToBounds(bounds);
  },

  showDetails: function(point) {
    this.transitionToRoute('point', point);
  }

});
