Mycollecto::Application.routes.draw do

  get '/trouver-taxi-collecto-bruxelles' => 'pages#about'

  root :to => 'application#homepage'
  # get '/*path' => 'application#index'

end
