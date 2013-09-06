Mycollecto.ApplicationRoute = Ember.Route.extend({
  model: function() {
    Mycollecto.globalMap.create();
  }
});
