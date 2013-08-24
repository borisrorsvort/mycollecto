Mycollecto.PointController = Em.ObjectController.extend({
  needs: ['points'],

  closeModal: function() {
    var self  = this;
    var modal = $('.modal');
    modal.modal('hide');
  },

  findItinirary: function() {
    var controller   = this;
    var geocoder     = new google.maps.Geocoder();
    var currentPos   = controller.get('controllers.points').currentUserPosition.latLng;
    var pointLatLng  = new google.maps.LatLng(controller.get('x'), controller.get('y'));

    geocoder.geocode({'latLng': pointLatLng}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        if (results[0]) {
          debugger
          var pointAddress = results[0].formatted_address;
          window.location  = 'http://maps.apple.com/?daddr='+pointAddress+'&saddr='+currentPos.mb+','+currentPos.nb;
        } else {
          alert('No results found');
        }
      } else {
        alert('Geocoder failed due to: ' + status);
      }
    });
    mixpanel.track("Find Itinerary");
  }
});
