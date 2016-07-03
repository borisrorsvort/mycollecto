/* global places */
import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['md-default-theme md-input'],
  tagName: 'input',
  didRender() {
    var a = places({
      container: this.$()[0],
      type: 'address'
    }).on('change', this.change.bind(this));
    this.$().focus();
  },

  setAutocomplete() {
    if (Ember.isEmpty(this.get('autocomplete'))) {
      let inputElement = this.$('input')[0];

      this.set('autocomplete', places({ container: inputElement }));
      this.get('autocomplete').addListener('change', this.placeChanged.bind(this));
    }
  },

  change(e) {
    this.sendAction('updatePositions', e);
  }
});
