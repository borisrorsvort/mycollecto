Mycollecto.Map = Ember.Object.extend({
  map: function() {
    var map = L.map('map', {
      center: new L.LatLng(50.850539, 4.351745),
      zoom: 16
    });
    return map;
  }.property(),

  tileLayer: function() {
    var layer = L.tileLayer('https://ssl_tiles.cloudmade.com/{key}/110494/256/{z}/{x}/{y}.png', {
      key: '92e5866dcc9e47179553d1c6ae09d4c9',
      detectRetina: true,
      maxZoom: 18,
      reuseTiles: true,
      updateWhenIdle: true
    })
    return layer;
  }.property()
});
