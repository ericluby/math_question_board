class Api::V1::ClassroomsController < ApiController
  def index
    render json: Classroom.all
  end

  def show
    classroom = Classroom.find(params[:id])
    # preexisting_roster = Roster.find_by(classroom_id: params[:id], user: current_user)
    
    # classroomData = {
    #   "classroom" => classroom,
    #   "role" => preexisting_roster.role
    # }

    # render json: classroomData
    render json: classroom
  end

  def create
    classroom = Classroom.new(subject: params["subject"], term: params["term"])
    classroom.save
    
    render json: classroom
  end
end