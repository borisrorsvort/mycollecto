Mycollecto.PointInListView = Em.View.extend({
  templateName: 'point_in_list',
  classNames  : ['row point-list--item'],
  mouseEnter: function(event) {
    var newPosition = new google.maps.LatLng(this.get('content').get('x'), this.get('content').get('y'));
  	this.get("controller").get('currentUserPosition').set('latLng', newPosition);
  }
});
