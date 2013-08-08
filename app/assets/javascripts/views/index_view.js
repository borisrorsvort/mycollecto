Mycollecto.IndexView = Em.View.extend({
  classNames  : ['row homepage'],

  afterRenderEvent: function() {
    $('#map-canvas').hide();
  }
});
