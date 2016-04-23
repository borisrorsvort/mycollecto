import Ember from 'ember';

export default Ember.Controller.extend({
  adressesSortingDesc: ['date:desc'],
  sortedAdresses: Ember.computed.sort('content', 'adressesSortingDesc'),
  hasSortedAdresses: Ember.computed.notEmpty('sortedAdresses'),
  location: Ember.inject.service(),
  adressFromMap: function (e) {
    return e.geometry !== undefined;
  },
  actions: {
    updatePositions (e) {
      let lat = this.adressFromMap(e) ? e.geometry.location.lat() : e.latitude;
      let lng = this.adressFromMap(e) ? e.geometry.location.lng() : e.longitude;
      var store = this.store;

      this.set('location.loading', true);
      this.get('location').updatePositions({latitude: lat, longitude: lng});
      this.get('mixpanel').trackEvent('Search complete', {q: e.formatted_address});

      store.query('adress', {filter: { formatted_address: e.formatted_address }}).then(function(query) {
        if (query.get('content').length === 0) {
          let newAdress = store.createRecord('adress', {
            latitude: lat,
            longitude: lng,
            formatted_address: e.formatted_address,
            date: new Date().getTime()
          });
          newAdress.save();
        }
      });

      this.transitionToRoute('index');
    }
  }
});
