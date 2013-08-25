// http://emberjs.com/guides/models/defining-a-store/

Mycollecto.Store = DS.Store.extend({
  revision: 12,
  adapter: DS.RESTAdapter.create({
    url: "http://api-mycollecto.rhcloud.com",
    ajax: function(url, type, hash) {
      var adapter = this;

      return new Ember.RSVP.Promise(function(resolve, reject) {
        hash = hash || {};
        hash.url = url;
        hash.type = type;
        hash.dataType = 'jsonp';
        hash.context = adapter;

        if (hash.data && type !== 'GET') {
          hash.contentType = 'application/json; charset=utf-8';
          hash.data = JSON.stringify(hash.data);
        }

        hash.success = function(json) {
          Ember.run(null, resolve, json);
        };

        hash.error = function(jqXHR, textStatus, errorThrown) {
          Ember.run(null, reject, jqXHR);
        };

        Ember.$.ajax(hash);
      });
    }
  })
});

DS.RESTAdapter.map('Mycollecto.Point', {
  distanceFromUser : { key: 'distanceFromUser' }
});
