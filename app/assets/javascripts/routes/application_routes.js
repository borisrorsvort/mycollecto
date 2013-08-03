Mycollecto.Router.map(function() {
  this.resource('points', { path: "points" }, function() {
    this.resource('point', {path: ':point_id'});
  })
});
