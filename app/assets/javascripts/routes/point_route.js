/*global Mycollecto, Ember*/
Mycollecto.PointRoute = Ember.Route.extend({
  model: function (params) {
    return Mycollecto.Point.find(params.point_id);
  }
});
