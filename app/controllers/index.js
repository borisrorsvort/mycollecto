import Ember from 'ember';

export default Ember.Controller.extend({
  location: Ember.inject.service(),
  init: function () {
    if (this.get('location.userPosition.lat') === null) {
      this.get('location').getPosition();
    }
  }
});
