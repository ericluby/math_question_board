class Api::V1::MessageSerializer < ActiveModel::Serializer
  attributes :id, :body, :image

  belongs_to :question
  belongs_to :user
end