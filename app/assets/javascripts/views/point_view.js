Mycollecto.PointView = Em.View.extend({
  classNames  : ['point'],
  afterRenderEvent: function() {
    $('.modal').modal('show');
  }
});
