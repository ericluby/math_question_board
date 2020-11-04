class Api::V1::ClassroomsController < ApiController
  def index
    render json: Classroom.all
  end

  def show
    classroom = Classroom.find(params[:id])
    render json: classroom
  end

  def create
    binding.pry
    render json: Classroom.all
  end
end