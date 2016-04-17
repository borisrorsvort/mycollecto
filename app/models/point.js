import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  name_fr: DS.attr('string'),
  name_nl: DS.attr('string'),
  address_fr: DS.attr('string'),
  address_nl: DS.attr('string'),
  notes: DS.attr('string'),
  latitude: DS.attr('number'),
  longitude: DS.attr('number'),
  distance_from_user: DS.attr('number'),
  formatted_address: DS.attr('string'),
  picture_url: DS.attr('string'),
  street_view_url: DS.attr('string'),
  location: Ember.computed('latitude', 'longitude', function() {
    return [this.get("latitude"), this.get("longitude")];
  }),
  full_name: Ember.computed('name_fr', 'name_nl', function() {
    var nameFr = this.get("name_fr"),
        nameNl = this.get("name_nl");

    return nameFr === nameNl ? nameFr : `${nameFr} — ${nameNl}`;
  })
});
