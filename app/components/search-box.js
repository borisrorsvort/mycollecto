import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    placeChanged (e) {
      this.sendAction('updatePositions', e);
    }
  }
});
