/*global Mycollecto, Ember, $, mixpanel, window, L*/
'use strict';
Mycollecto.MapView = Ember.View.extend({
  classNames: ['col-sm-8 map-wrapper'],
  templateName: 'map',

  adjustHeight: function () {
    $('.application-wrapper, .map-wrapper').css('height', ($(window).height() + 'px'));
  },

  didInsertElement: function () {
    this._super();

    var view = this;
    var map = L.mapbox.map('map', 'borisrorsvort.map-frkowyyy');

    $('#map').spin();

    view.adjustHeight();

    $(window).on('resize', function () {
      view.adjustHeight();
    });

    this.set('map', map);

    map.invalidateSize();
    this.setUserMarker();

  },

  userLocated: function () {
    this.setUserMarker();
    $('#map').spin(false);
  }.observes('controller.userPosition.latLng'),

  setUserMarker: function () {

    var map = this.get('map'),
        latLng = this.get('controller.userPosition.latLng'),
        userMarker = this.get('controller.userPosition.marker');

    map.invalidateSize();

    if (userMarker && latLng) {
      userMarker.setLatLng(latLng);
    } else {

      if (map && latLng) {
        var myIcon = L.divIcon({
          html: '<i class="icon-user"/>',
          className: 'marker-custom marker-custom-user'
        });

        var newUserMarker = L.marker(latLng, {
          icon: myIcon
        }).addTo(map);

        this.get('controller.userPosition').setProperties({
          marker: newUserMarker,
          markerIcon: myIcon
        });
      }
    }
  },

  pointsLoaded: function () {
    var map = this.get('map'),
        controller = this.get('controller');

    controller.get('model').forEach(function (point) {
      var pointId = point.get('id');

      var myIcon = L.divIcon({
        html: pointId,
        className: 'marker-custom'
      });

      var marker = L.marker(new L.LatLng(point.get('latitude'), point.get('longitude')), {
        id: pointId,
        icon: myIcon
      });

      var name      = point.get('nameFr');
      var popupHtml = "<a href='/#/" + pointId + "'>" + name + "</a>";

      marker.bindPopup(popupHtml, {closeButton: false}).addTo(map);

      // Adding click action to marker
      marker.on('click', function () {
        controller.transitionToRoute('point', pointId);
        mixpanel.track('View point details', {'via' : 'map'});
      });
    });
  }.observes('controller.model'),

  draw: function () {
    var origin = this.get('controller.userPosition.latLng'),
        destination = this.get('controller.targetPosition.latLng'),
        map = this.get('map'),
        that = this;


    if (origin && destination && (origin !== destination)) {
      var url = 'http://open.mapquestapi.com/directions/v2/route?key=Fmjtd%7Cluub2508nl%2Caa%3Do5-9u8wgy&callback=?&outFormat=json&routeType=pedestrian&timeType=1&enhancedNarrative=true&narrativeType=html&shapeFormat=raw&generalize=0&locale=en_US&unit=k&from='+origin.lat+','+origin.lng+'&to='+destination.lat+','+destination.lng+'&drivingStyle=2&highwayEfficiency=21.0';

      $.getJSON(url, function (data) {
        var routeGeometry = [];

        if (data.route.legs.length) {
          data.route.legs[0].maneuvers.forEach(function (step) {
            routeGeometry.push([step.startPoint.lat, step.startPoint.lng]);
          });
          that.initLine(routeGeometry);
          that.setRouteInstructions(data);
        }
      });

      var bounds = new L.LatLngBounds(origin, destination);
      map.fitBounds(bounds, {padding: [40, 40]});
    }
  }.observes('controller.targetPosition.latLng','controller.userPosition.latLng'),

  initLine: function (points) {
    var line = this.get('line');
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
    this.set('line', L.polyline(points, {color: 'red'}).addTo(that.get('map')));
  },

  updateLine: function (points, line) {
    line.setLatLngs(points);
  },

  setRouteInstructions: function (data) {
    var routeInstructions = data.route.legs[0].maneuvers ||[];
    this.get('controller').set('routeInstructions', routeInstructions);
  }

});
