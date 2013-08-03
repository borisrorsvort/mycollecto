Mycollecto.PointsController = Em.ArrayController.extend({
  centerMap: function(model) {
    var x = model.get('x');
    var y = model.get('y');
    var pos = new google.maps.LatLng(x,y);
    Mycollecto.MapPoints.map.panTo(pos);
  }
});
