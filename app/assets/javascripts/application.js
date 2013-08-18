//= require jquery
//= require jquery_ujs
//= require handlebars
//= require ember
//= require ember-data

//= require twitter/bootstrap
//= require jquery.spin

//= require_self
//= require mycollecto



Mycollecto = Ember.Application.create({
  LOG_ACTIVE_GENERATION: true,
  LOG_VIEW_LOOKUPS: true
});

//Mycollecto.deferReadiness(); // Released when We got userCurrentPostion from Mycollecto.MapPoints.setCurrentUserPosition();

//jQuery(document).ready(function($) {
//    Mycollecto.MapPoints.currentUserPosition = new google.maps.LatLng(0, 0);

	//Mycollecto.MapPoints.setCurrentUserPosition();

 // window.map_callback = function() {
 //   console.log('GM V3 script Loaded');

 //   Mycollecto.MapPoints.setCurrentUserPosition();
 // }
 // $.getScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyBOmERV2C7zNuCtm4pSSoMfkGE8Rf-3wNM&libraries=geometry&sensor=true&callback=map_callback');
//});
