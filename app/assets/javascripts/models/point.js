Mycollecto.Point  = DS.Model.extend({
  name       : DS.attr('string'),
  address    : DS.attr('string'),
  code       : DS.attr('float'),
  name_fr    : DS.attr('string'),
  name_nl    : DS.attr('string'),
  address_fr : DS.attr('string'),
  address_nl : DS.attr('string'),
  notes      : DS.attr('string'),
  x          : DS.attr('float'),
  y          : DS.attr('float')
});


Mycollecto.Point.FIXTURES = [
  { "id" : 4, "code": 2920, "name_fr": "Ambiorix", "name_nl": "Ambioris", "address_fr": "Sq Ambiorix 12-11\/Rue De Pavie", "address_nl": "Ambiorix sq 12-11\/ Paviastraat", "notes": "", "x": '50.801268', "y": '4.393162' },
  { "id" : 6, "code": 1223, "name_fr": "Anneessens", "name_nl": "Anneessens", "address_fr": "Place Fontainas 9-11", "address_nl": "Fontainasplein 9-11", "notes": "", "x": '50.816241', "y": '4.290267' },
  { "id" : 10, "code": 1715, "name_fr": "Arsenal", "name_nl": "Arsenaal", "address_fr": "Ch de Wavre\/Bd Gnral Jacques", "address_nl": "Waversesteenweg\/Generaal Jacqueslaan", "notes": "", "x": '50.831550', "y": '4.404569' },
  { "id" : 16, "code": 6164, "name_fr": "Barrire", "name_nl": "Bareel", "address_fr": "Avenue du Parc 4-6", "address_nl": "Parklaan 4-6", "notes": "", "x": '50.796378', "y": '4.321132' },
  { "id" : 17, "code": 1915, "name_fr": "Bascule", "name_nl": "Bascule", "address_fr": "Ch de Waterloo 713\/Rue Emile Caus", "address_nl": "Waterloosesteenweg 713\/Emile Clausstraat", "notes": "", "x": '50.858109', "y": '4.311103' },
  { "id" : 25, "code": 1909, "name_fr": "Blyckaerts", "name_nl": "Blyckaerts", "address_fr": "Pl Blyckaerts en face 230\/Rue Malibran", "address_nl": "Blyckaertsplein voor 230\/Malibranstraat", "notes": "attention feu special (toute direction)", "x": '50.815860', "y": '4.390618' },
  { "id" : 26, "code": 2501, "name_fr": "Bockstael", "name_nl": "Bockstael", "address_fr": "Pl Emile Bockstael pass 133\/Rue Fransman", "address_nl": "Emile Bockstaelplein voorbij 133\/Fransmanstraat", "notes": "", "x": '50.801268', "y": '4.3931629'}
];
