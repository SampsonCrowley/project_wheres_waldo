class TagsController < ApplicationController

  skip_before_action :verify_authenticity_token

  def index
    current_user = User.find_by(id: session[:user])
    @tags = current_user.tags
    request.format = :json
    respond_to :json
  end

  def create
    @current_user = User.find_by(id: session[:user])
    @tag = @current_user.tags.build(tag_params)
    if @tag.save
      render json: {tag: @tag}, status: 200
    else
      render json: { errors: @tag.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    @tag = Tag.find_by(id: params[:id])
    if @tag.update(tag_params)
      render :js
    else
      render json: { errors: @tag.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @tag = Tag.find_by(id: params[:id])
    if @tag.destroy
      render :js
    else
      render json: { errors: @tag.errors.full_messages }, status: 500
    end
  end

  private
    def tag_params
      params.require(:tag).permit(:x, :y, :user_id, :character_id)
    end

end
