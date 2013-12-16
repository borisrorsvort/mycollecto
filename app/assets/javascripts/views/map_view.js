/*global Mycollecto, Ember, $, mixpanel, window, L*/
Mycollecto.MapView = Ember.View.extend({
  classNames: ['col-sm-8 map-wrapper'],
  templateName: "map",
  cloudmadeKey: "92e5866dcc9e47179553d1c6ae09d4c9",

  adjustHeight: function () {
    $('.application-wrapper, .map-wrapper').css('height', ($(window).height() + 'px'));
  },

  didInsertElement: function () {
    this._super();

    var view = this;
    var map = L.map('map').setView([50.850539, 4.351745], 16);

    $('#map').spin();

    view.adjustHeight();

    $(window).on('resize', function () {
      view.adjustHeight();
    });

    L.tileLayer('http://{s}.tile.cloudmade.com/{key}/110494/256/{z}/{x}/{y}.png', {
      key: this.get("cloudmadeKey"),
      detectRetina: true,
      maxZoom: 18,
      reuseTiles: true,
      updateWhenIdle: true
    }).addTo(map);

    this.set('map', map);

    // $('body').spin(false);
    // $('#map').spin(false);

    map.invalidateSize();
    this.setUserMarker();

  },

  userLocated: function () {
    this.setUserMarker();
    $('#map').spin(false);
  }.observes('controller.userPosition.latLng'),

  setUserMarker: function () {

    var map = this.get("map");
    var latLng = this.get('controller.userPosition.latLng');
    var userMarker = this.get("controller.userPosition.marker");

    map.invalidateSize();

    if (userMarker && latLng) {

      userMarker.setLatLng(latLng);
      // map.panTo(latLng);

    } else {

      if (map && latLng) {
        var myIcon = L.divIcon({
          html: '<i class="icon-user"/>',
          className: 'marker-custom marker-custom-user'
        });

        var newUserMarker = L.marker(latLng, {
          icon: myIcon
        }).addTo(map);

        this.get("controller.userPosition").setProperties({
          marker: newUserMarker,
          markerIcon: myIcon
        });
      }
    }
  },


  pointsLoaded: function () {
    var map = this.get("map");
    var controller = this.get("controller");

    controller.get("model").forEach(function (point) {
      var pointId = point.get('id');

      var myIcon = L.divIcon({
        html: pointId,
        className: 'marker-custom'
      });

      var marker = L.marker(new L.LatLng(point.get("latitude"), point.get("longitude")), {
        id: pointId,
        icon: myIcon
      });

      var name      = point.get("nameFr");
      var popupHtml = "<a href='/#/" + pointId + "'>" + name + "</a>";

      marker.bindPopup(popupHtml, {closeButton: false}).addTo(map);

      // Adding click action to marker
      marker.on('click', function () {
        controller.transitionToRoute("point", pointId);
        mixpanel.track("View point details", {'via' : 'map'});
      });
    });
  }.observes("controller.model"),

  draw: function (e) {
    var origin = this.get("controller.userPosition.latLng");
    var destination = this.get("controller.targetPosition.latLng");
    var map = this.get('map');
    var that = this;


    if (origin && destination && (origin !== destination)) {
      var url = "https://ssl_routes.cloudmade.com/" + this.get("cloudmadeKey") + "/api/0.3/" + origin.lat + "," + origin.lng + "," + destination.lat + "," + destination.lng + "/foot.js?callback=?";
      $.getJSON(url, function (data) {
        if (data.route_geometry !== undefined) {
          that.initLine(data.route_geometry);
          that.setRouteInstructions(data);
        }
      });

      var bounds = new L.LatLngBounds(origin, destination);
      map.fitBounds(bounds, {padding: [40, 40]});
    }
  }.observes("controller.targetPosition.latLng","controller.userPosition.latLng"),

  initLine: function (points) {
    var line = this.get("line");
    if (points !== undefined) {
      if (line === undefined) {
        // create Line
        this.createLine(points);
      } else {
        // update trajectory
        this.updateLine(points, line);
      }
    }
  },

  createLine: function (points) {
    var that = this;
    this.set("line", L.polyline(points, {color: 'red'}).addTo(that.get("map")));
  },

  updateLine: function (points, line) {
    line.setLatLngs(points);
  },

  setRouteInstructions: function (data) {
    this.get("controller").set("routeInstructions", data.route_instructions.map(function (route) {
      return route[0] + " / " + route[4];
    }));
  }

});
