Mycollecto.Point  = DS.Model.extend({
  name             : DS.attr('string'),
  nameFr           : DS.attr('string'),
  nameNl           : DS.attr('string'),
  addressFr        : DS.attr('string'),
  addressNl        : DS.attr('string'),
  notes            : DS.attr('string'),
  latitude         : DS.attr('number'),
  longitude        : DS.attr('number'),
  distanceFromUser : DS.attr('number'),
  formatted_address: DS.attr('string'),

  fullName: function() {
    var nameFr = this.get("nameFr");
    var nameNl = this.get("nameNl");
    if (nameFr === nameNl) {
      return nameFr;
    } else {
      return (nameFr + ' — ' + nameNl).htmlSafe();
    }
  }.property("nameFr","nameNl")

});
