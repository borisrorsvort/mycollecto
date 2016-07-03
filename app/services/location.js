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
