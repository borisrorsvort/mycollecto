Mycollecto.AboutView = Em.View.extend({
  classNames  : ['row page-about'],

  afterRenderEvent: function() {
    $('#map').hide();
    mixpanel.track("View about page");
  }
});
