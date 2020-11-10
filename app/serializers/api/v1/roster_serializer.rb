class Api::V1::RosterSerializer < ActiveModel::Serializer
  attributes :id, :role

  belongs_to :classroom
  belongs_to :user
end