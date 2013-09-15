Mycollecto.PointController = Em.ObjectController.extend({
  needs: ['points'],
  pointPosition: null,
  nextPoint: null,
  previousPoint: null,
  isFirst: null,

  setter: function() {
    var points  = this.get("controllers.points.model");

    this.set('pointPosition', points.indexOf(this.get("content")));
    this.set('nextPoint', points.nextObject(this.get('pointPosition')+1));
    this.set('previousPoint', points.nextObject(this.get('pointPosition')-1));

    if (points.indexOf(this.get("content")) === 0) {
      this.set('isFirst', true);
    } else {
      this.set('isFirst', false);
    }

    console.log('pointPosition: '+ this.get('pointPosition'));
    // console.log('nextPoint: '+ this.get('nextPoint'));
    // console.log('previousPoint: '+ this.get('previousPoint'));
    console.log('isFirst: '+ this.get('isFirst'));

  }.observes('content.isLoaded'),

  closeModal: function() {
    var self  = this;
    var modal = $('.modal');
    modal.modal('hide');
  },

  goToNextPoint: function(){
    this.transitionToRoute('point', this.get('nextPoint').id);
  },

  goToPreviousPoint: function(){
    if (this.get('pointPosition') === 0) {
      this.transitionToRoute('points');
    } else {
      this.transitionToRoute('point', this.get('previousPoint').id);
    }
  },

  findItinirary: function() {
    var controller   = this;
    var currentPos   = controller.get('controllers.points').currentUserPosition.latLng;
    var pointAddress = controller.get('content.formatted_address');
    window.location  = 'http://maps.apple.com/?daddr='+pointAddress+'&saddr='+currentPos.lat+','+currentPos.lng;
    mixpanel.track("Find Itinerary");
  }
});
