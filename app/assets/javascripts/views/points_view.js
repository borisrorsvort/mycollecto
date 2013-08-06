Mycollecto.PointsView = Em.View.extend({

  afterRenderEvent: function() {

    // Initialize scrolling events to center the map base on point location
    this.initScrollEvents();

    // Point list UX events
    this.initListInteractions();

    setTimeout(function() {
      Mycollecto.MapPoints.loadMarkers(Mycollecto.MapPoints.map);
    }, 1000);
  },

  initScrollEvents: function() {
    setTimeout(function() {
      $('.point-list .point-list--item').waypoint( function(direction) {
        $(this).find('.point-list--center-map').click();
      },{
        context: '.point-list'
      },{
        offset: 0
      });
    }, 500);
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
