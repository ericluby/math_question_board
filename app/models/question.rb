class Question < ApplicationRecord
  has_many :messages
  belongs_to :user

  validates :status, presence: true
  validates :title, presence: true
end