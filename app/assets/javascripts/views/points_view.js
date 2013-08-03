Mycollecto.PointsView = Em.View.extend({
  didInsertElement: function() {
    setTimeout(function() {
      $('.point-list .point-list--item').waypoint( function(direction) {
        var $active = $(this);
        var property, value;

        /* The waypoint is triggered at the top of each list item representing a dial section. When triggering in the down direction we want to use the dial section the waypoint is attached to. But in the up direction we want to use the previous dial section. */
        if (direction === "up") {
          $active = $active.prev();
        }

        /* If we triggered in the up direction and the result from 'prev' came back with an empty set of elements, it means we were on the first element in the list, and we should just use the original element. */
        if (!$active.length) {
          $active = $(this);
        }

        $active.find('.center-map-trigger').click();

      }, {
        context: '.point-list' // Make the scroll context the nearest ul.
      }, { offset: 20 });
    }, 1000);
  }
});
