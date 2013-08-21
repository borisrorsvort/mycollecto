Mycollecto.PointController = Em.ObjectController.extend({
  needs: ['points'],

  init: function() {
    this._super();
  },

  closeModal: function() {
    var self  = this;
    var modal = $('.modal');
    modal.modal('hide');
  },

  findItinirary: function() {
    // 1. Reverse geocode current User LatLng to get the address
    var geocoder     = new google.maps.Geocoder();
    var userLatLng   = this.get('controllers.points').currentUserPosition.get('latLng');
    var userAddress  = null;
    var x            = this.get('x');
    var y            = this.get('y');
    var pointAddress = this.get('address_fr');
    var pointPos     = x + ',' + y;

    console.dir(userLatLng);

    geocoder.geocode({'latLng': userLatLng}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        if (results[1]) {
          userAddress = results[1].formatted_address
        } else {
          alert('No results found');
        }
      } else {
        alert('Geocoder failed due to: ' + status);
      }
    });

    // 3. Build Link params for maps https://developer.apple.com/library/ios/#featuredarticles/iPhoneURLScheme_Reference/Articles/MapLinks.html
    // The source address, which is used when generating driving directions

    var linkUrl = 'http://maps.apple.com/?daddr='+userAddress+'&saddr='+pointAddress
    return linkUrl;
  }.property()
});
