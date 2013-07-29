class ApplicationController < ActionController::Base
  protect_from_forgery

  def homepage
    render 'homepage'
  end
end
