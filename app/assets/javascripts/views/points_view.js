Mycollecto.PointsView = Em.View.extend({
  classNames: ['points-wrapper point-list-scroller full-height col-xs-12 col-sm-4'],
  didInsertElement: function() {
    $('#map').show();
    $('.ember-application').spin(false);
    $('.point-list').spin();
  }
});
