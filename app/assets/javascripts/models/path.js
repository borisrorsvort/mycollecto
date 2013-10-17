Mycollecto.Path  = Em.Object.extend({
	origin: undefined,
	destination: undefined,
	key: '92e5866dcc9e47179553d1c6ae09d4c9',
	line : undefined,
	draw: function(){
		var origin = this.get("origin");
		var destination = this.get("destination");
		that = this;
		if (origin && destination) {
			var path;
			var url = "http://routes.cloudmade.com/"+this.get("key")+"/api/0.3/"+origin.lat+","+origin.lng+","+destination.lat+","+destination.lng+"/foot.js?callback=?";
			$.getJSON(url , function (data){
				that.setLine(data.route_geometry)
				that.get("pointController").set("routeInstructions", data.route_instructions.map(function(route){ return route[0]+" / "+route[4]}));
			});
		}
	}.observes("origin","destination"),

	setLine: function(points){
	  line = this.get("line");
	  if (line === undefined){
	  	this.set("line", L.polyline( points, {color: 'red'}).addTo(that.get("map")));		  
	  }else{
	  	line.setLatLngs(points);
	  }
	}
})
