Mycollecto.PointController = Em.ObjectController.extend({
  needs: ['points'],
  pointPosition: null,
  nextPoint: null,
  previousPoint: null,
  isFirst: null,
  pickupTime: null,

  setPickupTime: function() {
    var next = this.findNextPickupTime(moment().format("HH"), moment().format("mm"));
    this.set('pickupTime', next);
  }.observes('content.isLoaded'),

  setter: function() {
    var points  = this.get("controllers.points.model");

    this.set('pointPosition', points.indexOf(this.get("content")));
    this.set('nextPoint', points.nextObject(this.get('pointPosition')+1));
    this.set('previousPoint', points.nextObject(this.get('pointPosition')-1));

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
  },

  callCollecto: function() {
    window.location = "tel:+3228003636";
  },

  findNextPickupTime: function(hour, minutes) {
    // default value
    var next = "23:00";
    var h = parseInt(hour, 10);
    var m = parseInt(minutes, 10)

    if (h > 23 || h < 6) {
      if (m <= 10) {
          return hour + ":30";
      } else if (m > 10 && m < 40) {
          return (h+1) + ":00";
      } else {
          return (h+1) + ":30";
      }
    }

    if (h == 22 && m > 40) {
      return (h+1) + ":30";
    }

    return next;
  }

});
