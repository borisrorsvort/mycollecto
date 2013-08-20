Mycollecto.HandleView = Em.View.extend({
  templateName: 'handle',
  classNames: ['handle'],

  click: function() {
    var body = $('body');
    if (body.hasClass('no-point-list')) {
      body.removeClass('no-point-list');
    } else {
      body.addClass('no-point-list');
    }

    // var swipeHandle = $$('.handle'); // cant use the same selector because QuOJs has its own
    // swipeHandle.swipeDown(function() {
    //   $('body').addClass('no-point-list');
    // });

    // swipeHandle.swipeUp(function() {
    //   $('body').removeClass('no-point-list');
    // });
  },

  swipeOptions: {
    direction: Em.OneGestureDirection.Up | Em.OneGestureDirection.Down,
    cancelPeriod: 100,
    swipeThreshold: 10
  },

  touchMove: function(event) {
    event.preventDefault();
  },

  swipeEnd: function(recognizer, evt) {
    var direction = recognizer.get('swipeDirection');
    var body = $('body');

    if (direction === Em.OneGestureDirection.Up) {
      if (!body.hasClass('no-point-list')) {
        $('body').addClass('no-point-list');
      }
    } else if (direction === Em.OneGestureDirection.Down) {
      $('body').removeClass('no-point-list');
    }
  }
});
