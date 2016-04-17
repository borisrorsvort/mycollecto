import Ember from 'ember';

export default Ember.Component.extend({
  location: Ember.inject.service(),
  click () {
    var model = this.get('model');
    window.location = this.get('location').getDirection(model);
  }
});
