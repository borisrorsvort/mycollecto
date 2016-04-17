import Ember from 'ember';

export default Ember.Component.extend({
  showStreetView: false,

  actions: {
    showStreetViewModal () {
      this.set('showStreetView', !this.get('showStreetView'));
    }
  }
});
