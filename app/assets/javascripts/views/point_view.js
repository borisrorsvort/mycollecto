Mycollecto.PointView = Em.View.extend({
  classNames  : ['point'],
  didInsertElement: function() {
    this.setBounds();
  },

  setBounds: function() {
    var self  = this;
    var map   = self.get('controller').get('controllers.points').map;

    if (self.get('controller').get('controllers.points').currentUserPosition.latLng) {
      var x      = self.get('controller').get('model.latitude');
      var y      = self.get('controller').get('model.longitude');
      var pos    = new L.LatLng(x,y);
      var bounds = new L.LatLngBounds([pos, self.get('controller').get('controllers.points').currentUserPosition.latLng]);
      map.fitBounds(bounds, {padding: [40,40]});
      self.get('controller').get('controllers.points').animateMarker(self.get('controller').get('model.id'));
    }
  }
});
