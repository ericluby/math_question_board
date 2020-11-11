class Message < ApplicationRecord
  mount_uploader :image, ImageForChatUploader

  belongs_to :question
  belongs_to :user
end