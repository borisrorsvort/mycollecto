import DS from 'ember-data';

const {
  Model,
  attr,
} = DS;

export default Model.extend({
  latitude: attr('string'),
  longitude: attr('string'),
  formatted_address: attr('string'),
  createdAt: attr('date')
});
