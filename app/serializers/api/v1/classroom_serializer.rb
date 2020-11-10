class Api::V1::ClassroomSerializer < ActiveModel::Serializer
  attributes :id, :subject, :term, :users_with_role

  def users_with_role
    arr = object.rosters.map do |roster|
      {
        :user => roster.user,
        :role => roster.role
      }
    end
    return arr
  end

  has_many :questions
  has_many :rosters
  has_many :users
end
