/*global Mycollecto, Ember, $, mixpanel*/
Mycollecto.AboutView = Ember.View.extend({
  classNames  : ['row page-about'],

  afterRenderEvent: function () {
    mixpanel.track("View about page");
  }
});
