Mycollecto.MapView = Em.View.extend({
  needs: ['application', 'points'],
  templateName: "map",
  didInsertElement: function() {
    this._super();
    $('body').spin(true);
    
    var map = L.map('map').setView([50.850539, 4.351745], 16);
    L.tileLayer('http://{s}.tile.cloudmade.com/{key}/110494/256/{z}/{x}/{y}.png', {
        key: '92e5866dcc9e47179553d1c6ae09d4c9',
        detectRetina: true,
        maxZoom: 18,
        reuseTiles: true,
        updateWhenIdle: true
      }).addTo(map);
    this.set('map',map);
    $('body').spin(false);
    
    map.invalidateSize(true);
    this.setUserMarker();  
  //  this.pointsLoaded();  
  },
  
  userLocated: function(){
    this.setUserMarker();
  }.observes('controller.userPosition.latLng'),
  
  setUserMarker: function(){
   
   
   var map = this.get("map");
   var latLng = this.get('controller.userPosition.latLng'); 
   var userMarker = this.get("controller.userPosition.marker");
   
   if (userMarker){
     userMarker.setLatLng(latLng);
     map.panTo(latLng);
     
   }
   else{
     if (map && latLng){
       var myIcon = L.divIcon({
         html: '<i class="icon-user"/>',
         className: 'marker-custom marker-custom-user'
       });
     
       var userMarker = L.marker(latLng, {
         icon: myIcon
       }).addTo(map);
     
       this.get("controller.userPosition").setProperties({
         marker: userMarker,
         markerIcon: myIcon
       });
       map.panTo(latLng);
       
     }
   }
   
  },
  
  pointsLoaded: function(){
    map = this.get("map");
    controller = this.get("controller");
    controller.get("model").forEach(function(point){
      var pointId = point.get('id');

      var myIcon = L.divIcon({
        html: pointId,
        className: 'marker-custom'
      });

      var marker = L.marker(new L.LatLng(point.get("latitude"), point.get("longitude")), {
        id: pointId,
        icon: myIcon
      });

      var name      = point.get("nameFr")
      var popupHtml = "<a href='/#/"+pointId+"'>"+name+"</a>"

      marker.bindPopup(popupHtml, {closeButton: false}).addTo(map);

      // Adding click action to marker
      marker.on('click', function() {
        controller.transitionToRoute("point",pointId);
        mixpanel.track("View point details", {'via' : 'map'});
        mixpanel.people.increment("point lookup", 1);
      });
    });      
    
  }.observes("controller.content")      
  
});      