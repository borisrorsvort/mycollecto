/*global Mycollecto, Ember, $, document*/
Mycollecto.PointsIndexRoute = Ember.Route.extend({
  activate: function () {
    $(document).attr('title', 'Mycollecto - Liste des Points Taxi Collecto Bruxelles');
  },
  renderTemplate: function () {
    this.render('points_index');
  },
});

