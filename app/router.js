import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('point', { path: '/:point_id' });
  this.route('search');
  this.route('info');
});

export default Router;
