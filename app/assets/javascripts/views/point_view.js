Mycollecto.PointView = Em.View.extend({

  afterRenderEvent: function() {
    $('.modal').modal('show');
  }

  // click: function(evt) {
  //   this.get('controller').send('closeModal');
  // }

});
