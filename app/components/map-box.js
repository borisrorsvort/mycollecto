import Ember from 'ember';

export default Ember.Component.extend({
  location: Ember.inject.service(),
  mapPosition: Ember.computed.alias('location.mapPosition'),
  userPosition: Ember.computed.alias('location.userPosition'),
  hasUserLocation: Ember.computed.notEmpty('location.userPosition.lat'),
  userCustomIconHtml: '<md-icon class="paper-icon md-font material-icons md-primary md-default-theme person-pin md-4x" aria-label="person-pin"></md-icon>',
  markerCustomIconHtml: '<md-icon class="paper-icon md-font material-icons md-default-theme location-on md-4x" aria-label="location-on"></md-icon>',
  customIcon: {
    iconSize: [48, 48],
    iconAnchor: [0, 48],
    popupAnchor: [24, -48]
  },
  didRender () {
    if (this.get('location.loading') === true) {
      this.set('location.loading', false);
    }

    setTimeout(() => {
      if (Ember.isEmpty(this.get('location.userPosition.lat'))) {
        console.log('from map-box');
        this.get('location').getPosition();
      }
    }, 1500);
  },
  actions: {
    updateMapPosition (e) {
      const {lat, lng} = e.target.getCenter(),
            zoom = e.target.getZoom();

      this.get('location.mapPosition').setProperties({
        lat: lat,
        lng: lng,
        zoom: zoom
      });
    },

    centerMap (e) {
      var {lat, lng} = e.target.getLatLng();
      this.get('location.mapPosition').setProperties({ lat: lat, lng: lng });
    }
  }
});
