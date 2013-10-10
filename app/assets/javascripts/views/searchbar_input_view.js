Mycollecto.SearchbarInput = Ember.TextField.extend({
  keyUp: function(e) {
    this.interpretKeyEvents(event);
    var controller = this.get('controller').get('controllers.points');
    if (e.keyCode == 13) {
      Mycollecto.Point.find({address: this.get('value'), size: 20}).then(function(points){
        // Feed the content prop with the points
        controller.set('content', points);
        // And Redirect to closest point
        var point = points.objectAt(0);
        controller.transitionToRoute('point', point);
      });
    }
  }
});
