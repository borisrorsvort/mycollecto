/*global Mycollecto, Ember, window, location*/

Mycollecto.Router.map(function () {
  this.route('about');
  this.resource('points', { path: "/" }, function () {
    this.resource('point', {path: ':point_id'});
  });
});

Mycollecto.Router.reopen({
  location: 'hashbang'
});

(function () {

  var get = Ember.get;
  var set = Ember.set;

  Ember.Location.registerImplementation('hashbang', Ember.HashLocation.extend({
    getURL: function () {
      return get(this, 'location').hash.substr(2);
    },

    setURL: function (path) {
      get(this, 'location').hash = "!" + path;
      set(this, 'lastSetURL', path);
    },

    onUpdateURL: function (callback) {
      var self = this;
      var guid = Ember.guidFor(this);

      Ember.$(window).bind('hashchange.ember-location-' + guid, function () {
        Ember.run(function () {
          var path = location.hash.substr(2);
          if (get(self, 'lastSetURL') === path) { return; }

          set(self, 'lastSetURL', null);

          callback(path);
        });
      });
    },

    formatURL: function (url) {
      return '#!' + url;
    }

  }));

})();
