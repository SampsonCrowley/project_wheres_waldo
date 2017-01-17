class GamesController < ApplicationController

  def show
    @current_user = User.find_by(id: session[:user])
  end

end
