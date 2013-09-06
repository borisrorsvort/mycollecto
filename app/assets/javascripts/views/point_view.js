Mycollecto.PointView = Em.View.extend({
  classNames  : ['point col-xs-12 col-sm-4'],
  didInsertElement: function() {
    var points_controller = this.get('controller').get('controllers.points');
    if (!points_controller.mapLoaded === true) {
      points_controller.set('mapLoaded', true);
      points_controller.initMap();
    }
  }
});
