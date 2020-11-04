class Api::V1::ClassroomsController < ApiController
  def index
    # binding.pry
    render json: Classroom.all
  end

  def show
    classroom = Classroom.find(params[:id])
    users = classroom.users
    render json: users
  end

  def create
    # binding.pry
    render json: Classroom.all
  end
end