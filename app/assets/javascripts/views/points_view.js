Mycollecto.PointsView = Em.View.extend({
  afterRenderEvent: function() {
    $('.ember-application').spin(false);
    $('.point-list').spin();

    mixpanel.track("View points list");
  }
});
