class Api::V1::ClassroomsController < ApiController
  def index
    # binding.pry
    render json: Classroom.all
  end

  def show
    users = Roster.where(classroom_id: params[:id]).joins(:user).pluck(:first_name, :last_name, :role)
    
    usersWithRoles = users.map do |user| 
      { :first_name => user[0],
        :last_name => user[1],
        :role => user[2] }
    end

    render json: usersWithRoles
  end

  def create
    classroom = Classroom.new(subject: params["subject"], term: params["term"])
    classroom.save
    binding.pry
    render json: classroom
  end
end