Mycollecto.PointsView = Em.View.extend({
  didInsertElement: function() {
    $('#map').show();
    $('.ember-application').spin(false);
    $('.point-list').spin();
  }
});
