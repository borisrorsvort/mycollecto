Mycollecto.PointsView = Em.View.extend({
  afterRenderEvent: function() {
    $('#map').show();
    $('.ember-application').spin(false);
    $('.point-list').spin();

    mixpanel.track("View points list");
  }
});
