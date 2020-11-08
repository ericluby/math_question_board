class Classroom < ApplicationRecord
  has_many :rosters
  has_many :users, through: :rosters
  has_many :questions

  validates :subject, presence: true
  validates :term, presence: true
end