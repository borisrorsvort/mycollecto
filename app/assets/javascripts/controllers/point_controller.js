Mycollecto.PointController = Em.ObjectController.extend({
  closeModal: function() {
    var self  = this;
    var modal = $('.modal');
    modal.modal('hide');
  },

  findItinirary: function(point) {
    // 1. Reverse geocode current User LatLng to get the address
    // 2. set variables
    var pointAddress,
        pointPos,
        userAddress,
        userPos;

    // 3. Build Link params for maps https://developer.apple.com/library/ios/#featuredarticles/iPhoneURLScheme_Reference/Articles/MapLinks.html
    // 4. Forrward to that url
  }
});
