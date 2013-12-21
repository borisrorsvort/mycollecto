/*global Ember, Mycollecto*/
Mycollecto.SearchBackdropView = Ember.View.extend({
  tagName: '.div',
  classNames: ['search-backdrop hide'],

  click: function () {
    var controller = this.get('controller');
    controller.set('searchBarOpen', false);
    $('.search-backdrop').addClass('hide');
  }
});
