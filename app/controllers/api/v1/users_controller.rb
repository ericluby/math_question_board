class Api::V1::UsersController < ApplicationController

  def show
    # binding.pry
    render json: { user_id: current_user.id }
  end

end
