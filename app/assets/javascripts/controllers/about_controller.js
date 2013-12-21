/*global Mycollecto, Ember*/
Mycollecto.AboutController = Ember.Controller.extend({
  needs: ['points'],
  actions : {
    switchToPoints: function () {
      this.transitionToRoute('points');
    }
  }
});
