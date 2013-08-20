Mycollecto.PointsView = Em.View.extend({
  afterRenderEvent: function() {
    $('.ember-application').spin(false);
    $('.point-list').spin();

    // Point list UX events
    this.initListInteractions();
  },

  initListInteractions: function() {
    var handle = $('.handle');
    handle.on('click', function(event) {
      if ($('body').hasClass('no-point-list')) {
        $('body').removeClass('no-point-list');
      } else {
        $('body').addClass('no-point-list');
      }
    });

    var swipeHandle = $$('.handle'); // cant use the same selector because QuOJs has its own
    swipeHandle.swipeDown(function() {
      $('body').addClass('no-point-list');
    });

    swipeHandle.swipeUp(function() {
      $('body').removeClass('no-point-list');
    });
  }
});
