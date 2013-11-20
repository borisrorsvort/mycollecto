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
  }.observes('content.isLoaded'),

  initMap: function() {
    if (this.get('controllers.points.mapCreated') === false) {
      this.get('controllers.points').initMap();
    }
  }.observes('content.isLoaded'),

  setBounds: function() {

    if (this.get('controllers.points.userPosition')) {

      var map     = this.get('controllers.points.map');
      var userLatLng = this.get('controllers.points.userPosition.latLng');

      if (userLatLng) {
        var x      = this.get('latitude');
        var y      = this.get('longitude');
        var pos    = new L.LatLng(x,y);
        var bounds = new L.LatLngBounds([pos, userLatLng]);
        map.fitBounds(bounds, {padding: [40,40]});
      }

    }

  },

  setter: function() {
    var points  = this.get("controllers.points.model");
    if (points) {
      this.set('pointPosition', points.indexOf(this.get("content")));
      this.set('nextPoint', points.nextObject(this.get('pointPosition')+1));
      this.set('previousPoint', points.nextObject(this.get('pointPosition')-1));
    }

  }.observes('content.isLoaded'),

  updateDestinationForPath: function () {
    var x      = this.get('latitude');
    var y      = this.get('longitude');
    var pos    = new L.LatLng(x,y);

  //  this.get("controllers.path").set("destination", pos);

  }.observes('content.isLoaded'),
  actions: {
    goToNextPoint: function(){
      mixpanel.track("View point details", {'via' : 'next btn'});
      this.transitionToRoute('point', this.get('nextPoint').id);
    },

    goToPreviousPoint: function(){
      if (this.get('pointPosition') === 0) {
        this.transitionToRoute('points');
      } else {
        mixpanel.track("View point details", {'via' : 'prev btn'});
        this.transitionToRoute('point', this.get('previousPoint').id);
      }
    },

    goToPointsList: function() {
      mixpanel.track("View points list");
      this.transitionToRoute('points');
    }
  },

  findItinirary: function() {
    var controller   = this;
    var currentPos   = controller.get('controllers.application.userPosition.latLng');
    var pointAddress = controller.get('content.formatted_address');
    window.location  = 'http://maps.apple.com/?daddr='+pointAddress+'&saddr='+currentPos.lat+','+currentPos.lng;
    mixpanel.track("Find Itinerary");
  },

  callCollecto: function() {
    window.location = "tel:+3228003636";
  },

  findNextPickupTime: function(h, m) {
    // default value
    if (h == 5 && m > 40) {
      return "23:00";
    }

    if (h == 22 && m > 40) {
      return "23:30";
    }

    if (h >= 23 || h < 6) {
      if (m <= 10) {
        return h + ":30";
      } else if (m > 10 && m < 40) {
        return ((h+1) % 24) + ":00";
      } else {
        return ((h+1) % 24) + ":30";
      }
    }

    return "23:00";
  },

  findNextList: function(hour, minutes, size) {
    var h = parseInt(hour);
    var m = parseInt(minutes);
    var list = new Array();

    for (i=0; i<size; i++) {
      var res = this.findNextPickupTime(h, m);

      if (i == 0 && res == "23:00") {
        h = 22;
        m = 30;
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
