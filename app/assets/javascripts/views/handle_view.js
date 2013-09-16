Mycollecto.HandleView = Em.View.extend({
  // templateName: 'handle',
  // classNames: ['handle'],

  // click: function() {
  //   var body = $('body');
  //   var view = this;
  //   if (body.hasClass('no-point-list')) {
  //     body.removeClass('no-point-list');
  //     mixpanel.track("Clicked on list handle", {'action': 'show panel' });
  //     this.toggleIcon('down');

  //   } else {
  //     body.addClass('no-point-list');
  //     mixpanel.track("Clicked on list handle", {'action': 'remove panel' });
  //     this.toggleIcon('up');
  //   }
  //   view.get('controller').toggleProperty('handleOpen');
  // },

  // toggleIcon: function(direction) {
  //   // var icon = $('.handle i');
  //   // if (direction === 'up') {
  //   //   icon.removeClass('icon-chevron-down').addClass('icon-chevron-up');
  //   // } else {
  //   //   icon.removeClass('icon-chevron-up').addClass('icon-chevron-down');
  //   // }
  // },

  // swipeOptions: {
  //   direction: Em.OneGestureDirection.Up | Em.OneGestureDirection.Down,
  //   cancelPeriod: 100,
  //   swipeThreshold: 10
  // },

  // touchMove: function(event) {
  //   event.preventDefault();
  // },

  // swipeEnd: function(recognizer, evt) {
  //   var direction = recognizer.get('swipeDirection');
  //   var body = $('body');

  //   if (direction === Em.OneGestureDirection.Up) {
  //     if (!body.hasClass('no-point-list')) {
  //       $('body').addClass('no-point-list');
  //     }
  //   } else if (direction === Em.OneGestureDirection.Down) {
  //     $('body').removeClass('no-point-list');
  //   }
  // }
});

