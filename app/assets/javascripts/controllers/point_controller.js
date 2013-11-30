/*global Mycollecto, Ember, L, $, window, mixpanel, moment*/
Mycollecto.PointController = Ember.ObjectController.extend({
  needs: ['points'],
  pointPosition: null,
  nextPoint: null,
  previousPoint: null,
  isFirst: null,
  pickupTime: [],

  setPickupTime: function () {
    var next = this.findNextList(moment().format("HH"), moment().format("mm"), 20);
    this.set('pickupTime', next);
  }.observes('content.isLoaded'),


  setBounds: function () {
    var x = this.get('latitude');
    var y = this.get('longitude');
    var pos = new L.LatLng(x, y);
    this.set("controllers.points.targetPosition.latLng", pos);
  }.observes('content.isLoaded'),

  setter: function () {
    var points  = this.get("controllers.points.model");
    if (points.length > 0) {
      this.set('pointPosition', points.indexOf(this.get("content")));
      this.set('nextPoint', points.nextObject(this.get('pointPosition') + 1));
      this.set('previousPoint', points.nextObject(this.get('pointPosition') - 1));
    }
  }.observes('content.isLoaded'),

  actions: {
    findNewAddressPosition: function (value) {
      console.log(value);
    },
    goToNextPoint: function () {
      mixpanel.track("View point details", {'via' : 'next btn'});
      this.transitionToRoute('point', this.get('nextPoint').id);
    },

    goToPreviousPoint: function () {
      if (this.get('pointPosition') === 0) {
        this.transitionToRoute('points');
      } else {
        mixpanel.track("View point details", {'via' : 'prev btn'});
        this.transitionToRoute('point', this.get('previousPoint').id);
      }
    },

    goToPointsList: function () {
      mixpanel.track("View points list");
      this.transitionToRoute('points');
    }
  },

  findItinirary: function () {
    var controller   = this;
    var currentPos   = controller.get('controllers.application.userPosition.latLng');
    var pointAddress = controller.get('content.formatted_address');
    window.location  = 'http://maps.apple.com/?daddr=' + pointAddress + '&saddr=' + currentPos.lat + ',' + currentPos.lng;
    mixpanel.track("Find Itinerary");
  },

  callCollecto: function () {
    window.location = "tel:+3228003636";
  },

  findNextPickupTime: function (h, m) {
    // default value
    if (h === 5 && m > 40) {
      return "23:00";
    }

    if (h === 22 && m > 40) {
      return "23:30";
    }

    if (h >= 23 || h < 6) {
      var output;

      if (m <= 10) {
        output = h + ":30";
      } else if (m > 10 && m < 40) {
        output = ((h + 1) % 24) + ":00";
      } else {
        output = ((h + 1) % 24) + ":30";
      }

      return output;
    }

    return "23:00";
  },

  findNextList: function (hour, minutes, size) {
    var h = parseInt(hour, 10);
    var m = parseInt(minutes, 10);
    var list = [];
    var i;

    for (i = 0; i < size; i++) {
      var res = this.findNextPickupTime(h, m);

      if (i === 0 && res === "23:00") {
        h = 22;
        m = 30;
      } else if (res === "23:00") {
        break;
      }

      list.push(res);
      h = (h + Math.floor((m + 30) / 60)) % 24;
      m = Math.floor((m + 30) % 60);
    }
    return list;
  }


});
