import Ember from 'ember';
const { isEmpty, isPresent } = Ember;

export default Ember.Component.extend({
  classNames: ['md-default-theme'],
  tagName: 'md-input-container',
  items: [],
  didRender() {
    this._super(...arguments);
    this.setAutocomplete();
    this.$('input').focus();
  },

  willDestroy() {
    if (isPresent(this.get('autocomplete'))) {
      let google = this.get('google') || window.google;
      google.maps.event.clearInstanceListeners(this.get('autocomplete'));
    }
  },

  setAutocomplete() {
    if (isEmpty(this.get('autocomplete'))) {
      let inputElement = this.$('input')[0],
          google = this.get('google') || window.google; //TODO: check how to use the injected google object

      this.set('autocomplete', new google.maps.places.Autocomplete(inputElement, { types: ['geocode'] }));
      this.get('autocomplete').addListener('place_changed', this.placeChanged.bind(this));
    }
  },

  placeChanged() {
    let place = this.get('autocomplete').get('place');
    this.sendAction('updatePositions', place);
  }
});
