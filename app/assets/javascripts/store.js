/*global Mycollecto, DS*/

Mycollecto.Store = DS.Store.extend({
  revision: 12,
  adapter: DS.RESTAdapter.create({
    url: "http://api-mycollecto.rhcloud.com"
  })
});
