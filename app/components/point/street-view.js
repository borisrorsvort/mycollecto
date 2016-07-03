import Ember from 'ember';

export default Ember.Component.extend({
  showStreetView: false,

  actions: {
    showStreetViewModal () {
      this.get('mixpanel').trackEvent('Show street view');
      this.set('showStreetView', !this.get('showStreetView'));
    }
  }
});
