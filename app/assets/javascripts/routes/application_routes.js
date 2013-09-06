Mycollecto.Router.map(function() {
  this.route('about'),
  this.resource('points', { path: "/" });
  this.resource('point', {path: ':point_id'});
});
