Mycollecto.PathController = Ember.ObjectController.extend({
  content: null,
  needs: ['point', 'points', 'map'],

  draw: function(){
    var origin      = this.get("origin");
    var destination = this.get("destination");
    that = this;

    if (origin && destination && (origin !== destination)) {
      console.log('draw path');
      var url = "http://routes.cloudmade.com/"+this.get("key")+"/api/0.3/"+origin.lat+","+origin.lng+","+destination.lat+","+destination.lng+"/foot.js?callback=?";
      $.getJSON(url , function (data){
        if (data.route_geometry !== undefined) {
          that.initLine(data.route_geometry);
          that.setRouteInstructions(data);
        }
      });
    }

  }.observes("content.origin", "content.destination"),

  initLine: function(points){
    line = this.get("line");
    if (points !== undefined) {
      if (line === undefined){
        // create Line
        this.createLine(points);
      } else {
        // update trajectory
        this.updateLine(points, line);
      }
    }
  },

  createLine: function(points) {
    this.set("line", L.polyline( points, {color: 'red'}).addTo(that.get("controllers.map.map")));
  },

  updateLine: function(points, line) {
    line.setLatLngs(points);
  },

  setRouteInstructions: function(data) {
    this.get("controllers.point").set("routeInstructions", data.route_instructions.map(function(route){ return route[0]+" / "+route[4]}));
  }
});
