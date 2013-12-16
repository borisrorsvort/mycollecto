/*global Mycollecto, Ember, $, mixpanel*/
Mycollecto.SearchbarView = Ember.View.extend({
  classNames: ['searchbar  col-xs-12'],
  templateName: 'searchbar',

  didInsertElement: function () {
    this.get('controller').on('toggleSeachBar', $.proxy(this.toggleSeachBar, this));
  },

  click: function () {
    this.get('parentView.controller').set('searchBarOpen', true);
    mixpanel.track("Search: Toggle form");
  },

  toggleSeachBar: function () {
    $('.searchbar .btn').first().toggleClass('hidden');
    $('.searchbar input').first().val('').toggleClass('hidden').focus();
    this.toggleBackdrop();
  }.observes('controller.searchBarOpen'),

  toggleBackdrop: function () {
    $('.search-backdrop').toggleClass('hide');
  }

});