// http://emberjs.com/guides/models/defining-a-store/

Mycollecto.Store = DS.Store.extend({
  revision: 11,
  adapter: DS.FixtureAdapter.create()
});
