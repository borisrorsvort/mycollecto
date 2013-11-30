/*global Mycollecto, Ember, $, mixpanel*/
Mycollecto.SearchbarView = Ember.View.extend({
  classNames: ['searchbar  col-xs-12'],
  templateName: 'searchbar',

  click: function () {
    $('.searchbar .btn').first().toggleClass('hidden');
    $('.searchbar input').first().toggleClass('hidden').focus();
    mixpanel.track("Search: Toggle form");
  }

});
