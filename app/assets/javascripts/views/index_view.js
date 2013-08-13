Mycollecto.IndexView = Em.View.extend({
  classNames  : ['row homepage'],

  afterRenderEvent: function() {
    $('#map-canvas').hide();
    $('.btn-warning').spin(false);
    $('.btn-warning').on('click', function(){
      $(this).spin();
    });

  }

});
