class GamesController < ApplicationController

  def show
    unless(session[:user])
      redirect_to new_session_path
    end
    @current_user = User.find_by(id: session[:user])
  end

end
