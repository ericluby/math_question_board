class Api::V1::RostersController < ApiController

  def create
    # binding.pry

    user = User.find_by(email: params["email"])
    preexisting_roster = Roster.find_by(classroom_id: params["classroomId"], user: user)

    if preexisting_roster 
      puts "already exists"
    else
      newRoster = Roster.create(user: user, classroom_id: params["classroomId"], role: params["role"])
    
      userWithRoles =  
        { :first_name => user.first_name,
          :last_name => user.last_name,
          :role => newRoster.role }
  
      render json: userWithRoles
    end
  end
end