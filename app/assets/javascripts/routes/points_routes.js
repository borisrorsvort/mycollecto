Mycollecto.PointsRoute = Ember.Route.extend({
  model: function() {
    return Mycollecto.Point.find();
  }
});
