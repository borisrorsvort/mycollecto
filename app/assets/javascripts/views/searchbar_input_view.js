Mycollecto.SearchbarInput = Ember.TextField.extend({
  keyUp: function(e) {
    this.interpretKeyEvents(event);
    if (e.keyCode == 13) {
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
        }).then(doneCallbacks, failCallbacks);
      }

      function doneCallbacks(data) {
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
          Mycollecto.Point.find({address: customAddress+' Bruxelles, Belgique', size: 40})
          .then(function(points){
            // Feed the content prop with the points
            controller.set('content', points);
            // And Redirect to closest point
            var point = points.objectAt(0);
            controller.transitionToRoute('point', point);
          });

          $('#map').spin(false);
          $('.searchbar .btn').first().toggleClass('hidden');
          $('.searchbar input').first().val('').toggleClass('hidden').blur();

        } else {
          alert('We could not find the location');
        }
      }

      function failCallbacks (argument) {
        alert('Failed to locate the place');
      }
    }
  }
});
