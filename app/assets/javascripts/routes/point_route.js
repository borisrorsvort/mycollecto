/*global Mycollecto, Ember, L, $, document*/
Mycollecto.PointRoute = Ember.Route.extend({

  model: function (params) {
    return Mycollecto.Point.find(params.point_id);
  },

  afterModel: function (model, transition) {
    if (model) {
      $(document).attr('title', 'Mycollecto - Point Collecto Bruxelles: ' + model.get('fullName') + ' - ' + model.get('id'));
    }
  },

  setupController: function (controller, model) {
    var x = model.get('latitude');
    var y = model.get('longitude');
    var newlatlng = new L.LatLng(x, y);
    controller.get("controllers.points.targetPosition").setProperties({
      latLng: newlatlng,
      latitude: x,
      longitude: y
    });
    controller.set('model', model);
  }

});
