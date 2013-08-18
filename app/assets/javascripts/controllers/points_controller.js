
Mycollecto.PointsController = Em.ArrayController.extend({
  sortProperties: ['distanceFromUser'],
  sortDescending: true,
  currentUserPosition: Ember.Object.create(),
  geolocPosition: Ember.Object.create(),
  init: function(){
    this._super();
    var currentUserPosition = this.get('currentUserPosition');
    var geolocPosition = this.get('geolocPosition');

    var mapOptions = {
      zoom: 15,
      minZoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true
    };

    // Map init

    this.set("map", new google.maps.Map(document.getElementById('map-canvas'), mapOptions));

    map = this.get("map");
    controller = this;
    navigator.geolocation.getCurrentPosition(function(position) {
      
      currentUserPosition.addObserver('latLng', function(){
        map.panTo(this.get('latLng'));
      });
      currentUserPosition.set('latLng',new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
      currentUserPosition.set('x', position.coords.latitude);
      currentUserPosition.set('y', position.coords.longitude);
       
      geolocPosition.set('latLng',new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
      geolocPosition.set('x', position.coords.latitude);
      geolocPosition.set('y', position.coords.longitude);
      controller.get("model").forEach(function(point){
      var marker = new google.maps.Marker({
          position:  new google.maps.LatLng(point.get("x"), point.get("y")),
          title: point.get('name'),
          icon: 'http://google-maps-icons.googlecode.com/files/taxi.png',
          // icon: 'http://maps.google.com/mapfiles/marker_green.png',
          map: map,
          id: point.get('id')
        });
      point.recalculateDistanceFromUser(geolocPosition);
      });

    });
  },



 
  showDetails: function(point) {
    this.transitionToRoute('point', point);
  }

});
