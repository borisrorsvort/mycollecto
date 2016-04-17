import Ember from 'ember';

export default Ember.Controller.extend({
  location: Ember.inject.service(),
  actions: {
    updatePositions (e) {
      let lat = e.geometry.location.lat();
      let lng = e.geometry.location.lng();
      this.get('location').updatePositions({latitude: lat, longitude: lng});
      this.get('mixpanel').trackEvent('Search complete', {q: e.formatted_address});
      this.transitionToRoute('index');
    }
  }
});
