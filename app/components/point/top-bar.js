import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    phoneCall () {
      window.location = 'tel:+3228003636';
    }
  }
});
