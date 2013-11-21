Mycollecto.AboutView = Em.View.extend({
  classNames  : ['row page-about'],

  afterRenderEvent: function() {
    mixpanel.track("View about page");
  }
});
