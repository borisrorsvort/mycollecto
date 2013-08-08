Mycollecto.PointsController = Em.ArrayController.extend({
  sortProperties: ['distanceFromUser'],
  sortDescending: true,

  limitedContent: function() {
    // in this case '2' is the limit parameter
    return this.get('content').slice(0, 10);
  }.property('content'),

  centerMap: function(model) {
    var x = model.get('x');
    var y = model.get('y');
    var pos = new google.maps.LatLng(x,y);
    Mycollecto.MapPoints.map.panTo(pos);
  },

  showDetails: function(point) {
    this.transitionToRoute('point', point);
  }

});
