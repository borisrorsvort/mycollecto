Mycollecto.PointController = Em.ObjectController.extend({
  needs: ['points'],

  closeModal: function() {
    var self  = this;
    var modal = $('.modal');
    modal.modal('hide');
  },

  findItinirary: function() {
    var controller = this;
    // Reverse geocode current User LatLng to get the address
    var geocoder     = new google.maps.Geocoder();
    var currentPos   = controller.get('controllers.points').currentUserPosition.latLng;
    // debugger
    // var userLatLng   = currentPos.get('x')+','+currentPos.get('x');
    var pointAddress = controller.get('x')+','+controller.get('y');

    geocoder.geocode({'latLng': currentPos}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        if (results[1]) {
          var userLatLng = results[1].formatted_address;
          window.location = 'http://maps.apple.com/?daddr='+pointAddress+'&saddr='+userLatLng;

        } else {
          alert('No results found');
        }
      } else {
        alert('Geocoder failed due to: ' + status);
      }
    });

  }
});
