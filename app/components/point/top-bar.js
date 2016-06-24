import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    phoneCall () {
      this.get('mixpanel').trackEvent('Called service');
      window.location = 'tel:+3228003636';
    }
  }
});
