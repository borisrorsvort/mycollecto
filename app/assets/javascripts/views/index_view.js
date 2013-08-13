Mycollecto.IndexView = Em.View.extend({
  classNames  : ['row page-homepage'],

  afterRenderEvent: function() {
    $('#map-canvas').hide();
    $('.btn-warning').spin(false);
    $('.btn-warning').on('click', function(){
      $(this).spin();
    });

  }

});
