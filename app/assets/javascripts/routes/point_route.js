Mycollecto.PointRoute = Ember.Route.extend({
  afterModel: function() {
    this.setBounds();
  },

  setBounds: function() {
    // debugger
    var self            = this;
    var pointController = self.controllerFor('points');
    var map             = pointController.map;
    var currentPos      = pointController.currentUserPosition.latLng;

    if (currentPos) {
      var x      = self.modelFor('point').get('latitude');
      var y      = self.modelFor('point').get('longitude');
      var pos    = new L.LatLng(x,y);
      var bounds = new L.LatLngBounds([pos, currentPos]);
      map.fitBounds(bounds, {padding: [40,40]});
      pointController.animateMarker(self.modelFor('point').get('id'));
    }
  }
});
