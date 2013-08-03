Mycollecto.PointsView = Em.View.extend({

  didInsertElement: function() {

    // Initialize scrolling events to center the map base on point location

    setTimeout(function() {
      $('.point-list .point-list--item').waypoint( function(direction) {
        $(this).find('.center-map-trigger').click();
      },{
        context: '.point-list'
      },{
        offset: 0
      });
    }, 500);
  }

});
