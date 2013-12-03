/*global Mycollecto, Ember, $, window, mixpanel*/
Mycollecto.PointsIndexController = Ember.ArrayController.extend({
  needs: ["points"],
  actions: {
    showDetails: function (point) {
      mixpanel.track("View point details", {'via' : 'list'});
      this.transitionToRoute('point', point);
    }
  }
});