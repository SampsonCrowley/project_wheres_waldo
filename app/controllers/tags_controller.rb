class TagsController < ApplicationController

  def index
    @tags = current_user.tags
  end

  def create
    @tag = Tag.new(tag_params)
    if @tag.save
      render :js
    else
      render json: { errors: @tag.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    @tag = Tag.find(params[:id])
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
