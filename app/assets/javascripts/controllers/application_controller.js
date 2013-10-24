Mycollecto.ApplicationController = Em.Controller.extend({
  userPosition: Ember.Object.create(),
  geoLocationDone: false,
  needs: ['path', 'map', 'points'],

  init: function() {
    controller = this;

    // Create Instance of Map
    var map =  Mycollecto.Map.create();
    controller.get("controllers.map").setProperties({
      'content': map
    });
    console.log('Create map object');

    // Create Instance of Map
    var path =  Mycollecto.Path.create();
    controller.get("controllers.path").setProperties({
      'content': path
    });
    console.log('Create path object');

    if (navigator.geolocation) {
      $('body').spin({top: 40});
      navigator.geolocation.getCurrentPosition(function(position){
        controller.onLocationFound(position);
      });
    } else {
      controller.onLocationNotFound();
    }
  },

  onLocationFound: function (position) {
    this.get('userPosition').setProperties({
      latLng: new L.LatLng(position.coords.latitude, position.coords.longitude),
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });

    this.get("controllers.path").setProperties({
      "origin": this.get('userPosition.latLng')
    });

    // Set props only then fire event
    this.set('geoLocationDone', true);
  },

  onLocationNotFound: function () {
    this.set('geoLocationDone', true);
    this.get('userPosition').setProperties({
      latLng: new L.LatLng(50.850539, 4.351745),
      latitude: 50.850539,
      longitude: 4.351745
    });
  },

  toggleSearchForm: function() {
    $('.searchbar .btn').first().toggleClass('hidden');
    $('.searchbar input').first().toggleClass('hidden').focus();
  },

  updatePathOrigin: function() {
    this.get('controllers.path').set("origin", this.get('userPosition.latLng'));
  }.observes('userPosition.latLng')

});

