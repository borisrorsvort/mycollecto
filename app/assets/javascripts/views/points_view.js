/*global Mycollecto, Ember, $, mixpanel*/
Mycollecto.PointsView = Ember.View.extend({
  didInsertElement: function () {
    $('#map').show();
    $('.ember-application').spin(false);
    $('.point-list').spin();
  }
});
