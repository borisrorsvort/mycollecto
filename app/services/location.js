import Ember from 'ember';

export default Ember.Service.extend({
  loading: false,
  mapPosition: Ember.Object.create({
    lat: 50.850539,
    lng: 4.351745,
    zoom: 13
  }),

  userPosition: Ember.Object.create({ lat: null, lng: null }),
  userLocation: Ember.computed('userPosition.lat', 'userPosition.lng', function() {
    return [this.get("userPosition.lat"), this.get("userPosition.lng")];
  }),

  getPosition () {
    if (this.get('loading') === true) {
      return false;
    }

    // Get new location in case its has changed
    return new Ember.RSVP.Promise((success, error) => {
      if (navigator.geolocation) {
        this.set('loading', true);
        console.log('searching');
        navigator.geolocation.getCurrentPosition(success, error);
      } else {
        alert("Geolocation is not supported by this browser");
      }
    }).then((position) => {
      console.log(position.coords.latitude);
      this.updatePositions(position.coords);
      this.centerMap(position.coords);
    }).catch(() => {
      alert("Geolocation must be enabled in order to locate you");
    }).finally(() => {
      this.set('loading', false);
    });
  },

  centerMap (position) {
    var {latitude, longitude} = position;
    this.get('mapPosition').setProperties({ lat: latitude, lng: longitude, zoom: 21 });
  },

  updatePositions (position) {
    var {latitude, longitude} = position;
    this.get('userPosition').setProperties({ lat: latitude, lng: longitude, zoom: 21 });
    this.centerMap(position);
    this.set('loading', false);
  },

  getDirection (model) {
    var userPosition = this.get('userPosition'),
        lat = model.get('latitude'),
        lng = model.get('longitude');
    return `http://maps.google.com/maps?&daddr=${lat},${lng}&saddr=${userPosition.lat},${userPosition.lng}`;
  }
});
