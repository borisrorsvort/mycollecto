import Ember from 'ember';

export default Ember.Controller.extend({
  loading: Ember.computed.bool('location.loading')
});
