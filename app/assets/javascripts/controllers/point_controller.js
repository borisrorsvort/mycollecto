Mycollecto.PointController = Em.ObjectController.extend({
  closeModal: function() {
    var self  = this;
    var modal = $('.modal');

    modal.modal('hide');

    modal.on('hidden.bs.modal', function () {
      self.transitionToRoute('points');
    });
  }
});
