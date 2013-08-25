Mycollecto.Point  = DS.Model.extend({
  name             : DS.attr('string'),
  addressFR        : DS.attr('string'),
  code             : DS.attr('float'),
  nameFr           : DS.attr('string'),
  nameNl           : DS.attr('string'),
  addressFr        : DS.attr('string'),
  addressNl        : DS.attr('string'),
  notes            : DS.attr('string'),
  x                : DS.attr('float'),
  y                : DS.attr('float'),

  fullName: function() {
    var name_fr = this.get("nameFr");
    var nameNl = this.get("nameNl");
    if (nameFr === nameNl) {
      return nameFr;
    } else {
      return (nameFr + ' — ' + nameNl).htmlSafe();
    }
  }.property("nameFr","nameNl")

  // recalculateDistanceFromUser : function (userPos) {
  //   var locationLat  = this.get('x');
  //   var locationLong = this.get('y');
  //   var modelPos     = new L.LatLng(locationLat, locationLong);
  //   var distance     = modelPos.distanceTo(userPos.get("latLng"));
  //   this.set("distanceFromUser", Math.round(distance));
  // }

});
