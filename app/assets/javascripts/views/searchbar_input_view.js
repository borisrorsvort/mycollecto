/*global Mycollecto, Ember, $, mixpanel*/
Mycollecto.SearchbarInput = Ember.TextField.extend({
  keyUp: function (e) {
    this.interpretKeyEvents(e);
    if (e.keyCode === 13) {
      this.get('parentView.controller').send('findNewAddressPosition', this.get('value'));
    }
  },
  focusOut:  function (e) {
    this.get('parentView.controller').send('findNewAddressPosition', this.get('value'));
  }
});
