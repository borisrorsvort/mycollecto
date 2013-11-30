/*global Mycollecto, Ember, $, window, mixpanel*/
Mycollecto.PointsIndexController = Ember.ArrayController.extend({
  needs: ["points"],
  actions: {
    showDetails: function (point) {
      mixpanel.track("View point details", {'via' : 'list'});
      this.transitionToRoute('point', point);
    }
  },
  redirectToNearest: function () {
    var controller = this;
    // redirect to closest point in we are not on show
    if (Mycollecto.Router.router.currentParams.point_id === undefined) {
      controller.transitionToRoute('point', this.get("content").objectAt(0));
    }
  }.observes("content.loaded")
});