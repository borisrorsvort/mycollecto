Mycollecto.PointController = Em.ObjectController.extend({
  needs: ['points'],

  // init: function() {

  // },

  closeModal: function() {
    var self  = this;
    var modal = $('.modal');
    modal.modal('hide');
  },

  nextPoint: function(){
    var points = this.get("controllers.points.model")
    var idx = points.indexOf(this.get("model"));
    var nextPoint = points.nextObject(idx+1);
    this.transitionToRoute('point', nextPoint.get('id'));
  },

  findItinirary: function() {
    var controller   = this;
    var currentPos   = controller.get('controllers.points').currentUserPosition.latLng;
    var pointAddress = controller.get('content.formatted_address');
    window.location  = 'http://maps.apple.com/?daddr='+pointAddress+'&saddr='+currentPos.lat+','+currentPos.lng;
    mixpanel.track("Find Itinerary");
  }
});
