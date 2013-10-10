Mycollecto.ApplicationController = Em.Controller.extend({
  needs: ['points'],
  toggleSearchForm: function() {
    $('.searchbar .btn').first().toggleClass('hidden');
    $('.searchbar input').first().toggleClass('hidden').focus();
  }
});

