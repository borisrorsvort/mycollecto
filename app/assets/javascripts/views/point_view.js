Mycollecto.PointView = Em.View.extend({
  classNames  : ['point'],
  didInsertElement: function() {
    var self = this;
    $('.modal').modal('show');
    $('.modal').on('hide.bs.modal', function () {
      $('.modal-backdrop').fadeOut();
      self.get('controller').transitionToRoute('points');
    });

  }
});
