Mycollecto.MapView = Em.View.extend({

  didInsertElement: function() {
    this._super();
    Mycollecto.MapPoints.init();
  }

});
