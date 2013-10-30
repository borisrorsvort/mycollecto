Mycollecto.SearchbarInput = Ember.TextField.extend({
  keyUp: function(e) {
    this.interpretKeyEvents(e);
    if (e.keyCode == 13) {
      this.findNewAddressPosition();
    }
  },

  findNewAddressPosition: function() {
    var controller = this.get('controller').get('controllers.points');
    var userPosition = this.get('controller.userPosition');
    var customAddress = this.get('value');
    if (this.get('oldCustomAddress') !== customAddress) {
      this.set('oldCustomAddress', customAddress);
      $('#map').spin();
      $.ajax({
        url: 'http://nominatim.openstreetmap.org/search',
        type: 'GET',
        dataType: 'json',
        data: {
          format: 'json',
          q: customAddress + ' Bruxelles, Belgique'
        }
      }).then(
      // success
      function(data) {
        if (data.length > 0) {
          var placeLat = data[0].lat;
          var placeLong = data[0].lon;
          var newlatlng = new L.LatLng(placeLat, placeLong);

          // Update user Position
          userPosition.setProperties({
            latLng: newlatlng,
            latitude: placeLat,
            longitude: placeLong
          });

          // Find closests points
          Mycollecto.Point.find({address: customAddress+' Bruxelles, Belgique', size: 40}).then(function(points){
            // Feed the content prop with the points
            controller.set('content', points);
            // And Redirect to closest point
            var point = points.objectAt(0);
            controller.transitionToRoute('point', point);
          });

          $('#map').spin(false);
          $('.searchbar .btn').first().toggleClass('hidden');
          $('.searchbar input').first().val('').toggleClass('hidden').blur();
          mixpanel.track("Search: Address found");

        } else {
          mixpanel.track("Search: Couldn find address");
          alert('We could not find the location');
        }
      },
      // fail
      function(argument) {
        alert('Failed to locate the place');
        mixpanel.track("Search: Failed to locate the place");
      });
    }
  }
});
