Mycollecto.PointsView = Em.View.extend({
  afterRenderEvent: function() {
    $('.ember-application').spin(false);
    $('.point-list').spin();
    // Initialize scrolling events to center the map base on point location
  //  this.initScrollEvents();

    // Point list UX events
  //  this.initListInteractions();

    // Render Map
 //   Mycollecto.MapPoints.initMap();
  },

  initScrollEvents: function() {
    setTimeout(function() {
      $('.point-list .point-list--item').waypoint( function(direction) {
        $(this).find('.point-list--center-map').click();
      },{
        context: '.point-list',
        continuous: false,
        offset: 2
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
