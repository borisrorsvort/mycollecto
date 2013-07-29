Mycollecto::Application.routes.draw do

  root :to => 'application#homepage'
  match '/*path' => 'application#index'

end
