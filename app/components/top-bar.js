import Ember from 'ember';

export default Ember.Component.extend({
  location: Ember.inject.service(),
  userPosition: Ember.computed.alias('location.userPosition'),

  actions: {
    getPosition () {
      this.get('location').getPosition();
      this.get('mixpanel').trackEvent('Cliked geolocation');
    },
    phoneCall () {
      this.get('mixpanel').trackEvent('Called service');
      window.location = 'tel:+3228003636';
    }
  }
});
