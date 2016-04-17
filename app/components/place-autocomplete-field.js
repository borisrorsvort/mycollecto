import Ember from 'ember';
import PlaceAutocompleteComponent from 'ember-place-autocomplete/components/place-autocomplete-field';

const { Component, isEmpty, isPresent, typeOf, isEqual } = Ember;

export default PlaceAutocompleteComponent.extend({
  classNames: ['md-whiteframe-z1'],
  didInsertElement() {
    this._super(...arguments);
    this.$('input').focus();
  }
});
