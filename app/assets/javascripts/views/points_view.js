Mycollecto.PointsView = Em.View.extend({
  didInsertElement: function() {
    $('#map').show();
    $('.ember-application').spin(false);
    $('.point-list').spin();

    var points_controller = this.get('controller');
    if (!points_controller.mapLoaded === true) {
      points_controller.set('mapLoaded', true);
      points_controller.initMap();
    }

    mixpanel.track("View points list");
  }
});
