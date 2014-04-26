Ember.Handlebars.registerBoundHelper('kmToMeters', function(distance) {
  return (distance * 1000).toFixed(2);
});