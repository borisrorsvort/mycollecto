/*global Mycollecto, Ember, $, document*/
Mycollecto.PointsIndexRoute = Ember.Route.extend({
  activate: function () {
    $(document).attr('title', 'Mycollecto - Trouvez votre arrêt taxi Collecto le plus proche - Vindt de dichtsbijzijnde Collecto taxi haltes');
  },
  renderTemplate: function () {
    this.render('points_index');
  },
});

