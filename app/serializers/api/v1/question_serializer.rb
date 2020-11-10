class Api::V1::QuestionSerializer < ActiveModel::Serializer
  attributes :id, :status, :title

  belongs_to :classroom
  belongs_to :user
  has_many :messages
end