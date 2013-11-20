// Safe After Render http://mavilein.github.io/javascript/2013/08/01/Ember-JS-After-Render-Event/

Ember.View.reopen({
  didInsertElement : function(){
    this._super();
    Ember.run.scheduleOnce('afterRender', this, this.afterRenderEvent);
  },
  afterRenderEvent : function(){
  }
});

Mycollecto.ApplicationView = Em.View.extend({
  classNames: ['application-wrapper row'],
  didInsertElement: function() {
    var view = this;
    view.adjustHeight();
    $(window).on('resize',function(){
      view.adjustHeight();
    });
  },

  adjustHeight: function() {
    $('.application-wrapper').css('height', ($(window).height()+'px'));
  },

  draw: function(){
    var origin      = this.get("origin");
    var destination = this.get("destination");
    that = this;

    if (origin && destination) {
      var url = "http://routes.cloudmade.com/"+this.get("key")+"/api/0.3/"+origin.lat+","+origin.lng+","+destination.lat+","+destination.lng+"/foot.js?callback=?";
      $.getJSON(url , function (data){
        that.setLine(data.route_geometry);
        that.get("controllers.point").set("routeInstructions", data.route_instructions.map(function(route){ return route[0]+" / "+route[4]}));
      }).then(function(){
        // $('body').spin(false);
      });
    }

  }.observes("content.origin","content.destination"),

  setLine: function(points){
    line = this.get("line");
    if (line === undefined){
      this.set("line", L.polyline( points, {color: 'red'}).addTo(that.get("controllers.map.map")));
    } else {
      line.setLatLngs(points);
    }
  }  
  
  
});
