import Ember from 'ember';

export default Ember.Service.extend({
  loading: false,
  mapPosition: Ember.Object.create({
    lat: 50.850539,
    lng: 4.351745,
    zoom: 15
  }),

  userPosition: Ember.Object.create({ lat: null, lng: null }),
  userLocation: Ember.computed('userPosition.lat', 'userPosition.lng', function() {
    return [this.get("userPosition.lat"), this.get("userPosition.lng")];
  }),

  getPosition () {
    // Center first if last location known
    if (this.get('userPosition.lat')) {
      this.centerOnUserPosition();
    }

    // Get new location in case its has changed
    this.set('loading', true);
    return new Ember.RSVP.Promise((success, error) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
      } else {
        error( new Error("Geolocation is not supported by this browser.") );
      }
    }).then((position) => {
      this.updatePositions(position.coords);
    }).catch(() => {
      new Error("Geolocation must be enabled in order to locate you.");
    }).finally(() => {
      this.set('loading', false);
    });
  },

  centerOnUserPosition () {
    this.get('mapPosition').setProperties(this.get('userPosition'));
  },

  updatePositions (position) {
    var {latitude, longitude} = position;

    this.get('userPosition').setProperties({ lat: latitude, lng: longitude, zoom: 18 });
    this.centerOnUserPosition();
  },

  getDirection (model) {
    var userPosition = this.get('userPosition'),
        lat = model.get('latitude'),
        lng = model.get('longitude');
    return `http://maps.google.com/maps?&daddr=${lat},${lng}&saddr=${userPosition.lat},${userPosition.lng}`;
  }
});
