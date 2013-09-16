Mycollecto.PointController = Em.ObjectController.extend({
  needs: ['points'],
  pointPosition: null,
  nextPoint: null,
  previousPoint: null,
  isFirst: null,
  pickupTime: [],

  setPickupTime: function() {
    var next = this.findNextList(moment().format("HH"), moment().format("mm"), 20);
    this.set('pickupTime', next);
    console.dir(next);
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
    var h = parseInt(hour);
    var m = parseInt(minutes)

    if (h >= 23 || h < 6) {
      if (m <= 10) {
        return hour + ":30";
      } else if (m > 10 && m < 40) {
        return ((h+1) % 24) + ":00";
      } else {
        return ((h+1) % 24) + ":30";
      }
    }

    if (h == 22 && m > 40) {
      return (h+1) + ":30";
    }

    return next;
  },

  findNextList: function(hour, minutes, size) {
    var h = parseInt(hour);
    var m = parseInt(minutes);
    var list = new Array();

    for (i=0; i<size; i++) {
      var res = this.findNextPickupTime(h, m);

      if (i == 0 && res == "23:00") {
        h = 23;
        m = 0;
      } else if (res == "23:00") {
        break;
      }

      list.push(res);
      h = (h + Math.floor((m + 30) / 60)) % 24;
      m = Math.floor((m + 30) % 60);
    }
    return list;
  }


});
