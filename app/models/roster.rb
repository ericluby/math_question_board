class Roster < ApplicationRecord
  belongs_to :user
  belongs_to :classroom

  validates :user, presence: true
  validates :classroom, presence: true
end