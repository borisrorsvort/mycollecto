Mycollecto.PointView = Em.View.extend({
  classNames  : ['point'],
  afterRenderEvent: function() {
    $('.modal').modal('show');
  }

  // click: function(evt) {
  //   this.get('controller').send('closeModal');
  // }

});
