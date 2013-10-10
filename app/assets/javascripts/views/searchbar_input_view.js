Mycollecto.SearchbarInput = Ember.TextField.extend({
  keyUp: function(e) {
    this.interpretKeyEvents(event);
    var controller = this.get('controller').get('controllers.points');
    if (e.keyCode == 13) {
      var customAddress = this.get('value');
      $('#map').spin();
      $.ajax({
        url: 'http://beta.geocoding.cloudmade.com/v3/92e5866dcc9e47179553d1c6ae09d4c9/api/geo.location.search.2',
        type: 'GET',
        dataType: 'jsonp',
        data: {
          format: 'json',
          source: 'OSM',
          enc: 'UTF-8',
          limit: 10,
          locale: 'en',
          q: customAddress + ' Bruxelles, Belgique'
        }
      }).then(doneCallbacks, failCallbacks)

      function doneCallbacks(data) {
        // var currentPos  = controller.get('controllers.points').currentUserPosition.latLng;
        var placeLat = data.places[0].position.lat;
        var placeLong = data.places[0].position.lon;
        var newlatlng = new L.LatLng(placeLat, placeLong);
        controller.get('currentUserPosition.marker').setLatLng(newlatlng);
        controller.get('currentUserPosition').setProperties({
          latLng: newlatlng,
          latitude: placeLat,
          longitude: placeLong
        });

        Mycollecto.Point.find({address: customAddress+' Bruxelles, Belgique', size: 204})
        .then(function(points){
          // Feed the content prop with the points
          controller.set('content', points);
          // And Redirect to closest point
          var point = points.objectAt(0);
          controller.transitionToRoute('point', point);
        });

        $('#map').spin(false);
        $('.searchbar .btn').first().toggleClass('hidden');
        $('.searchbar input').first().toggleClass('hidden').blur();

      }

      function failCallbacks (argument) {
        alert('Failed to locate the place');
      }
    }
  }
});
