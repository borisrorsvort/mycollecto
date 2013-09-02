// http://emberjs.com/guides/models/defining-a-store/

Mycollecto.Store = DS.Store.extend({
  revision: 12,
  adapter: DS.RESTAdapter.create({
    url: "http://api-mycollecto.rhcloud.com"
  })
});
