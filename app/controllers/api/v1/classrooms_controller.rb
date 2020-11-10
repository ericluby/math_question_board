class Api::V1::ClassroomsController < ApiController
  def index
    render json: Classroom.all
  end

  def show
    # users = Roster.where(classroom_id: params[:id]).joins(:user).pluck(:first_name, :last_name, :role)
    classroom = Classroom.find(params[:id])
    # questions = Classroom.find(params["id"]).questions

    # usersWithRoles = users.map do |user| 
    #   { :first_name => user[0],
    #     :last_name => user[1],
    #     :role => user[2] }
    # end
# calls serializer for classroom and then just render the classroom
    render json: classroom
# render json: classroom, serializer: ClassroomSerializer
# render json: usersWithRoles
# render json: {userWithRoles: usersWithRoles, questions: questions} 
  end

  def create
    classroom = Classroom.new(subject: params["subject"], term: params["term"])
    classroom.save
    
    render json: classroom
  end
end