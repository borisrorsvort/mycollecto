Mycollecto::Application.routes.draw do

  root :to => 'application#homepage'
  get '/*path' => 'application#index'

end
