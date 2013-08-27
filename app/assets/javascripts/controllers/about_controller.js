Mycollecto.AboutController = Em.Controller.extend({
  needs: ['points'],
  switchToPoints: function() {
    this.transitionToRoute('points');
  }
});
