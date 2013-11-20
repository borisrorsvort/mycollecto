Mycollecto.PointsController = Em.ArrayController.extend({
  userPosition: Ember.Object.create(),
  
  sortProperties: ['distanceFromUser'],
  sortDescending: true,
  mapMarkers: [],
  mapCreated: null,
  needs: ['point', 'path', 'pointsIndex'],

  init: function() {
    controller = this;
    mixpanel.track("View point details", {'via' : 'app init'});

    // Create Instance of Map
    var map =  Mycollecto.Map.create();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {controller.onLocationFound(position)}, function(position) {controller.onLocationNotFound(position)});
    } else {
      controller.onLocationNotFound();
    }
  },

  onLocationFound: function (position) {
    $('body').spin({top: '50%'});
    this.get('userPosition').setProperties({
      latLng: new L.LatLng(position.coords.latitude, position.coords.longitude),
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
    /*
    this.get("controllers.path").setProperties({
      "origin": this.get('userPosition.latLng')
    });
*/
    // Set props only then fire event
    this.userLocated();
  },

  onLocationNotFound: function () {
    $('body').spin({top: '50%'});
    this.get('userPosition').setProperties({
      latLng: new L.LatLng(50.850539, 4.351745),
      latitude: 50.850539,
      longitude: 4.351745
    });

   /* this.get("controllers.path").setProperties({
      "origin": this.get('userPosition.latLng')
    });*/
    console.log('Location Not found');
    // Set props only then fire event
    this.set('geoLocationDone', true);
    console.log(this.get('geoLocationDone'));
    this.userLocated();
  },

  
  userLocated: function(){
    controller = this;
    var userPosition = this.get('userPosition');
    Mycollecto.Point.find({latitude: userPosition.get('latitude'), longitude: userPosition.get('longitude'), size: 50}).then(function(points){
      // Feed the content prop with the points
      controller.set('content', points);
      controller.set('controllers.pointsIndex.model', points)
      // And Redirect to closest point
     // controller.transitionToRoute('point', points.objectAt(0));
    });
    
  },

});
