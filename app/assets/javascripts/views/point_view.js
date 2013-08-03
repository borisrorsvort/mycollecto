Mycollecto.PointView = Em.View.extend({

  didInsertElement: function() {
    $('.modal').modal('show');
  },

  click: function(evt) {
    this.get('controller').send('closeModal');
  }

});
