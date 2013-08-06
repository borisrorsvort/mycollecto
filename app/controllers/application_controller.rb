class ApplicationController < ActionController::Base
  protect_from_forgery

  def index

  end

  def homepage
    render 'homepage'
  end
end
