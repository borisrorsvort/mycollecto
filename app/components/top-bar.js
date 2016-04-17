import Ember from 'ember';

export default Ember.Component.extend({
  location: Ember.inject.service(),
  userPosition: Ember.computed.alias('location.userPosition'),

  actions: {
    getPosition () {
      this.get('location').getPosition();
    },
    phoneCall () {
      window.location = 'tel:+3228003636';
    }
  }
});
