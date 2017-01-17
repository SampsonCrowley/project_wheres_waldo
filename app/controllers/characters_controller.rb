class CharactersController < ApplicationController
  def index
    @current_user = User.find_by(id: session[:user])
    ids = @current_user.tags.pluck(:character_id)
    if ids.length > 0
      @characters = Character.all.where('id NOT IN (?)', ids)
    else
      @characters = Character.all
    end
    render json: @characters
  end
end
