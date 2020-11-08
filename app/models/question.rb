class Question < ApplicationRecord
  has_many :messages
  belongs_to :user
  belongs_to :classroom

  validates :status, presence: true
  validates :title, presence: true
end