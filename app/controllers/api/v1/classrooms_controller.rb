class Api::V1::ClassroomsController < ApiController
  def index
    render json: Classroom.all
  end

  def show
    classroom = Classroom.find(params[:id])

    render json: classroom
  end

  def create
    classroom = Classroom.new(subject: params["subject"], term: params["term"])
    classroom.save
    
    render json: classroom
  end
end