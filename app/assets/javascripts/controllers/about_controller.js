/*global Mycollecto, Ember*/
Mycollecto.AboutController = Ember.Controller.extend({
  needs: ['points'],
  switchToPoints: function () {
    this.transitionToRoute('points');
  }
});
